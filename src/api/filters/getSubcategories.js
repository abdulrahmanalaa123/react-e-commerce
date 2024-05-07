import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { filterOptionsConfig } from "../../config/queryOptions";
import { formatHelper } from "../../utils/formatHelper";

export async function getSubcategories(category) {
  const { data, error } = await supabase.rpc("get_category_subcategories", {
    category_name: category,
  });
  if (!error) {
    // console.log(data);
    return data;
  } else {
    throw error;
  }
}

export const useSubcategories = (category) => {
  // formatHlper added here as a safe check and not get the errors of invalid requests because it annoys me i dont think it would be an issue to perform a faulty request
  // but it helps it acts as a loader because the useQuery is initialized the moment he types the faulty categroy so when he navigates back to products the request would already be finalized

  return useQuery({
    ...filterOptionsConfig,
    queryKey: formatHelper["category"](category)
      ? ["subcategories", category]
      : ["subcategories"],
    queryFn: () => {
      // didnt use queryKey because categories migth not be there
      return getSubcategories(formatHelper["category"](category));
    },
  });
};
