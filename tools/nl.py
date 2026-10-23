"""Nederlandse pagina's (/nl/). Gebruikt de schil van build.py; wordt geladen wanneer build.py draait."""
from build import FIRMA, INSTAGRAM, NL, ORG, SITE, crumbs, crumbs_ld, faq_html, faq_ld, footer, frame, head, words

DIENSTEN = [
    ("Architectonisch ontwerp", "mimari-tasarim",
     "Programma van eisen, concept, schetsontwerp en 3D-visualisatie.",
     "We beginnen met lezen wat het perceel of het bestaande gebouw te bieden heeft. Het dagelijks leven van de mensen die er gaan wonen of werken, het budget en de bestemmingsregels liggen op dezelfde tafel, en samen met u geven we het concept en het schetsontwerp vorm.",
     ["Programma van eisen", "Bestemmingsplan en locatieanalyse", "Conceptontwerp", "Schetsontwerp", "3D-visualisatie", "Materiaal- en kleurenpalet"]),
    ("Interieurontwerp", "ic-mimarlik",
     "Interieurontwerp en inrichting voor woningen, kantoren en commerciële ruimtes.",
     "We brengen licht, textuur en gebruik samen in één lijn. Van ruimtelijke indeling tot maatmeubilair, van verlichting tot materiaalkeuze: elke beslissing komt met het uitvoeringsdetail, en ons eigen team bouwt alles wat we tekenen.",
     ["Ruimtelijke indeling", "Maatmeubilair", "Lichtplan", "Materiaalkeuze", "Uitvoeringsdetails", "Renovatie en verbouwing"]),
    ("Tekeningen en vergunningen", "proje-ve-ruhsat",
     "Uitvoeringstekeningen, coördinatie met adviseurs en omgevingsvergunningen.",
     "We maken de architectonische uitvoeringstekeningen en stemmen ze af op de constructie- en installatieontwerpen. We volgen het traject van de aanvraag bij de gemeente tot de vergunning is verleend.",
     ["Architectonische uitvoeringstekeningen", "Afstemming constructie en installaties", "Vergunningsaanvraag", "Opvolging bij de gemeente", "Afstemming bouwtoezicht", "Oplevering en gereedmelding"]),
    ("Bouw en sleutelklare oplevering", "insaat-anahtar-teslim",
     "Ruwbouw en afbouw, bouwplaatsmanagement, sleutelklaar onder één contract.",
     "Het team dat tekent, leidt ook de bouwplaats. Er gaat niets verloren tussen ontwerp en uitvoering; planning, budget en kwaliteit worden door één aanspreekpunt bewaakt. Desgewenst nemen we het hele traject van ontwerp tot oplevering op ons onder één contract.",
     ["Ruwbouw", "Afbouw", "Bouwplaatsmanagement", "Veiligheid", "Kwaliteitscontrole", "Sleutelklare oplevering"]),
]

GEBIEDEN = [
    ("Villa's en vrijstaande woningen", "Van kavel tot sleutel: ontwerp, vergunningen, ruwbouw en afbouw onder één contract. Tuin, zwembad en landschap kunnen worden meegenomen."),
    ("Woningbouw en appartementen", "Architectonisch ontwerp, vergunningen en uitvoering voor appartementengebouwen en kleinere woningbouwprojecten."),
    ("Renovatie van woningen en appartementen", "Complete renovatie: leidingwerk, elektra, vloeren, deuren en kozijnen in één plan."),
    ("Keuken- en badkamerrenovatie", "Waterdichting en nieuw leidingwerk in natte ruimtes, maatkasten en werkbladen, tegels en sanitair."),
    ("Kantoorinterieurs", "Werkplekindeling, vergaderruimtes, akoestiek en verlichting; efficiënte kantoren die bij uw merk passen."),
    ("Winkels, cafés en restaurants", "Concept, uitvoeringstekeningen en snelle sleutelklare inrichting van commerciële ruimtes."),
    ("Gevels en buitenruimtes", "Gevelrenovatie en isolatie, terrassen, tuinen en entrees."),
]

