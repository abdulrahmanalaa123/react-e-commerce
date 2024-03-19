import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    userStore.getState().deleteUserData();
  }

  return { error };
}
