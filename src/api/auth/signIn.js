import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";

export default async function signIn(signInObject) {
  const { data, error } = await supabase.auth.signInWithPassword(signInObject);
  if (!error) {
    useUserStore
      .getState()
      .setUserData({ metaData: data["user"]["user_metadata"] });
  }
  // return error anyway which is empty to not break destructuring
  return { error };
}
