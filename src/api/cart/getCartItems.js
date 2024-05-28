import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { productFetchingConfig } from "../../lib/react-query";
function dataFormatter(data) {
  return data.map((item) => {
    if (item.product_id !== null) {
      return {
        // might add it if i feel it needed but everything works without it
        // cartId: item.cart_id,
        qty: item.qty,
        product_id: item.product_id,
      };
    } else {
      return {
        // might add it if i feel it needed but everything works without it
        // cartId: item.cart_id,
        qty: item.qty,
        product_combination_id: item.product_combination_id,
      };
    }
  });
}
async function getCartItems(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("cart_id,product_id,product_combination_id,qty")
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  } else {
    console.log(dataFormatter(data));

    return dataFormatter(data);
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
