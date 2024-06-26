import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { formatHelper } from "../../utils/formatHelper";

export async function getProductVariationOptions({ productId }) {
  const { data, error } = await supabase.rpc(
    "get_distinct_product_variation_values",
    {
      id: productId,
    }
  );
  if (!error) {
    return formatHelper.variationOptionsOutput(data);
  } else {
    throw error;
  }
}

export const useProductVariationOptions = (productId) => {
  return useQuery(variationOptionsQuery(productId));
};

export const variationOptionsQuery = (productId) => {
  return queryOptions({
    queryKey: ["variations", { productId }],
    queryFn: () => {
      return getProductVariationOptions({ productId });
    },
  });
};

// should go into utils
