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
    useUserStore
      .getState()
      .setUserData({ metaData: data["user"]["user_metadata"] });
    // temporary solution for adding cartId
    await getCart();
  }
  return { error };
}
