import { supabase } from "../../lib/supabaseClient";

export default async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return { error };
  }
  console.log(user);
}