FAQ = [
    ("Wat doet Dimart Architectuur?",
     "Architectonisch ontwerp, interieurontwerp, uitvoeringstekeningen en vergunningen, bouw en sleutelklare oplevering. Eén team verzorgt het hele traject van ontwerp tot oplevering."),
    ("Waar is Dimart Architectuur gevestigd?",
     "We hebben kantoren in Istanbul en in Meerlo (Limburg). De volledige adressen vindt u op de contactpagina; voor opnames en bouwplaatsmanagement komen we naar de plek van het project."),
    ("Bouwen jullie villa's en vrijstaande woningen?",
     "Ja. Bij villa's en vrijstaande woningen nemen we het hele traject sleutelklaar op ons, van ontwerp en vergunningen tot ruwbouw en afbouw."),
    ("Renoveren jullie woningen en appartementen?",
     "Ja. We voeren complete renovaties uit, keuken- en badkamerrenovaties en vernieuwing van leidingwerk en vloeren, met een duidelijk plan en budget."),
    ("Kan ik alleen interieurontwerp afnemen?",
     "Ja. Interieurontwerp en uitvoeringstekeningen bieden we ook als losse dienst aan; desgewenst voert ons eigen team het ook uit."),
    ("Waarom ontwerp en bouw bij één bureau?",
     "Omdat het team dat tekent ook bouwt, gaat er niets verloren tussen tekening en bouwplaats; beslissingen, planning en kosten lopen via één aanspreekpunt."),
    ("Spreken jullie Nederlands?",
     "Ja. Vanuit ons kantoor in Meerlo staan we u te woord in het Nederlands, Engels of Turks."),
    ("Hoe neem ik contact op met Dimart Architectuur?",
     f"Bel {NL['tel']} (Nederland) of {FIRMA['tel']} (Turkije), of mail naar {FIRMA['eposta']}."),
]

PROCES = [
    ("Opname", "We bekijken het perceel of de ruimte en maken wensen en budget concreet."),
    ("Ontwerp", "Samen geven we het concept en het schetsontwerp vorm."),
    ("Tekeningen en vergunningen", "We maken de uitvoeringstekeningen en regelen de vergunningen."),
    ("Uitvoering", "We richten de bouwplaats in en bouwen volgens planning en budget."),
    ("Oplevering", "We doen de eindcontrole en dragen sleutels en documenten over."),
]

PROJECTEN = [("traverten", "Woning", "Interieurontwerp"), ("siva", "Villa", "Sleutelklaar"),
             ("mese", "Kantoor", "Interieurontwerp"), ("kagit", "Woning", "Ontwerp en bouw")]


def site_ld():
    return {"@type": "WebSite", "@id": f"{SITE}/nl/#site", "url": f"{SITE}/nl/", "name": "Dimart Architectuur",
            "inLanguage": "nl", "publisher": {"@id": f"{SITE}/#firma"}}


def kantoor_nl():
    return f"{NL['adres']}, {NL['pk']} {NL['il']}"


