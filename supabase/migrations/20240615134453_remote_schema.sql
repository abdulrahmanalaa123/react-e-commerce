
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

ALTER SCHEMA "public" OWNER TO "postgres";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE SCHEMA IF NOT EXISTS "stripe";

ALTER SCHEMA "stripe" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "plv8" WITH SCHEMA "pg_catalog";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";

CREATE TYPE "public"."categories" AS ENUM (
    'Plants',
    'Pots',
    'Seeds',
    'GardenSupplies'
);

ALTER TYPE "public"."categories" OWNER TO "postgres";

COMMENT ON TYPE "public"."categories" IS 'types of categories';

CREATE TYPE "public"."colors " AS ENUM (
    '#778899',
    '#FFF5EE',
    '#696969',
    '#E6E6FA',
    '#D8BFD8',
    '#4B0082',
    'NOCOLOR'
);

ALTER TYPE "public"."colors " OWNER TO "postgres";

COMMENT ON TYPE "public"."colors " IS 'types of available colors';

CREATE TYPE "public"."payment_methods" AS ENUM (
    'credit card',
    'stripe',
    'cash'
);

ALTER TYPE "public"."payment_methods" OWNER TO "postgres";

CREATE TYPE "public"."sizes" AS ENUM (
    'Large',
    'Medium',
    'Small',
    'NoSize'
);

ALTER TYPE "public"."sizes" OWNER TO "postgres";

COMMENT ON TYPE "public"."sizes" IS 'types of available sizes';

CREATE TYPE "public"."status" AS ENUM (
    'Packing',
    'Shipping',
    'Completed'
);

