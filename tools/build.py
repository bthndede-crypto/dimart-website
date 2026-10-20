"""Sayfaları ortak başlık/altlık ile public/ altına üretir: python3 tools/build.py"""
import json
from pathlib import Path

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
    "vd": "Sultanbeyli",
    "vkn": "2971290153",
    "mersis": "0297129015300001",
    "sicil": "316926-5",
}
HARITA = "https://www.google.com/maps/search/?api=1&query=Elmaksan+Sk.+No%3A14+Sancaktepe+%C4%B0stanbul"

NAV = [("studyo", "Stüdyo"), ("hizmetler", "Hizmetler"), ("projeler", "Projeler"), ("iletisim", "İletişim")]

ORG = {
    "@type": ["GeneralContractor", "ProfessionalService"],
    "@id": f"{SITE}/#firma",
    "name": FIRMA["unvan"],
    "alternateName": "Dimart Mimarlık",
    "slogan": "Her şey bir çizgiyle başlar.",
    "description": "İstanbul Sancaktepe merkezli mimarlık ve müteahhitlik firması. Mimari tasarım, iç mimarlık, proje ve ruhsat, inşaat ve anahtar teslim uygulama.",
    "url": f"{SITE}/",
    "logo": f"{SITE}/assets/dimart-logo-siyah.svg",
    "image": f"{SITE}/assets/dimart-favicon-512.png",
    "email": FIRMA["eposta"],
    "telephone": FIRMA["tel_link"],
    "taxID": FIRMA["vkn"],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": FIRMA["adres"],
        "addressLocality": FIRMA["ilce"],
        "addressRegion": FIRMA["il"],
        "postalCode": FIRMA["pk"],
        "addressCountry": "TR",
    },
    "hasMap": HARITA,
    "areaServed": {"@type": "City", "name": "İstanbul"},
    "knowsAbout": ["Mimari tasarım", "İç mimarlık", "Mimari proje", "İnşaat ruhsatı", "Konut inşaatı",
                   "Anahtar teslim inşaat", "Tadilat ve renovasyon"],
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

SSS = [
    ("Dimart Mimarlık hangi hizmetleri veriyor?",
     "Mimari tasarım, iç mimarlık, proje ve ruhsat süreçleri, inşaat ve anahtar teslim uygulama. Tasarımdan teslime kadar tüm süreci tek ekip yürütür."),
    ("Dimart Mimarlık nerede, hangi bölgelerde çalışıyor?",
     "Ofisimiz Eyüp Sultan Mah. Elmaksan Sk. No:14, Sancaktepe / İstanbul adresindedir. İstanbul genelinde proje üstleniyoruz."),
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

PROJELER = [
    ("wide", "Proje adı", "İlçe · Yıl", "Konut · İç mimarlık"),
    ("narrow", "Proje adı", "İlçe · Yıl", "Villa · Anahtar teslim"),
    ("narrow", "Proje adı", "İlçe · Yıl", "Ofis · İç mimarlık"),
    ("wide", "Proje adı", "İlçe · Yıl", "Konut · İnşaat"),
]


def rel(depth):
    return "../" * depth


def head(title, desc, path, depth, ld):
    r = rel(depth)
    url = f"{SITE}/{path}"
    return f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Dimart Mimarlık">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta name="theme-color" content="#FBFAF8">
<link rel="icon" href="{r}assets/dimart-favicon.svg" type="image/svg+xml">
<link rel="icon" href="{r}assets/dimart-favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="{r}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Open+Sans:wght@400;600&display=swap">
<link rel="stylesheet" href="{r}assets/site.css">
<script type="application/ld+json">
{json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False, indent=1)}
</script>
</head>
<body>
"""


def header(depth, current):
    r = rel(depth)
    links = "\n".join(
        f'      <a href="{r}{slug}/"{" aria-current=\"page\"" if slug == current else ""}>{name}</a>'
        for slug, name in NAV)
    return f"""<header class="site-head" id="top">
  <div class="wrap">
    <a class="brand" href="{r or './'}" aria-label="Dimart Mimarlık ana sayfa"><img src="{r}assets/dimart-logo-siyah.svg" alt="Dimart Mimarlık" width="88" height="30"></a>
    <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav">Menü</button>
    <nav class="nav" id="nav" aria-label="Ana menü">
{links}
    </nav>
  </div>