def page_home():
    ld = [ORG, site_ld(), faq_ld(FAQ)]
    pieces = "\n".join(f"""    <a class="piece p{i + 1}" href="/nl/diensten/#{slug}" data-cursor="Bekijk">
      {frame(slug, speed=("0.08" if i % 2 else "-0.05"), lang="nl")}
      <div class="cap" data-r><h3>{ad.lower()}</h3><small>{kort}</small></div>
    </a>""" for i, (ad, slug, kort, *_) in enumerate(DIENSTEN))
    steps = "\n".join(f'      <li data-r style="--d:{i}"><span class="n">0{i + 1}</span><h3>{a}</h3><p>{t}</p></li>'
                      for i, (a, t) in enumerate(PROCES))
    return head("Dimart Architectuur | Architect en aannemer in Meerlo en Istanbul",
                "Architectuur en bouw vanuit Meerlo en Istanbul: architectonisch ontwerp, interieurontwerp, villa's en woningbouw, renovatie, vergunningen en sleutelklare oplevering, alles door één team.",
                "nl/", ld, "home") + f"""  <section class="hero">
    {frame("eskiz", "hero-frame", "0.06", lang="nl")}
    <div class="hero-text" data-r>
      <p class="label">Architectuur &amp; bouw · Meerlo · Istanbul</p>
      <h1>Van ontwerp tot sleutel, <span class="y">één lijn.</span></h1>
      <p class="lead">Dimart ontwerpt, tekent en bouwt villa's, woningen, kantoren en commerciële ruimtes met teams in Meerlo en Istanbul. Het team dat tekent, leidt ook de bouwplaats, zodat u met één aanspreekpunt werkt.</p>
      <p class="links"><a class="go" href="/nl/contact/">Laten we praten</a><a class="go" href="/nl/diensten/">Diensten</a></p>
    </div>
    <p class="cue" aria-hidden="true">scroll</p>
  </section>

  <section class="works" aria-labelledby="werk">
    <h2 class="label" id="werk" data-r>Diensten · van tekening tot gebouw</h2>
{pieces}
  </section>

  <section class="say" aria-labelledby="aanpak">
    <h2 class="label" id="aanpak" data-r>Aanpak</h2>
    <p class="statement" data-r>{words("Elk gebouw begint met een lijn. Die lijn laten we niet los, van de eerste schets tot de laatste sleutel.")}</p>
    <dl class="meta facts" data-r>
      <div><dt>disciplines</dt><dd>Architectuur, interieur, bouw</dd></div>
      <div><dt>model</dt><dd>Eén team, één contract</dd></div>
      <div><dt>gebouwen</dt><dd>Villa's, woningen, kantoren, commercieel</dd></div>
      <div><dt>kantoren</dt><dd>Meerlo · Istanbul</dd></div>
    </dl>
  </section>

  <section class="process" aria-labelledby="proces">
    <div class="sec-head" data-r><h2 class="label" id="proces">Werkwijze</h2><p class="h">In vijf stappen naar de oplevering</p></div>
    <ol class="steps">
      <i class="steps-line" aria-hidden="true"></i>
{steps}
    </ol>
  </section>

  <section class="qa" aria-labelledby="faq">
    <div class="sec-head" data-r><h2 class="label" id="faq">Veelgestelde vragen</h2><p class="h">Goed om te weten</p></div>
    <div class="faq">
{faq_html(FAQ)}
    </div>
  </section>
""" + footer("nl")


def page_studio():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "nl/"), ("Studio", "nl/studio/")]),
          {"@type": "AboutPage", "url": f"{SITE}/nl/studio/", "inLanguage": "nl", "about": {"@id": f"{SITE}/#firma"}}]
    return head("Studio: architect en aannemer in Meerlo en Istanbul | Dimart Architectuur",
                "Over Dimart Mimarlık ve Müteahhitlik A.Ş.: een studio met kantoren in Istanbul en Meerlo die ontwerp, tekeningen, vergunningen en bouw in één team samenbrengt.",
                "nl/studio/", ld, "studyo") + f"""  <section class="page-hero">
    {crumbs("Studio", "nl")}
    <h1 data-r>Wij tekenen het, <span class="y">en wij bouwen het.</span></h1>
    <p class="lead" data-r>Dimart Mimarlık ve Müteahhitlik is een studio voor architectuur en bouw met een hoofdkantoor in Istanbul en een kantoor in Meerlo. Architectonisch ontwerp, interieurontwerp en bouw komen samen in één team.</p>
  </section>
  <section class="split">
    {frame("ic-mimarlik", "", "0.05", lang="nl")}
    <div class="prose" data-r>
      <p class="statement sm">{words("Een goede ruimte ontstaat wanneer de lijn op papier en de muur op de bouwplaats uit dezelfde hand komen.")}</p>
      <p>In veel projecten wordt het ontwerp door het ene bureau gemaakt en de uitvoering door een ander bedrijf. Daartussen gaan details verloren, lopen kosten uit en komt de last van elke beslissing bij u te liggen.</p>
      <p>Wij zijn opgericht om dat gat te dichten. <strong>Ontwerp, tekeningen, vergunningen en bouw liggen bij hetzelfde team.</strong> We tekenen elk detail in de wetenschap hoe het gebouwd wordt, en we lossen elke situatie op de bouwplaats op in de taal van het ontwerp.</p>
      <p>We houden van warme, rustige en duurzame ruimtes: de juiste verhoudingen, eerlijke materialen, goed licht.</p>
    </div>
  </section>
  <section class="split rev" aria-labelledby="werkwijze">
    <div data-r><h2 class="label" id="werkwijze">Zo werken we</h2><p class="h">We tekenen op kantoor en bouwen op locatie</p></div>
    <dl class="meta reg" data-r>
      <div><dt>kantoor Nederland</dt><dd>{kantoor_nl()}</dd></div>
      <div><dt>kantoor Istanbul</dt><dd>{f['adres']}, {f['pk']} {f['ilce']} / Istanbul</dd></div>
      <div><dt>gebouwtypes</dt><dd>Villa's, vrijstaande woningen, woningbouw, kantoren, commercieel en horeca</dd></div>
      <div><dt>talen</dt><dd>Nederlands, Engels en Turks</dd></div>
    </dl>
  </section>
""" + footer("nl")