ALTER TYPE "public"."status" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."bulk_overwrite_cart_items"("cart_id" bigint, "items" "json") RETURNS integer
    LANGUAGE "plv8"
    AS $_$

  plv8.subtransaction(function (){
 for(const item of items){
  let selected_row;
   if(item.product_id){
    selected_row = plv8.execute('SELECT * FROM cart_items c WHERE c.cart_id = $1 AND c.product_id = $2', [cart_id, item.product_id]);
    if(selected_row.length){
      plv8.execute('UPDATE cart_items SET qty = ($3::INT) WHERE cart_id = $1 AND product_id = $2',[cart_id,item.product_id,item.qty]);
    } else {
      plv8.execute('INSERT INTO cart_items (cart_id, product_id, qty) VALUES ($1, $2, $3)',[cart_id,item.product_id,item.qty]);
    }
    return item.qty;
  
  } else if(item.product_combination_id){
    selected_row = plv8.execute('SELECT * FROM cart_items c WHERE c.cart_id = $1 AND c.product_combination_id = $2', [cart_id, item.product_combination_id]);
    if(selected_row.length){
      plv8.execute('UPDATE cart_items  SET qty = ($3::INT) WHERE cart_id = $1 AND product_combination_id = $2',[cart_id,item.product_combination_id,item.qty]);
    } else {
      plv8.execute('INSERT INTO cart_items (cart_id, product_combination_id, qty) VALUES ($1, $2, $3)',[cart_id,item.product_combination_id,item.qty]);
    }
    return item.qty;
  }
  })
 

$_$;

ALTER FUNCTION "public"."bulk_overwrite_cart_items"("cart_id" bigint, "items" "json") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."bulk_upsert_cart_items"("cart_id" bigint, "items" "json") RETURNS integer
    LANGUAGE "plv8"
    AS $$
try{
  let quantitySum = 0;
  plv8.subtransaction(function (){
    for(const item of items){
      quantitySum = quantitySum + plv8.find_function('uspsert_cart_item')(cart_id,item)
    }
  }); 
  return quantitySum;
}catch(e){
  throw e;
}

$$;

ALTER FUNCTION "public"."bulk_upsert_cart_items"("cart_id" bigint, "items" "json") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_cart_item_details"("item" "json") RETURNS TABLE("image" "text", "name" "text", "price" double precision, "description" "text")
    LANGUAGE "plv8"
    AS $_$

  if(item.product_id){
    const row = plv8.execute('SELECT featured_image as image,name,price,description from products p where p.id = $1',[item.product_id])
    return row;
  }else if(item.product_combination_id){
    const comb_id = item.product_combination_id;

    const identification = plv8.execute('SELECT p.featured_image as image,p.name as name,pc.price as price, p.description as description,pc.combination_string as verifier FROM products_combinations pc INNER JOIN products p ON p.id = pc.product_id WHERE pc.id = $1;',[comb_id])

    const {verifier,...rest} = identification[0]
    const variationArray = verifier.split('-');

    const featuredImage = plv8.execute('SELECT ig.featured as image FROM image_gallery ig INNER JOIN product_variation_values vv ON vv.id = ig.product_variation_id WHERE vv.variation_value = ANY($1)',[variationArray])
    
    return {image:featuredImage[0]?.image ?? rest.image,name:rest.name,price:rest.price,description:rest.description}
  }
 
$_$;

ALTER FUNCTION "public"."get_cart_item_details"("item" "json") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_category_pricerange"("category_name" "text") RETURNS TABLE("max" real, "min" real)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  -- Query to get distinct size and color values for the category
  RETURN QUERY
  select
  max(p.price),
  min(p.price)
from
  subcategories s
  inner join products p on s.id = p.subcategory
  WHERE COALESCE($1, '') = '' OR s.category = Cast($1 as categories);
 -- Group by 1 to ensure a single row

END;
$_$;

ALTER FUNCTION "public"."get_category_pricerange"("category_name" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_category_subcategories"("category_name" "text") RETURNS TABLE("name" "text")
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  -- Query to get distinct size and color values for the category
  RETURN QUERY
  SELECT distinct
  s.name FROM subcategories s
  -- WHERE p.name = 'Tinted Woodland Spurge'
  WHERE COALESCE($1, '') = '' OR s.category = Cast($1 as categories);
 -- Group by 1 to ensure a single row

END;
$_$;

ALTER FUNCTION "public"."get_category_subcategories"("category_name" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_current_uid"() RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$ begin return auth.uid(); 
end; 
$$;

ALTER FUNCTION "public"."get_current_uid"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_distinct_product_variation_values"("id" "uuid") RETURNS TABLE("attribute" "text", "value" "text", "variation_id" bigint)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  -- Query to get distinct size and color values for the category
  RETURN QUERY
  SELECT
  v.variation_name,vv.variation_value,vv.id FROM products p
  INNER JOIN product_variation_options v ON p.id = v.product_id
  INNER JOIN product_variation_values vv ON v.id = vv.variation_id
  WHERE p.id = $1;
 -- Group by 1 to ensure a single row

END;
$_$;

ALTER FUNCTION "public"."get_distinct_product_variation_values"("id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_distinct_variations_by_category"("category_name" "text") RETURNS TABLE("attribute" "text", "value" "text")
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  -- Query to get distinct size and color values for the category
  RETURN QUERY
  SELECT distinct
  v.variation_name,vv.variation_value FROM products p
  INNER JOIN subcategories s ON p.subcategory = s.id
  INNER JOIN product_variation_options v ON p.id = v.product_id
  INNER JOIN product_variation_values vv ON v.id = vv.variation_id
  -- WHERE p.name = 'Tinted Woodland Spurge'
  WHERE COALESCE($1, '') = '' OR s.category = Cast($1 as categories);
 -- Group by 1 to ensure a single row

END;
$_$;

ALTER FUNCTION "public"."get_distinct_variations_by_category"("category_name" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_or_create_cart"() RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    curr_user UUID := auth.uid();
    cart_id INT;
BEGIN
    /* 
    Check if the user already has a cart
    */
    IF NOT EXISTS (
        SELECT 1 FROM carts c WHERE c.user_id = curr_user
    ) THEN
        /* 
        Create a new cart for the user if it doesn't exist
        */
        INSERT INTO carts (user_id) VALUES (curr_user) RETURNING id INTO cart_id;
    ELSE
        /* 
        Get the existing cart ID
        */
        SELECT id INTO cart_id FROM carts WHERE user_id = curr_user;
    END IF;

    /* 
    Return the user's cart ID (existing or newly created)
    */
    RETURN cart_id;
END;
$$;

ALTER FUNCTION "public"."get_or_create_cart"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."upsert_cart_item"("cart_id" bigint, "item" "json") RETURNS integer
    LANGUAGE "plv8"
    AS $_$

  let selected_row;
  if(item.product_id){
    selected_row = plv8.execute('SELECT * FROM cart_items c WHERE c.cart_id = $1 AND c.product_id = $2', [cart_id, item.product_id]);
    if(selected_row.length){
      plv8.execute('UPDATE cart_items SET qty = (qty + $3::INT) WHERE cart_id = $1 AND product_id = $2',[cart_id,item.product_id,item.qty]);
    } else {
      plv8.execute('INSERT INTO cart_items (cart_id, product_id, qty) VALUES ($1, $2, $3)',[cart_id,item.product_id,item.qty]);
    }
    return item.qty;
  
  } else if(item.product_combination_id) {
    selected_row = plv8.execute('SELECT * FROM cart_items c WHERE c.cart_id = $1 AND c.product_combination_id = $2', [cart_id, item.product_combination_id]);
    if(selected_row.length){
      plv8.execute('UPDATE cart_items  SET qty = (qty + $3::INT) WHERE cart_id = $1 AND product_combination_id = $2',[cart_id,item.product_combination_id,item.qty]);
    } else {
      plv8.execute('INSERT INTO cart_items (cart_id, product_combination_id, qty) VALUES ($1, $2, $3)',[cart_id,item.product_combination_id,item.qty]);
    }
    return item.qty;
  }

$_$;

ALTER FUNCTION "public"."upsert_cart_item"("cart_id" bigint, "item" "json") OWNER TO "postgres";

CREATE FOREIGN DATA WRAPPER "stripe_wrapper" HANDLER "extensions"."stripe_fdw_handler" VALIDATOR "extensions"."stripe_fdw_validator";

CREATE SERVER "stripe_server" FOREIGN DATA WRAPPER "stripe_wrapper" OPTIONS (
    "api_key_id" '24f8902a-2119-4fc2-9f32-0901b8218895',
    "api_url" 'https://api.stripe.com/v1/'
);

ALTER SERVER "stripe_server" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."subcategories" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "category" "public"."categories"
);

ALTER TABLE "public"."subcategories" OWNER TO "postgres";

ALTER TABLE "public"."subcategories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."SubCategories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."cart_items" (
    "id" bigint NOT NULL,
    "cart_id" bigint NOT NULL,
    "product_combination_id" bigint,
    "qty" bigint,
    "product_id" "uuid"
);

ALTER TABLE "public"."cart_items" OWNER TO "postgres";

ALTER TABLE "public"."cart_items" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cart_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."carts" (
    "id" bigint NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."carts" OWNER TO "postgres";

ALTER TABLE "public"."carts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."carts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."image_gallery" (
    "id" bigint NOT NULL,
    "featured" "text" NOT NULL,
    "second" "text",
    "third" "text",
    "product_variation_id" bigint
);

ALTER TABLE "public"."image_gallery" OWNER TO "postgres";

ALTER TABLE "public"."image_gallery" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."image_gallery_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" bigint NOT NULL,
    "image_path" "text" NOT NULL,
    "owner_id" "uuid"
);

ALTER TABLE "public"."images" OWNER TO "postgres";

ALTER TABLE "public"."images" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."images_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."order_lines" (
    "id" bigint NOT NULL,
    "order_id" bigint NOT NULL,
    "product_id" "uuid",
    "product_combination_id" bigint,
    "qty" integer,
    "price" real
);

ALTER TABLE "public"."order_lines" OWNER TO "postgres";

ALTER TABLE "public"."order_lines" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."order_lines_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "payment_method" "public"."payment_methods" DEFAULT 'cash'::"public"."payment_methods" NOT NULL,
    "shipping_address" "text",
    "order_total" real NOT NULL,
    "order_status" "public"."status" DEFAULT 'Packing'::"public"."status" NOT NULL
);

ALTER TABLE "public"."orders" OWNER TO "postgres";

ALTER TABLE "public"."orders" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."orders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."product_variation_options" (
    "id" bigint NOT NULL,
    "product_id" "uuid",
    "variation_name" "text"
);

ALTER TABLE "public"."product_variation_options" OWNER TO "postgres";

ALTER TABLE "public"."product_variation_options" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_variation_options_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."product_variation_values" (
    "id" bigint NOT NULL,
    "variation_id" bigint NOT NULL,
    "variation_value" "text"
);

ALTER TABLE "public"."product_variation_values" OWNER TO "postgres";

ALTER TABLE "public"."product_variation_values" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_variation_values_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "price" real NOT NULL,
    "discount" smallint,
    "subcategory" bigint DEFAULT '2'::bigint,
    "featured_image" "text" DEFAULT 'https://picsum.photos/600/600'::"text"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products_combinations" (
    "id" bigint NOT NULL,
    "sku" "text" NOT NULL,
    "combination_string" "text",
    "price" double precision,
    "product_id" "uuid" DEFAULT "gen_random_uuid"(),
    "unique_id" "text",
    "stock" integer NOT NULL,
    "featured" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."products_combinations" OWNER TO "postgres";

COMMENT ON COLUMN "public"."products_combinations"."featured" IS 'The default combination on loading the product';

ALTER TABLE "public"."products_combinations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_combinations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE FOREIGN TABLE "stripe"."accounts" (
    "id" "text",
    "business_type" "text",
    "country" "text",
    "email" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'accounts'
);