</header>
"""


def band(depth):
    f = FIRMA
    return f"""<section class="band" aria-labelledby="iletisim-baslik">
  <div class="wrap">
    <div>
      <p class="label">İletişim</p>
      <h2 id="iletisim-baslik" style="margin-top:20px">Projenizi <strong>konuşalım.</strong></h2>
      <p style="color:var(--night-mute);max-width:44ch;margin-top:22px">Arsanız, binanız ya da yalnızca bir fikriniz olsun. Kısa bir görüşmeyle ihtiyacınızı dinleyelim, size süreç ve takvim önerelim.</p>
      <a class="btn" href="tel:{f['tel_link']}">Bizi arayın</a>
    </div>
    <dl class="nap">
      <div><dt>Telefon</dt><dd><a href="tel:{f['tel_link']}">{f['tel']}</a></dd></div>
      <div><dt>E-posta</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
      <div><dt>Adres</dt><dd>{f['adres']},<br>{f['pk']} {f['ilce']} / {f['il']}</dd></div>
      <div><dt>Harita</dt><dd><a href="{HARITA}" rel="noopener">Google Haritalar'da aç</a></dd></div>
    </dl>
  </div>
</section>
"""


def footer(depth):
    r = rel(depth)
    f = FIRMA
    links = "".join(f'<a href="{r}{slug}/">{name}</a>' for slug, name in NAV)
    return f"""<footer class="site-foot">
  <div class="wrap">
    <img src="{r}assets/dimart-logo-beyaz.svg" alt="Dimart Mimarlık" width="76" height="26" loading="lazy">
    <nav aria-label="Alt menü">{links}</nav>
    <div class="legal">
      <span>© 2026 {f['unvan']}</span>
      <span>Vergi dairesi: {f['vd']} · VKN {f['vkn']}</span>
      <span>MERSİS {f['mersis']}</span>
      <span>Ticaret sicil {f['sicil']}</span>
    </div>
  </div>
</footer>
<script>
(function(){{
  var b=document.getElementById('menu-btn'),n=document.getElementById('nav'),h=document.querySelector('.site-head');
  b.addEventListener('click',function(){{var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)}});
  var s=function(){{h.classList.toggle('scrolled',window.scrollY>8)}};s();window.addEventListener('scroll',s,{{passive:true}});
}})();
</script>
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
    return "\n".join(f"        <details><summary>{q}</summary><p>{a}</p></details>" for q, a in qs)


def works_html(depth):
    return "\n".join(f"""      <figure class="work {cls}">
        <div class="ph"><span>Proje görseli eklenecek</span></div>
        <figcaption><h3>{ad}</h3><small>{yer}<br>{tur}</small></figcaption>
      </figure>""" for cls, ad, yer, tur in PROJELER)


DRAWING = """<div class="drawing" role="img" aria-label="İki katlı modern bir konutun ince çizgili cephe çizimi">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path pathLength="1" class="ln draw" d="M24 420 H376"/>
          <path pathLength="1" class="ln draw d2" d="M60 420 V270 H240 V420"/>
          <path pathLength="1" class="ln draw d2" d="M120 270 V160 H350 V270 H240"/>
          <path pathLength="1" class="ln draw d3" d="M330 270 V420"/>
          <path pathLength="1" class="ln draw d3" d="M150 186 H322 V244 H150 Z"/>
          <path pathLength="1" class="ln draw d3" d="M85 300 H150 V380 H85 Z M180 420 V318 H216 V420"/>
          <path pathLength="1" class="ln thin draw d4" d="M207 186 V244 M265 186 V244 M117.5 300 V380"/>
          <path pathLength="1" class="ln thin draw d4" d="M38 160 V420 M33 160 H43 M33 420 H43 M60 446 H350 M60 441 V451 M350 441 V451"/>
          <rect class="sq" x="116" y="156" width="8" height="8"/>
          <text x="205" y="468" text-anchor="middle">11.60 M</text>
          <text x="26" y="290" text-anchor="middle" transform="rotate(-90 26 290)">7.80 M</text>
        </svg>
        <div class="cap"><span>Ön cephe</span><span>Ölçek 1:100</span></div>
      </div>"""


