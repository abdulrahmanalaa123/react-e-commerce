import { query } from "firebase/database";
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
  let finalStr;
  // string creation
  const queryStr = `name,featured_image,price${
    subcategory ? ",sub_name: subcategories!inner(name)" : ""
  }${category ? ",category: subcategories!inner(category)" : ""}${
    color || size
      ? ",options: product_variation_options!inner(variation_name,product_variation_values(variation_value)): subcategories(name)"
      : ""
  }`;

  const chainsStr = `${
    category ? `.eq("subcategories.category", "${category}")` : ""
  }${subcategory ? `.eq("subcategories.name", "${subcategory}")` : ""}${
    color
      ? ` .eq(
      "product_variation_options.product_variation_values.variation_value",
      "${color}"
    )`
      : ""
  }${
    size
      ? ` .eq(
      "product_variation_options.product_variation_values.variation_value",
      "${size}"
    )`
      : ""
  }${
    priceRange
      ? ` .gte("price", "${priceRange[0]}")
      .lte("price", "${priceRange[1]}")`
      : ""
  }`;

  const evalString = `supabase.from("products").select("${queryStr}")${chainsStr}.range((pageNo - 1) * pagesCount, pageNo * pagesCount - 1);`;

  console.log("queryString: ", queryStr);
  console.log("chainString: ", chainsStr);
  console.log("evaledString: ", evalString);

  const { data, error } = await eval(evalString);
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
}

function strFormatter({
  category,
  subcategory,
  color,
  size,
  priceRange,
  inputString,
}) {
  if (subcategory) {
    inputString.append();
  }
}