ALTER FOREIGN TABLE "stripe"."accounts" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."balance" (
    "balance_type" "text",
    "amount" bigint,
    "currency" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance'
);

ALTER FOREIGN TABLE "stripe"."balance" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."balance_transactions" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "description" "text",
    "fee" bigint,
    "net" bigint,
    "status" "text",
    "type" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'balance_transactions'
);

ALTER FOREIGN TABLE "stripe"."balance_transactions" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."charges" (
    "id" "text",
    "amount" bigint,
    "currency" "text",
    "customer" "text",
    "description" "text",
    "invoice" "text",
    "payment_intent" "text",
    "status" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'charges'
);

ALTER FOREIGN TABLE "stripe"."charges" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."checkout_sessions" (
    "id" "text",
    "customer" "text",
    "payment_intent" "text",
    "subscription" "text",
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'checkout/sessions',
    "rowid_column" 'id'
);

ALTER FOREIGN TABLE "stripe"."checkout_sessions" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."invoices" (
    "id" "text",
    "customer" "text",
    "subscription" "text",
    "status" "text",
    "total" bigint,
    "currency" "text",
    "period_start" timestamp without time zone,
    "period_end" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'invoices'
);

ALTER FOREIGN TABLE "stripe"."invoices" OWNER TO "postgres";

