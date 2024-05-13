import { supabase } from "../../lib/supabaseClient";

export async function getProductByVariation({ productId, variationString }) {
  const { data, error } = await supabase
    .from("products_combinations")
    .select(
      // reviews will be added as a tabnle and be joined with the products table
      "price,combination_string,stock,featured,unique_id,...products!inner(baseImage:featured_image,discount,description)"
    )
    .eq("unique_id", variationString);

  if (!error) {
    console.log(data);
    return data;
  } else {
    throw error;
  }
}
