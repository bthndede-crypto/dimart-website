# dimartmimarlik.com

Dimart Mimarlık ve Müteahhitlik A.Ş. web sitesi. Derleme adımı olmayan statik HTML; Cloudflare Workers (statik varlıklar) ile yayınlanır. Site dosyaları `public/` klasöründe; deploy komutu `npx wrangler deploy`.

Sayfalar `tools/build.py` ile üretilir (`python3 tools/build.py`); stil `public/assets/site.css`.
