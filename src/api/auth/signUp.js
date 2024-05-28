import { supabase } from "../../lib/supabaseClient";
import useUserStore from "../../stores/user";

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
    useUserStore.getState().setUserData({ metaData: data.user.user_metadata });
    await syncCart(3);
  }
  return { error };
}
