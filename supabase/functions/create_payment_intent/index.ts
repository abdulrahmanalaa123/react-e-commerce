// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/v135/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />
import Stripe from "npm:stripe@^15.2.0";
import { manageCors } from "./mangeCors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.5";

type cartItem = {
  description: string;
  image: string;
  name: string;
  price: number;
  qty: number;
  product_id: string | null | undefined;
  product_combination_id: string | null | undefined;
};

function calculateTotalPrice(items: cartItem[]) {
  return items.reduce<number>((acc, currentObject) => {
    // Logic to transform the object
    return acc + currentObject.qty * currentObject.price;
  }, 0);
}

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    const res = manageCors(req);
    return res;
  }

  const { items } = await req.json();

  const total = Number(calculateTotalPrice(items).toFixed(2));
  console.log("total is", total);
  const authHeader = req.headers.get("Authorization")!;
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  const { data: customer_id, error } = await supabaseClient
    .from("user_data")
    .select("id,stripe_customer_id")
    .eq("id", user?.id ?? "")
    .single();

  if (!error && customer_id.stripe_customer_id) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      customer: customer_id?.stripe_customer_id ?? null,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("payment intent is,", paymentIntent);
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": req.headers.get("origin")!,
        },
      }
    );
  } else {
    return new Response("Couldn't find user's stripe account", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": req.headers.get("origin")!,
      },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create_payment_intent' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
