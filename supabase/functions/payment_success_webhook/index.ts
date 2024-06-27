// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.5";
import { Stripe } from "./deps.ts";

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
});
Deno.serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw req body rather than the parsed JSON.
  const body = await req.text();
  let receivedEvent;
  try {
    /// <reference types="stripe-event-types" />
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature ?? "",
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET") ?? "",
      undefined
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  // JSON parsing and stringify to remove the type checking errors
  const noneTypedEvent = JSON.parse(JSON.stringify(receivedEvent.data.object));

  const { data: userId, error: userError } = await supabaseClient
    .from("user_data")
    .select("id,stripe_customer_id")
    .eq("stripe_customer_id", noneTypedEvent.customer)
    .single();

  async function order(values: object) {
    const { error } = await supabaseClient.rpc("cart_to_order", {
      order_details: values,
    });
    if (error) {
      return new Response(
        JSON.stringify({
          error: "Unexpected supabase error",
          message: "unexpected error occured try again",
        }),
        {
          status: 400,
        }
      );
    }
  }
  if (!userError) {
    if (userId.id) {
      await order({
        user_id: userId.id,
        payment_method: "credit card",
        shipping_address: noneTypedEvent.shipping,
        order_status: "Success",
      });
    } else {
      return new Response(JSON.stringify({ userError }), {
        status: 401,
      });
    }
  } else {
    return new Response(
      JSON.stringify({
        error: "Unexpected supabase error",
        message: "unexpected error occured try again",
      }),
      {
        status: 400,
      }
    );
  }
  return new Response("ok", {
    status: 200,
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP req:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment_success_webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
