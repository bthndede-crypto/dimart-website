"""İngilizce sayfalar (/en/). build.py'nin kabuğunu kullanır; build.py çalışırken içe aktarılır."""
import build as b
from build import FIRMA, HARITA, INSTAGRAM, NL, ORG, SITE, crumbs, crumbs_ld, faq_html, faq_ld, footer, frame, head, words

SERVICES = [
    ("Architectural design", "mimari-tasarim",
     "Needs analysis, concept, schematic design and 3D visualisation.",
     "We start by reading what the site or the existing building can offer. Daily routines of the people who will live or work there, the budget and the zoning conditions sit on the same table, and we shape the concept and schematic design together with you.",
     ["Brief and space programme", "Zoning and site analysis", "Concept design", "Schematic design", "3D visualisation", "Materials and colour palette"]),
    ("Interior design", "ic-mimarlik",
     "Interior design and fit-out for homes, offices and commercial spaces.",
     "We bring light, texture and use together in a single line. From space planning to bespoke furniture, from lighting to material selection, every decision comes with its construction detail, and our own team builds everything we draw.",
     ["Space planning", "Bespoke furniture", "Lighting design", "Material selection", "Construction details", "Renovation and refurbishment"]),
    ("Drawings and permits", "proje-ve-ruhsat",
     "Construction drawings, consultant coordination and municipal building permits.",
     "We prepare the architectural construction drawings and coordinate them with the structural, mechanical and electrical designs. We follow the process from the municipal application until the building permit is granted.",
     ["Architectural construction drawings", "Structural and MEP coordination", "Permit application", "Municipal follow-up", "Building inspection coordination", "Occupancy permit"]),
    ("Construction and turnkey delivery", "insaat-anahtar-teslim",
     "Shell and finishing works, site management, turnkey delivery under one contract.",
     "The team that draws also runs the site. Nothing is lost between design and construction; schedule, budget and quality are followed by a single point of contact. If you wish, we take on the whole job from design to occupancy under one contract.",
     ["Shell and core", "Finishing works", "Site management", "Health and safety", "Quality control", "Turnkey delivery"]),
]

AREAS = [
    ("Villas and detached houses", "From plot to keys: design, permits, shell and finishes under one contract. Garden, pool and landscaping can be included."),
    ("Residential and apartment projects", "Architectural design, permits and construction for apartment buildings and small residential developments."),
    ("Home and apartment renovation", "Complete apartment renovation: plumbing, electrics, floors, doors and windows planned together."),
    ("Kitchen and bathroom renovation", "Waterproofing and new plumbing in wet areas, made-to-measure cabinets and worktops, tiles and sanitaryware."),
    ("Office interiors", "Workplace layout, meeting areas, acoustics and lighting; efficient offices that fit your brand."),
    ("Shops, cafés and restaurants", "Concept, construction drawings and fast-track turnkey fit-out for commercial spaces."),
    ("Facades and outdoor spaces", "Facade renovation and insulation, terraces, gardens and entrances."),
]

FAQ = [
    ("What does Dimart Architecture do?",
     "Architectural design, interior design, construction drawings and building permits, construction and turnkey delivery. One team runs the whole process from design to handover."),
    ("Where is Dimart Architecture based?",
     "We have offices in Istanbul and in Meerlo, the Netherlands. You can find the full addresses on the Contact page; for site visits and site management we come to wherever the project is."),
    ("Do you build villas and detached houses?",
     "Yes. For villas and detached houses we take on the whole process as a turnkey job, from design and permits to the shell and the finishing works."),
    ("Do you renovate homes and apartments?",
     "Yes. We carry out complete apartment renovations, kitchen and bathroom renovations, and plumbing and flooring renewals with a clear plan and budget."),
    ("Can I hire you for interior design only?",
     "Yes. We offer interior design and construction drawings as a separate service; if you wish, our own team can also build it."),
    ("Why hire one firm for both design and construction?",
     "Because the team that draws also builds, nothing gets lost between the drawings and the site; decisions, schedule and cost are followed by a single point of contact."),
    ("Do you work with international clients?",
     "Yes. We can meet in English, share drawings and progress reports digitally and run the site on your behalf while you are abroad."),
    ("How do I contact Dimart Architecture?",
     f"Call {FIRMA['tel']} (Türkiye) or {NL['tel']} (Netherlands), or email {FIRMA['eposta']}."),
]

