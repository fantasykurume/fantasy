export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    // API
    if (url.pathname === "/api/all") {

      const cache = caches.default;
      const cacheKey = new Request(url.toString(), request);

      let response = await cache.match(cacheKey);

      if (!response) {

        const gas = await fetch(
          `${env.GAS_URL}?action=all`
        );

        if (!gas.ok) {
          return new Response(
            JSON.stringify({
              status: "error",
              message: "GAS Error"
            }),
            {
              status: 500,
              headers: {
                ...corsHeaders(),
                "Content-Type": "application/json"
              }
            }
          );
        }

        response = new Response(await gas.text(), {
          headers: {
            ...corsHeaders(),
            "Content-Type": "application/json",
            "Cache-Control": "public,max-age=300"
          }
        });

        // 5分キャッシュ
        await cache.put(cacheKey, response.clone());

      }

      return response;

    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders()
    });

  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}