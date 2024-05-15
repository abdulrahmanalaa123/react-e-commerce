import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export async function getProductByVariation({ productId, variationString }) {
  const query = supabase.from("products_combinations").select(
    // reviews will be added as a tabnle and be joined with the products table
    "price,combination_string,stock,featured,unique_id,...products!inner(id,baseImage:featured_image,name,discount,description,...subcategories!inner(category))"
  );
  if (variationString) {
    query.eq("unique_id", variationString);
  } else {
    query.eq("products.id", productId);
    query.eq("featured", true);
  }
  const { data, error } = await query;
  if (!error) {
    console.log(data);
    if (data.length) {
      return data[0];
    } else {
      return await getBasicProduct(productId);
    }
  } else {
    throw error;
  }
}

export const useProduct = ({ productId, queryObj }) => {
  return useQuery(productQuery({ productId, queryObj }));
};

export const productQuery = ({ productId, queryObj }) => {
  let variationString = "";
  if (Object.keys(queryObj).length > 0) {
    variationString = [...Object.values(queryObj), productId]
      .join("")
      .toLowerCase()
      .split("")
      .sort()
      .join("")
      .replaceAll("-", "");
  }

  return {
    queryKey: [
      "product",
      { ...(variationString && { variationString }), productId },
    ],
    queryFn: ({ queryKey }) => {
      return getProductByVariation(queryKey[1]);
    },
  };
};

async function getBasicProduct(productId) {
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
