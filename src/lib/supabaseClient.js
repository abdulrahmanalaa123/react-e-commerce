import { createClient } from "@supabase/supabase-js";
import { customStorageObject } from "../objects/customAuthStorageObject";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseURL, supabaseKey, {
  auth: { storage: customStorageObject },
});