def page_diensten():
    svc_ld = [{"@type": "Service", "@id": f"{SITE}/nl/diensten/#{slug}", "name": ad, "description": lang_,
               "provider": {"@id": f"{SITE}/#firma"}, "areaServed": ORG["areaServed"]}
              for ad, slug, kort, lang_, _ in DIENSTEN]
    ld = [ORG, crumbs_ld([("Home", "nl/"), ("Diensten", "nl/diensten/")])] + svc_ld + [faq_ld(FAQ[:7])]
    gebieden = "\n".join(f'      <li data-r style="--d:{i % 3}"><span class="n">{i + 1:02d}</span><h3>{a}</h3><p>{t}</p></li>'
                         for i, (a, t) in enumerate(GEBIEDEN))
    blocks = "\n".join(f"""  <article class="svc{' rev' if i % 2 else ''}" id="{slug}">
    <div class="svc-text" data-r>
      <p class="label">{i + 1:02d} / {len(DIENSTEN):02d}</p>
      <h2>{ad}</h2>
      <p>{lang_}</p>
      <dl class="meta">
        <div><dt>omvang</dt><dd>{' · '.join(items)}</dd></div>
      </dl>
    </div>
    {frame(slug, "", "0.06", lang="nl")}
  </article>""" for i, (ad, slug, kort, lang_, items) in enumerate(DIENSTEN))
    return head("Diensten: architectuur, interieur, vergunningen en sleutelklare bouw | Dimart Architectuur",
                "Diensten van Dimart Architectuur: architectonisch ontwerp, interieurontwerp, villa's en woningbouw, renovatie, kantoor- en winkelinterieurs, vergunningen en sleutelklare oplevering.",
                "nl/diensten/", ld, "hizmetler") + f"""  <section class="page-hero">
    {crumbs("Diensten", "nl")}
    <h1 data-r>Van één lijn <span class="y">tot een af gebouw.</span></h1>
    <p class="lead" data-r>Architectonisch ontwerp, interieurontwerp, tekeningen en vergunningen, bouw en sleutelklare oplevering met onze teams in Meerlo en Istanbul. We nemen de fase op ons die u nodig hebt, of het hele traject.</p>
  </section>
{blocks}
  <section class="areas" aria-labelledby="gebieden">
    <div class="sec-head" data-r><h2 class="label" id="gebieden">Wat we het meest doen</h2><p class="h">Typische projecten</p></div>
    <ol>
{gebieden}
    </ol>
  </section>
  <section class="qa" aria-labelledby="faq">
    <div class="sec-head" data-r><h2 class="label" id="faq">Veelgestelde vragen</h2><p class="h">Goed om te weten</p></div>
    <div class="faq">
{faq_html(FAQ[:7])}
    </div>
  </section>
""" + footer("nl")


def page_projecten():
    ld = [ORG, crumbs_ld([("Home", "nl/"), ("Projecten", "nl/projecten/")]),
          {"@type": "CollectionPage", "url": f"{SITE}/nl/projecten/", "name": "Projecten", "inLanguage": "nl",
           "about": {"@id": f"{SITE}/#firma"}}]
    items = "\n".join(f"""    <figure class="piece p{i + 1}">
      <div class="frame m-{mat} empty" data-r data-speed="{'0.07' if i % 2 else '-0.04'}"><span>foto's volgen binnenkort</span></div>
      <figcaption class="cap" data-r><h3>{soort.lower()}</h3><small>{dienst}</small></figcaption>
    </figure>""" for i, (mat, soort, dienst) in enumerate(PROJECTEN))
    return head("Projecten: villa's, woningen, kantoren en interieurs | Dimart Architectuur",
                "Villa's, woningen, kantoren en interieurs ontworpen en gebouwd door Dimart Architectuur.",
                "nl/projecten/", ld, "projeler") + f"""  <section class="page-hero">
    {crumbs("Projecten", "nl")}
    <h1 data-r>Geselecteerde <span class="y">projecten.</span></h1>
    <p class="lead" data-r>Woningen, villa's, kantoren en commerciële ruimtes die we hebben ontworpen en gebouwd. We bereiden de projectfotografie voor; per project delen we de locatie, het jaar, de oppervlakte en de diensten die we hebben geleverd.</p>
  </section>
  <section class="works list">
{items}
  </section>
""" + footer("nl")


