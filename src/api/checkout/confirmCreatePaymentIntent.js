import { supabase } from "../../lib/supabaseClient";
export default async function confirmCreatePaymentIntent({
  cartData,
  confirmationToken,
  // could be used if stripe faced any errors with creating double payment intents for authorization required payments
  // but there seems to not have any issues
  // paymentIntent,
}) {
  const { data, error } = await supabase.functions.invoke(
    "create_payment_intent",
    {
      body: JSON.stringify({
        confirmationToken: confirmationToken.id,
        items: cartData,
      }),
      method: "POST",
    }
  );

  if (!error) {
    return data;
  } else {
    throw error;
  }
}