def page_home():
    ld = [ORG, {"@type": "WebSite", "@id": f"{SITE}/#site", "url": f"{SITE}/", "name": "Dimart Mimarlık",
                "inLanguage": "tr-TR", "publisher": {"@id": f"{SITE}/#firma"}}, faq_ld(SSS)]
    svc = "\n".join(f"""      <a class="svc-row" href="hizmetler/#{slug}" style="text-decoration:none">
        <span class="code">{code}</span><h3>{ad}</h3><p>{kisa}</p>
      </a>""" for code, ad, slug, kisa, *_ in HIZMETLER)
    steps = "\n".join(f"        <li><h3>{a}</h3><p>{b}</p></li>" for a, b in SUREC)
    return head("Dimart Mimarlık | İstanbul'da mimarlık, iç mimarlık ve anahtar teslim inşaat",
                "Dimart Mimarlık ve Müteahhitlik A.Ş. İstanbul Sancaktepe merkezli; mimari tasarım, iç mimarlık, proje ve ruhsat, inşaat ve anahtar teslim uygulamayı tek ekiple yürütür.",
                "", 0, ld) + header(0, "") + f"""<main>
  <section class="hero">
    <div class="wrap">
      <div>
        <p class="label">Mimarlık &amp; Müteahhitlik · İstanbul</p>
        <h1>Tasarımdan anahtar teslime <strong>tek çizgi<span class="dot"></span></strong></h1>
        <p class="lead">Dimart, İstanbul'da konut, ofis ve ticari mekânları tasarlar, projelendirir ve inşa eder. Çizimi yapan ekip şantiyeyi de yönetir; siz tek muhatapla çalışırsınız.</p>
        <div class="actions">
          <a class="btn" href="iletisim/">Projenizi konuşalım</a>
          <a class="btn line" href="projeler/">Projeler</a>
        </div>
        <img class="slogan" src="assets/slogan-renkli.png" alt="Her şey bir çizgiyle başlar." width="1945" height="383">
      </div>
      {DRAWING}
    </div>
  </section>

  <section class="sec stone" aria-labelledby="yaklasim">
    <div class="wrap">
      <p class="label" id="yaklasim">Yaklaşım</p>
      <p class="statement" style="margin-top:28px">Her yapı bir çizgiyle başlar. Biz o çizgiyi <em>ilk eskizden son anahtara</em> kadar elden bırakmıyoruz.</p>
      <dl class="facts">
        <div><dt>Disiplin</dt><dd>Mimarlık, iç mimarlık, inşaat</dd></div>
        <div><dt>Model</dt><dd>Tek ekip, tek sözleşme</dd></div>
        <div><dt>Bölge</dt><dd>İstanbul geneli</dd></div>
        <div><dt>Ofis</dt><dd>Sancaktepe, İstanbul</dd></div>
      </dl>
    </div>
  </section>

  <section class="sec" aria-labelledby="secili">
    <div class="wrap">
      <div class="sec-head">
        <div><p class="label">Projeler</p><h2 id="secili">Seçili <strong>işler</strong></h2></div>
        <p>Konuttan ofise, sıfırdan inşaattan iç mekân yenilemeye kadar tamamladığımız işlerden bir seçki.</p>
      </div>
      <div class="works">
{works_html(0)}
      </div>
      <div class="actions"><a class="btn line" href="projeler/">Tüm projeler</a></div>
    </div>
  </section>

  <section class="sec stone" aria-labelledby="hizmet">
    <div class="wrap">
      <div class="sec-head">
        <div><p class="label">Hizmetler</p><h2 id="hizmet">Bir çizgiden <strong>bitmiş yapıya</strong></h2></div>
        <p>Her aşamayı ayrı firmalara dağıtmak yerine tasarım, ruhsat ve uygulamayı aynı çatı altında yürütüyoruz.</p>
      </div>
      <div class="svc">
{svc}
      </div>
    </div>
  </section>

  <section class="sec" aria-labelledby="surec">
    <div class="wrap">
      <div class="sec-head">
        <div><p class="label">Süreç</p><h2 id="surec">Beş adımda <strong>teslim</strong></h2></div>
        <p>Her adımın sonunda ne teslim edeceğimizi baştan konuşuruz. Süreç boyunca tek bir proje sorumlusu sizinle iletişimde olur.</p>
      </div>
      <ol class="steps">
{steps}
      </ol>
    </div>
  </section>

  <section class="sec stone" aria-labelledby="sss">
    <div class="wrap two">
      <div><p class="label">Sık sorulan sorular</p><h2 id="sss" style="font-weight:300;font-size:clamp(30px,3.6vw,50px);line-height:1.1;margin-top:20px">Merak <strong style="font-weight:600">edilenler</strong></h2></div>
      <div class="faq">
{faq_html(SSS)}
      </div>
    </div>
  </section>
</main>
""" + band(0) + footer(0)


