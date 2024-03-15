import { supabase } from "../../lib/supabaseClient";

export default async function getUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    console.log(user);
  } catch (error) {
    console.log(error.code);
    console.log(error.msg);
  }
}
