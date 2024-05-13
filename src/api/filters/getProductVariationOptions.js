import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getProductVariationOptions({ productId }) {
  const { data, error } = await supabase.rpc(
    "get_distinct_product_variation_values",
    {
      id: productId,
    }
  );
  if (!error) {
    console.log(data);
    return data;
  } else {
    throw error;
  }
}

export const useProductVariationOptions = ({ productId }) => {
  return useQuery({
    queryKey: ["variations", { productId }],
    queryFn: () => {
      return getProductVariationOptions({ productId });
    },
  });
};
