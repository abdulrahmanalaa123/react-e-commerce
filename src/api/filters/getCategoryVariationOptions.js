import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { filterOptionsConfig } from "../../lib/react-query";
import { formatHelper } from "../../utils/formatHelper";

export async function getCategoryVariationOptions(category) {
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

export const useCategoryVariationOptions = (category) => {
  // formatHlper added here as a safe check and not get the errors of invalid requests because it annoys me i dont think it would be an issue to perform a faulty request
  // but it helps it acts as a loader because the useQuery is initialized the moment he types the faulty categroy so when he navigates back to products the request would already be finalized
  return useQuery(categoryVariationOptionsQuery(category));
};

export const categoryVariationOptionsQuery = (category) => {
  return {
    ...filterOptionsConfig,
    queryKey: formatHelper["category"](category)
      ? ["variations", category]
      : ["variations"],
    queryFn: ({ queryKey }) => {
      // didnt use queryKey because categories migth not be there
      return getCategoryVariationOptions(queryKey[1] ?? "");
    },
  };
};
