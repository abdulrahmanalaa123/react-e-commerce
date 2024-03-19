import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";

export default async function signUp({ credentials, options }) {
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      ...options,
    },
  });
  if (error) {
    return { error };
  }
  console.log(data);
  userStore.getState().setUserData({ metaData: data["user"]["user_metadata"] });
}
