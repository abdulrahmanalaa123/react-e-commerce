// must be imported using eval its used in compile time not importing would cause an error
import { supabase } from "../../lib/supabaseClient";

export default async function filterProducts(
  { category, subcategory, color, size, priceRange, pageNo, pagesCount } = {
    category: "",
    subcategory: "",
    color: "",
    size: "",
    priceRange: "",
    pageNo: 1,
    pagesCount: 10,
  }
) {
  // query creation
  // need to include each column for it to be able to query by it although its not needed in the products viewing page
  const queryStr = `name,featured_image,price${
    subcategory ? ",sub_name: subcategories!inner(name)" : ""
  }${category ? ",category: subcategories!inner(category)" : ""}${
    color || size
      ? ",options: product_variation_options!inner(variation_name,product_variation_values(variation_value))"
      : ""
  }`;

  let query = supabase.from("products").select(queryStr);
  //the equality chains that needs to be done so we can filter by the value we're selecting
  // done in ifs for better readability
  if (category) {
    query = query.eq("subcategories.category", category);
  }
  if (subcategory) {
    query = query.eq("subcategories.name", subcategory);
  }
  if (color) {
    query = query.eq(
      "product_variation_options.product_variation_values.variation_value",
      color
    );
  }
  if (size) {
    query = query.eq(
      "product_variation_options.product_variation_values.variation_value",
      color
    );
  }
  if (priceRange) {
    query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);
  }

  const { data, error } = await query;
  // old solution using eval
  // const chainsStr = `${
  //   category ? `.eq("subcategories.category", "${category}")` : ""
  // }${subcategory ? `.eq("subcategories.name", "${subcategory}")` : ""}${
  //   color
  //     ? ` .eq(
  //     "product_variation_options.product_variation_values.variation_value",
  //     "${color}"
  //   )`
  //     : ""
  // }${
  //   size
  //     ? ` .eq(
  //     "product_variation_options.product_variation_values.variation_value",
  //     "${size}"
  //   )`
  //     : ""
  // }${
  //   priceRange
  //     ? ` .gte("price", "${priceRange[0]}")
  //     .lte("price", "${priceRange[1]}")`
  //     : ""
  // }`;
  // //final evalString for the whole line of code combinging the query and chaining
  // const evalString = `supabase.from("products").select("${queryStr}")${chainsStr}.range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);`;

  // const {data,error} = await eval(evalString)
  // console.log("queryString: ", queryStr);
  // console.log("chainString: ", chainsStr);
  // console.log("evaledString: ", evalString);

  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
}
