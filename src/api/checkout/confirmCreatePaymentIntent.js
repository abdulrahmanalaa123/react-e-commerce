import { supabase } from "../../lib/supabaseClient";
export default async function confirmCreatePaymentIntent({
  cartData,
  confirmationToken,
}) {
  const { data, error } = await supabase.functions.invoke(
    "create_payment_intent",
    {
      body: JSON.stringify({
        confirmationTokenId: confirmationToken.id,
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
