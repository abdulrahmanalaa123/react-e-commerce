import { supabase } from "../../lib/supabaseClient";

async function getCart() {
  let { data: cartId, error: cartError } = await supabase.rpc(
    "get_or_create_cart"
  );

  if (cartError) {
    throw cartError;
  } else {
    return cartId;
  }
}

export default getCart;