def page_contact():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "nl/"), ("Contact", "nl/contact/")]),
          {"@type": "ContactPage", "url": f"{SITE}/nl/contact/", "inLanguage": "nl", "about": {"@id": f"{SITE}/#firma"}}]
    return head("Contact | Dimart Architectuur, Meerlo en Istanbul",
                f"Contact met Dimart Architectuur: {NL['tel']}, {FIRMA['eposta']}. Kantoor Nederland: {kantoor_nl()}. Kantoor Istanbul: {f['adres']}, {f['ilce']} / Istanbul.",
                "nl/contact/", ld, "iletisim") + f"""  <section class="page-hero">
    {crumbs("Contact", "nl")}
    <h1 data-r>Laten we over uw project <span class="y">praten.</span></h1>
    <p class="lead" data-r>Bel of mail ons; we luisteren naar wat u nodig hebt en stellen een werkwijze en planning voor. U bent ook welkom op ons kantoor in Meerlo of Istanbul. We spreken Nederlands, Engels en Turks.</p>
  </section>
  <section class="split">
    <dl class="meta reg big" data-r>
      <div><dt>telefoon</dt><dd><a href="tel:{NL['tel_link']}">{NL['tel']}</a> (Nederland)<br><a href="tel:{f['tel_link']}">{f['tel']}</a> (Turkije)</dd></div>
      <div><dt>e-mail</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
      <div><dt>kantoor Nederland</dt><dd>{NL['adres']},<br>{NL['pk']} {NL['il']}</dd></div>
      <div><dt>kantoor Istanbul</dt><dd>{f['adres']},<br>{f['pk']} {f['ilce']} / Istanbul, Turkije</dd></div>
      <div><dt>instagram</dt><dd><a href="{INSTAGRAM}" rel="noopener me" target="_blank">@dimartmimarlik</a></dd></div>
    </dl>
    <div class="prose" data-r>
      <p class="label">Voor het eerste gesprek</p>
      <p>Hebt u ze bij de hand, dan maken bestaande tekeningen, het bestemmingsplan van uw perceel en foto's van ruimtes die u mooi vindt het eerste gesprek veel productiever.</p>
      <p class="links"><a class="go" href="tel:{NL['tel_link']}">Bel ons</a><a class="go" href="mailto:{f['eposta']}">Stuur een e-mail</a></p>
    </div>
  </section>
""" + footer("nl")


