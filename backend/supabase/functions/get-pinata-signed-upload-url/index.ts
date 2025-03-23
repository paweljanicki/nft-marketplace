import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export const corsHeaders = (origin: string): Record<string, string> => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://nft-marketplace-chi-livid.vercel.app",
  ];

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