PROCESS = [
    ("Survey", "We visit the plot or the space and clarify the needs and the budget."),
    ("Design", "We shape the concept and the schematic design together."),
    ("Drawings and permits", "We prepare the construction drawings and obtain the permits."),
    ("Construction", "We set up the site and run the work to schedule and budget."),
    ("Handover", "We carry out the final checks and hand over the keys and documents."),
]

PROJECTS = [("traverten", "Residence", "Interior design"), ("siva", "Villa", "Turnkey"),
            ("mese", "Office", "Interior design"), ("kagit", "Residence", "Design and construction")]


def site_ld():
    return {"@type": "WebSite", "@id": f"{SITE}/en/#site", "url": f"{SITE}/en/", "name": "Dimart Architecture",
            "inLanguage": "en", "publisher": {"@id": f"{SITE}/#firma"}}


def page_home():
    ld = [ORG, site_ld(), faq_ld(FAQ)]
    pieces = "\n".join(f"""    <a class="piece p{i + 1}" href="/en/services/#{slug}" data-cursor="View">
      {frame(slug, speed=("0.08" if i % 2 else "-0.05"), lang="en")}
      <div class="cap" data-r><h3>{ad.lower()}</h3><small>{kisa}</small></div>
    </a>""" for i, (ad, slug, kisa, *_) in enumerate(SERVICES))
    steps = "\n".join(f'      <li data-r style="--d:{i}"><span class="n">0{i + 1}</span><h3>{a}</h3><p>{t}</p></li>'
                      for i, (a, t) in enumerate(PROCESS))
    return head("Dimart Architecture | Architects and Builders in Istanbul",
                "Architecture and construction from Istanbul and Meerlo (NL): architectural design, interior design, villa and residential construction, renovation, permits and turnkey delivery, all from one team at Dimart.",
                "en/", ld, "home") + f"""  <section class="hero">
    {frame("eskiz", "hero-frame", "0.06", lang="en")}
    <div class="hero-text" data-r>
      <p class="label">Architecture &amp; construction · Istanbul · Meerlo</p>
      <h1>From design to turnkey, <span class="y">one line.</span></h1>
      <p class="lead">Dimart designs, documents and builds villas, homes, offices and commercial spaces with its teams in Istanbul and Meerlo, the Netherlands. The team that draws also runs the site, so you work with a single point of contact.</p>
      <p class="links"><a class="go" href="/en/contact/">Talk to us</a><a class="go" href="/en/services/">Services</a></p>
    </div>
    <p class="cue" aria-hidden="true">scroll</p>
  </section>

  <section class="works" aria-labelledby="work">
    <h2 class="label" id="work" data-r>Services · from drawing to building</h2>
{pieces}
  </section>

  <section class="say" aria-labelledby="approach">
    <h2 class="label" id="approach" data-r>Approach</h2>
    <p class="statement" data-r>{words("Every building begins with a line. We keep hold of that line from the first sketch to the last key.")}</p>
    <dl class="meta facts" data-r>
      <div><dt>disciplines</dt><dd>Architecture, interiors, construction</dd></div>
      <div><dt>model</dt><dd>One team, one contract</dd></div>
      <div><dt>buildings</dt><dd>Villas, homes, offices, commercial</dd></div>
      <div><dt>offices</dt><dd>Istanbul · Meerlo (NL)</dd></div>
    </dl>
  </section>

  <section class="process" aria-labelledby="process">
    <div class="sec-head" data-r><h2 class="label" id="process">Process</h2><p class="h">Five steps to handover</p></div>
    <ol class="steps">
      <i class="steps-line" aria-hidden="true"></i>
{steps}
    </ol>
  </section>

  <section class="qa" aria-labelledby="faq">
    <div class="sec-head" data-r><h2 class="label" id="faq">Frequently asked questions</h2><p class="h">Good to know</p></div>
    <div class="faq">
{faq_html(FAQ)}
    </div>
  </section>
""" + footer("en")


