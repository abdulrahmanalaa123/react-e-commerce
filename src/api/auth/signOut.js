import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";
import useUserStore from "../../stores/user";

export default async function signOut() {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (!error) {
    useUserStore.getState().deleteUserData();
    useCartStore.getState().clearCartItems();
  }

  return { error };
}
