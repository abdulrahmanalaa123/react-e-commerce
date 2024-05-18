import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getVariationImages(variationIds) {
  const { data, error } = await supabase
    .from("image_gallery")
    .select("featured,second,third,product_variation_id")
    .in("product_variation_id", variationIds);

  if (!error) {
    if (data.length) {
      return data.map((variationGallery) => Object.values(variationGallery));
    }
    return [];
  } else {
    throw error;
  }
}
export const useVariationImages = (variationId) => {
  return useQuery(variationImagesQuery(variationId));
};

export const variationImagesQuery = (variationId) => {
  return {
    queryKey: ["productImages", variationId],
    queryFn: () => {
      getVariationImages(variationId);
    },
  };
};
