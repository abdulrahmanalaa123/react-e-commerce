drop policy "Profiles are viewable by everyone" on "public"."product_variation_options";

drop policy "Profiles are viewable by everyone" on "public"."product_variation_values";

drop policy "Profiles are viewable by everyone" on "public"."products_combinations";

drop policy "Profiles are viewable by everyone" on "public"."subcategories";

alter table "public"."orders" alter column "order_status" drop default;

alter type "public"."status" rename to "status__old_version_to_be_dropped";

create type "public"."status" as enum ('Success', 'Pending', 'Failed');

create table "public"."user_data" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "stripe_customer_id" text,
    "email" text not null
);


alter table "public"."user_data" enable row level security;

alter table "public"."orders" alter column order_status type "public"."status" using order_status::text::"public"."status";

alter table "public"."orders" alter column "order_status" set default 'Packing'::status;

drop type "public"."status__old_version_to_be_dropped";

alter table "public"."cart_items" alter column "qty" set data type integer using "qty"::integer;

alter table "public"."orders" alter column "order_status" set default 'Success'::status;

alter table "public"."orders" alter column "shipping_address" set data type jsonb using "shipping_address"::jsonb;

CREATE UNIQUE INDEX user_data_pkey ON public.user_data USING btree (id);

alter table "public"."user_data" add constraint "user_data_pkey" PRIMARY KEY using index "user_data_pkey";

alter table "public"."user_data" add constraint "user_data_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_data" validate constraint "user_data_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cart_to_order(order_details json)
 RETURNS SETOF order_lines
 LANGUAGE plv8
AS $function$

  const cart_items = plv8.execute('SELECT product_id,product_combination_id,qty from public.cart_items ci INNER JOIN carts c ON c.id = ci.cart_id where c.user_id = $1', [order_details.user_id])
  const items_prices = []
  for(const item of cart_items){
    items_prices.push(plv8.find_function('get_cart_item_price')(item)) 
   }


  const total = items_prices.reduce((a,item,index) => a+Number((item.price * cart_items[index].qty).toFixed(2)),0)
  if(cart_items.length){
    try{
        let order_lines;
        
        plv8.subtransaction(function(){
        const order_id = plv8.execute('INSERT into orders (user_id,payment_method,shipping_address,order_total,order_status) values($1,$2::payment_methods,$3,$4,$5::status) RETURNING id',[order_details.user_id,order_details.payment_method,order_details.shipping_address,total,order_details.order_status
        ])
        // Inserting order lines
        const bulk_insert_ready_string = items_prices.map((price,index) => {
            return `(${order_id[0].id},${cart_items[index].product_id ? `'${cart_items[index].product_id}'` : null},${cart_items[index].product_combination_id},${cart_items[index].qty},${price.price})`
          }).join(",")

        
        order_lines = plv8.execute(`INSERT into order_lines (order_id,product_id,product_combination_id,qty,price) Values ${bulk_insert_ready_string} RETURNING * `)
        
        plv8.execute('DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = $1)',[order_details.user_id])
      })
      return order_lines;
    }catch(error){

       throw error;
    }
  }else{
     throw "User has no cart to create order";

  }

$function$
;

CREATE OR REPLACE FUNCTION public.create_user_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Query to get distinct size and color values for the category
  insert into public.user_data(id,email)
  values(new.id,new.email);
  return new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_cart_item_price(item json)
 RETURNS TABLE(price double precision)
 LANGUAGE plv8
AS $function$ 
  if(item.product_id !== null){ 
  const row = plv8.execute('SELECT price from products p where p.id = $1',[item.product_id]) 

  return {price: row[0].price}; 
  }else if(item.product_combination_id !==null){ 
    const comb_id = item.product_combination_id; 
    const identification = plv8.execute('SELECT price  FROM products_combinations where id = $1;',[comb_id]) 
    return {price:identification[0].price} 
  } 
$function$
;

CREATE OR REPLACE FUNCTION public.bulk_upsert_cart_items(cart_id bigint, items json)
 RETURNS integer
 LANGUAGE plv8
AS $function$
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


$function$
;

CREATE OR REPLACE FUNCTION public.get_cart_item_details(item json)
 RETURNS TABLE(image text, name text, price double precision, description text)
 LANGUAGE plv8
AS $function$


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
 
$function$
;

CREATE OR REPLACE FUNCTION public.get_category_pricerange(category_name text)
 RETURNS TABLE(max real, min real)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_category_subcategories(category_name text)
 RETURNS TABLE(name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Query to get distinct size and color values for the category
  RETURN QUERY
  SELECT distinct
  s.name FROM subcategories s
  -- WHERE p.name = 'Tinted Woodland Spurge'
  WHERE COALESCE($1, '') = '' OR s.category = Cast($1 as categories);
 -- Group by 1 to ensure a single row

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_current_uid()
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$ begin return auth.uid(); 
end; 
$function$
;

CREATE OR REPLACE FUNCTION public.get_distinct_product_variation_values(id uuid)
 RETURNS TABLE(attribute text, value text, variation_id bigint)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_distinct_variations_by_category(category_name text)
 RETURNS TABLE(attribute text, value text)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_or_create_cart()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_cart_item(cart_id bigint, item json)
 RETURNS integer
 LANGUAGE plv8
AS $function$

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

$function$
;

grant delete on table "public"."user_data" to "anon";

grant insert on table "public"."user_data" to "anon";

grant references on table "public"."user_data" to "anon";

grant select on table "public"."user_data" to "anon";

grant trigger on table "public"."user_data" to "anon";

grant truncate on table "public"."user_data" to "anon";

grant update on table "public"."user_data" to "anon";

grant delete on table "public"."user_data" to "authenticated";

grant insert on table "public"."user_data" to "authenticated";

grant references on table "public"."user_data" to "authenticated";

grant select on table "public"."user_data" to "authenticated";

grant trigger on table "public"."user_data" to "authenticated";

grant truncate on table "public"."user_data" to "authenticated";

grant update on table "public"."user_data" to "authenticated";

grant delete on table "public"."user_data" to "service_role";

grant insert on table "public"."user_data" to "service_role";

grant references on table "public"."user_data" to "service_role";

grant select on table "public"."user_data" to "service_role";

grant trigger on table "public"."user_data" to "service_role";

grant truncate on table "public"."user_data" to "service_role";

grant update on table "public"."user_data" to "service_role";

create policy "delete_user_self_only"
on "public"."user_data"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


create policy "select only themselves"
on "public"."user_data"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


create policy "Profiles are viewable by everyone"
on "public"."product_variation_options"
as permissive
for select
to anon, authenticated
using (true);


create policy "Profiles are viewable by everyone"
on "public"."product_variation_values"
as permissive
for select
to anon, authenticated
using (true);


create policy "Profiles are viewable by everyone"
on "public"."products_combinations"
as permissive
for select
to anon, authenticated
using (true);


create policy "Profiles are viewable by everyone"
on "public"."subcategories"
as permissive
for select
to anon, authenticated
using (true);



