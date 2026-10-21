"""Sayfaları ortak başlık/altlık ile public/ altına üretir: python3 tools/build.py"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from blog import YAZILAR  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent / "public"
SITE = "https://dimartmimarlik.com"

FIRMA = {
    "unvan": "Dimart Mimarlık ve Müteahhitlik A.Ş.",
    "adres": "Eyüp Sultan Mah. Elmaksan Sk. No:14",
    "ilce": "Sancaktepe",
    "il": "İstanbul",
    "pk": "34654",
    "tel": "+90 532 499 60 96",
    "tel_link": "+905324996096",
    "eposta": "info@dimartmimarlik.com",
}
INSTAGRAM = "https://www.instagram.com/dimartmimarlik/"
HARITA = "https://www.google.com/maps/search/?api=1&query=Elmaksan+Sk.+No%3A14+Sancaktepe+%C4%B0stanbul"

NAV = [("studyo", "Stüdyo"), ("hizmetler", "Hizmetler"), ("projeler", "Projeler"), ("iletisim", "İletişim")]

ORG = {
    "@type": ["GeneralContractor", "ProfessionalService"],
    "@id": f"{SITE}/#firma",
    "name": FIRMA["unvan"],
    "alternateName": "Dimart Mimarlık",
    "slogan": "Her şey bir çizgiyle başlar.",
    "description": "İstanbul merkezli mimarlık ve müteahhitlik firması. Mimari tasarım, iç mimarlık, villa ve konut inşaatı, tadilat ve renovasyon, proje ve ruhsat, anahtar teslim uygulama.",
    "url": f"{SITE}/",
    "logo": f"{SITE}/assets/dimart-logo-siyah.svg",
    "image": f"{SITE}/assets/dimart-favicon-512.png",
    "email": FIRMA["eposta"],
    "telephone": FIRMA["tel_link"],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": FIRMA["adres"],
        "addressLocality": FIRMA["ilce"],
        "addressRegion": FIRMA["il"],
        "postalCode": FIRMA["pk"],
        "addressCountry": "TR",
    },
    "hasMap": HARITA,
    "sameAs": [INSTAGRAM],
    "areaServed": {"@type": "Country", "name": "Türkiye"},
    "knowsAbout": ["Mimari tasarım", "İç mimarlık", "Mimari proje", "İnşaat ruhsatı", "Konut inşaatı",
                   "Villa inşaatı", "Müstakil ev inşaatı", "Anahtar teslim inşaat", "Tadilat ve renovasyon",
                   "Ev ve daire tadilatı", "Mutfak ve banyo yenileme", "Ofis iç mimarisi",
                   "Mağaza, kafe ve restoran tasarımı", "Cephe yenileme"],
}

HIZMETLER = [
    ("MİM", "Mimari tasarım", "mimari-tasarim",
     "İhtiyaç analizi, konsept, avan proje ve 3B görselleştirme.",
     "Arsanın ya da mevcut yapının imkânlarını okuyarak işe başlarız. Yaşayacak ya da çalışacak kişilerin günlük akışını, bütçeyi ve imar koşullarını aynı masada değerlendirip konsepti ve avan projeyi birlikte şekillendiririz.",
     ["İhtiyaç programı", "İmar ve yerinde analiz", "Konsept tasarım", "Avan proje", "3B görselleştirme", "Malzeme ve renk kurgusu"]),
    ("İÇM", "İç mimarlık", "ic-mimarlik",
     "Konut, ofis ve ticari mekânlarda iç mekân tasarımı ve uygulaması.",
     "Mekânın ışığını, dokusunu ve kullanımını tek bir çizgide toplarız. Planlamadan mobilya tasarımına, aydınlatmadan malzeme seçimine kadar her kararı uygulama detayıyla birlikte veririz; çizdiğimiz her şeyi kendi ekibimizle uygularız.",
     ["Mekân planlama", "Özel mobilya tasarımı", "Aydınlatma kurgusu", "Malzeme seçimi", "Uygulama detayları", "Tadilat ve renovasyon"]),
    ("PRJ", "Proje ve ruhsat", "proje-ve-ruhsat",
     "Uygulama projeleri, disiplinler arası koordinasyon ve belediye ruhsat süreçleri.",
     "Mimari uygulama projesini statik, mekanik ve elektrik projeleriyle koordine ederek hazırlarız. Belediye başvurusundan ruhsatın alınmasına kadar süreci takip ederiz.",
     ["Mimari uygulama projesi", "Statik ve tesisat koordinasyonu", "Ruhsat dosyası", "Belediye süreç takibi", "Yapı denetim koordinasyonu", "İskân süreci"]),
    ("İNŞ", "İnşaat ve anahtar teslim", "insaat-anahtar-teslim",
     "Kaba ve ince inşaat, şantiye yönetimi, tek sözleşmeyle anahtar teslim.",
     "Çizimi yapan ekip şantiyeyi de yönetir. Tasarım ile uygulama arasında bilgi kaybı olmaz; takvim, bütçe ve kalite tek muhataptan takip edilir. İsterseniz tasarımdan iskâna kadar tüm işi tek sözleşmeyle üstleniriz.",
     ["Kaba inşaat", "İnce işler", "Şantiye yönetimi", "İş güvenliği", "Kalite kontrol", "Anahtar teslim"]),
]

# Uzmanlık alanları: aranan işler, sade dille (hizmetler sayfası + şema)
ALANLAR = [
    ("Villa ve müstakil ev inşaatı",
     "Arsadan anahtara: tasarım, ruhsat, kaba ve ince inşaat tek sözleşmede. Bahçe, havuz ve peyzaj dahil edilebilir."),
    ("Konut ve apartman projeleri",
     "Apartman ve küçük ölçekli konut projelerinde mimari proje, ruhsat ve uygulama."),
    ("Ev ve daire tadilatı",
     "Komple daire yenileme ve renovasyon: tesisat, elektrik, zemin, kapı ve doğramalar tek planla."),
    ("Mutfak ve banyo yenileme",
     "Islak hacimlerde yalıtım ve tesisat yenileme, ölçüye özel dolap ve tezgâh, kaplama ve vitrifiye seçimi."),
    ("Ofis iç mimarisi",
     "Çalışma düzeni, toplantı alanları, akustik ve aydınlatma; markanıza uygun, verimli ofisler."),
    ("Mağaza, kafe ve restoran tasarımı",
     "Ticari mekânlarda konsept, uygulama projesi ve kısa takvimli anahtar teslim uygulama."),
    ("Cephe ve dış mekân",
     "Cephe yenileme ve yalıtım, teras, bahçe ve giriş düzenlemeleri."),
]

SSS = [
    ("Dimart Mimarlık hangi hizmetleri veriyor?",
     "Mimari tasarım, iç mimarlık, proje ve ruhsat süreçleri, inşaat ve anahtar teslim uygulama. Tasarımdan teslime kadar tüm süreci tek ekip yürütür."),
    ("Dimart Mimarlık nerede?",
     "Ofisimiz İstanbul'dadır. Açık adres ve yol tarifi için İletişim sayfasına bakabilirsiniz; keşif ve şantiye yönetimi için projenin bulunduğu yere geliyoruz."),
    ("Villa ve müstakil ev inşaatı yapıyor musunuz?",
     "Evet. Villa ve müstakil ev projelerinde tasarımdan ruhsata, kaba inşaattan ince işlere kadar tüm süreci anahtar teslim olarak üstleniyoruz."),
    ("Ev ve daire tadilatı yapıyor musunuz?",
     "Evet. Komple daire yenileme, mutfak ve banyo yenileme ile tesisat ve zemin yenileme gibi tadilat ve renovasyon işlerini proje ve bütçe planıyla yürütüyoruz."),
    ("Sadece iç mimarlık hizmeti alabilir miyim?",
     "Evet. İç mimari tasarım ve uygulama projesini ayrı bir hizmet olarak da veriyoruz; isterseniz uygulamayı da kendi ekibimizle yaparız."),
    ("Tasarım ve inşaatı aynı firmaya yaptırmanın avantajı nedir?",
     "Çizimi yapan ekip uygulamayı da yürüttüğü için proje ile şantiye arasında bilgi kaybı olmaz; karar, takvim ve maliyet tek muhataptan takip edilir."),
    ("Bir projeye nasıl başlıyoruz?",
     "Önce yerinde keşif yapar, ihtiyacınızı ve bütçenizi dinleriz. Ardından kapsamı, süreci ve takvimi içeren bir öneri hazırlarız."),
    ("Dimart Mimarlık'a nasıl ulaşırım?",
     "+90 532 499 60 96 numaralı telefondan veya info@dimartmimarlik.com adresinden ulaşabilirsiniz."),
]

SUREC = [
    ("Keşif", "Arsa ya da mekânı yerinde görür, ihtiyacı ve bütçeyi netleştiririz."),
    ("Tasarım", "Konsepti ve avan projeyi birlikte şekillendiririz."),
    ("Proje ve ruhsat", "Uygulama projelerini hazırlar, izinleri alırız."),
    ("Uygulama", "Şantiyeyi kurar, işi takvime ve bütçeye göre yürütürüz."),
    ("Teslim", "Kontrolleri yapar, anahtarı ve belgeleri teslim ederiz."),
]

# Fotoğraflar gelene kadar yer tutucu: (malzeme, tür, hizmet)
PROJELER = [
    ("traverten", "Konut", "İç mimarlık"),
    ("siva", "Villa", "Anahtar teslim"),
    ("mese", "Ofis", "İç mimarlık"),
    ("kagit", "Konut", "Mimari tasarım ve inşaat"),
]



# Her hizmet için ince çizgili bir çizim ve malzeme dokusu: slug -> (malzeme, altyazı, çizim adı, svg)
CIZIMLER = {
    "mimari-tasarim": ("kagit", "Ön cephe · 1:100", "İki katlı bir konutun cephe çizimi", """
      <path pathLength="1" class="ln" d="M24 420 H376"/>
      <path pathLength="1" class="ln" d="M60 420 V270 H240 V420"/>
      <path pathLength="1" class="ln" d="M120 270 V160 H350 V270 H240"/>
      <path pathLength="1" class="ln" d="M330 270 V420"/>
      <path pathLength="1" class="ln" d="M150 186 H322 V244 H150 Z"/>
      <path pathLength="1" class="ln" d="M85 300 H150 V380 H85 Z M180 420 V318 H216 V420"/>
      <path pathLength="1" class="ln t" d="M207 186 V244 M265 186 V244 M117.5 300 V380"/>
      <path pathLength="1" class="ln t" d="M38 160 V420 M33 160 H43 M33 420 H43 M60 446 H350 M60 441 V451 M350 441 V451"/>
      <rect class="sq" x="116" y="156" width="8" height="8"/>
      <text x="205" y="468" text-anchor="middle">11.60</text>""", "0 0 400 500"),
    "ic-mimarlik": ("siva", "İç mekân · perspektif", "Kemerli açıklığı olan sade bir iç mekânın perspektif çizimi", """
      <path pathLength="1" class="ln" d="M110 150 H290 V330 H110 Z"/>
      <path pathLength="1" class="ln" d="M110 150 L10 40 M290 150 L390 40 M110 330 L10 470 M290 330 L390 470"/>
      <path pathLength="1" class="ln" d="M170 330 V235 A30 30 0 0 1 230 235 V330"/>
      <path pathLength="1" class="ln" d="M40 135 L82 160 L82 268 L40 298 Z"/>
      <path pathLength="1" class="ln t" d="M61 147 V283 M40 216 L82 214"/>
      <path pathLength="1" class="ln" d="M125 330 V306 H160 V330 M240 330 V306 H275 V330"/>
      <path pathLength="1" class="ln t" d="M150 330 L76 470 M180 330 L160 470 M220 330 L240 470 M250 330 L324 470"/>
      <path pathLength="1" class="ln t" d="M200 150 V196"/>
      <circle pathLength="1" class="ln" cx="200" cy="204" r="8"/>
      <rect class="sq" x="196" y="296" width="8" height="8"/>""", "0 0 400 500"),
    "proje-ve-ruhsat": ("beton", "Zemin kat planı · 1:50", "Bir konutun zemin kat plan çizimi", """
      <path pathLength="1" class="ln" d="M40 50 H360 V450 H40 Z"/>
      <path pathLength="1" class="ln t" d="M48 58 H352 V442 H48 Z"/>
      <path pathLength="1" class="ln" d="M200 50 V170 M200 220 V290 H260 M310 290 H360"/>
      <path pathLength="1" class="ln" d="M40 290 H140 M190 290 H200"/>
      <path pathLength="1" class="ln t" d="M200 170 A50 50 0 0 1 250 220 M140 290 A50 50 0 0 0 190 340 M260 290 A50 50 0 0 1 310 340"/>
      <path pathLength="1" class="ln t" d="M90 50 V42 M150 50 V42 M260 50 V42 M320 50 V42 M40 470 H360 M40 465 V475 M360 465 V475"/>
      <path pathLength="1" class="ln t" d="M230 340 H340 V430 H230 Z M240 350 H330 M240 360 H330 M240 370 H330 M240 380 H330 M240 390 H330 M240 400 H330 M240 410 H330 M240 420 H330"/>
      <rect class="sq" x="96" y="166" width="8" height="8"/>
      <text x="200" y="492" text-anchor="middle">9.20</text>""", "0 0 400 500"),
    "insaat-anahtar-teslim": ("mese", "Kesit A-A · 1:100", "Döşeme, kolon ve merdiveni gösteren bir yapı kesiti", """
      <path pathLength="1" class="ln" d="M20 400 H380"/>
      <path pathLength="1" class="ln t" d="M40 400 L60 420 M80 400 L100 420 M120 400 L140 420 M160 400 L180 420 M200 400 L220 420 M240 400 L260 420 M280 400 L300 420 M320 400 L340 420"/>
      <path pathLength="1" class="ln" d="M50 392 H350 V400 M50 392 V400 M50 282 H350 V292 H50 Z M50 172 H350 V182 H50 Z M40 62 H360 V72 H40 Z"/>
      <path pathLength="1" class="ln" d="M70 392 V292 M84 392 V292 M316 392 V292 M330 392 V292 M70 282 V182 M84 282 V182 M316 282 V182 M330 282 V182 M70 172 V72 M84 172 V72 M316 172 V72 M330 172 V72"/>
      <path pathLength="1" class="ln t" d="M150 392 L250 292 M150 392 V382 H160 V372 H170 V362 H180 V352 H190 V342 H200 V332 H210 V322 H220 V312 H230 V302 H240 V292"/>
      <path pathLength="1" class="ln t" d="M120 202 H270 V262 H120 Z M195 202 V262 M120 92 H270 V152 H120 Z M195 92 V152"/>
      <path pathLength="1" class="ln t" d="M40 62 V44 H360 V62"/>
      <rect class="sq" x="73" y="62" width="8" height="8"/>
      <text x="364" y="290">+3.00</text>""", "0 0 400 500"),
}


def _aks(boxes, extra):
    """Basit aksonometrik çizim: görünen kenarlar + yüzeyde çizgiler."""
    import math
    c30, s30, k = math.cos(math.radians(30)), .5, 17

    def P(x, y, z):
        return f"{200 + (x - y) * c30 * k:.1f} {265 + (x + y) * s30 * k - z * k:.1f}"
    out = []
    for x0, x1, y0, y1, z0, z1 in boxes:
        d = (f"M{P(x0,y0,z1)} L{P(x1,y0,z1)} L{P(x1,y1,z1)} L{P(x0,y1,z1)} Z "
             f"M{P(x1,y0,z1)} L{P(x1,y0,z0)} L{P(x1,y1,z0)} L{P(x0,y1,z0)} L{P(x0,y1,z1)} "
             f"M{P(x1,y1,z1)} L{P(x1,y1,z0)}")
        out.append(f'<path pathLength="1" class="ln" d="{d}"/>')
    for cls, pts in extra:
        out.append(f'<path pathLength="1" class="ln{cls}" d="' + " ".join(
            ("M" if i == 0 else "L") + P(*q) for i, q in enumerate(pts)) + '"/>')
    return "\n      " + "\n      ".join(out)


ESKIZ = _aks(
    [(0, 10, 0, 6, 0, 3.2), (-2, 7, 1, 7, 3.2, 6.2)],
    [(" t", [(-2, 7, 4), (7, 7, 4)]), (" t", [(-2, 7, 5.6), (7, 7, 5.6)]),
     (" t", [(1, 7, 4), (1, 7, 5.6)]), (" t", [(4, 7, 4), (4, 7, 5.6)]),
     ("", [(10, 2, 0), (10, 2, 2.4), (10, 3.6, 2.4), (10, 3.6, 0)]),
     (" t", [(10, 4.4, .8), (10, 4.4, 2.4), (10, 5.6, 2.4), (10, 5.6, .8), (10, 4.4, .8)]),
     (" t", [(11.5, -1, 0), (11.5, 8.5, 0)]), (" t", [(-3, 8.5, 0), (11.5, 8.5, 0)])])


CIZIMLER["eskiz"] = ("traverten", "Eskiz · aksonometri", "Konsol üst katlı bir konutun aksonometrik eskizi",
                      ESKIZ + '\n      <rect class="sq" x="255" y="343" width="8" height="8"/>', "0 0 400 500")


def esc_attr(t):
    return t.replace('"', "&quot;")


def head(title, desc, path, ld, page):
    url = f"{SITE}/{path}"
    return f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{esc_attr(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Dimart Mimarlık">
<meta property="og:title" content="{esc_attr(title)}">
<meta property="og:description" content="{esc_attr(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/dimart-favicon-512.png">
<meta name="msvalidate.01" content="7CF4CEBF4ED658A86E675507A2B6D623">
<meta name="theme-color" content="#100E0C">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/assets/dimart-favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/dimart-favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/montserrat-latin-2f5adf.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts/fonts.css">
<link rel="stylesheet" href="/assets/site.css">
<script>try{{if(!sessionStorage.getItem('dm-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}}catch(e){{}}</script>
<script src="/assets/site.js" defer></script>
<script src="/assets/cizim.js" defer></script>
<script type="application/ld+json" id="ld">
{json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False, indent=1)}
</script>
</head>
<body>
<a class="skip" href="#sayfa">İçeriğe geç</a>
<div class="intro-ov" role="dialog" aria-label="Dimart Mimarlık">
  <div class="intro-in">
    <img src="/assets/dimart-logo-beyaz.svg" alt="" width="176" height="60">
    <i class="intro-line"></i>
    <img class="intro-slogan" src="/assets/slogan-acik.png" alt="" width="260" height="51">
    <p class="intro-gir"><button type="button" class="intro-ses"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Müzikle girin</button><button type="button" class="intro-sessiz">Sessiz girin</button></p>
  </div>
</div>
""" + shell(path) + f"""
<main id="sayfa" data-page="{page}">
"""


