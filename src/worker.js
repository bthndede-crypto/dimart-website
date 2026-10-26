// www → kök alan adı ve http → https kalıcı yönlendirme; geri kalan her şey statik dosyalardan.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.dimartmimarlik.com" || (url.protocol === "http:" && url.hostname === "dimartmimarlik.com")) {
      url.hostname = "dimartmimarlik.com";
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
