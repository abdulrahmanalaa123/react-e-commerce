// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import Stripe from "npm:stripe@^15.2.0";
import { createClient } from "npm:@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2024-04-10",
});

const client = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const { record } = await req.json();
  if (record) {
    const account = await stripe.customers.create({
      name:
        record.raw_user_meta_data.first_name +
        " " +
        record.raw_user_meta_data.last_name,
      email: record.email,
      metadata: {
        stripe_id: record.id,
      },
    });
    console.log(account);
    const { data, error } = await client
      .from("user_data")
      .update({
        stripe_customer_id: account.id,
      })
      .eq("id", record.id)
      .select();
    if (!error) {
      console.log(data);
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify("no user"), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  } else {
    return new Response(JSON.stringify("no user"), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create_stripe_customer' \
    --header 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type:application/json' \
    --data '{"name":"Functions"}'

*/
