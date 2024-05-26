import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";
import getCart from "../cart/getCart";

export default async function signIn(signInObject) {
  const { data, error } = await supabase.auth.signInWithPassword(signInObject);

  if (!error) {
    console.log(data);
    useUserStore
      .getState()
      .setUserData({ metaData: data["user"]["user_metadata"] });
    // temporary solution for adding cartId
    await getCart();
  }
  // return error anyway which is empty to not break destructuring
  return { error };
}
