export default {
  async fetch(request, env) {
    const res = await fetch(request);

    const newHeaders = new Headers(res.headers);

    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");

    // DEBUG (temporary)
    newHeaders.set("X-Worker-Debug", "active");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders
    });
  }
}