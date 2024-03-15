import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signIn(signInObject) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(
      signInObject
    );
    if (error) {
      throw error;
    }
    userStore
      .getState()
      .setUserData({ metaData: data["user"]["user_metadata"] });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
