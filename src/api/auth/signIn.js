import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";
import syncCart from "../cart/syncCart";

export default async function signIn(signInObject) {
  const { data, error } = await supabase.auth.signInWithPassword(signInObject);

  if (!error) {
    useUserStore.getState().setUserData({ metaData: data.user.user_metadata });
    console.log(useUserStore.getState().userData);
    await syncCart(3);
  }
  // return error anyway which is empty to not break destructuring
  return { error };
}
