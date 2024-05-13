// must be imported using eval its used in compile time not importing would cause an error
import { useQuery } from "@tanstack/react-query";
import { productFetchingConfig } from "../../config/queryOptions";
import { supabase } from "../../lib/supabaseClient";
import { queryFormatter } from "../../utils/queryFormatter";

// function parameters are error prone when you enter an empty object which shouldnt create errors but it does so the default function usage is with an empty object
// and used to get all products
export async function getProducts({
  // category shouldnt be in a list since the user can preview each category on its own
  // but leave it as is for features if possible
  // can enforce type chechking if category belongs to my 4 categories and return an error with no request because
  // my categories are made as an enum in the database so i use casting which may induce errors and faulty requests so i might check if it belongs to my 4 main categories
  // Plants,Seeds,Garden Supplies,Pots might be added as a future edit
  category = [],
  subcategory = [],
  sKey = "",
  // might be refactored to option that contains two objects or something
  color = [],
  size = [],
  priceRange = [],
  pageNo = 1,
}) {
  // query creation
  // need to include each column for it to be able to query by it although its not needed in the products viewing page
  const queryStr = `name,id,featured_image,price,discount${
    // done in this awful way to destructure the data properly
    // instead of calling ...subcategories!inner 2times which for some reason it cant let me do
    category.length && subcategory.length
      ? ",...subcategories!inner(sub_name: name,category)"
      : category.length
      ? ",...subcategories!inner(category)"
      : subcategory.length
      ? ",...subcategories!inner(sub_name: name)"
      : ""
  }${
    color.length || size.length
      ? ",options: product_variation_options!inner(option: variation_name,values: product_variation_values!inner(variation_value))"
      : ""
  }`;

  let query = supabase.from("products").select(queryStr, { count: "exact" });

  //the equality chains that needs to be done so we can filter by the value we're selecting
  // done in ifs for better readability

  if (category.length) {
    query = query.in("subcategories.category", category);
  }
  if (sKey) {
    // a really simple search pattern not that good but good enough for me im not creating a search engine
    query = query.ilike("name", sKey.length === 1 ? `${sKey}%` : `%${sKey}%`);
  }
  if (subcategory.length) {
    query = query.in("subcategories.name", subcategory);
  }
  if (color.length) {
    query = query.eq("product_variation_options.variation_name", "Color");

    query = query.in(
      "product_variation_options.product_variation_values.variation_value",
      color
    );
  }
  if (size.length) {
    query = query.eq("product_variation_options.variation_name", "Size");
    query = query.in(
      "product_variation_options.product_variation_values.variation_value",
      size
    );
  }

  if (priceRange.length) {
    let min = Infinity;
    let max = -Infinity;
    for (const value of priceRange) {
      // done like this expecting queries with inverted values probably
      let currMin = Math.min(...value);
      let currMax = Math.max(...value);

      min = currMin <= min ? currMin : min;
      max = currMax >= max ? currMax : max;
    }

    query = query.gte("price", min).lte("price", max);
  }
  // 16 is the current page count can be edited
  const { data, count, error } = await query.range(
    (pageNo - 1) * 16,
    pageNo * 16 - 1
  );

  if (!error) {
    console.log(data);

    return { data, count };
  } else {
    console.log(error);
    throw error;
  }
}

export const useProducts = ({ category, queryObject }) => {
  const queryKey = {
    ...(category && { category: [category] }),
    ...queryObject,
  };
  const paramsObject = queryFormatter(queryKey);

  return useQuery({
    ...productFetchingConfig,
    queryKey: ["products", paramsObject],
    queryFn: ({ queryKey }) => {
      // the queryObject combined with the category if found if not it will work as well
      return getProducts(queryKey[1]);
    },
  });
};
// old solution for chaining other than ifs using eval
// const chainsStr = `${
//   category ? `.eq("subcategories.category", "${category}")` : ""
// }${subCategory ? `.eq("subcategories.name", "${subCategory}")` : ""}${
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
