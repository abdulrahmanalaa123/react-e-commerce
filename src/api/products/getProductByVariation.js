import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getProductByVariation({ productId, variationString }) {
  const query = supabase.from("products_combinations").select(
    // reviews will be added as a tabnle and be joined with the products table
    "price,combination_string,stock,featured,unique_id,product_id)"
  );
  if (variationString) {
    query.eq("unique_id", variationString);
  } else {
    query.eq("product_id", productId);
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

export const useProduct = ({ productId, queryObj }) => {
  return useQuery(productQuery({ productId, queryObj }));
};

export const productQuery = ({ productId, queryObj }) => {
  let variationString = "";
  // UUID sorting needs to change to add the UUID concatenated a sorted filteringCriteria since
  // sorting the UUID ruins it but i would need to both change the backend and here so ill leave it like this since the data
  // is way too small for collissions but ill edit it later
  if (Object.keys(queryObj).length > 0) {
    variationString = [...Object.values(queryObj), productId]
      .join("")
      .toLowerCase()
      .split("")
      .sort()
      .join("")
      .replaceAll("-", "");
  }

  return {
    queryKey: [
      "product",
      { ...(variationString && { variationString }), productId },
    ],
    queryFn: ({ queryKey }) => {
      return getProductByVariation(queryKey[1]);
    },
    placeholderData: keepPreviousData,
  };
};
