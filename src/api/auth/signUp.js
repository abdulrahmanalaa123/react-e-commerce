import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signUp({ credentials, options }) {
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        ...options,
      },
    },
  });
  if (!error) {
    userStore
      .getState()
      .setUserData({ metaData: data["user"]["user_metadata"] });
  }
  return { error };
}