CREATE FOREIGN TABLE "stripe"."payment_intents" (
    "id" "text",
    "customer" "text",
    "amount" bigint,
    "currency" "text",
    "payment_method" "text",
    "created" timestamp without time zone,
    "attrs" "jsonb"
)
SERVER "stripe_server"
OPTIONS (
    "object" 'payment_intents'
);

ALTER FOREIGN TABLE "stripe"."payment_intents" OWNER TO "postgres";

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "NewProducts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subcategories"
    ADD CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_user_id_key" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."image_gallery"
    ADD CONSTRAINT "image_gallery_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."order_lines"
    ADD CONSTRAINT "order_lines_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_variation_options"
    ADD CONSTRAINT "product_variation_options_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_variation_values"
    ADD CONSTRAINT "product_variation_values_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products_combinations"
    ADD CONSTRAINT "products_combinations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "unique_cart_items" UNIQUE ("cart_id", "product_combination_id", "product_id");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_product_combination_id_fkey" FOREIGN KEY ("product_combination_id") REFERENCES "public"."products_combinations"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."order_lines"
    ADD CONSTRAINT "order_lines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."order_lines"
    ADD CONSTRAINT "order_lines_product_combination_id_fkey" FOREIGN KEY ("product_combination_id") REFERENCES "public"."products_combinations"("id");

ALTER TABLE ONLY "public"."order_lines"
    ADD CONSTRAINT "order_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "public_cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "public_carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."image_gallery"
    ADD CONSTRAINT "public_image_gallery_product_variation_id_fkey" FOREIGN KEY ("product_variation_id") REFERENCES "public"."product_variation_values"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "public_images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."product_variation_options"
    ADD CONSTRAINT "public_product_variation_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."product_variation_values"
    ADD CONSTRAINT "public_product_variation_values_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variation_options"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."products_combinations"
    ADD CONSTRAINT "public_products_combinations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "public_products_subcategory_fkey" FOREIGN KEY ("subcategory") REFERENCES "public"."subcategories"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."carts" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for users based on user_id" ON "public"."orders" TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable read access for all users" ON "public"."image_gallery" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."products" USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON "public"."images" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON "public"."product_variation_options" FOR SELECT TO "authenticated", "anon" USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON "public"."product_variation_values" FOR SELECT TO "authenticated", "anon" USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON "public"."products_combinations" FOR SELECT TO "authenticated", "anon" USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON "public"."subcategories" FOR SELECT TO "authenticated", "anon" USING (true);

