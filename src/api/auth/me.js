import { supabase } from "../../lib/supabaseClient";

async function me() {
  const { data, error } = await supabase.auth.getSession();
  if (!error) {
    return data.session;
  } else {
    throw error;
  }
}

export default me;