def page_privacy():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "nl/"), ("Privacy", "nl/privacy/")]),
          {"@type": "WebPage", "url": f"{SITE}/nl/privacy/", "name": "Privacyverklaring", "inLanguage": "nl",
           "about": {"@id": f"{SITE}/#firma"}, "dateModified": "2026-10-23"}]
    return head("Privacyverklaring | Dimart Architectuur",
                "Hoe Dimart Mimarlık ve Müteahhitlik A.Ş. persoonsgegevens verwerkt, plus onze cookieverklaring.",
                "nl/privacy/", ld, "kvkk") + f"""  <article class="post legal-page">
    <header class="post-head">
      {crumbs("Privacy", "nl")}
      <h1 data-r>Privacy<span class="y">verklaring</span></h1>
      <p class="post-meta" data-r><span>Laatst bijgewerkt: 23 oktober 2026</span></p>
    </header>
    <div class="post-body">
      <div class="prose post-text" data-r>
<p>Deze verklaring legt uit hoe {f['unvan']} ("Dimart") uw persoonsgegevens verwerkt. Voor gegevens die via ons kantoor in Nederland worden verwerkt, geldt de Algemene Verordening Gegevensbescherming (AVG); voor ons kantoor in Turkije de Turkse wet bescherming persoonsgegevens nr. 6698 (KVKK, zie de <a href="/kvkk/" hreflang="tr" lang="tr">Turkse tekst</a>).</p>

<h2>Verwerkingsverantwoordelijke</h2>
<p>{f['unvan']}<br>Kantoor Nederland: {kantoor_nl()}<br>Kantoor Turkije: {f['adres']}, {f['pk']} {f['ilce']} / Istanbul<br>E-mail: <a href="mailto:{f['eposta']}">{f['eposta']}</a> · Telefoon: <a href="tel:{NL['tel_link']}">{NL['tel']}</a></p>

<h2>Welke gegevens we verwerken</h2>
<ul>
<li><strong>Identiteit en contactgegevens:</strong> naam, telefoonnummer en e-mailadres die u deelt wanneer u ons belt of mailt.</li>
<li><strong>Projectgegevens:</strong> adres, eigendomsgegevens, bestemmingsplan, tekeningen en foto's die u deelt voor een offerte of project.</li>
<li><strong>Contract- en financiële gegevens:</strong> contract-, factuur- en betaalgegevens als we gaan samenwerken.</li>
<li><strong>Technische logbestanden:</strong> IP-adres, browsergegevens en tijdstip, voor de beveiliging bijgehouden door de infrastructuur waarop deze site draait.</li>
</ul>
<p>Deze site heeft geen contactformulier, gebruikersaccounts, advertenties of bezoekersstatistieken.</p>

<h2>Waarom en op welke grondslag</h2>
<ul>
<li>Uw vragen beantwoorden, opnames doen en offertes opstellen (uitvoering van een overeenkomst).</li>
<li>Ontwerp-, teken-, vergunnings- en bouwwerk uitvoeren (uitvoering van een overeenkomst).</li>
<li>Voldoen aan fiscale, administratieve en bouwregelgeving (wettelijke verplichting).</li>
<li>De site veilig houden en misbruik voorkomen (gerechtvaardigd belang).</li>
</ul>

<h2>Met wie we gegevens delen</h2>
<p>Alleen voor de doelen hierboven en alleen voor zover nodig: met gemeenten, bouwtoezicht en andere overheidsinstanties voor vergunningen; met adviseurs en specialisten met wie we het project uitvoeren; en met onze boekhouder voor financiële verplichtingen.</p>
<p>Onze e-maildienst (Google Workspace) en de hostinginfrastructuur van deze site (Cloudflare) zijn dienstverleners met servers buiten de Europese Economische Ruimte. Doorgifte via deze diensten vindt plaats op basis van passende waarborgen, zoals de standaardcontractbepalingen van de Europese Commissie.</p>

<h2>Hoe lang we gegevens bewaren</h2>
<p>We bewaren uw gegevens zolang het doel dat vereist en gedurende de wettelijke bewaartermijnen. Daarna verwijderen of anonimiseren we ze.</p>

<h2>Uw rechten</h2>
<p>U hebt het recht op inzage, rectificatie, verwijdering, beperking van de verwerking, gegevensoverdraagbaarheid en bezwaar. U kunt verzoeken sturen naar <a href="mailto:{f['eposta']}">{f['eposta']}</a>; we reageren binnen een maand. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.</p>

<h2>Cookies</h2>
<p>Deze site gebruikt geen cookies. Uw muziekvoorkeur en uw tekening op de Tekentafel worden alleen in de lokale opslag van uw eigen browser bewaard; ze worden niet naar ons of derden gestuurd en u kunt ze verwijderen via uw browserinstellingen. Lettertypes en muziek komen van de eigen server van deze site.</p>
<p>Wanneer u de links naar Instagram of Google Maps volgt, geldt het privacybeleid van dat platform.</p>
      </div>
    </div>
  </article>
""" + footer("nl")


PAGES = {
    "nl/index.html": page_home,
    "nl/studio/index.html": page_studio,
    "nl/diensten/index.html": page_diensten,
    "nl/projecten/index.html": page_projecten,
    "nl/contact/index.html": page_contact,
    "nl/privacy/index.html": page_privacy,
}
