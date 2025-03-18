// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export const corsHeaders = (origin: string): Record<string, string> => {
  const allowedOrigins = ["http://localhost:5173"];

  if (!allowedOrigins.includes(origin)) {
    return {};
  } else {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    };
  }
};

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  console.log("Request received from:", origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  const pinataGateway = Deno.env.get("GATEWAY_URL");
  const pinataJWT = Deno.env.get("PINATA_JWT");

  console.log("Pinata Gateway:", pinataGateway);
  console.log("Pinata JWT:", pinataJWT);

  try {
    const data = JSON.stringify({
      date: new Date().getTime(),
      expires: 30,
    });

    const response = await fetch("https://uploads.pinata.cloud/v3/files/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pinataJWT}`,
      },
      body: data,
    });

    const json = await response.json();

    return new Response(
      JSON.stringify({
        uploadUrl: json.data,
      }),
      {
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      headers: {
        ...corsHeaders(origin),
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-pinata-signed-upload-url' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
