import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getProductVariationOptionsImages({ productId }) {
  const { data, error } = await supabase.rpc(
    "get_distinct_product_variation_values",
    {
      id: productId,
    }
  );

  if (!error) {
    const images = data.reduce((accum, entry) => {
      if (entry.featured_image !== null)
        accum[entry.value] = (({
          featured_image,
          second_image,
          third_image,
        }) => ({ featured_image, second_image, third_image }))(entry);
      return accum;
    }, {});
    const distinct = data.reduce((accum, entry) => {
      if (Array.isArray(accum[entry.attribute])) {
        accum[entry.attribute] = [...accum[entry.attribute], entry.value];
      } else {
        accum[entry.attribute] = [entry.value];
      }
      return accum;
    }, {});
    console.log(images);
    console.log(distinct);
    return { images, distinct };
  } else {
    throw error;
  }
}

export const useProductVariationOptionsImages = (productId) => {
  return useQuery(productVariationOptionsImagesQuery(productId));
};

export const productVariationOptionsImagesQuery = (productId) => {
  return {
    queryKey: ["variations", { productId }],
    queryFn: () => {
      return getProductVariationOptionsImages({ productId });
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };
};
