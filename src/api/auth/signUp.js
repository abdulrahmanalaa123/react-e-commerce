import { supabase } from "../../lib/supabaseClient";

export default async function signUp({ credentials, options }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      ...credentials,
      options: {
        ...options,
      },
    });
    if (error) {
      throw error;
    }
    console.log("data is: ", data);
  } catch (error) {
    console.log("this is the error: ", error);
  }
}
