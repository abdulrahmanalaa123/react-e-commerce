import { supabase } from "../../lib/supabaseClient";
export default async function createPaymentIntent(cartData) {
  const { data, error } = await supabase.functions.invoke(
    "create_payment_intent",
    {
      body: JSON.stringify({
        items: cartData,
      }),
      method: "POST",
    }
  );

  if (!error) {
    return data;
  } else {
    console.error(error);
  }
}
