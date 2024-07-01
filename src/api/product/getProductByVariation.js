import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { formatHelper } from "../../utils/formatHelper";

export async function getProductByVariation({ productId, variationString }) {
  const query = supabase.from("products_combinations").select(
    // reviews will be added as a tabnle and be joined with the products table
    "id,price,combination_string,stock,featured,unique_id,product_id)"
  );
  if (variationString) {
    query.eq("unique_id", variationString);
  } else {
    query.eq("product_id", productId);
    query.eq("featured", true);
  }
  const { data, error } = await query;
  if (!error) {
    if (data.length) {
      return data[0];
    } else {
      return [];
    }
  } else {
    throw error;
  }
}

export const useProduct = ({ productId, queryObj }) => {
  return useQuery(productQuery({ productId, queryObj }));
};

export const productQuery = ({ productId, queryObj }) => {
  const variationString = formatHelper["uniqueId"](queryObj, productId);
  return queryOptions({
    queryKey: [
      "product",
      { ...(variationString && { variationString }), productId },
    ],
    queryFn: ({ queryKey }) => {
      return getProductByVariation(queryKey[1]);
    },
  });
};
