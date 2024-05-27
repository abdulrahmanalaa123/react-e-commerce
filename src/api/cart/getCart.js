import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";

async function getCart() {
  let { data: cartId, error: cartError } = await supabase.rpc(
    "get_or_create_cart"
  );

  if (cartError) {
    throw cartError;
  } else {
    console.log("cartId is:", cartId);
    useUserStore.getState().setCartId(cartId);
  }
}

export default getCart;
