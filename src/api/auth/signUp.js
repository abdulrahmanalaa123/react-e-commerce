import { supabase } from "../../lib/supabaseClient";

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
  userStore.getState().setUserData({ metaData: data["user"]["user_metadata"] });
}
