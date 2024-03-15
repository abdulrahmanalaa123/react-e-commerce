import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    userStore.getState().deleteUserData();
  } catch (error) {
    console.log(error);
  }
}