MENU = [("/studyo/", "Stüdyo", "Yaklaşım ve ekip", "ic-mimarlik"),
        ("/hizmetler/", "Hizmetler", "Tasarımdan anahtar teslime", "eskiz"),
        ("/projeler/", "Projeler", "Seçili işler", "insaat-anahtar-teslim"),
        ("/blog/", "Blog", "Rehberler ve notlar", "proje-ve-ruhsat"),
        ("/cizim-masasi/", "Çizim masası", "Planınızı çizin", "eskiz"),
        ("/iletisim/", "İletişim", "Projenizi konuşalım", "mimari-tasarim")]


def shell(path):
    cur = "/" + path
    f = FIRMA
    items = "\n".join(
        f'''      <li><a href="{href}" data-i="{i}"{' aria-current="page"' if cur.startswith(href) else ''}><span class="n">0{i + 1}</span><span class="t">{name}</span><small>{sub}</small></a></li>'''
        for i, (href, name, sub, _) in enumerate(MENU))
    previews = "\n".join(frame(cz, f"pv pv{i}", decor=True) for i, (*_, cz) in enumerate(MENU))
    return f"""<header class="top" id="top">
  <a class="brand" href="/" aria-label="Dimart Mimarlık ana sayfa"><img src="/assets/dimart-logo-beyaz.svg" alt="Dimart Mimarlık" width="96" height="33"></a>
  <p class="top-loc" aria-hidden="true">İstanbul</p>
  <div class="util" role="group" aria-label="Eskiz ve müzik">
    <button type="button" id="eskiz-btn" aria-pressed="false" title="Eskiz: imleçle sayfanın üstüne çizin">Eskiz</button>
    <button type="button" id="ses-btn" aria-pressed="false" aria-label="Müzik" title="Müziği aç ya da kapat"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="ses-t" aria-hidden="true"><span>Müzik açık</span><span>Müzik kapalı</span></span></button>
  </div>
  <a class="go top-cta" href="/iletisim/">Projenizi konuşalım</a>
  <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav"><span class="mb-t"><span>Menü</span><span>Kapat</span></span><span class="mb-i" aria-hidden="true"><i></i><i></i></span></button>
  <i class="top-bar" aria-hidden="true"></i>
</header>
<nav class="nav" id="nav" aria-label="Ana menü">
  <ol class="nav-list">
{items}
  </ol>
  <div class="nav-pv" aria-hidden="true">
{previews}
  </div>
  <div class="nav-foot">
    <a href="tel:{f['tel_link']}">{f['tel']}</a>
    <a href="mailto:{f['eposta']}">{f['eposta']}</a>
    <a href="{INSTAGRAM}" rel="noopener me" target="_blank">Instagram</a>
    <span>{f['il']}</span>
    <img src="/assets/slogan-acik.png" alt="" width="170" height="33">
  </div>
</nav>"""