def page_studio():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "en/"), ("Studio", "en/studio/")]),
          {"@type": "AboutPage", "url": f"{SITE}/en/studio/", "inLanguage": "en", "about": {"@id": f"{SITE}/#firma"}}]
    return head("Studio: architecture and construction firm in Istanbul | Dimart Architecture",
                "About Dimart Mimarlık ve Müteahhitlik A.Ş.: an Istanbul-based studio bringing design, drawings, permits and construction together in one team.",
                "en/studio/", ld, "studyo") + f"""  <section class="page-hero">
    {crumbs("Studio", "en")}
    <h1 data-r>We draw it, <span class="y">and we build it.</span></h1>
    <p class="lead" data-r>Dimart Mimarlık ve Müteahhitlik is an architecture and construction studio based in Istanbul, with a second office in Meerlo, the Netherlands. It brings architectural design, interior design and construction together in one team.</p>
  </section>
  <section class="split">
    {frame("ic-mimarlik", "", "0.05", lang="en")}
    <div class="prose" data-r>
      <p class="statement sm">{words("A good space happens when the line on paper and the wall on site come from the same hand.")}</p>
      <p>In many projects the design is done in one office and the construction by another firm. Details get lost in between, costs drift, and the burden of every decision falls on you.</p>
      <p>We were founded to close that gap. <strong>Design, drawings, permits and construction are run by the same team.</strong> We draw every detail knowing how it will be built on site, and we solve every situation on site in the language of the design.</p>
      <p>We love warm, calm and long-lasting spaces: the right proportions, honest materials, good light.</p>
    </div>
  </section>
  <section class="split rev" aria-labelledby="way">
    <div data-r><h2 class="label" id="way">How we work</h2><p class="h">We draw in the office and build on site</p></div>
    <dl class="meta reg" data-r>
      <div><dt>Istanbul office</dt><dd>{f['adres']}, {f['pk']} {f['ilce']} / Istanbul</dd></div>
      <div><dt>Netherlands office</dt><dd>{NL['adres']}, {NL['pk']} {NL['il']}, the Netherlands</dd></div>
      <div><dt>building types</dt><dd>Villas, detached houses, residential, offices, commercial and hospitality</dd></div>
      <div><dt>way of working</dt><dd>Surveys and site management on location, design and coordination in our Istanbul and Meerlo offices</dd></div>
      <div><dt>languages</dt><dd>Turkish, English and Dutch</dd></div>
    </dl>
  </section>
""" + footer("en")


def page_services():
    svc_ld = [{"@type": "Service", "@id": f"{SITE}/en/services/#{slug}", "name": ad, "description": uzun,
               "provider": {"@id": f"{SITE}/#firma"}, "areaServed": ORG["areaServed"]}
              for ad, slug, kisa, uzun, _ in SERVICES]
    ld = [ORG, crumbs_ld([("Home", "en/"), ("Services", "en/services/")])] + svc_ld + [faq_ld(FAQ[:7])]
    areas = "\n".join(f'      <li data-r style="--d:{i % 3}"><span class="n">{i + 1:02d}</span><h3>{a}</h3><p>{t}</p></li>'
                      for i, (a, t) in enumerate(AREAS))
    blocks = "\n".join(f"""  <article class="svc{' rev' if i % 2 else ''}" id="{slug}">
    <div class="svc-text" data-r>
      <p class="label">{i + 1:02d} / {len(SERVICES):02d}</p>
      <h2>{ad}</h2>
      <p>{uzun}</p>
      <dl class="meta">
        <div><dt>scope</dt><dd>{' · '.join(items)}</dd></div>
      </dl>
    </div>
    {frame(slug, "", "0.06", lang="en")}
  </article>""" for i, (ad, slug, kisa, uzun, items) in enumerate(SERVICES))
    return head("Services: architecture, interior design, permits and turnkey construction | Dimart Architecture",
                "Dimart Architecture services in Istanbul: architectural design, interior design, villa and residential construction, renovation, office and retail interiors, permits and turnkey delivery.",
                "en/services/", ld, "hizmetler") + f"""  <section class="page-hero">
    {crumbs("Services", "en")}
    <h1 data-r>From a single line <span class="y">to a finished building.</span></h1>
    <p class="lead" data-r>Architectural design, interior design, drawings and permits, construction and turnkey delivery with our Istanbul-based team. We take on the stage you need, or the whole process.</p>
  </section>
{blocks}
  <section class="areas" aria-labelledby="areas">
    <div class="sec-head" data-r><h2 class="label" id="areas">What we do most</h2><p class="h">Typical projects</p></div>
    <ol>
{areas}
    </ol>
  </section>
  <section class="qa" aria-labelledby="faq">
    <div class="sec-head" data-r><h2 class="label" id="faq">Frequently asked questions</h2><p class="h">Good to know</p></div>
    <div class="faq">
{faq_html(FAQ[:7])}
    </div>
  </section>
""" + footer("en")