def page_studyo():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Stüdyo", "studyo/")]),
          {"@type": "AboutPage", "url": f"{SITE}/studyo/", "about": {"@id": f"{SITE}/#firma"}}]
    f = FIRMA
    return head("Stüdyo | Dimart Mimarlık",
                "Dimart Mimarlık ve Müteahhitlik A.Ş. hakkında: yaklaşımımız, çalışma biçimimiz ve şirket bilgileri. Sancaktepe, İstanbul.",
                "studyo/", 1, ld) + header(1, "studyo") + f"""<main>
  <section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Konum"><a href="../">Ana sayfa</a><span>/</span><span>Stüdyo</span></nav>
      <h1>Çizen de, <strong>inşa eden de biziz.</strong></h1>
      <p>Dimart Mimarlık ve Müteahhitlik, mimari tasarım, iç mimarlık ve inşaatı tek ekipte birleştiren bir İstanbul stüdyosudur.</p>
    </div>
  </section>
  <section class="sec">
    <div class="wrap two">
      <div><p class="label">Yaklaşım</p><p class="statement" style="margin-top:24px">İyi bir mekân, kâğıttaki çizgi ile şantiyedeki duvar <em>aynı elden</em> çıktığında olur.</p></div>
      <div class="prose">
        <p>Birçok projede tasarım bir ofiste, uygulama başka bir firmada yapılır. Aradaki boşlukta detaylar kaybolur, maliyetler sapar, karar verme yükü size kalır.</p>
        <p>Biz bu boşluğu kapatmak için kurulduk. <strong>Tasarım, proje, ruhsat ve inşaatı aynı ekiple yürütüyoruz.</strong> Çizdiğimiz her detayın sahada nasıl yapılacağını bilerek çiziyor, sahada karşılaştığımız her durumu tasarımın diliyle çözüyoruz.</p>
        <p>Sıcak, sade ve uzun ömürlü mekânlar seviyoruz: doğru oranlar, dürüst malzemeler, iyi ışık.</p>
      </div>
    </div>
  </section>
  <section class="sec stone">
    <div class="wrap two">
      <div><p class="label">Şirket bilgileri</p><h2 style="font-weight:300;font-size:clamp(28px,3vw,42px);line-height:1.15;margin-top:20px">Resmî <strong style="font-weight:600">kayıtlar</strong></h2></div>
      <dl class="reg">
        <div><dt>Ticari unvan</dt><dd>{f['unvan']}</dd></div>
        <div><dt>Adres</dt><dd>{f['adres']}, {f['pk']} {f['ilce']} / {f['il']}</dd></div>
        <div><dt>Vergi dairesi</dt><dd>{f['vd']}</dd></div>
        <div><dt>Vergi no</dt><dd>{f['vkn']}</dd></div>
        <div><dt>MERSİS no</dt><dd>{f['mersis']}</dd></div>
        <div><dt>Ticaret sicil no</dt><dd>{f['sicil']}</dd></div>
      </dl>
    </div>
  </section>
</main>
""" + band(1) + footer(1)


def page_hizmetler():
    svc_ld = [{"@type": "Service", "@id": f"{SITE}/hizmetler/#{slug}", "name": ad, "description": uzun,
               "provider": {"@id": f"{SITE}/#firma"}, "areaServed": {"@type": "City", "name": "İstanbul"}}
              for code, ad, slug, kisa, uzun, _ in HIZMETLER]
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Hizmetler", "hizmetler/")])] + svc_ld + [faq_ld(SSS[:4])]
    blocks = "\n".join(f"""      <article class="svc-detail" id="{slug}">
        <div><p class="label">{code}</p><h2>{ad}</h2></div>
        <div class="body"><p>{uzun}</p><ul>{''.join(f'<li>{i}</li>' for i in items)}</ul></div>
      </article>""" for code, ad, slug, kisa, uzun, items in HIZMETLER)
    return head("Hizmetler: mimari tasarım, iç mimarlık, ruhsat ve anahtar teslim inşaat | Dimart Mimarlık",
                "Dimart Mimarlık'ın İstanbul'daki hizmetleri: mimari tasarım, iç mimarlık, proje ve ruhsat, inşaat ve anahtar teslim uygulama.",
                "hizmetler/", 1, ld) + header(1, "hizmetler") + f"""<main>
  <section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Konum"><a href="../">Ana sayfa</a><span>/</span><span>Hizmetler</span></nav>
      <h1>Bir çizgiden <strong>bitmiş yapıya.</strong></h1>
      <p>İstanbul'da mimari tasarım, iç mimarlık, proje ve ruhsat, inşaat ve anahtar teslim uygulama. İhtiyacınız olan aşamayı ya da tüm süreci üstleniyoruz.</p>
    </div>
  </section>
  <section class="sec" style="padding-top:0">
    <div class="wrap">
{blocks}
    </div>
  </section>
  <section class="sec stone">
    <div class="wrap two">
      <div><p class="label">Sık sorulan sorular</p></div>
      <div class="faq">
{faq_html(SSS[:4])}
      </div>
    </div>
  </section>
</main>
""" + band(1) + footer(1)