def footer():
    f = FIRMA
    return f"""<footer class="foot">
  <div class="foot-cta" data-r>
    <p class="label">İletişim</p>
    <p class="foot-big"><a href="/iletisim/">Projenizi <span class="y">konuşalım.</span></a></p>
  </div>
  <dl class="meta foot-nap">
    <div><dt>telefon</dt><dd><a href="tel:{f['tel_link']}">{f['tel']}</a></dd></div>
    <div><dt>e-posta</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
    <div><dt>ofis</dt><dd>{f['il']}</dd></div>
    <div><dt>harita</dt><dd><a href="{HARITA}" rel="noopener" target="_blank">Google Haritalar'da aç</a></dd></div>
    <div><dt>instagram</dt><dd><a href="{INSTAGRAM}" rel="noopener me" target="_blank">@dimartmimarlik</a></dd></div>
  </dl>
  <nav class="foot-nav" aria-label="Alt menü">{"".join(f'<a href="{h}">{n}</a>' for h, n, *_ in MENU)}</nav>
  <div class="legal">
    <span>© 2026 {f['unvan']}</span>
    <span>Mimarlık · İç mimarlık · İnşaat · {f['il']}</span>
    <span><a href="/kvkk/">KVKK ve gizlilik</a></span>
    <span>Müzik: Erik Satie, <i>Gymnopédies</i> · yorum <a href="https://archive.org/details/satie-gnossienne-gymnopedie" rel="noopener" target="_blank">Gregory Tait</a> · <a href="https://creativecommons.org/licenses/by/4.0/deed.tr" rel="noopener license" target="_blank">CC BY 4.0</a></span>
  </div>
</footer>
</main>
</body>
</html>
"""