def page_projects():
    ld = [ORG, crumbs_ld([("Home", "en/"), ("Projects", "en/projects/")]),
          {"@type": "CollectionPage", "url": f"{SITE}/en/projects/", "name": "Projects", "inLanguage": "en",
           "about": {"@id": f"{SITE}/#firma"}}]
    items = "\n".join(f"""    <figure class="piece p{i + 1}">
      <div class="frame m-{mat} empty" data-r data-speed="{'0.07' if i % 2 else '-0.04'}"><span>photos coming soon</span></div>
      <figcaption class="cap" data-r><h3>{tur.lower()}</h3><small>{hizmet}</small></figcaption>
    </figure>""" for i, (mat, tur, hizmet) in enumerate(PROJECTS))
    return head("Projects: villas, homes, offices and interiors | Dimart Architecture",
                "Villas, homes, offices and interiors designed and built by Dimart Architecture in Istanbul.",
                "en/projects/", ld, "projeler") + f"""  <section class="page-hero">
    {crumbs("Projects", "en")}
    <h1 data-r>Selected <span class="y">projects.</span></h1>
    <p class="lead" data-r>Homes, villas, offices and commercial spaces we have designed and built. We are preparing the project photography; for each project we will share the location, year, area and the services we provided.</p>
  </section>
  <section class="works list">
{items}
  </section>
""" + footer("en")


def page_contact():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "en/"), ("Contact", "en/contact/")]),
          {"@type": "ContactPage", "url": f"{SITE}/en/contact/", "inLanguage": "en", "about": {"@id": f"{SITE}/#firma"}}]
    return head("Contact | Dimart Architecture, Istanbul and Meerlo (NL)",
                f"Contact Dimart Architecture: {f['tel']}, {NL['tel']}, {f['eposta']}. Offices in Istanbul and at {NL['adres']}, {NL['pk']} {NL['il']}, the Netherlands.",
                "en/contact/", ld, "iletisim") + f"""  <section class="page-hero">
    {crumbs("Contact", "en")}
    <h1 data-r>Let's talk about <span class="y">your project.</span></h1>
    <p class="lead" data-r>Call us or send an email; we will listen to what you need and suggest a process and a schedule. You are also welcome at our offices in Istanbul and Meerlo. We speak Turkish, English and Dutch.</p>
  </section>
  <section class="split">
    <dl class="meta reg big" data-r>
      <div><dt>phone</dt><dd><a href="tel:{f['tel_link']}">{f['tel']}</a> (Türkiye)<br><a href="tel:{NL['tel_link']}">{NL['tel']}</a> (Netherlands)</dd></div>
      <div><dt>email</dt><dd><a href="mailto:{f['eposta']}">{f['eposta']}</a></dd></div>
      <div><dt>Istanbul office</dt><dd>{f['adres']},<br>{f['pk']} {f['ilce']} / Istanbul, Türkiye</dd></div>
      <div><dt>Netherlands office</dt><dd>{NL['adres']},<br>{NL['pk']} {NL['il']}, the Netherlands</dd></div>
      <div><dt>map</dt><dd><a href="{HARITA}" rel="noopener" target="_blank">Open in Google Maps</a></dd></div>
      <div><dt>instagram</dt><dd><a href="{INSTAGRAM}" rel="noopener me" target="_blank">@dimartmimarlik</a></dd></div>
    </dl>
    <div class="prose" data-r>
      <p class="label">Before we meet</p>
      <p>If you have them, the title deed or zoning status document, existing drawings and photos of spaces you like make the first meeting much more productive.</p>
      <p class="links"><a class="go" href="tel:{f['tel_link']}">Call now</a><a class="go" href="mailto:{f['eposta']}">Send an email</a></p>
    </div>
  </section>
""" + footer("en")


