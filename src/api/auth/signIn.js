import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signIn(signInObject) {
  const { data, error } = await supabase.auth.signInWithPassword(signInObject);
  if (error) {
    console.log(error.message);
    return { error };
  }
  userStore.getState().setUserData({ metaData: data["user"]["user_metadata"] });
}