def crumbs_ld(items):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": f"{SITE}/{p}"} for i, (n, p) in enumerate(items)]}


def faq_ld(qs):
    return {"@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qs]}


def faq_html(qs):
    return "\n".join(f"      <details data-r><summary>{q}</summary><p>{a}</p></details>" for q, a in qs)


def words(text):
    """Cümleyi kelime kelime beliren span'lere böler (metin aynen HTML'de kalır)."""
    return " ".join(f'<span class="w" style="--i:{i}">{w}</span>' for i, w in enumerate(text.split()))


def frame(slug, cls="", speed=None, decor=False):
    mat, cap, alt, svg, vb = CIZIMLER[slug]
    sp = f' data-speed="{speed}"' if speed else ""
    a11y = 'aria-hidden="true"' if decor else f'role="img" aria-label="{alt}"'
    return f"""<figure class="frame m-{mat} {cls}"{sp}{'' if decor else ' data-r'}>
        <svg viewBox="{vb}" {a11y}>{svg}
        </svg>
        <figcaption>{cap}</figcaption>
      </figure>"""


def crumbs(name):
    return f'<nav class="crumbs" aria-label="Konum"><a href="/">Ana sayfa</a><span>/</span><span>{name}</span></nav>'


def page_home():
    ld = [ORG, {"@type": "WebSite", "@id": f"{SITE}/#site", "url": f"{SITE}/", "name": "Dimart Mimarlık",
                "inLanguage": "tr-TR", "publisher": {"@id": f"{SITE}/#firma"}}, faq_ld(SSS)]
    pieces = "\n".join(f"""    <a class="piece p{i + 1}" href="/hizmetler/#{slug}" data-cursor="İncele">
      {frame(slug, speed=("0.08" if i % 2 else "-0.05"))}
      <div class="cap" data-r><h3>{ad.lower()}</h3><small>{kisa}</small></div>
    </a>""" for i, (code, ad, slug, kisa, *_) in enumerate(HIZMETLER))
    steps = "\n".join(f'      <li data-r style="--d:{i}"><span class="n">0{i + 1}</span><h3>{a}</h3><p>{b}</p></li>'
                      for i, (a, b) in enumerate(SUREC))
    return head("Dimart Mimarlık | İstanbul mimarlık ofisi, iç mimarlık ve anahtar teslim inşaat",
                "İstanbul'da mimarlık ve müteahhitlik: mimari tasarım, iç mimarlık, villa ve konut inşaatı, tadilat ve renovasyon, proje ve ruhsat, anahtar teslim uygulama. Dimart'ta hepsi tek ekipten.",
                "", ld, "home") + f"""  <section class="hero">
    {frame("eskiz", "hero-frame", "0.06")}
    <div class="hero-text" data-r>
      <p class="label">Mimarlık &amp; müteahhitlik · İstanbul</p>
      <h1>Tasarımdan anahtar teslime <span class="y">tek çizgi.</span></h1>
      <p class="lead">Dimart, İstanbul'daki ekibiyle villa, konut, ofis ve ticari mekânları tasarlar, projelendirir ve inşa eder. Çizimi yapan ekip şantiyeyi de yönetir; siz tek muhatapla çalışırsınız.</p>
      <p class="links"><a class="go" href="/iletisim/">Projenizi konuşalım</a><a class="go" href="/hizmetler/">Hizmetler</a></p>
    </div>
    <p class="cue" aria-hidden="true">kaydırın</p>
  </section>

  <section class="works" aria-labelledby="calismalar">
    <h2 class="label" id="calismalar" data-r>Hizmetler · çizimden yapıya</h2>
{pieces}
  </section>

  <section class="say" aria-labelledby="yaklasim">
    <h2 class="label" id="yaklasim" data-r>Yaklaşım</h2>
    <p class="statement" data-r>{words("Her yapı bir çizgiyle başlar. Biz o çizgiyi ilk eskizden son anahtara kadar elden bırakmıyoruz.")}</p>
    <dl class="meta facts" data-r>
      <div><dt>disiplin</dt><dd>Mimarlık, iç mimarlık, inşaat</dd></div>
      <div><dt>model</dt><dd>Tek ekip, tek sözleşme</dd></div>
      <div><dt>yapılar</dt><dd>Villa, konut, ofis, ticari mekân</dd></div>
      <div><dt>ofis</dt><dd>İstanbul</dd></div>
    </dl>
  </section>

  <section class="process" aria-labelledby="surec">
    <div class="sec-head" data-r><h2 class="label" id="surec">Süreç</h2><p class="h">Beş adımda teslim</p></div>
    <ol class="steps">
      <i class="steps-line" aria-hidden="true"></i>
{steps}
    </ol>
  </section>

  <section class="blog-list home-blog" aria-labelledby="notlar">
    <div class="sec-head" data-r><h2 class="label" id="notlar">Blog</h2><p class="h">Karar vermeden önce okuyun</p></div>
    <ol>
{yazi_listesi(YAZILAR[:3])}
    </ol>
    <p class="links" data-r><a class="go" href="/blog/">Tüm yazılar</a></p>
  </section>

  <section class="qa" aria-labelledby="sss">
    <div class="sec-head" data-r><h2 class="label" id="sss">Sık sorulan sorular</h2><p class="h">Merak edilenler</p></div>
    <div class="faq">
{faq_html(SSS)}
    </div>
  </section>
""" + footer()


def page_studyo():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Stüdyo", "studyo/")]),
          {"@type": "AboutPage", "url": f"{SITE}/studyo/", "about": {"@id": f"{SITE}/#firma"}}]
    f = FIRMA
    return head("Stüdyo: İstanbul'da mimarlık ve müteahhitlik firması | Dimart Mimarlık",
                "Dimart Mimarlık ve Müteahhitlik A.Ş. hakkında: tasarım, proje, ruhsat ve inşaatı tek ekipte birleştiren İstanbul merkezli mimarlık ofisi. Yaklaşımımız ve çalışma biçimimiz.",
                "studyo/", ld, "studyo") + f"""  <section class="page-hero">
    {crumbs("Stüdyo")}
    <h1 data-r>Çizen de, <span class="y">inşa eden de biziz.</span></h1>
    <p class="lead" data-r>Dimart Mimarlık ve Müteahhitlik, mimari tasarım, iç mimarlık ve inşaatı tek ekipte birleştiren, İstanbul merkezli bir mimarlık ve müteahhitlik stüdyosudur.</p>
  </section>
  <section class="split">
    {frame("ic-mimarlik", "", "0.05")}
    <div class="prose" data-r>
      <p class="statement sm">{words("İyi bir mekân, kâğıttaki çizgi ile şantiyedeki duvar aynı elden çıktığında olur.")}</p>
      <p>Birçok projede tasarım bir ofiste, uygulama başka bir firmada yapılır. Aradaki boşlukta detaylar kaybolur, maliyetler sapar, karar verme yükü size kalır.</p>
      <p>Biz bu boşluğu kapatmak için kurulduk. <strong>Tasarım, proje, ruhsat ve inşaatı aynı ekiple yürütüyoruz.</strong> Çizdiğimiz her detayın sahada nasıl yapılacağını bilerek çiziyor, sahada karşılaştığımız her durumu tasarımın diliyle çözüyoruz.</p>
      <p>Sıcak, sade ve uzun ömürlü mekânlar seviyoruz: doğru oranlar, dürüst malzemeler, iyi ışık.</p>
    </div>
  </section>
  <section class="split rev" aria-labelledby="bolge">
    <div data-r><h2 class="label" id="bolge">Çalışma biçimi</h2><p class="h">Ofiste çizer, sahada yaparız</p></div>
    <dl class="meta reg" data-r>
      <div><dt>ofis</dt><dd>{f['adres']}, {f['pk']} {f['ilce']} / {f['il']}</dd></div>
      <div><dt>yapı türleri</dt><dd>Villa, müstakil ev, konut, ofis, ticari ve turizm yapıları</dd></div>
      <div><dt>çalışma biçimi</dt><dd>Keşif ve şantiye yönetimi yerinde, tasarım ve koordinasyon İstanbul ofisinde</dd></div>
    </dl>
  </section>
""" + footer()


