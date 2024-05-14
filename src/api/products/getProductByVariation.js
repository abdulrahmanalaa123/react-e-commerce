import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getProductByVariation({ productId, variationString }) {
  const query = supabase.from("products_combinations").select(
    // reviews will be added as a tabnle and be joined with the products table
    "price,combination_string,stock,featured,unique_id,...products!inner(id,baseImage:featured_image,name,discount,description,...subcategories!inner(category))"
  );
  if (variationString) {
    query.eq("unique_id", variationString);
  } else {
    query.eq("products.id", productId);
    query.eq("featured", true);
  }
  const { data, error } = await query;
  if (!error) {
    console.log(data);
    if (data.length) {
      return data[0];
    } else {
      return [];
    }
  } else {
    throw error;
  }
}

export const useProduct = ({ productId, variationString }) => {
  return useQuery(productQuery({ productId, variationString }));
};

export const productQuery = ({ productId, variationString }) => {
  return {
    queryKey: [
      "product",
      { productId, ...(variationString && { variationString }) },
    ],
    queryFn: ({ queryKey }) => {
      return getProductByVariation(queryKey[1]);
    },
  };
};
