import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// if autoRefreshToken option didnt exist i wouldve saved the token in localStorage
// and the refresh token in the cookies and on any unauthenticated error check if there exists a refresh
// token then refresh the user's token at least thats how i woudl do it
// console.log(Object.keys(localStorage));
// console.log(
//   localStorage.getItem("sb-rgtcbmtvfigwblxievfe-auth-token")
// );
const options = {
  auth: {
    autoRefreshToken: true,
  },
};
export const supabase = createClient(supabaseURL, supabaseKey, options);