def page_hizmetler():
    svc_ld = [{"@type": "Service", "@id": f"{SITE}/hizmetler/#{slug}", "name": ad, "description": uzun,
               "provider": {"@id": f"{SITE}/#firma"}, "areaServed": {"@type": "Country", "name": "Türkiye"}}
              for code, ad, slug, kisa, uzun, _ in HIZMETLER]
    katalog = {"@type": "OfferCatalog", "@id": f"{SITE}/hizmetler/#alanlar", "name": "Uzmanlık alanları",
              "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": a, "description": b,
                                   "provider": {"@id": f"{SITE}/#firma"}}} for a, b in ALANLAR]}
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Hizmetler", "hizmetler/")])] + svc_ld + [katalog, faq_ld(SSS[:7])]
    alanlar = "\n".join(f'      <li data-r style="--d:{i % 3}"><span class="n">{i + 1:02d}</span><h3>{a}</h3><p>{b}</p></li>'
                        for i, (a, b) in enumerate(ALANLAR))
    blocks = "\n".join(f"""  <article class="svc{' rev' if i % 2 else ''}" id="{slug}">
    <div class="svc-text" data-r>
      <p class="label">{i + 1:02d} / {len(HIZMETLER):02d}</p>
      <h2>{ad}</h2>
      <p>{uzun}</p>
      <dl class="meta">
        <div><dt>kapsam</dt><dd>{' · '.join(items)}</dd></div>
      </dl>
    </div>
    {frame(slug, "", "0.06")}
  </article>""" for i, (code, ad, slug, kisa, uzun, items) in enumerate(HIZMETLER))
    return head("Hizmetler: mimari tasarım, iç mimarlık, ruhsat ve anahtar teslim inşaat | Dimart Mimarlık",
                "Dimart Mimarlık hizmetleri: mimari tasarım, iç mimarlık, villa ve konut inşaatı, ev tadilatı ve renovasyon, ofis ve mağaza tasarımı, proje ve ruhsat, anahtar teslim uygulama.",
                "hizmetler/", ld, "hizmetler") + f"""  <section class="page-hero">
    {crumbs("Hizmetler")}
    <h1 data-r>Bir çizgiden <span class="y">bitmiş yapıya.</span></h1>
    <p class="lead" data-r>İstanbul merkezli ekibimizle mimari tasarım, iç mimarlık, proje ve ruhsat, inşaat ve anahtar teslim uygulama. İhtiyacınız olan aşamayı ya da tüm süreci üstleniyoruz.</p>
  </section>
{blocks}
  <section class="areas" aria-labelledby="alanlar">
    <div class="sec-head" data-r><h2 class="label" id="alanlar">Uzmanlık alanları</h2><p class="h">En çok yaptığımız işler</p></div>
    <ol>
{alanlar}
    </ol>
  </section>
  <section class="qa" aria-labelledby="sss">
    <div class="sec-head" data-r><h2 class="label" id="sss">Sık sorulan sorular</h2><p class="h">Merak edilenler</p></div>
    <div class="faq">
{faq_html(SSS[:7])}
    </div>
  </section>
""" + footer()


def page_projeler():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Projeler", "projeler/")]),
          {"@type": "CollectionPage", "url": f"{SITE}/projeler/", "name": "Projeler", "about": {"@id": f"{SITE}/#firma"}}]
    items = "\n".join(f"""    <figure class="piece p{i + 1}">
      <div class="frame m-{mat} empty" data-r data-speed="{'0.07' if i % 2 else '-0.04'}"><span>görseller hazırlanıyor</span></div>
      <figcaption class="cap" data-r><h3>{tur.lower()}</h3><small>{hizmet}</small></figcaption>
    </figure>""" for i, (mat, tur, hizmet) in enumerate(PROJELER))
    return head("Projeler: villa, konut, ofis ve iç mimarlık | Dimart Mimarlık",
                "Dimart Mimarlık'ın tasarlayıp inşa ettiği villa, konut, ofis ve iç mimarlık projeleri.",
                "projeler/", ld, "projeler") + f"""  <section class="page-hero">
    {crumbs("Projeler")}
    <h1 data-r>Seçili <span class="y">projeler.</span></h1>
    <p class="lead" data-r>Konut, villa, ofis ve ticari mekânlarda tasarladığımız ve inşa ettiğimiz işler. Proje fotoğraflarımızı hazırlıyoruz; her projede konum, yıl, alan ve üstlendiğimiz hizmetleri paylaşacağız.</p>
  </section>
  <section class="works list">
{items}
  </section>
""" + footer()