def page_projeler():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("Projeler", "projeler/")]),
          {"@type": "CollectionPage", "url": f"{SITE}/projeler/", "name": "Projeler", "about": {"@id": f"{SITE}/#firma"}}]
    return head("Projeler | Dimart Mimarlık",
                "Dimart Mimarlık'ın İstanbul'da tamamladığı konut, villa, ofis ve iç mimarlık projeleri.",
                "projeler/", 1, ld) + header(1, "projeler") + f"""<main>
  <section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Konum"><a href="../">Ana sayfa</a><span>/</span><span>Projeler</span></nav>
      <h1>Seçili <strong>projeler.</strong></h1>
      <p>Konut, villa, ofis ve ticari mekânlarda tasarladığımız ve inşa ettiğimiz işler. Her projede konum, yıl, alan ve üstlendiğimiz hizmetleri paylaşıyoruz.</p>
    </div>
  </section>
  <section class="sec">
    <div class="wrap">
      <div class="works">
{works_html(1)}
      </div>
    </div>
  </section>
</main>
""" + band(1) + footer(1)


def page_iletisim():
    ld = [ORG, crumbs_ld([("Ana sayfa", ""), ("İletişim", "iletisim/")]),
          {"@type": "ContactPage", "url": f"{SITE}/iletisim/", "about": {"@id": f"{SITE}/#firma"}}]
    f = FIRMA
    return head("İletişim | Dimart Mimarlık, Sancaktepe İstanbul",
                f"Dimart Mimarlık iletişim: {f['tel']}, {f['eposta']}. {f['adres']}, {f['ilce']} / {f['il']}.",
                "iletisim/", 1, ld) + header(1, "iletisim") + f"""<main>
  <section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Konum"><a href="../">Ana sayfa</a><span>/</span><span>İletişim</span></nav>
      <h1>Projenizi <strong>konuşalım.</strong></h1>
      <p>Telefonla arayın ya da e-posta gönderin; ihtiyacınızı dinleyip size süreç ve takvim önerelim. Ofisimizde de ağırlamaktan memnuniyet duyarız.</p>
    </div>
  </section>
  <section class="sec">
    <div class="wrap two">
      <dl class="reg">
        <div><dt>Telefon</dt><dd><a href="tel:{f['tel_link']}">{f['tel']}</a></dd></div>
        <div><dt>E-posta</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
        <div><dt>Adres</dt><dd>{f['adres']},<br>{f['pk']} {f['ilce']} / {f['il']}, Türkiye</dd></div>
        <div><dt>Harita</dt><dd><a href="{HARITA}" rel="noopener">Google Haritalar'da aç</a></dd></div>
      </dl>
      <div class="prose">
        <p class="label">Görüşmeye gelirken</p>
        <p>Varsa tapu ya da imar durumu belgesi, mevcut projeler ve beğendiğiniz mekânların fotoğrafları ilk görüşmeyi çok daha verimli hale getirir.</p>
        <div class="actions" style="margin-top:8px"><a class="btn" href="tel:{f['tel_link']}">Hemen arayın</a><a class="btn line" href="mailto:{f['eposta']}">E-posta gönderin</a></div>
      </div>
    </div>
  </section>
</main>
""" + footer(1)


PAGES = {
    "index.html": page_home,
    "studyo/index.html": page_studyo,
    "hizmetler/index.html": page_hizmetler,
    "projeler/index.html": page_projeler,
    "iletisim/index.html": page_iletisim,
}

if __name__ == "__main__":
    for path, fn in PAGES.items():
        out = ROOT / path
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(fn(), encoding="utf-8")
    urls = "\n".join(f"  <url><loc>{SITE}/{p.replace('index.html', '')}</loc><lastmod>2026-10-21</lastmod></url>" for p in PAGES)
    (ROOT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n',
        encoding="utf-8")
    print("ok", len(PAGES))
