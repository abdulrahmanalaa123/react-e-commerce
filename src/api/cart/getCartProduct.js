import { queryOptions } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { filterOptionsConfig } from "../../lib/react-query";

async function cartProduct(cartItem) {
  const { data, error } = await supabase.rpc("get_cart_item_details", {
    item: cartItem,
  });
  if (!error) {
    return data;
  } else {
    console.log(error);
  }
}

export const cartItemDetailsQuery = (cartItem) => {
  const { qty, ...item } = cartItem;
  return queryOptions({
    queryKey: ["cart_details", { item }],
    queryFn: () => cartProduct(cartItem),
    ...filterOptionsConfig,
  });
};