def page_iletisim():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("İletişim", "iletisim/")]),
          {"@type": "ContactPage", "url": f"{SITE}/iletisim/", "about": {"@id": f"{SITE}/#firma"}}]
    f = FIRMA
    return head("İletişim | Dimart Mimarlık, Sancaktepe İstanbul",
                f"Dimart Mimarlık iletişim: {f['tel']}, {f['eposta']}. {f['adres']}, {f['ilce']} / {f['il']}.",
                "iletisim/", ld, "iletisim") + f"""  <section class="page-hero">
    {crumbs("İletişim")}
    <h1 data-r>Projenizi <span class="y">konuşalım.</span></h1>
    <p class="lead" data-r>Telefonla arayın ya da e-posta gönderin; ihtiyacınızı dinleyip size süreç ve takvim önerelim. Ofisimizde de ağırlamaktan memnuniyet duyarız.</p>
  </section>
  <section class="split">
    <dl class="meta reg big" data-r>
      <div><dt>telefon</dt><dd><a href="tel:{f['tel_link']}">{f['tel']}</a></dd></div>
      <div><dt>e-posta</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
      <div><dt>adres</dt><dd>{f['adres']},<br>{f['pk']} {f['ilce']} / {f['il']}, Türkiye</dd></div>
      <div><dt>harita</dt><dd><a href="{HARITA}" rel="noopener" target="_blank">Google Haritalar'da aç</a></dd></div>
      <div><dt>instagram</dt><dd><a href="{INSTAGRAM}" rel="noopener me" target="_blank">@dimartmimarlik</a></dd></div>
    </dl>
    <div class="prose" data-r>
      <p class="label">Görüşmeye gelirken</p>
      <p>Varsa tapu ya da imar durumu belgesi, mevcut projeler ve beğendiğiniz mekânların fotoğrafları ilk görüşmeyi çok daha verimli hale getirir.</p>
      <p class="links"><a class="go" href="tel:{f['tel_link']}">Hemen arayın</a><a class="go" href="mailto:{f['eposta']}">E-posta gönderin</a></p>
    </div>
  </section>
""" + footer()


def page_kvkk():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("KVKK ve gizlilik", "kvkk/")]),
          {"@type": "WebPage", "url": f"{SITE}/kvkk/", "name": "KVKK aydınlatma metni ve gizlilik",
           "about": {"@id": f"{SITE}/#firma"}, "dateModified": "2026-10-22"}]
    return head("KVKK aydınlatma metni ve gizlilik | Dimart Mimarlık",
                "Dimart Mimarlık ve Müteahhitlik A.Ş. kişisel verilerin korunması aydınlatma metni, gizlilik ve çerez bilgilendirmesi.",
                "kvkk/", ld, "kvkk") + f"""  <article class="post legal-page">
    <header class="post-head">
      {crumbs("KVKK ve gizlilik")}
      <h1 data-r>KVKK aydınlatma metni <span class="y">ve gizlilik</span></h1>
      <p class="post-meta" data-r><span>Son güncelleme: 22 Ekim 2026</span></p>
    </header>
    <div class="post-body">
      <div class="prose post-text" data-r>
<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 10. maddesi uyarınca, {f['unvan']} ("Dimart") tarafından kişisel verilerinizin nasıl işlendiğini açıklamak için hazırlanmıştır.</p>

<h2>Veri sorumlusu</h2>
<p>{f['unvan']}<br>{f['adres']}, {f['pk']} {f['ilce']} / {f['il']}<br>E-posta: <a href="mailto:{f['eposta']}">{f['eposta']}</a> · Telefon: <a href="tel:{f['tel_link']}">{f['tel']}</a></p>

<h2>Hangi verileri işliyoruz?</h2>
<ul>
<li><strong>Kimlik ve iletişim bilgileri:</strong> bizi aradığınızda ya da e-posta gönderdiğinizde paylaştığınız ad, soyad, telefon numarası ve e-posta adresi.</li>
<li><strong>Proje bilgileri:</strong> teklif ve proje çalışması için paylaştığınız adres, tapu, imar durumu, proje dosyaları ve fotoğraflar.</li>
<li><strong>Sözleşme ve finans bilgileri:</strong> iş ilişkisi kurulursa sözleşme, fatura ve ödeme bilgileri.</li>
<li><strong>Teknik kayıtlar:</strong> siteyi ziyaret ettiğinizde, sitenin barındırıldığı altyapı tarafından güvenlik amacıyla tutulan IP adresi, tarayıcı bilgisi ve erişim zamanı.</li>
</ul>
<p>Sitede iletişim formu, üyelik, reklam ya da ziyaretçi analizi aracı bulunmaz.</p>

<h2>Hangi amaçlarla ve hangi hukuki sebeple?</h2>
<ul>
<li>Taleplerinize yanıt vermek, keşif ve teklif hazırlamak (KVKK m. 5/2-c: sözleşmenin kurulması).</li>
<li>Tasarım, proje, ruhsat ve inşaat işlerini yürütmek (KVKK m. 5/2-c).</li>
<li>Fatura, vergi ve imar mevzuatından doğan yükümlülükleri yerine getirmek (KVKK m. 5/2-ç: hukuki yükümlülük).</li>
<li>Sitenin güvenliğini sağlamak ve kötüye kullanımı önlemek (KVKK m. 5/2-f: meşru menfaat).</li>
</ul>

<h2>Verileri kimlere aktarıyoruz?</h2>
<p>Verileriniz yalnızca yukarıdaki amaçlarla ve gerektiği ölçüde; ruhsat ve izin süreçleri için belediyeler, yapı denetim kuruluşları ve diğer yetkili kamu kurumlarıyla, işin yürütülmesi için birlikte çalıştığımız proje müellifleri ve uzmanlarla, mali yükümlülükler için mali müşavirimizle paylaşılabilir.</p>
<p>E-posta hizmetimiz (Google Workspace) ve sitenin barındırma altyapısı (Cloudflare) yurt dışında sunucuları bulunan hizmet sağlayıcılardır. Bu hizmetler aracılığıyla gerçekleşen aktarımlar KVKK'nın 9. maddesine uygun olarak yapılır.</p>

<h2>Ne kadar süre saklıyoruz?</h2>
<p>Verilerinizi işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen saklama süreleri boyunca saklarız. Bu sürelerin sonunda verileri siler, yok eder ya da anonim hale getiririz.</p>

<h2>Haklarınız</h2>
<p>KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik ya da yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini ya da yok edilmesini isteme, bu işlemlerin aktarıldığı kişilere bildirilmesini isteme, otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahipsiniz.</p>
<p>Başvurularınızı <a href="mailto:{f['eposta']}">{f['eposta']}</a> adresine e-postayla ya da yukarıdaki adresimize yazılı olarak iletebilirsiniz. Başvurunuzu en geç 30 gün içinde ücretsiz olarak sonuçlandırırız.</p>

<h2>Çerezler</h2>
<p>Bu site çerez kullanmaz. Müzik ve eskiz tercihiniz yalnızca kendi tarayıcınızın yerel deposunda tutulur; bize ya da üçüncü kişilere gönderilmez ve tarayıcı ayarlarınızdan silinebilir. Yazı tipleri ve müzik dosyaları da sitenin kendi sunucusundan yüklenir.</p>
<p>Instagram ve Google Haritalar bağlantılarına tıkladığınızda ilgili platformun kendi gizlilik politikası geçerli olur.</p>
      </div>
    </div>
  </article>
""" + footer()


