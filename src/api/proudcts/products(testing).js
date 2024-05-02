import { supabase } from "../../lib/supabaseClient";

// after testing first chaining comparisons can happen
// I can modify the result is if i want to check anything ill need its inner join where only things which satisfies the comparison will be returned
// I can use multiple queries and complex using formatted strings and using the variables and reducing the returned data and joining only if i need
// to query where joined data are needed only for querying and not for actual consumable values
// operators on the request will just edit the response so only who fits the comparison will have the value but everything is returned inner is
// used to only return whose comparison satsifies their values

async function allProductsPaginated({ pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*,sub_name: subcategories(name),category: subcategories(category)")
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);

  if (!productsError) {
    console.log(products);
  }
}
async function categoryPaginated({ category, pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      "*,sub_name: subcategories!inner(name),category: subcategories!inner(category)"
    )
    .eq("subcategories.category", category)
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);

  if (!productsError) {
    console.log(products);
  }
}
async function subCategoryPaginated({ subCategory, pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      "*,sub_name: subcategories!inner(name),category: subcategories!inner(category)"
    )
    .eq("subcategories.name", subCategory)
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);

  if (!productsError) {
    console.log(products);
  }
}

async function getByOption({ option, pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `*,options: product_variation_options${
        option ? "!inner" : ""
      }(variation_name,product_variation_values(variation_value))`
    )
    .eq("product_variation_options.variation_name", option)
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);
  if (!productsError) {
    console.log(products);
  }
}
async function getByOptionValue({ optionValue, pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(
      `*,options: product_variation_options${
        optionValue ? "!inner" : ""
      }(variation_name,product_variation_values(variation_value))`
    )
    .eq(
      "product_variation_options.product_variation_values.variation_value",
      optionValue
    )
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);
  if (!productsError) {
    console.log(products);
  }
}
async function getByPriceRange({ range, pageNo, pagesCount }) {
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .gte("price", range[0])
    .lte("price", range[1])
    .range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);
  if (!productsError) {
    console.log(products);
  }
}
