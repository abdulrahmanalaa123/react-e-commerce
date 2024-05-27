import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";

export default async function signOut() {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (!error) {
    useUserStore.getState().deleteUserData();
  }

  return { error };
}
