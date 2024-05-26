import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { productFetchingConfig } from "../../lib/react-query";

async function getCartItems(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("cart_id,product_id,product_combination_id,qty")
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  } else {
    console.log(data);
    // data formatter
    return data.map((item) => {
      if (item.product_id !== null) {
        return {
          cartId: item.cart_id,
          qty: item.qty,
          product_id: item.product_id,
        };
      } else {
        return {
          cartId: item.cart_id,
          qty: item.qty,
          product_combination_id: item.product_combination_id,
        };
      }
    });
  }
}

export const useCartItems = (cartId) => {
  return useQuery({
    queryKey: ["cart", { cart_id: cartId }],
    queryFn: () => getCartItems(cartId),
    ...productFetchingConfig,
  });
};
export default getCartItems;
