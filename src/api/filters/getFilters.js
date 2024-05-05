import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { filterOptionsConfig } from "../../config/queryOptions";

export async function getVariationOptions(category) {
  const { data, error } = await supabase.rpc(
    "get_distinct_variations_by_category",
    {
      category_name: category,
    }
  );
  if (error) {
    console.error(error);
  } else {
    const finalVariationObject = {};
    // fetching options and their correspondingValues
    data.forEach((val) => {
      if (Array.isArray(finalVariationObject[val.attribute])) {
        finalVariationObject[val.attribute] = [
          ...finalVariationObject[val.attribute],
          val.value,
        ];
      } else {
        finalVariationObject[val.attribute] = [val.value];
      }
    });
    return finalVariationObject;
  }
}

export const useVariationOptions = (category) => {
  return useQuery({
    ...filterOptionsConfig,
    queryKey: category ? ["variations", category] : ["variations"],
    queryFn: () => {
      // didnt use queryKey because categories migth not be there
      return getVariationOptions(category ?? "");
    },
  });
};