CREATE POLICY "Rule for all actions" ON "public"."cart_items" TO "authenticated" USING (((EXISTS ( SELECT 1
   FROM "public"."carts" "c"
  WHERE ("c"."user_id" = ( SELECT "auth"."uid"() AS "uid")))) AND ("cart_id" IN ( SELECT "c"."id"
   FROM "public"."carts" "c"
  WHERE ("c"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))));

ALTER TABLE "public"."cart_items" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."carts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."image_gallery" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "order_id exists first" ON "public"."order_lines" TO "authenticated" USING (((EXISTS ( SELECT 1
   FROM "public"."orders" "o"
  WHERE ("o"."user_id" = ( SELECT "auth"."uid"() AS "uid")))) AND ("order_id" IN ( SELECT "o"."id"
   FROM "public"."orders" "o"
  WHERE ("o"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))));

ALTER TABLE "public"."order_lines" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_variation_options" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_variation_values" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products_combinations" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select if exists" ON "public"."carts" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

ALTER TABLE "public"."subcategories" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."bulk_overwrite_cart_items"("cart_id" bigint, "items" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."bulk_overwrite_cart_items"("cart_id" bigint, "items" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."bulk_overwrite_cart_items"("cart_id" bigint, "items" "json") TO "service_role";

GRANT ALL ON FUNCTION "public"."bulk_upsert_cart_items"("cart_id" bigint, "items" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."bulk_upsert_cart_items"("cart_id" bigint, "items" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."bulk_upsert_cart_items"("cart_id" bigint, "items" "json") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_cart_item_details"("item" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."get_cart_item_details"("item" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_cart_item_details"("item" "json") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_category_pricerange"("category_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_category_pricerange"("category_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_category_pricerange"("category_name" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_category_subcategories"("category_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_category_subcategories"("category_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_category_subcategories"("category_name" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_current_uid"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_current_uid"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_current_uid"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_distinct_product_variation_values"("id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_distinct_product_variation_values"("id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_distinct_product_variation_values"("id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_distinct_variations_by_category"("category_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_distinct_variations_by_category"("category_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_distinct_variations_by_category"("category_name" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_or_create_cart"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_or_create_cart"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_or_create_cart"() TO "service_role";

GRANT ALL ON FUNCTION "public"."upsert_cart_item"("cart_id" bigint, "item" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."upsert_cart_item"("cart_id" bigint, "item" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."upsert_cart_item"("cart_id" bigint, "item" "json") TO "service_role";

GRANT ALL ON TABLE "public"."subcategories" TO "anon";
GRANT ALL ON TABLE "public"."subcategories" TO "authenticated";
GRANT ALL ON TABLE "public"."subcategories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."SubCategories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."SubCategories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."SubCategories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."cart_items" TO "anon";
GRANT ALL ON TABLE "public"."cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."cart_items" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."carts" TO "anon";
GRANT ALL ON TABLE "public"."carts" TO "authenticated";
GRANT ALL ON TABLE "public"."carts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."image_gallery" TO "anon";
GRANT ALL ON TABLE "public"."image_gallery" TO "authenticated";
GRANT ALL ON TABLE "public"."image_gallery" TO "service_role";

GRANT ALL ON SEQUENCE "public"."image_gallery_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."image_gallery_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."image_gallery_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."images" TO "anon";
GRANT ALL ON TABLE "public"."images" TO "authenticated";
GRANT ALL ON TABLE "public"."images" TO "service_role";

GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."order_lines" TO "anon";
GRANT ALL ON TABLE "public"."order_lines" TO "authenticated";
GRANT ALL ON TABLE "public"."order_lines" TO "service_role";

GRANT ALL ON SEQUENCE "public"."order_lines_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."order_lines_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."order_lines_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."product_variation_options" TO "anon";
GRANT ALL ON TABLE "public"."product_variation_options" TO "authenticated";
GRANT ALL ON TABLE "public"."product_variation_options" TO "service_role";

GRANT ALL ON SEQUENCE "public"."product_variation_options_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_variation_options_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_variation_options_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."product_variation_values" TO "anon";
GRANT ALL ON TABLE "public"."product_variation_values" TO "authenticated";
GRANT ALL ON TABLE "public"."product_variation_values" TO "service_role";

GRANT ALL ON SEQUENCE "public"."product_variation_values_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_variation_values_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_variation_values_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."products_combinations" TO "anon";
GRANT ALL ON TABLE "public"."products_combinations" TO "authenticated";
GRANT ALL ON TABLE "public"."products_combinations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_combinations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_combinations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_combinations_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
