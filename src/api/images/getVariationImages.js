import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getVariationImages(variationIds) {
  const { data, error } = await supabase
    .from("image_gallery")
    .select("featured,second,third,product_variation_id")
    .in("product_variation_id", variationIds);

  if (!error) {
    if (data.length) {
      return data
        .map((variationGallery) => {
          const { product_variation_id, ...rest } = variationGallery;

          return Object.values(rest);
        })
        .flat(1);
    }
    return [];
  } else {
    throw error;
  }
}
export const useVariationImages = ({ variationIds, enabled }) => {
  return useQuery(variationImagesQuery(variationIds, enabled));
};

export const variationImagesQuery = (variationIds, enabled) => {
  return {
    queryKey: ["productImages", { variationIds: variationIds }],
    queryFn: () => {
      return getVariationImages(variationIds);
    },
    enabled: enabled,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };
};