def page_privacy():
    f = FIRMA
    ld = [ORG, crumbs_ld([("Home", "en/"), ("Privacy", "en/privacy/")]),
          {"@type": "WebPage", "url": f"{SITE}/en/privacy/", "name": "Privacy notice", "inLanguage": "en",
           "about": {"@id": f"{SITE}/#firma"}, "dateModified": "2026-10-22"}]
    return head("Privacy notice | Dimart Architecture",
                "How Dimart Mimarlık ve Müteahhitlik A.Ş. processes personal data under the Turkish Personal Data Protection Law (KVKK), plus our cookie notice.",
                "en/privacy/", ld, "kvkk") + f"""  <article class="post legal-page">
    <header class="post-head">
      {crumbs("Privacy", "en")}
      <h1 data-r>Privacy <span class="y">notice</span></h1>
      <p class="post-meta" data-r><span>Last updated: 22 October 2026</span></p>
    </header>
    <div class="post-body">
      <div class="prose post-text" data-r>
<p>This notice explains how {f['unvan']} ("Dimart") processes your personal data under Article 10 of the Turkish Personal Data Protection Law No. 6698 (KVKK). The <a href="/kvkk/" hreflang="tr" lang="tr">Turkish version</a> is the binding text.</p>

<h2>Data controller</h2>
<p>{f['unvan']}<br>{f['adres']}, {f['pk']} {f['ilce']} / Istanbul, Türkiye<br>Email: <a href="mailto:{f['eposta']}">{f['eposta']}</a> · Phone: <a href="tel:{f['tel_link']}">{f['tel']}</a></p>

<h2>What data we process</h2>
<ul>
<li><strong>Identity and contact details:</strong> the name, phone number and email address you share when you call or email us.</li>
<li><strong>Project information:</strong> the address, title deed, zoning status, drawings and photos you share for a proposal or project.</li>
<li><strong>Contract and financial information:</strong> contract, invoice and payment details if we start working together.</li>
<li><strong>Technical logs:</strong> IP address, browser details and access time kept for security purposes by the infrastructure hosting this site.</li>
</ul>
<p>This site has no contact form, user accounts, advertising or visitor analytics tools.</p>

<h2>Why and on what legal basis</h2>
<ul>
<li>To answer your requests, carry out surveys and prepare proposals (KVKK Art. 5/2-c: entering into a contract).</li>
<li>To carry out design, drawings, permit and construction work (KVKK Art. 5/2-c).</li>
<li>To meet obligations under tax, invoicing and zoning legislation (KVKK Art. 5/2-ç: legal obligation).</li>
<li>To keep the site secure and prevent misuse (KVKK Art. 5/2-f: legitimate interest).</li>
</ul>

<h2>Who we share it with</h2>
<p>Only for the purposes above and only as far as needed: municipalities, building inspection firms and other public authorities for permits; the consultants and specialists we work with to carry out the project; and our accountant for financial obligations.</p>
<p>Our email service (Google Workspace) and the hosting infrastructure of this site (Cloudflare) are service providers with servers outside Türkiye. Transfers through these services are made in line with Article 9 of the KVKK.</p>

<h2>How long we keep it</h2>
<p>We keep your data for as long as the purpose requires and for the retention periods set by law, after which we delete, destroy or anonymise it.</p>

<h2>Your rights</h2>
<p>Under Article 11 of the KVKK you have the right to learn whether your data is processed, to request information about it, to learn the purpose of processing, to know the third parties it is transferred to, to request correction or deletion, to object to a result against you arising from automated analysis and to claim compensation for damage caused by unlawful processing.</p>
<p>You can send requests to <a href="mailto:{f['eposta']}">{f['eposta']}</a> or in writing to the address above. We respond free of charge within 30 days at the latest.</p>

<h2>Cookies</h2>
<p>This site does not use cookies. Your music preference and your drawing on the Drawing table are stored only in your own browser's local storage; they are not sent to us or to third parties and can be deleted from your browser settings. Fonts and music are served from this site's own server.</p>
<p>When you follow the Instagram or Google Maps links, that platform's own privacy policy applies.</p>
      </div>
    </div>
  </article>
""" + footer("en")


PAGES = {
    "en/index.html": page_home,
    "en/studio/index.html": page_studio,
    "en/services/index.html": page_services,
    "en/projects/index.html": page_projects,
    "en/contact/index.html": page_contact,
    "en/privacy/index.html": page_privacy,
}
