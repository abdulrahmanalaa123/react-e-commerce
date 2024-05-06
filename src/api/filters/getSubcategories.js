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