CIZIM_SSS = [
    ("Çizim masası nedir?",
     "Tarayıcıda çalışan ücretsiz bir taslak aracıdır. Milimetrik kâğıt üzerinde dik açılı odalar çizebilir, kapı ve pencere ekleyebilir, zemin malzemesi seçebilir ve odanın alanını metrekare olarak görebilirsiniz."),
    ("Hangi eşyaları ekleyebilirim, ölçüleri doğru mu?",
     "Oturma, yatak odası, yemek, mutfak, banyo ve çalışma alanları için 37 eşya vardır: üçlü ve köşe koltuk, yatak, gardırop, yemek masası, tezgâh, eviye, ocak, buzdolabı, klozet, lavabo, duş, küvet ve daha fazlası. Hepsi piyasadaki yaygın standart ölçülerdedir, örneğin çift kişilik yatak 160 × 200 cm, tezgâh derinliği 60 cm, klozet 40 × 70 cm. Eşyayı seçip R tuşuyla döndürebilir, Seç aracıyla taşıyabilirsiniz."),
    ("3B görünüm nasıl çalışıyor?",
     "3B düğmesi, çizdiğiniz odaları 2,80 m duvar yüksekliğiyle, kapı ve pencere boşluklarıyla, seçtiğiniz zemin, duvar rengi ve eşyalarla birlikte gerçek bir üç boyutlu sahneye dönüştürür. Fareyle sürükleyerek döndürebilir, tekerlekle yakınlaşabilir, telefonda iki parmakla gezinebilirsiniz."),
    ("Hangi zemin malzemeleri ve duvar renkleri var?",
     "Meşe, ceviz ve balıksırtı parke, traverten, beyaz ve siyah mermer, 60 × 60 seramik, terrazzo, hidrolik karo, mikrobeton, beton ve halı; duvar için beyazdan antrasite yedi renk seçebilirsiniz."),
    ("Oda alanı nasıl hesaplanıyor?",
     "Izgaradaki her kare 50 × 50 cm'dir. Oda kapandığında köşe noktalarından alan hesaplanır ve odanın ortasına metrekare olarak yazılır. Duvar kalınlığı hesaba katılmaz, ölçüler duvar eksenlerine göredir."),
    ("Çizdiğim planı Dimart'a nasıl gönderirim?",
     "Planı Dimart'a gönder düğmesi, odaların alanları, kenar ölçüleri, malzemeleri, kapı ve pencere sayılarıyla hazır bir e-posta açar. Görseli indir ile planın görüntüsünü kaydedip e-postaya ekleyebilirsiniz."),
    ("Çizimim kaydediliyor mu?",
     "Çiziminiz yalnızca kendi tarayıcınızda saklanır; sayfaya geri döndüğünüzde kaldığınız yerden devam edebilirsiniz. Bize siz göndermediğiniz sürece hiçbir bilgi ulaşmaz."),
]


def page_cizim():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Çizim masası", "cizim-masasi/")]),
          {"@type": "WebApplication", "@id": f"{SITE}/cizim-masasi/#arac", "name": "Dimart Çizim masası",
           "url": f"{SITE}/cizim-masasi/", "applicationCategory": "DesignApplication", "operatingSystem": "Tarayıcı",
           "inLanguage": "tr-TR", "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "TRY"},
           "description": "Tarayıcıda dik açılı oda planı çizme, kapı ve pencere ekleme, standart ölçülerde mobilya, mutfak ve banyo elemanları yerleştirme, zemin malzemesi ve duvar rengi seçme, gerçek 3B görünüm ve metrekare hesaplama aracı.",
           "provider": {"@id": f"{SITE}/#firma"}},
          faq_ld(CIZIM_SSS)]
    araclar = [("duvar", "Duvar", True), ("kapi", "Kapı", False), ("pencere", "Pencere", False), ("esya", "Eşya", False),
               ("zemin", "Zemin", False), ("boya", "Duvar rengi", False), ("sec", "Seç", False), ("3b", "3B", False)]
    btn = "".join(f'<button type="button" data-arac="{a}" aria-pressed="{"true" if on else "false"}">{n}</button>' for a, n, on in araclar)
    return head("Çizim masası: online oda planı çizme ve metrekare hesaplama | Dimart Mimarlık",
                "Ücretsiz online çizim masası: oda planı çizin, kapı, pencere ve standart ölçülerde eşya yerleştirin, zemin ve duvar rengi seçin, 3B gezin, metrekareyi hesaplayın.",
                "cizim-masasi/", ld, "cizim") + f"""  <section class="page-hero short">
    {crumbs("Çizim masası")}
    <h1 data-r>Her şey bir çizgiyle <span class="y">başlar.</span></h1>
    <p class="lead" data-r>Hayalinizdeki mekânın ilk taslağını burada çizin. Odalarınızı oluşturun, kapı ve pencereleri yerleştirin; koltuktan yatağa, eviyeden klozete standart ölçülerde eşyaları yerleştirin, zemin malzemesini ve duvar rengini seçin, sonra mekânın içinde 3B gezinin. Alanlar kendiliğinden hesaplanır. Hazır olunca taslağı bize gönderin, gerisini birlikte çizelim.</p>
  </section>
  <section class="masa" id="masa" aria-label="Çizim masası">
    <div class="masa-bar">
      <div class="masa-araclar" role="group" aria-label="Araçlar">{btn}</div>
      <div class="masa-isler"><button type="button" data-is="geri">Geri al</button><button type="button" data-is="temizle">Temizle</button><button type="button" data-is="indir">Görseli indir</button></div>
    </div>
    <div class="masa-govde">
      <div class="masa-sahne">
        <canvas class="masa-kagit" aria-label="Çizim alanı: tıklayarak oda köşeleri ekleyin"></canvas>
        <div class="masa-3b" data-3b aria-label="3B görünüm"></div>
      </div>
      <aside class="masa-panel" data-panel aria-label="Seçenekler"></aside>
    </div>
    <div class="masa-alt">
      <p class="masa-ipucu" data-ipucu aria-live="polite">Tıklayarak köşeleri ekleyin, ilk köşeye tıklayınca oda kapanır.</p>
      <p class="masa-toplam" data-toplam>0 oda · 0 eşya · 0,00 m²</p>
      <button type="button" class="go" data-is="gonder">Planı Dimart'a gönder</button>
    </div>
    <p class="masa-not">Bir kare 50 × 50 cm · Duvar yüksekliği 2,80 m · R döndürür, Delete siler, Ctrl/Cmd + Z geri alır, Esc bırakır</p>
  </section>
  <section class="qa" aria-labelledby="sss">
    <div class="sec-head" data-r><h2 class="label" id="sss">Sık sorulan sorular</h2><p class="h">Çizim masası</p></div>
    <div class="faq">
{faq_html(CIZIM_SSS)}
    </div>
  </section>
""" + footer()


def page_404():
    return head("Sayfa bulunamadı | Dimart Mimarlık", "Aradığınız sayfa bulunamadı.", "404.html", [ORG], "404").replace(
        '<link rel="canonical" href="https://dimartmimarlik.com/404.html">\n', '').replace(
        'index, follow, max-image-preview:large', 'noindex') + """  <section class="page-hero">
    <h1 data-r>Bu çizgi bir yere <span class="y">varmıyor.</span></h1>
    <p class="lead" data-r>Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
    <p class="links" data-r><a class="go" href="/">Ana sayfaya dönün</a></p>
  </section>
""" + footer()


AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]


def tarih_tr(t):
    y, m, g = t.split("-")
    return f"{int(g)} {AYLAR[int(m) - 1]} {y}"


def yazi_listesi(yazilar):
    return "\n".join(f"""    <li data-r><a href="/blog/{y['slug']}/" data-cursor="Oku">
      <time datetime="{y['tarih']}">{tarih_tr(y['tarih'])}</time>
      <span class="bt">{y['baslik']}</span>
      <span class="bk">{y['kategori']}</span>
    </a></li>""" for y in yazilar)


def page_blog():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Blog", "blog/")]),
          {"@type": "Blog", "@id": f"{SITE}/blog/#blog", "url": f"{SITE}/blog/", "name": "Dimart Mimarlık Blog",
           "inLanguage": "tr-TR", "publisher": {"@id": f"{SITE}/#firma"},
           "blogPost": [{"@type": "BlogPosting", "headline": y["baslik"], "url": f"{SITE}/blog/{y['slug']}/",
                         "datePublished": y["tarih"]} for y in YAZILAR]}]
    return head("Blog: mimarlık, iç mimarlık, ruhsat ve inşaat rehberleri | Dimart Mimarlık",
                "Villa inşaatı, ofis iç mimarisi, anahtar teslim inşaat, yapı ruhsatı, tadilat bütçesi ve firma seçimi üzerine Dimart Mimarlık'ın hazırladığı rehberler.",
                "blog/", ld, "blog") + f"""  <section class="page-hero">
    {crumbs("Blog")}
    <h1 data-r>Çizgiden <span class="y">notlar.</span></h1>
    <p class="lead" data-r>Proje, ruhsat, inşaat ve iç mimarlık üzerine sahada öğrendiklerimizi yazıyoruz. Karar vermeden önce okumanız gerekenler, sade bir dille.</p>
  </section>
  <section class="blog-list" aria-label="Yazılar">
    <ol>
{yazi_listesi(YAZILAR)}
    </ol>
  </section>
""" + footer()


def page_yazi(y):
    url = f"{SITE}/blog/{y['slug']}/"
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Blog", "blog/"), (y["kisa"], f"blog/{y['slug']}/")]),
          {"@type": "BlogPosting", "@id": f"{url}#yazi", "headline": y["baslik"], "description": y["aciklama"],
           "abstract": y["ozet"], "datePublished": y["tarih"], "dateModified": y["tarih"], "inLanguage": "tr-TR",
           "url": url, "mainEntityOfPage": url, "articleSection": y["kategori"],
           "author": {"@id": f"{SITE}/#firma"}, "publisher": {"@id": f"{SITE}/#firma"},
           "image": f"{SITE}/assets/dimart-favicon-512.png", "isPartOf": {"@id": f"{SITE}/blog/#blog"}},
          faq_ld(y["sss"])]
    diger = [o for o in YAZILAR if o["slug"] != y["slug"]][:3]
    return head(f"{y['baslik']} | Dimart Mimarlık", y["aciklama"], f"blog/{y['slug']}/", ld, "yazi") + f"""  <article class="post">
    <header class="post-head">
      <nav class="crumbs" aria-label="Konum"><a href="/">Ana sayfa</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span>{y['kategori']}</span></nav>
      <h1 data-r>{y['baslik']}</h1>
      <p class="post-meta" data-r><time datetime="{y['tarih']}">{tarih_tr(y['tarih'])}</time><span>{y['kategori']}</span><span>Dimart Mimarlık</span></p>
    </header>
    {frame(y["cizim"], "post-frame")}
    <div class="post-body">
      <aside class="kisaca" data-r><p class="label">Kısaca</p><p>{y['ozet']}</p></aside>
      <div class="prose post-text" data-r>{y['govde']}</div>
      <section class="post-faq" aria-labelledby="sss">
        <h2 class="label" id="sss">Sık sorulan sorular</h2>
        <div class="faq">
{faq_html(y['sss'])}
        </div>
      </section>
      <aside class="post-cta" data-r>
        <p>Projeniz için bu adımları birlikte planlayalım.</p>
        <p class="links"><a class="go" href="/iletisim/">Projenizi konuşalım</a><a class="go" href="/hizmetler/">Hizmetler</a></p>
      </aside>
    </div>
  </article>
  <section class="blog-list more" aria-labelledby="diger">
    <h2 class="label" id="diger" data-r>Diğer yazılar</h2>
    <ol>
{yazi_listesi(diger)}
    </ol>
  </section>
""" + footer()


def llms():
    f = FIRMA
    svc = "\n".join(f"- {ad}: {kisa}" for _, ad, _, kisa, *_ in HIZMETLER)
    yazilar = "\n".join(f"- [{y['baslik']}]({SITE}/blog/{y['slug']}/): {y['ozet']}" for y in YAZILAR)
    return f"""# {f['unvan']}

> İstanbul merkezli mimarlık ve müteahhitlik firması. Mimari tasarım, iç mimarlık, villa ve konut inşaatı, tadilat ve renovasyon, proje ve ruhsat ve anahtar teslim uygulamayı tek ekiple yürütür. İstanbul dışındaki projeleri de üstlenir. Slogan: "Her şey bir çizgiyle başlar."

## Hizmetler
{svc}

## İletişim
- Adres: {f['adres']}, {f['pk']} {f['ilce']} / {f['il']}, Türkiye
- Telefon: {f['tel']}
- E-posta: {f['eposta']}
- Web: {SITE}/
- Instagram: {INSTAGRAM}
- Hizmet bölgesi: Türkiye geneli

## Sayfalar
- [Stüdyo]({SITE}/studyo/): yaklaşım ve çalışma bölgesi
- [Hizmetler]({SITE}/hizmetler/): hizmetlerin ayrıntıları
- [Projeler]({SITE}/projeler/)
- [Blog]({SITE}/blog/): rehberler
- [İletişim]({SITE}/iletisim/)

## Blog yazıları
{yazilar}
"""


PAGES = {
    "index.html": page_home,
    "studyo/index.html": page_studyo,
    "hizmetler/index.html": page_hizmetler,
    "projeler/index.html": page_projeler,
    "iletisim/index.html": page_iletisim,
    "blog/index.html": page_blog,
    "kvkk/index.html": page_kvkk,
    "cizim-masasi/index.html": page_cizim,
}
for _y in YAZILAR:
    PAGES[f"blog/{_y['slug']}/index.html"] = (lambda y=_y: page_yazi(y))

if __name__ == "__main__":
    for path, fn in PAGES.items():
        out = ROOT / path
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(fn(), encoding="utf-8")
    (ROOT / "404.html").write_text(page_404(), encoding="utf-8")
    urls = "\n".join(f"  <url><loc>{SITE}/{p.replace('index.html', '')}</loc><lastmod>2026-10-22</lastmod></url>" for p in PAGES)
    (ROOT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n',
        encoding="utf-8")
    (ROOT / "llms.txt").write_text(llms(), encoding="utf-8")
    print("ok", len(PAGES))
