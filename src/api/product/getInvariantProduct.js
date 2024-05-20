import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

async function getInvariantProduct(productId) {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,baseImage:featured_image,name,discount,description,...subcategories!inner(category),price"
    )
    .eq("id", productId);

  if (!error) {
    console.log(data);
    return data[0];
  } else {
    throw error;
  }
}
export const useInvariantProduct = (productId) => {
  return useQuery(invariantProductQuery(productId));
};

export const invariantProductQuery = (productId) => {
  return queryOptions({
    queryKey: ["invariant", { productId: productId }],
    queryFn: () => getInvariantProduct(productId),
  });
};
