"""Blog yazıları. Hepsi Dimart için özgün yazılmıştır; başka sitelerden alıntı yoktur.

Her yazı: slug, başlık, açıklama, tarih, kategori, çizim (CIZIMLER anahtarı), kısa cevap (özet), gövde HTML'i, SSS.
Yeni yazı eklemek için listeye bir sözlük ekleyip `python3 tools/build.py` çalıştırmak yeterli.
"""

YAZILAR = [
    {
        "slug": "banyo-tadilati-nasil-yapilir",
        "baslik": "Banyo tadilatı nasıl yapılır? Adım adım süreç, su yalıtımı ve malzeme seçimi",
        "kisa": "Banyo tadilatı",
        "aciklama": "Banyo tadilatında söküm, tesisat, su yalıtımı, seramik, dolap, ayna ve aydınlatma adımları; en sık yapılan hatalar ve süreyi etkileyen konular. Ataşehir'deki banyo uygulamamızdan fotoğrafla.",
        "tarih": "2026-11-10",
        "kategori": "Tadilat",
        "cizim": "ic-mimarlik",
        "foto": ("atasehir", "atasehir-banyo"),
        "ozet": "Banyo tadilatı söküm, tesisat, su yalıtımı, seramik, vitrifiye ve aydınlatma adımlarıyla ilerler. En önemli ve sonradan düzeltmesi en zor adım su yalıtımıdır; seramiğin altında kaldığı için görünmez ama banyonun ömrünü belirler. Planı en başta netleştirmek, yani duşun, lavabonun ve klozetin yerini, dolap ölçülerini ve aydınlatmayı söküme başlamadan çizmek, hem süreyi hem bütçeyi korur.",
        "govde": """
<h2>1. Plan ve ölçü</h2>
<p>Banyo küçük bir alandır ama her santimetresi önemlidir. Söküme başlamadan önce duşun, lavabonun ve klozetin yeri, dolapların ölçüsü, prizler ve aydınlatma bir plana çizilir. Gider yerleri değişecekse eğimin yeterli olup olmadığı kontrol edilir. Duş teknesi yerine zemine gömme (sıfır eşikli) duş isteniyorsa zemin kotu buna göre hazırlanır.</p>

<h2>2. Söküm ve tesisat</h2>
<p>Eski seramikler, vitrifiyeler ve gerekiyorsa sıva sökülür. Eski binalarda temiz ve pis su borularının da yenilenmesi önerilir; seramik döşendikten sonra borunun değişmesi bütün işi baştan yapmak demektir. Elektrik hattı, ıslak hacim kurallarına uygun şekilde ve kaçak akım rölesiyle korunarak yenilenir.</p>

<h2>3. Su yalıtımı</h2>
<p>Banyonun en kritik adımıdır. Zeminin tamamına ve duş alanında duvarların yukarıya kadar sürme yalıtım uygulanır; köşeler ve gider çevreleri file ya da bantla güçlendirilir. Uygulamadan sonra bir su testi yapmak, olası bir sızıntıyı seramik döşenmeden görmeyi sağlar.</p>

<h2>4. Seramik ve derz</h2>
<p>Büyük ebatlı seramikler daha az derz, daha sakin bir yüzey demektir; ancak zeminin düzgün olması gerekir. Duş zemininde kaymaz yüzeyli malzeme seçilir. Ataşehir'deki banyoda duş duvarında desenli büyük plakalar, diğer duvarlarda sade bir yüzey kullandık; desen tek bir duvarda kalınca banyo kalabalık görünmüyor.</p>

<h2>5. Dolap, ayna ve aydınlatma</h2>
<ul>
<li><strong>Lavabo dolabı:</strong> asma dolaplar zemini açık bırakır, temizliği kolaylaştırır ve banyoyu ferah gösterir. Ahşap görünümlü kapaklar soğuk bir mekânı ısıtır.</li>
<li><strong>Boy dolabı:</strong> havlu ve temizlik malzemeleri için tavana yakın uzanan ince bir dolap, küçük banyoda büyük fark yaratır.</li>
<li><strong>Ayna:</strong> arkadan aydınlatmalı bir ayna hem yüzü gölgesiz aydınlatır hem de akşam ışığı olarak kullanılır.</li>
<li><strong>Aydınlatma:</strong> tavanda ıslak hacme uygun gömme spotlar, aynada yüz aydınlatması; iki ayrı devre banyoyu sabah ve akşam için ayrı ayarlamanızı sağlar.</li>
</ul>

<h2>Ne kadar sürer?</h2>
<p>Malzemeler önceden seçilip sipariş edildiyse, ortalama bir banyo tadilatı genellikle birkaç haftada tamamlanır. Süreyi en çok malzemenin gecikmesi, sökümde çıkan sürprizler (çürük boru, bozuk şap) ve yalıtımın kuruma süresi etkiler. Apartmanlarda gürültülü işler için yönetim kurallarına ve çalışma saatlerine uymak gerekir.</p>
""",
        "sss": [
            ("Banyo tadilatında en önemli adım hangisi?",
             "Su yalıtımı. Seramiğin altında kaldığı için görünmez ama sızıntı olursa bütün banyoyu yeniden sökmek gerekir. Uygulamadan sonra su testi yapılması önerilir."),
            ("Eski seramiğin üstüne yeni seramik döşenebilir mi?",
             "Bazı durumlarda mümkün ama önerilmez. Alttaki yüzeyin sağlamlığı ve yalıtımı bilinmez, zemin kotu yükselir ve kapı altında sorun çıkarabilir. Söküp yalıtımı yenilemek daha güvenlidir."),
            ("Duş teknesi mi, zemine gömme duş mu?",
             "Zemine gömme duş daha ferah ve modern görünür, ancak zeminde eğim ve gider için yeterli yükseklik gerekir. Uygun değilse ince, zemine yakın bir duş teknesi iyi bir alternatiftir."),
        ],
    },
    {
        "slug": "mutfak-yenileme-rehberi",
        "baslik": "Mutfak yenileme rehberi: yerleşim, dolap, tezgah ve aydınlatma seçimi",
        "kisa": "Mutfak yenileme",
        "aciklama": "Mutfak yenilerken çalışma üçgeni ve yerleşim, dolap kapağı ve gövde malzemesi, tezgah seçenekleri, tezgah arası kaplama ve aydınlatma üzerine pratik bir rehber. Ataşehir ve Yalova'daki uygulamalarımızdan fotoğraflarla.",
        "tarih": "2026-11-10",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "foto": ("atasehir", "atasehir-mutfak"),
        "ozet": "İyi bir mutfak önce doğru yerleşimle başlar: evye, ocak ve buzdolabı arasındaki yol kısa ve engelsiz olmalıdır. Ardından dolap gövdesi ve kapakları, tezgah, tezgah arası kaplama ve aydınlatma seçilir. Beyaz ve açık renk dolaplar küçük mutfağı ferah gösterir; tezgah altı aydınlatma ise çalışmayı kolaylaştırır ve akşamları mekâna sıcaklık katar.",
        "govde": """
<h2>Yerleşim: çalışma üçgeni</h2>
<p>Mutfakta en çok gidip gelinen üç nokta evye, ocak ve buzdolabıdır. Bu üç nokta arasındaki yol kısa ve engelsiz olmalı; ama birbirine de yapışık olmamalıdır. Evye ile ocak arasında rahat bir hazırlık tezgahı kalması gerekir. Düz (tek duvar), L, U ya da adalı yerleşim, mutfağın ölçüsüne ve evin geri kalanıyla ilişkisine göre seçilir.</p>

<h2>Açık mutfak mı, kapalı mutfak mı?</h2>
<p>Açık mutfak salonla birleşir, evi büyük gösterir ve sosyal bir yaşam sunar; ancak koku ve gürültü için güçlü bir davlumbaz ve düzenli bir tezgah ister. Ataşehir'deki dairede açık mutfağı salona bakan bir yemek masasıyla bağladık; siyah sarkıt lambalar masanın yerini işaretliyor.</p>

<h2>Dolap gövdesi ve kapaklar</h2>
<ul>
<li><strong>Gövde:</strong> özellikle evye altında neme dayanıklı gövde malzemesi seçilmelidir.</li>
<li><strong>Kapak:</strong> lake kapaklar pürüzsüz ve şık görünür ama darbeye karşı özen ister; membran ve laminat kapaklar daha dayanıklı ve ekonomiktir.</li>
<li><strong>Üst dolaplar:</strong> tavana kadar uzanan üst dolaplar toz tutacak boşluk bırakmaz ve depolamayı artırır.</li>
<li><strong>Donanım:</strong> frenli menteşe ve tam açılan çekmece rayları, mutfağın her gün nasıl kullanıldığını değiştirir.</li>
</ul>

<h2>Tezgah ve tezgah arası</h2>
<p>Tezgah, mutfağın en çok yıpranan yüzeyidir. Kuvars kompozit ve porselen tezgahlar leke ve çizilmeye dayanıklıdır; doğal taş eşsiz bir görünüm sunar ama bakım ister. Tezgah arasında seramik, cam ya da tezgahla aynı malzeme kullanılabilir. Yalova'daki çiftlik evinde turuncu tuğla görünümlü seramik ve terrazzo zemin, beyaz dolaplara sıcak bir zemin hazırladı.</p>

[[foto:kazimiye-yalova/kazimiye-yalova-tezgah]]

<h2>Aydınlatma</h2>
<p>Tavandaki genel ışık tek başına yetmez; üst dolapların altına yerleştirilen LED şerit tezgahı gölgesiz aydınlatır. Yemek masası ya da ada üzerinde sarkıt lambalar hem işlevsel hem dekoratiftir. Sıcak beyaz ışık mutfağı salonla aynı atmosferde buluşturur.</p>

<h2>Sıralama ve süre</h2>
<p>Mutfak yenilemede sıra genellikle şöyledir: ölçü ve proje, söküm, tesisat ve elektrik, duvar ve zemin, dolap montajı, tezgah ölçüsü ve montajı, tezgah arası kaplama, cihazlar. Tezgah, dolaplar monte edildikten sonra ölçülür; bu yüzden süreç planlanırken tezgahın üretim süresi hesaba katılmalıdır.</p>
""",
        "sss": [
            ("Küçük mutfak nasıl ferah gösterilir?",
             "Açık renk ve kulpsuz kapaklar, tavana kadar uzanan üst dolaplar, tezgah altı aydınlatma ve sade bir tezgah arası kaplama küçük mutfağı daha geniş gösterir."),
            ("Mutfak tezgahı için hangi malzeme daha dayanıklı?",
             "Kuvars kompozit ve porselen tezgahlar leke, ısı ve çizilmeye karşı dayanıklıdır. Doğal taş daha özel görünür ama düzenli bakım ister."),
            ("Mutfak yenilemede tezgah ne zaman ölçülür?",
             "Alt dolaplar monte edildikten sonra. Böylece tezgah duvarların gerçek ölçüsüne göre kesilir; üretim süresi de takvimde hesaba katılmalıdır."),
        ],
    },
    {
        "slug": "antre-ve-ayakkabilik-tasarimi",
        "baslik": "Antre ve ayakkabılık tasarımı: küçük girişte düzen, depolama ve ilk izlenim",
        "kisa": "Antre tasarımı",
        "aciklama": "Ev girişinde ayakkabılık, vestiyer, ayna, aydınlatma ve ısmarlama dolap fikirleri; küçük antreyi derli toplu ve ferah gösterme yolları. Tuzla ve Ataşehir'deki uygulamalarımızdan fotoğraflarla.",
        "tarih": "2026-11-10",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "foto": ("tuzla", "tuzla-antre-ayakkabilik"),
        "ozet": "Antre evin ilk izlenimidir ve en çok dağılan yeridir. Ölçüye göre yapılmış bir ayakkabılık, ceketler için kapalı bir vestiyer, bir ayna ve sıcak bir ışık girişi derli toplu tutar. Kulpsuz kapaklar ve duvara asılan dolaplar dar antreyi ferah gösterir; dolabın üstü anahtar ve çanta için küçük bir tezgaha dönüşür.",
        "govde": """
<h2>Önce ihtiyaç listesi</h2>
<p>Evde kaç kişi yaşıyor, kaç çift ayakkabı her gün kullanılıyor, mont ve şemsiyeler nereye konuyor, çocuk arabası ya da bisiklet var mı? Bu sorular antrenin ne kadar depolama istediğini gösterir. Mevsimlik ayakkabılar antre yerine başka bir dolapta durabilir; girişte yalnızca günlük kullanılanlar kalmalıdır.</p>

<h2>Ayakkabılık</h2>
<ul>
<li><strong>Derinlik:</strong> ayakkabıları eğimli raflara yerleştiren ince ayakkabılıklar dar koridorlarda yer kazandırır.</li>
<li><strong>Havalandırma:</strong> kapaklarda küçük boşluklar ya da arkada havalandırma payı bırakmak koku oluşmasını önler.</li>
<li><strong>Yükseklik:</strong> bel hizasında biten bir ayakkabılığın üstü anahtar, posta ve çanta için tezgah olur.</li>
</ul>
<p>Tuzla'daki projede beyaz kapaklı ayakkabılığı koyu ahşap bir çerçeveyle sardık; çerçeve dolabı mobilya gibi gösteriyor, beyaz kapaklar ise dar girişi aydınlık tutuyor.</p>

<h2>Vestiyer ve kapalı dolap</h2>
<p>Açık askılar pratiktir ama kısa sürede kalabalık görünür. Mümkünse ceketler için kapaklı, boy dolabı şeklinde bir vestiyer yapılmalıdır. Duvara gömülü ya da tavana kadar uzanan dolaplar, antrede yerden kazanılmış bir oda gibi çalışır. Ismarlama dolaplarda iç düzen de ihtiyaca göre çizilir; aynı yaklaşımı Ataşehir'deki makyaj masasında da kullandık.</p>

[[foto:atasehir/atasehir-makyaj-masasi]]

<h2>Ayna ve ışık</h2>
<p>Girişte bir ayna hem çıkmadan önce son bakış için gereklidir hem de dar antreyi iki kat geniş gösterir. Yuvarlak aynalar köşeli dolapları yumuşatır. Aydınlatmada tavandaki spotlara ek olarak dolabın altına ya da aynanın arkasına yerleştirilen gizli bir ışık, eve gece girildiğinde yumuşak bir karşılama sağlar.</p>

<h2>Zemin</h2>
<p>Antre zemini dışarıdan gelen kir ve suyla ilk karşılaşan yüzeydir. Kolay temizlenen seramik ya da taş, ahşap zeminli bir evde bile girişte iyi bir tercihtir. İki zeminin birleştiği çizgi kapı hizasında ya da dolabın bittiği yerde temiz bir şekilde çözülmelidir.</p>
""",
        "sss": [
            ("Dar bir antreye ayakkabılık sığar mı?",
             "Evet. Eğimli raflı ince ayakkabılıklar ya da duvara asılan, zemini boş bırakan modeller dar koridorlara sığar. Ölçüye göre yapılan bir dolap her santimetreyi kullanır."),
            ("Antrede ayna nereye konmalı?",
             "Kapıdan girince görülen ya da dolabın üstüne gelen bir duvara. Ayna hem çıkmadan önce son bakış için kullanılır hem de dar girişi daha geniş gösterir."),
            ("Ayakkabılıkta koku nasıl önlenir?",
             "Kapaklarda küçük havalandırma boşlukları ya da arkada hava payı bırakmak, ıslak ayakkabıları dolaba koymadan önce kurutmak ve rafları düzenli silmek yeterlidir."),
        ],
    },
    {
        "slug": "perde-tul-ve-jaluzi-secimi",
        "baslik": "Perde, tül ve jaluzi seçimi: gömme perde rayı, doğru ölçü ve kumaş",
        "kisa": "Perde seçimi",
        "aciklama": "Perde, tül, stor ve ahşap jaluzi arasında seçim; tavana gömme perde rayı, perde boyu ve eni nasıl ölçülür, keten ve keten görünümlü kumaşlar, güneş kontrolü. Yalova'daki uygulamamızdan fotoğraflarla.",
        "tarih": "2026-11-10",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "foto": ("yalova-daire", "yalova-daire-perde-detay"),
        "ozet": "Perde, odanın ışığını ve ölçeğini belirler. Tavandan yere kesintisiz inen tüller odayı yüksek gösterir; bunun için perde rayı tavana gömülür ya da tavana yakın monte edilir. Güneş alan pencerelerde ahşap jaluzi ya da stor ışığı ayarlar, keten veya keten görünümlü tüller onu yumuşatır. Perdenin eni pencereden geniş, boyu ise yere değecek kadar olmalıdır.",
        "govde": """
<h2>Önce ışık</h2>
<p>Perde seçmeden önce pencerenin yönüne bakın. Güneye ve batıya bakan odalarda güneş kontrolü öncelik olur: ahşap jaluzi, stor ya da karartma perde. Kuzeye bakan odalarda ise ışığı kesmeyen ince tüller yeterlidir. Yatak odasında karartma, salonda ise gün ışığını süzen bir tül genellikle doğru dengeyi kurar.</p>

<h2>Gömme perde rayı</h2>
<p>Tavana gömülen bir perde rayı, pencerenin üstünde hiçbir mekanizma bırakmaz. Tül tavandan yere kesintisiz iner, oda olduğundan yüksek görünür. Bunun için asma tavanda ya da kartonpiyerin arkasında perde boşluğu planlanmalıdır; bu yüzden gömme ray kararı tadilat sırasında, tavan yapılmadan verilir. Yalova'daki dairede rayları tavana gömerek tülleri tavandan yere indirdik.</p>

[[foto:yalova-daire/yalova-daire-salon-perde]]

<h2>Ölçü nasıl alınır?</h2>
<ul>
<li><strong>En:</strong> perde rayı pencerenin iki yanından taşmalıdır; böylece perde açıldığında camı kapatmaz, pencere daha geniş görünür.</li>
<li><strong>Boy:</strong> tül yere değecek ya da yerin hemen üstünde bitecek şekilde ölçülür. Kısa kalan perde odayı alçak gösterir.</li>
<li><strong>Pile:</strong> perdenin dikiş sıklığı, kumaşın ne kadar dolgun görüneceğini belirler; sık pile daha zengin, seyrek pile daha sade durur.</li>
</ul>

<h2>Kumaş</h2>
<p>Keten ve keten görünümlü kumaşlar ışığı yumuşak ve sıcak süzer, doğal bir doku verir. Saf keten kırışabilir; karışımlı kumaşlar daha kolay bakım ister. Beyaz yerine kırık beyaz ya da bej tonlar ahşap zemin ve duvar renkleriyle daha uyumlu durur.</p>

<h2>Jaluzi ve stor ile birlikte</h2>
<p>Ahşap jaluzi, ışığın açısını ayarlamaya izin verir ve tülle birlikte katmanlı bir pencere oluşturur: gündüz tül, öğle güneşinde jaluzi, gece ikisi birden. Jaluzi ya da stor camın hemen önüne, tül ise onun önüne gelecek şekilde iki ayrı ray planlanmalıdır.</p>
""",
        "sss": [
            ("Perde rayı tavana mı, duvara mı takılmalı?",
             "Tavana gömülen ya da tavana yakın takılan raylar odayı daha yüksek gösterir. Gömme ray, asma tavan ya da kartonpiyer yapılırken planlanmalıdır."),
            ("Tül perdenin boyu ne kadar olmalı?",
             "Yere değecek ya da yerin hemen üstünde bitecek kadar. Pencere pervazında biten kısa perdeler odayı alçak ve dağınık gösterir."),
            ("Salonda jaluzi mi, stor mu, tül mü?",
             "Çoğu salonda katmanlı bir çözüm en iyisidir: ışığı ayarlamak için ahşap jaluzi ya da stor, yumuşatmak için tül. İki ayrı ray buna imkân verir."),
        ],
    },
    {
        "slug": "duvar-citalama-nedir",
        "baslik": "Duvar çıtalama nedir? Çıta panel (boiserie) yaptırmadan önce bilmeniz gerekenler",
        "kisa": "Duvar çıtalama",
        "aciklama": "Duvar çıtalama (boiserie) nedir, hangi odalara yakışır, çıta ölçüsü ve panel oranları nasıl seçilir, malzeme, boya ve uygulama adımları. Ataşehir'deki uygulamamızdan fotoğraflarla.",
        "tarih": "2026-11-09",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "foto": ("atasehir", "atasehir-duvar-citalama"),
        "ozet": "Duvar çıtalama, düz bir duvara ince profillerle çerçeveler çizerek ona klasik bir derinlik kazandırmaktır; Fransızca adıyla boiserie. Güzel görünmesinin sırrı oranlardadır: panellerin genişliği pencere, kapı ve mobilya hizalarıyla birlikte planlanmalı, çıtalar duvarla aynı renge boyanmalıdır. İyi hazırlanmış bir duvarda uygulama birkaç günde biter ve odanın karakterini kalıcı olarak değiştirir.",
        "govde": """
<h2>Çıtalama ne işe yarar?</h2>
<p>Düz, boş bir duvar çoğu zaman odanın en sıkıcı yüzeyidir. Çıtalar bu yüzeye gölge çizgileri ekler; gün boyunca ışık değiştikçe duvar da değişir. Yatak başı, salonun TV duvarı, antre ve yemek odası en çok yakıştığı yerlerdir. Yüksek tavanlı eski binalarda dönemin ruhunu geri getirir, yeni dairelerde ise sade bir mekâna karakter kazandırır.</p>

[[foto:atasehir/atasehir-citalama-detay]]

<h2>Oran her şeydir</h2>
<p>Çıtalamada en sık yapılan hata, duvarı eşit karelere bölmektir. Güzel bir düzen önce duvarın kendisine bakar: pencerenin, kapının, prizlerin ve önüne gelecek mobilyanın yeri. Genellikle duvar yatayda bir alt bant ve bir üst panel olarak ikiye ayrılır; alt bant yaklaşık sandalye sırtı yüksekliğinde biter. Panellerin genişliği birbirine yakın tutulur, kenar boşlukları ise eşitlenir. Çizimini önceden yapmak, uygulamada her şeyin hizalı oturmasını sağlar.</p>

<h2>Çıta ölçüsü ve malzeme</h2>
<ul>
<li><strong>Profil:</strong> standart tavan yüksekliğindeki dairelerde ince ve sade profiller daha zarif durur; kalın, çok kademeli profiller yüksek tavanlı mekânlara yakışır.</li>
<li><strong>Malzeme:</strong> poliüretan ve polistiren çıtalar hafif, nemden az etkilenen ve boyanabilir malzemelerdir; ahşap çıta ise daha sağlamdır ama nemli ortamlarda hareket edebilir.</li>
<li><strong>Köşeler:</strong> çerçevelerin köşeleri gönyeyle 45 derece kesilir; birleşim yerleri macunlanıp zımparalanmazsa boyadan sonra çizgi gibi görünür.</li>
</ul>

<h2>Uygulama adımları</h2>
<p>Önce duvar kontrol edilir: çatlak, kabaran boya ya da nem varsa giderilir, yüzey düzeltilir. Ardından paneller lazerle duvara çizilir. Çıtalar yapıştırıcıyla, gerekirse ince çivilerle sabitlenir. Derzler ve çivi izleri macunlanır, zımparalanır, astar atılır. Son kat boyada çıtalar ve duvar genellikle aynı renge boyanır; böylece desen bağırmaz, gölgesiyle konuşur. Boya için ipek mat ya da yarı mat bir yüzey, toz tutmaz ve silinebilir olduğu için tercih edilir.</p>

<h2>Prizler, aplikler ve kapılar</h2>
<p>Çıtalamaya başlamadan önce elektrik noktalarına karar vermek gerekir. Bir priz ya da aplik çerçevenin tam ortasında veya simetri ekseninde durmalıdır; panelin köşesine denk gelen bir priz bütün düzeni bozar. Kapı ve pencere pervazları da çıtalarla aynı dili konuşacak şekilde seçilir.</p>

<h2>Ne kadar sürer?</h2>
<p>Ortalama büyüklükte bir duvar, hazırlığı yapılmışsa birkaç günde tamamlanır; sürenin çoğu macun, zımpara ve boyanın kuruması içindir. Bütçeyi en çok duvar alanı, profilin cinsi ve duvarın hazırlık ihtiyacı belirler.</p>
""",
        "sss": [
            ("Duvar çıtalama hangi odalara yakışır?",
             "Yatak başı, salonun TV ya da kanepe duvarı, antre ve yemek odası en çok yakıştığı yerlerdir. Tek bir duvarda uygulamak bile odanın karakterini değiştirmeye yeter."),
            ("Çıtalar duvarla aynı renge mi boyanmalı?",
             "Çoğu zaman evet. Aynı renk desenin gölgesiyle görünmesini sağlar ve daha zarif durur. Kontrast renk daha iddialı bir etki verir, sade mekânlarda dikkatli kullanılmalıdır."),
            ("Kiralık evde çıtalama yapılabilir mi?",
             "Yapıştırıcıyla uygulanan hafif çıtalar sökülebilir, ancak sökümden sonra duvarın macun ve boya ile onarılması gerekir. Ev sahibinin onayını almak en doğrusudur."),
        ],
    },
    {
        "slug": "kis-bahcesi-yaptirirken",
        "baslik": "Kış bahçesi yaptırırken dikkat edilecekler: cam, ısı, havalandırma ve döşeme",
        "kisa": "Kış bahçesi",
        "aciklama": "Kış bahçesi ya da camla kapatılan teras yaptırmak isteyenler için cam ve doğrama seçimi, yaz sıcağı ve kış soğuğu, havalandırma, zemin, mobilya ve izin konuları. Tuzla'daki uygulamamızdan fotoğrafla.",
        "tarih": "2026-11-09",
        "kategori": "İç mimarlık",
        "cizim": "mimari-tasarim",
        "foto": ("tuzla", "tuzla-kis-bahcesi"),
        "ozet": "İyi bir kış bahçesi yılın her mevsiminde kullanılan bir odadır; kötüsü ise yazın sera, kışın buzdolabı olur. Farkı yaratan, ısı yalıtımlı cam ve doğrama, gölgeleme, havalandırma ve zemin seçimidir. Cephe ve ortak alanları etkilediği için başlamadan önce yönetim ve belediye kurallarını da kontrol etmek gerekir.",
        "govde": """
<h2>Önce yön ve kullanım</h2>
<p>Kış bahçesinin hangi yöne baktığı her şeyi belirler. Güneye ve batıya bakan bir cam oda kışın güneşi toplar ama yaz öğleden sonraları çok ısınır; kuzey cephesi daha dengeli ama daha serindir. İkinci soru kullanımdır: sabah kahvesi mi, çalışma köşesi mi, yemek alanı mı, bitkiler için bir sera mı? Mobilya, aydınlatma ve priz noktaları bu cevaba göre planlanır.</p>

<h2>Cam ve doğrama</h2>
<ul>
<li><strong>Isı yalıtımlı cam:</strong> çift ya da üç katmanlı, ısı kontrol kaplamalı camlar kışın ısıyı içeride, yazın güneşin bir kısmını dışarıda tutar.</li>
<li><strong>Isı yalıtımlı doğrama:</strong> alüminyum doğramada ısı yalıtım bariyerli (ısı köprüsü kesmeli) profiller seçilmezse çerçeveler kışın terler.</li>
<li><strong>Çatı:</strong> cam çatı güzeldir ama yazın en çok ısıyı oradan alır; kapalı ya da yarı kapalı bir çatı, gölgeleme sistemiyle birlikte çok daha konforludur.</li>
</ul>

<h2>Yazın serinlik, kışın sıcaklık</h2>
<p>Gölgeleme dışarıda olduğunda çok daha etkilidir; tente, jaluzi ya da dış perde güneşi cama ulaşmadan keser. İçeride tül ve stor ışığı yumuşatır. Havalandırma için karşılıklı açılabilen kanatlar ya da tavana yakın bir menfez sıcak havanın kaçmasını sağlar. Kış için zemin altı ısıtma ya da duvar dibine yerleştirilen ince radyatörler camın soğuğunu dengeler.</p>

<h2>Zemin ve mobilya</h2>
<p>Güneş alan bir zeminde rengi solmayan, kolay temizlenen malzemeler seçilmelidir: seramik, doğal taş ya da güneşe dayanıklı kompozit kaplamalar. Mobilyada dış mekân kumaşları iyi bir tercihtir; güneşte solmaz, nemi tutmaz. Tuzla'daki projemizde gri minderli bir oturma grubu ve desenli yastıklarla sade bir köşe kurduk; dışarıdaki ağaçların yeşili mekânın asıl rengi oldu.</p>

<h2>İzinler ve yönetim</h2>
<p>Balkon ya da teras kapatmak binanın cephesini değiştirir. Apartmanlarda kat malikleri kurulunun ve yönetim planının kurallarına uymak gerekir; bazı durumlarda belediyeden izin de istenebilir. Taşıyıcı sisteme yük bindiren ya da yeni alan kazandıran işlerde statik kontrol ve proje gereklidir. Başlamadan önce bu konuları netleştirmek, sonradan söküm riskini ortadan kaldırır.</p>
""",
        "sss": [
            ("Kış bahçesi yazın çok sıcak olur mu?",
             "Gölgeleme ve havalandırma yoksa evet. Dış gölgeleme, ısı kontrol kaplamalı cam, açılabilir kanatlar ve mümkünse kapalı çatı yaz sıcağını büyük ölçüde çözer."),
            ("Balkonu camla kapatmak için izin gerekir mi?",
             "Cepheyi değiştirdiği için apartmanlarda kat malikleri ve yönetim planının kurallarına uymak gerekir; bazı durumlarda belediye izni de istenebilir. Başlamadan önce kontrol etmek en doğrusudur."),
            ("Kış bahçesinde hangi zemin kullanılmalı?",
             "Güneşte solmayan ve kolay temizlenen malzemeler: seramik, doğal taş ya da güneşe dayanıklı kompozit kaplamalar. Kışın konfor için zemin altı ısıtmayla birlikte düşünülebilir."),
        ],
    },
    {
        "slug": "kucuk-daire-ogrenci-evi-dosemek",
        "baslik": "Küçük daire ve öğrenci evi nasıl döşenir? Az alanda oturma, çalışma ve yemek",
        "kisa": "Küçük daire döşemek",
        "aciklama": "Küçük daire, 1+1 ve öğrenci evi döşerken alanı büyük gösteren fikirler: çok işlevli mobilya, ayna ve ışık, renk paleti, depolama ve yerleşim. Ataşehir ve Kadıköy'deki uygulamalarımızdan fotoğraflarla.",
        "tarih": "2026-11-09",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "foto": ("atasehir", "atasehir-ogrenci-evi"),
        "ozet": "Küçük bir evde her parçanın birden fazla işi olmalıdır. Kanepe misafir yatağına, yemek masası çalışma masasına dönüşebilir; boy aynası ve katmanlı aydınlatma mekânı büyük gösterir. Açık, sıcak bir zemin üzerine az sayıda renk seçmek ve depolamayı duvara taşımak, az alanda ferah bir ev kurmanın temelidir.",
        "govde": """
<h2>Önce bir günü planlayın</h2>
<p>Küçük bir evi döşemeye mobilya listesiyle değil, bir günle başlayın. Sabah nerede kahve içiliyor, ders ya da iş nerede yapılıyor, akşam yemeği kaç kişiyle yeniyor, misafir kalıyor mu? Bu sorular hangi işlevlerin aynı köşeyi paylaşabileceğini gösterir. Ataşehir'deki öğrenci evinde oturma, çalışma ve yemeği tek bir odaya sığdırdık; masa hem yemek hem ders masası olarak çalışıyor.</p>

<h2>Çok işlevli mobilya</h2>
<ul>
<li><strong>Masa:</strong> duvara yakın, iki kişilik bir masa hem yemek hem çalışma için yeter; gerektiğinde açılabilen modeller misafir için yer açar.</li>
<li><strong>Kanepe:</strong> yataklı ya da derin oturumlu bir kanepe tek gecelik misafir sorununu çözer.</li>
<li><strong>Sehpa:</strong> iç içe geçen sehpalar ortada az yer kaplar, gerektiğinde ikiye ayrılır.</li>
</ul>

[[foto:kadikoy-daire/kadikoy-daire-orta-sehpa]]

<h2>Ayna ve ışık</h2>
<p>Pencerenin karşısına ya da yanına konan bir boy aynası, ışığı ve manzarayı ikiye katlar. Tavanda tek bir avize yerine katmanlı aydınlatma kurun: genel ışık için gömme spotlar, okumak için bir lambader, akşam için masa ve duvar lambaları. Sıcak beyaz ışık küçük odaları daha samimi gösterir.</p>

<h2>Renk ve doku</h2>
<p>Duvarlarda açık ve sıcak bir ton, zeminde orta tonlu ahşap mekânı bütün gösterir. Renk, değiştirilmesi kolay parçalarla gelsin: bir yastık, bir pled, bir tablo. Kadıköy'deki dairede antrasit kanepeyi hardal sarısı detaylarla canlandırdık; iki renk ve ahşap, bütün evi taşıdı.</p>

<h2>Depolamayı duvara taşıyın</h2>
<p>Küçük evde zemin değerlidir. Tavana kadar uzanan dolaplar, kapı üstü raflar ve duvara asılan konsollar zemini boş bırakır. Yatak altı çekmeceler mevsimlik eşyalar için idealdir. Ne kadar az eşya dışarıda kalırsa ev o kadar büyük görünür.</p>

<h2>Bütçeyi doğru yere harcayın</h2>
<p>Her gün kullanılan parçalara, yani yatak, kanepe ve masa sandalyelerine öncelik verin. Aksesuar ve dekorasyon zamanla eklenebilir. Ölçüsü yanlış alınmış bir dolap ya da kanepe ise küçük evde en pahalı hatadır; satın almadan önce plan üzerinde yerleştirip deneyin. Planınızı <a href="/cizim-masasi/">çizim masasında</a> kabaca çizip mobilyaları yerleştirebilirsiniz.</p>
""",
        "sss": [
            ("Küçük bir salonu büyük göstermek için ne yapılmalı?",
             "Açık ve sıcak duvar rengi, pencereye yakın bir boy aynası, katmanlı aydınlatma ve tavana kadar uzanan dolaplar. Zeminde ne kadar az eşya kalırsa oda o kadar ferah görünür."),
            ("Öğrenci evinde çalışma masası nereye konmalı?",
             "Mümkünse pencere yanına, gün ışığını yandan alacak şekilde. Ayrı bir köşe yoksa yemek masası iyi bir çalışma yüzeyi olur; yanına bir masa lambası eklemek yeterli."),
            ("Küçük evde koyu renk kullanılabilir mi?",
             "Kullanılabilir, ama ölçülü. Koyu bir kanepe ya da tek bir koyu duvar derinlik verir. Tüm odayı koyu yapmak yerine açık bir zeminle dengelemek gerekir."),
        ],
    },
    {
        "slug": "villa-insaati-sureci",
        "baslik": "Villa ve müstakil ev inşaatı: arsadan anahtara adım adım süreç",
        "kisa": "Villa inşaatı",
        "aciklama": "Villa ve müstakil ev yaptırmak isteyenler için arsa analizinden tasarıma, ruhsattan kaba ve ince inşaata, teslime kadar bütün süreç ve bütçe ipuçları.",
        "tarih": "2026-10-22",
        "kategori": "İnşaat",
        "cizim": "insaat-anahtar-teslim",
        "ozet": "Villa ya da müstakil ev inşaatı; arsanın imar durumunun incelenmesiyle başlar, ihtiyaç programı ve tasarımla şekillenir, uygulama projeleri ve yapı ruhsatından sonra kaba ve ince inşaatla sürer, yapı kullanma izniyle (iskân) tamamlanır. Bütçeyi en çok yapının alanı, zemin koşulları ve malzeme standardı belirler. Tasarım ve uygulamanın aynı ekipte olması, kararların ve maliyetin baştan sona tek elden takip edilmesini sağlar.",
        "govde": """
<h2>1. Arsayı tanımak</h2>
<p>Her şey arsayla başlar. İmar durumu belgesi, parsele ne kadar ve nasıl yapı yapılabileceğini gösterir: taban alanı, emsal, kat adedi ya da yükseklik sınırı, yollara ve komşu parsellere çekme mesafeleri. Bunun yanında arsanın eğimi, yönü, manzarası, ağaçları, yola bağlantısı ve altyapı (su, elektrik, kanalizasyon ya da fosseptik) yerinde incelenir. Zemin etüdü ise temelin nasıl tasarlanacağını belirler ve maliyeti doğrudan etkiler.</p>

<h2>2. İhtiyaç programı</h2>
<p>Evde kaç kişi yaşayacak, kaç yatak odası gerekiyor, misafir ne sıklıkla geliyor, evden çalışan var mı, bahçe ve havuz isteniyor mu? Bu soruların cevapları bir ihtiyaç programına dönüşür. İyi bir program, bugünü olduğu kadar on yıl sonrasını da düşünür: büyüyen çocuklar, yaşlanan ebeveynler, değişen çalışma düzeni.</p>

<h2>3. Tasarım</h2>
<p>Konsept aşamasında yapının arsaya nasıl oturacağı, güneşi ve manzarayı nasıl kullanacağı, iç ve dış mekânın nasıl buluşacağı belirlenir. Ardından avan proje gelir: planlar, kesitler, görünüşler ve üç boyutlu görseller. Bu aşamada malzeme dili de netleşmeye başlar. Değişiklik yapmanın en ucuz olduğu zaman tasarım aşamasıdır; şantiyede yapılan her değişiklik hem zaman hem para demektir.</p>

<h2>4. Uygulama projeleri ve ruhsat</h2>
<p>Onaylanan tasarım; mimari, statik, mekanik ve elektrik uygulama projelerine dönüşür. Projeler birbiriyle koordine edilir ki kolon ile tesisat, kiriş ile pencere çakışmasın. Belediyeye ruhsat başvurusu yapılır, yapı denetim kuruluşuyla sözleşme imzalanır. Ruhsat alınmadan inşaata başlanmaz.</p>

<h2>5. Kaba inşaat</h2>
<p>Hafriyat, temel, taşıyıcı sistem, döşemeler, duvarlar ve çatı bu aşamadadır. Yapının ömrünü ve güvenliğini belirleyen işler burada yapılır; beton dökümleri ve donatı kontrolleri yapı denetimin gözetiminde ilerler. Su yalıtımı ve drenaj gibi sonradan düzeltmesi zor kalemler bu aşamada özenle yapılmalıdır.</p>

<h2>6. İnce işler</h2>
<p>Doğramalar, ısı ve ses yalıtımı, sıva ve şap, tesisat ve elektrik, ıslak hacimler, zemin ve duvar kaplamaları, mutfak, dolaplar, aydınlatma. Ev, bu aşamada kişiliğini kazanır. Malzeme seçimlerinin baştan bir listeye bağlanması hem bütçeyi hem takvimi korur.</p>

<h2>7. Dış mekân ve teslim</h2>
<p>Bahçe duvarları, peyzaj, teras, havuz ve otopark gibi dış işler tamamlanır. Son kontrol bir liste üzerinden birlikte yapılır, eksikler kapatılır. Yapı kullanma izin belgesi (iskân) alınır; anahtarla birlikte projeler, garanti belgeleri ve kullanım bilgileri teslim edilir.</p>

<h2>Bütçeyi ne belirler?</h2>
<ul>
<li><strong>Alan ve form:</strong> kapalı alan büyüdükçe maliyet artar; çok girintili çıkıntılı formlar da maliyeti yükseltir.</li>
<li><strong>Zemin:</strong> zayıf zemin, eğimli arsa ya da yüksek yeraltı suyu temel maliyetini artırır.</li>
<li><strong>Malzeme standardı:</strong> doğrama, cephe, kaplama ve vitrifiye seçimleri bütçede en çok oynayan kalemlerdir.</li>
<li><strong>Kapsam:</strong> havuz, peyzaj, akıllı ev sistemleri ve mobilyanın kapsama girip girmediği.</li>
</ul>
<p>Güvenilir bir fiyat için avan projenin ve malzeme listesinin netleşmesini beklemek gerekir. Metrekare üzerinden verilen hızlı fiyatlar, kapsamı belirsiz bıraktığı için genellikle sonradan sürpriz çıkarır.</p>
""",
        "sss": [
            ("Villa inşaatına başlamak için ilk ne yapmalıyım?",
             "Arsanın imar durumunu öğrenin ve bir mimarla arsayı yerinde görün. Neyin, ne kadar yapılabileceği netleşmeden tasarıma ve bütçeye başlamak sağlıklı olmaz."),
            ("Hazır proje mi, arsaya özel tasarım mı?",
             "Hazır projeler arsanın yönünü, eğimini ve manzarasını bilmez. Arsaya özel tasarım, aynı bütçeyle çok daha iyi ışık, mahremiyet ve kullanım sağlar."),
            ("Villa inşaatında anahtar teslim modelin avantajı nedir?",
             "Tasarım, ruhsat ve inşaat tek sözleşmede olduğu için bilgi kaybı yaşanmaz; takvim, bütçe ve kalite tek muhataptan takip edilir."),
        ],
    },
    {
        "slug": "ofis-ic-mimarisi",
        "baslik": "Ofis iç mimarisi: verimli ve sıcak bir çalışma alanı nasıl tasarlanır?",
        "kisa": "Ofis iç mimarisi",
        "aciklama": "Ofis tasarımında çalışma düzeni, toplantı alanları, akustik, aydınlatma, malzeme ve marka kimliği; ofis tadilatını iş akışını aksatmadan planlamanın yolları.",
        "tarih": "2026-10-22",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "ozet": "İyi bir ofis, ekibin nasıl çalıştığını anlamakla başlar: odaklanma, birlikte çalışma, toplantı ve dinlenme için ayrı ayrı alanlar gerekir. Akustik ve gün ışığı verimliliği en çok etkileyen iki konudur. Malzeme ve renk seçimi markanın karakterini yansıtmalı, mobilya ve tesisat ise ekibin büyümesine izin verecek esneklikte planlanmalıdır.",
        "govde": """
<h2>Önce iş akışını anlamak</h2>
<p>Ofis tasarımı bir mobilya yerleşimi değil, bir çalışma biçiminin planıdır. Ekip ne kadar zamanını masada, ne kadarını toplantıda geçiriyor? Telefon ve görüntülü görüşme ne sıklıkta yapılıyor? Müşteri ofise geliyor mu? Hibrit çalışılıyorsa ofiste aynı anda kaç kişi bulunuyor? Bu soruların cevabı, metrekarenin nasıl paylaştırılacağını belirler.</p>

<h2>Alanları ayırmak</h2>
<ul>
<li><strong>Odak alanları:</strong> sessiz, dikkat dağıtmayan, uzun süre oturmaya uygun çalışma yerleri.</li>
<li><strong>Birlikte çalışma alanları:</strong> ekip masaları, yazı tahtaları, ayakta kısa görüşme noktaları.</li>
<li><strong>Toplantı odaları ve görüşme kabinleri:</strong> farklı büyüklüklerde; tek kişilik görüşme kabinleri açık ofisin gürültüsünü ciddi biçimde azaltır.</li>
<li><strong>Karşılama ve mutfak:</strong> ofisin ilk izlenimi ve ekibin bir araya geldiği en samimi yer.</li>
</ul>

<h2>Akustik</h2>
<p>Açık ofislerin en sık şikâyeti gürültüdür. Ses emici tavan ve duvar panelleri, halı ya da yumuşak zemin kaplamaları, kitaplık ve dolapların bölücü olarak kullanılması yankıyı azaltır. Toplantı odalarında duvarların tavana kadar çıkması ve doğru kapı seçimi, konuşmaların dışarı taşmasını önler.</p>

<h2>Işık</h2>
<p>Gün ışığı en değerli malzemedir. Sürekli çalışılan masalar pencerelere yakın, toplantı ve depolama gibi kısa süreli kullanılan alanlar iç bölümlere yerleştirilir. Yapay aydınlatmada genel ışık, masa üstü ışığı ve vurgu ışığı birlikte düşünülür; ekranda yansıma ve gözde kamaşma yaratmayan armatürler seçilir.</p>

<h2>Malzeme, renk ve marka</h2>
<p>Ofis, markanın üç boyutlu halidir. Ahşap, doğal taş, keten ve sıva gibi sıcak ve dokulu malzemeler, kurumsal soğukluğu kırar ve uzun yıllar eskimeden kalır. Marka renkleri tüm mekâna yayılmak yerine birkaç güçlü noktada kullanıldığında daha etkili olur.</p>

<h2>Esneklik ve tesisat</h2>
<p>Ekip büyür, düzen değişir. Yükseltilmiş döşeme ya da iyi planlanmış zemin prizleri, modüler masa sistemleri ve taşınabilir bölücüler, yıllar içinde ofisi yeniden kurmadan değiştirmeye izin verir. İklimlendirme, havalandırma ve veri altyapısı tasarımın en başında birlikte planlanmalıdır.</p>

<h2>Ofis tadilatını işleri aksatmadan yapmak</h2>
<p>Taşınmadan yenilenecek ofislerde iş bölgelere ayrılarak, gürültülü işler akşam ve hafta sonuna planlanarak yürütülebilir. Detaylı bir iş programı ve malzemelerin önceden siparişi, şantiye süresini kısaltır.</p>
""",
        "sss": [
            ("Ofis iç mimarisi süreci ne kadar sürer?",
             "Alanın büyüklüğüne ve kapsamına göre değişir. Tasarım ve uygulama projeleri tamamlandıktan sonra, malzemeler önceden sipariş edilirse uygulama süresi belirgin biçimde kısalır."),
            ("Kiralık ofiste iç mimari değişiklik yapılabilir mi?",
             "Evet, ancak kira sözleşmesi ve bina yönetiminin kuralları kontrol edilmelidir. Taşıyıcı sisteme dokunmayan bölme duvar, kaplama ve aydınlatma değişiklikleri genellikle mümkündür."),
            ("Açık ofis mi, kapalı odalar mı?",
             "Çoğu ekip için en iyi çözüm karmadır: açık çalışma alanları, yanında odaklanma ve görüşme için kapalı oda ve kabinler."),
        ],
    },
    {
        "slug": "mimarlik-ve-insaat-firmasi-secimi",
        "baslik": "Mimarlık ve inşaat firması seçerken nelere dikkat edilmeli?",
        "kisa": "Firma seçimi",
        "aciklama": "Mimar, iç mimar ya da müteahhit seçmeden önce bakılması gerekenler: tamamlanmış işler, ekip, süreç, teklifin kapsamı, sözleşme ve iletişim.",
        "tarih": "2026-10-22",
        "kategori": "Rehber",
        "cizim": "eskiz",
        "ozet": "Doğru firmayı seçmek için önce tamamlanmış işlerini yerinde görmek ve eski müşterileriyle konuşmak gerekir. Teklifler fiyatla değil kapsamla karşılaştırılmalı; malzeme listesi, takvim, ödeme planı ve değişikliklerin nasıl fiyatlanacağı yazılı olmalıdır. Tasarımı ve uygulamayı kimin yapacağı, şantiyeyi kimin yöneteceği ve iletişimin nasıl yürüyeceği baştan netleşmelidir.",
        "govde": """
<h2>Tamamlanmış işlere bakın</h2>
<p>Görseller fikir verir, ama asıl ölçü bitmiş yapılardır. Mümkünse firmanın teslim ettiği bir projeyi yerinde görün; detayların, birleşim yerlerinin ve işçiliğin kalitesine bakın. Eski müşterilerine süreç boyunca iletişimin nasıl olduğunu, takvime ve bütçeye ne kadar uyulduğunu sorun.</p>

<h2>Kim tasarlıyor, kim uyguluyor?</h2>
<p>Bazı firmalar yalnızca tasarım yapar, bazıları yalnızca uygular, bazıları ise ikisini birlikte yürütür. Tasarım ve uygulama ayrı firmalardaysa aradaki koordinasyonun kimde olacağı netleşmelidir. Tek ekip modelinde ise çizen ile yapan aynı olduğu için sorumluluk bölünmez. Hangi modeli seçerseniz seçin, şantiyeyi kimin yöneteceğini ve sahada kimin karar vereceğini öğrenin.</p>

<h2>Teklifleri fiyatla değil kapsamla karşılaştırın</h2>
<p>İki teklif arasındaki fiyat farkı çoğu zaman kapsam farkıdır. Birinde dahil olan mutfak, dolap, aydınlatma ya da peyzaj diğerinde dışarıda kalmış olabilir. Teklifleri kalem kalem, aynı malzeme standardıyla karşılaştırın. Belirsiz kalemler sonradan ek maliyet olarak döner.</p>

<h2>Sözleşmede neler yazmalı?</h2>
<ul>
<li>İşin kapsamı ve kapsam dışı kalemler.</li>
<li>Marka, model ya da sınıf belirtilmiş malzeme listesi.</li>
<li>Başlangıç ve teslim tarihleri, gecikme hükümleri.</li>
<li>İş ilerlemesine bağlı ödeme planı.</li>
<li>Değişiklik taleplerinin nasıl fiyatlanıp onaylanacağı.</li>
<li>Teslim sonrası garanti ve bakım.</li>
</ul>

<h2>Belgeler ve yetkinlik</h2>
<p>Ruhsat gerektiren işlerde projelerin ilgili meslek odalarına kayıtlı mühendis ve mimarlarca çizilmesi, yapının da yapı denetim gözetiminde yapılması gerekir. Firmanın bu süreçleri daha önce yürütüp yürütmediğini, iş güvenliği ve sigorta konularını nasıl ele aldığını sorun.</p>

<h2>İletişim ve raporlama</h2>
<p>İnşaat aylar süren bir ortaklıktır. Size kimin, hangi sıklıkla ve nasıl bilgi vereceğini baştan konuşun. Düzenli fotoğraflı raporlar, şantiye ziyaret günleri ve tek bir sorumlu kişi, sürecin rahat geçmesini sağlar.</p>

<h2>İlk görüşmede sorulacak sorular</h2>
<ul>
<li>Benzer büyüklükte ve türde hangi projeleri yaptınız?</li>
<li>Projeyi kim yönetecek, sahada kim olacak?</li>
<li>Teklifiniz neleri kapsıyor, neleri kapsamıyor?</li>
<li>Takvimi etkileyebilecek riskler neler?</li>
<li>Süreç boyunca beni nasıl bilgilendireceksiniz?</li>
</ul>
""",
        "sss": [
            ("En ucuz teklifi seçmek mantıklı mı?",
             "Ancak kapsam ve malzeme standardı diğer tekliflerle birebir aynıysa. Fiyat farkı çoğu zaman eksik bırakılmış kalemlerden kaynaklanır."),
            ("Mimar ve müteahhidi ayrı mı seçmeliyim?",
             "Her iki model de işler. Ayrı seçerseniz koordinasyonun kimde olacağını netleştirin; tek ekip modeli ise sorumluluğu tek elde toplar."),
            ("Firmanın güvenilirliğini nasıl anlarım?",
             "Tamamlanmış işlerini yerinde görün, eski müşterileriyle konuşun, teklif ve sözleşmenin ne kadar ayrıntılı olduğuna bakın."),
        ],
    },
    {
        "slug": "anahtar-teslim-insaat-nedir",
        "baslik": "Anahtar teslim inşaat nedir? Kapsam, süreç ve sözleşmede dikkat edilecekler",
        "kisa": "Anahtar teslim inşaat",
        "aciklama": "Anahtar teslim inşaatın kapsamı, adım adım süreci, avantajları ve sözleşme imzalamadan önce netleştirilmesi gereken konular.",
        "tarih": "2026-10-21",
        "kategori": "İnşaat",
        "cizim": "insaat-anahtar-teslim",
        "ozet": "Anahtar teslim inşaat, tasarımdan ruhsata, inşaattan iskâna kadar bütün işin tek bir yükleniciye, tek sözleşmeyle verilmesidir. İşveren tek muhatapla çalışır; yüklenici yapıyı kullanıma hazır halde, anahtarıyla teslim eder. Sözleşmede kapsamın, malzeme standardının, takvimin ve ödeme planının yazılı olarak netleşmesi en önemli adımdır.",
        "govde": """
<h2>Anahtar teslim ne demek?</h2>
<p>Klasik modelde mal sahibi bir mimarla tasarımı, başka bir firmayla inşaatı, ayrı ustalarla ince işleri yürütür. Her geçişte bilgi kaybolur, sorumluluk bölünür ve ortaya çıkan sorunda kimin hatası olduğu tartışılır. Anahtar teslim modelde ise yapının ortaya çıkması için gereken bütün işler tek bir yüklenicinin sorumluluğundadır. Mal sahibi, kararları verir ve süreci takip eder; teslimde eline kullanıma hazır bir yapı ve anahtarı geçer.</p>

<h2>Kapsamda genellikle neler olur?</h2>
<ul>
<li><strong>Tasarım:</strong> ihtiyaç programı, konsept, avan proje ve 3B görselleştirme.</li>
<li><strong>Projeler:</strong> mimari uygulama projesi ile statik, mekanik ve elektrik projelerinin koordinasyonu.</li>
<li><strong>İzinler:</strong> yapı ruhsatı başvurusu ve takibi, iş bitiminde yapı kullanma izin belgesi (iskân) süreci.</li>
<li><strong>Kaba inşaat:</strong> hafriyat, temel, taşıyıcı sistem, duvarlar ve çatı.</li>
<li><strong>İnce işler:</strong> sıva, şap, yalıtım, doğrama, kaplamalar, ıslak hacimler, tesisat ve elektrik.</li>
<li><strong>Teslim:</strong> temizlik, kontrol listesiyle birlikte gezilen son kontrol, garanti belgeleri ve kullanım bilgileri.</li>
</ul>
<p>Mutfak, gömme dolap, aydınlatma armatürü, peyzaj ve mobilya gibi kalemler projeden projeye değişir. Bu kalemlerin kapsamda olup olmadığı sözleşmede tek tek yazılmalıdır.</p>

<h2>Süreç adım adım</h2>
<ol>
<li><strong>Keşif ve ihtiyaç:</strong> arsa ya da mevcut yapı yerinde görülür, bütçe ve beklentiler konuşulur.</li>
<li><strong>Tasarım ve teklif:</strong> avan proje üzerinden metraj çıkarılır, kalem kalem fiyatlandırılmış teklif hazırlanır.</li>
<li><strong>Sözleşme:</strong> kapsam, malzeme listesi, takvim ve ödeme planı imzalanır.</li>
<li><strong>Proje ve ruhsat:</strong> uygulama projeleri tamamlanır, belediye süreçleri yürütülür.</li>
<li><strong>Uygulama:</strong> şantiye kurulur, iş programına göre ilerlenir; işveren düzenli raporlarla bilgilendirilir.</li>
<li><strong>Teslim:</strong> eksik listesi kapatılır, belgeler ve anahtar teslim edilir.</li>
</ol>

<h2>Avantajları ve dikkat edilmesi gerekenler</h2>
<p>En büyük avantaj tek muhataptır: tasarımı yapan ekip uygulamayı da bildiği için çizimle şantiye arasında kopukluk olmaz, bütçe ve takvim tek elden yönetilir. Buna karşılık kontrol de tek bir firmaya geçer. Bu yüzden firmanın daha önce tamamladığı işleri yerinde görmek, referanslarla konuşmak ve sözleşmeyi ayrıntılı yazmak önemlidir.</p>

<h2>Sözleşmede mutlaka netleşmesi gerekenler</h2>
<ul>
<li>Kapsam içi ve kapsam dışı kalemlerin ayrı ayrı listesi.</li>
<li>Marka, model ya da sınıf belirtilmiş malzeme listesi (örneğin seramik, doğrama, vitrifiye).</li>
<li>Başlangıç ve teslim tarihi, gecikme halinde uygulanacak hükümler.</li>
<li>İş ilerlemesine bağlı ödeme planı.</li>
<li>Değişiklik taleplerinin nasıl fiyatlanacağı ve onaylanacağı.</li>
<li>Teslim sonrası garanti süreleri ve kapsamı.</li>
</ul>
""",
        "sss": [
            ("Anahtar teslim inşaat ile kat karşılığı inşaat aynı şey mi?",
             "Hayır. Anahtar teslimde işveren işin bedelini öder ve yapının tamamı kendisine kalır. Kat karşılığında arsa sahibi bedeli arsasıyla öder; yüklenici karşılığında yapıdan bağımsız bölümler alır."),
            ("Anahtar teslim fiyatı neye göre belirlenir?",
             "Yapının alanı, taşıyıcı sistemi, zemin koşulları, malzeme standardı ve kapsamdaki kalemler fiyatı belirler. Güvenilir bir fiyat için önce avan proje ve malzeme listesi netleşmelidir."),
            ("Süreç boyunca işveren neye karar verir?",
             "Tasarım onayı, malzeme seçimleri ve olası değişiklikler işverenin kararıdır. Uygulamanın yönetimi, ekiplerin koordinasyonu ve iş güvenliği yüklenicinin sorumluluğundadır."),
        ],
    },
    {
        "slug": "insaat-ruhsati-nasil-alinir",
        "baslik": "İnşaat ruhsatı nasıl alınır? Gerekli belgeler ve adımlar",
        "kisa": "İnşaat ruhsatı",
        "aciklama": "Yapı ruhsatı için gereken belgeler, başvuru adımları, yapı denetimin rolü ve iskân sürecine kadar bilinmesi gerekenler.",
        "tarih": "2026-10-21",
        "kategori": "Proje ve ruhsat",
        "cizim": "proje-ve-ruhsat",
        "ozet": "Türkiye'de yeni bir yapıya ya da taşıyıcı sistemi etkileyen bir değişikliğe başlamadan önce yapı ruhsatı alınması gerekir. Ruhsat, belediye sınırları içinde belediyeden, dışında ise il özel idaresinden alınır. Başvuru; tapu, imar durumu, onaylı projeler, zemin etüdü ve yapı denetim sözleşmesi gibi belgelerle yapılır. İş bitince yapı kullanma izin belgesi (iskân) alınır.",
        "govde": """
<h2>Yapı ruhsatı nedir, kim verir?</h2>
<p>Yapı ruhsatı, bir yapının imar planına, yönetmeliklere ve onaylı projelerine uygun inşa edileceğini gösteren izindir. Dayanağı 3194 sayılı İmar Kanunu ve Planlı Alanlar İmar Yönetmeliği'dir. Belediye ve mücavir alan sınırları içinde ilgili belediye, bu sınırların dışında il özel idaresi ruhsatı verir. Kanuna göre eksiksiz başvurular 30 gün içinde sonuçlandırılır; pratikte süre, projenin büyüklüğüne ve idarenin iş yüküne göre değişebilir.</p>

<h2>Başvurudan önce: imar durumu</h2>
<p>İlk iş, parselin imar durumunu öğrenmektir. İmar durumu belgesi; yapılaşma koşullarını, çekme mesafelerini, emsal ve kat yüksekliği gibi sınırları gösterir. Tasarım bu sınırlar içinde yapılır. Birçok belediye bu bilgiyi e-imar sistemleri üzerinden de paylaşır.</p>

<h2>İnşaat ruhsatı için gerekli belgeler</h2>
<ul>
<li>Tapu kaydı ve gerekiyorsa maliklerin muvafakati.</li>
<li>İmar durumu belgesi ve aplikasyon krokisi.</li>
<li>Zemin ve temel etüdü raporu.</li>
<li>Mimari, statik, mekanik tesisat ve elektrik projeleri (ilgili meslek odası ve idarece onaylanmış).</li>
<li>Yapı denetim kuruluşu ile yapılan hizmet sözleşmesi.</li>
<li>Yapı müteahhidi yetki belgesi numarası ve şantiye şefi taahhütnamesi.</li>
<li>Harç ve ücretlerin ödendiğini gösteren belgeler.</li>
</ul>
<p>Listedeki ayrıntılar yapının türüne, büyüklüğüne ve idareye göre değişebilir; enerji kimlik belgesi, otopark, sığınak ya da peyzaj projesi gibi ek belgeler istenebilir.</p>

<h2>Yapı denetimin rolü</h2>
<p>4708 sayılı Yapı Denetimi Hakkında Kanun kapsamındaki yapılarda, projelerin ve uygulamanın denetimini lisanslı bir yapı denetim kuruluşu üstlenir. Kuruluş, inşaatın her aşamasında projeye uygunluğu kontrol eder ve hakediş raporları düzenler. Yapı denetim sözleşmesi ruhsat başvurusundan önce imzalanır.</p>

<h2>İnşaat sırasında ve sonrasında</h2>
<ol>
<li>Ruhsat alındıktan sonra yer teslimi yapılır ve şantiye kurulur.</li>
<li>Temel, taşıyıcı sistem ve kat aşamalarında denetimler yapılır.</li>
<li>Projeden farklı bir uygulama gerekirse tadilat projesi hazırlanıp onaylatılır.</li>
<li>İş bitince yapı kullanma izin belgesi (iskân) için başvurulur. İskân olmadan abonelik ve tapu işlemlerinde sorun yaşanabilir.</li>
</ol>

<p class="not">Bu yazı genel bilgilendirme amaçlıdır. Mevzuat ve belediyelerin uygulamaları değişebilir; projeniz için güncel listeyi ilgili idareden ya da bizden teyit edin.</p>
""",
        "sss": [
            ("İç mekân tadilatı için ruhsat gerekir mi?",
             "Taşıyıcı sistemi, cepheyi ya da yapının kullanım amacını etkilemeyen iç tadilatlar genellikle ruhsat gerektirmez. Kolon, kiriş, perde duvar gibi taşıyıcı elemanlara dokunulacaksa izin gerekir ve önce bir mühendis görüşü alınmalıdır."),
            ("Ruhsat başvurusunu kim yapar?",
             "Başvuru yapı sahibi ya da vekili adına yapılır. Pratikte proje müellifi mimar ve yüklenici firma dosyayı hazırlar ve süreci takip eder."),
            ("İskân nedir?",
             "Yapı kullanma izin belgesidir. Yapının ruhsat ve projelerine uygun tamamlandığını gösterir; iş bitiminde ilgili idareden alınır."),
        ],
    },
    {
        "slug": "ic-mimarlik-sureci",
        "baslik": "İç mimarlık süreci nasıl ilerler? İlk görüşmeden teslime 7 adım",
        "kisa": "İç mimarlık süreci",
        "aciklama": "Bir iç mimarlık projesinin ilk görüşmeden uygulamaya ve teslime kadar adımları, her adımda ne teslim edildiği ve işverenin hazırlaması gerekenler.",
        "tarih": "2026-10-21",
        "kategori": "İç mimarlık",
        "cizim": "ic-mimarlik",
        "ozet": "Bir iç mimarlık projesi yedi adımda ilerler: ihtiyaç görüşmesi, yerinde rölöve, konsept, uygulama projesi, malzeme seçimi, uygulama ve teslim. Her adımın sonunda yazılı bir çıktı ve işveren onayı olur. Süreyi ve bütçeyi en çok etkileyen şey, kararların uygulama başlamadan verilmiş olmasıdır.",
        "govde": """
<h2>1. İhtiyaç görüşmesi</h2>
<p>Mekânda kimin yaşayacağını ya da çalışacağını, günün nasıl geçtiğini, depolama ihtiyacını, sevilen ve sevilmeyen şeyleri konuşuruz. Bütçe aralığı ve hedef tarih de bu görüşmede netleşir. Beğendiğiniz mekânların fotoğrafları bu aşamada çok işe yarar.</p>

<h2>2. Rölöve: mevcut durumun ölçülmesi</h2>
<p>Mekân yerinde ölçülür; duvarlar, kolonlar, pencereler, tesisat noktaları ve tavan yükseklikleri çizime aktarılır. Doğru bir rölöve, sonraki bütün kararların zeminidir.</p>

<h2>3. Konsept</h2>
<p>Plan alternatifleri, renk ve malzeme paleti, ışık kurgusu ve atmosferi anlatan görseller hazırlanır. Bu aşamada amaç, mekânın nasıl hissettireceğinde anlaşmaktır.</p>

<h2>4. Uygulama projesi</h2>
<p>Onaylanan konsept; yerleşim planı, tavan ve aydınlatma planı, elektrik ve tesisat noktaları, duvar açılımları ve özel mobilya detaylarıyla uygulanabilir hale getirilir. Ustanın sahada soru sormadan çalışabilmesi bu çizimlerin kalitesine bağlıdır.</p>

<h2>5. Malzeme ve ürün seçimi</h2>
<p>Zemin ve duvar kaplamaları, vitrifiye ve armatürler, aydınlatma ürünleri ve kumaşlar numuneler üzerinden seçilir. Teslim süresi uzun ürünler bu aşamada siparişe girer; aksi halde uygulama beklemeye düşebilir.</p>

<h2>6. Uygulama</h2>
<p>Söküm, tesisat, alçı ve boya, kaplamalar, özel imalat mobilyalar ve montaj iş programına göre sırayla yapılır. Tasarımı yapan ekibin uygulamayı da yönetmesi, sahada çıkan sürprizlerin tasarımın diliyle çözülmesini sağlar.</p>

<h2>7. Teslim</h2>
<p>Birlikte gezilen son kontrolde eksikler listelenir ve kapatılır. Ürün garanti belgeleri ve bakım bilgileri teslim edilir.</p>

<h2>İşveren olarak nasıl hazırlanmalı?</h2>
<ul>
<li>Bütçeye yüzde 10 ile 15 arası beklenmedik gider payı ayırın.</li>
<li>Karar verecek kişileri baştan belirleyin; onaylar tek kanaldan gelsin.</li>
<li>Uygulama başladıktan sonra plan değişikliğinin maliyeti ve süresi artar; değişiklikleri proje aşamasında yapın.</li>
</ul>
""",
        "sss": [
            ("İç mimarlık projesi ne kadar sürer?",
             "Tasarım aşaması bir daire için genellikle birkaç hafta sürer. Uygulama süresi kapsamın büyüklüğüne, özel imalatlara ve ürünlerin teslim sürelerine göre değişir."),
            ("Sadece proje alıp uygulamayı başka ekiple yaptırabilir miyim?",
             "Evet. Yine de tasarımı yapan ekibin uygulamayı yürütmesi, detayların çizildiği gibi hayata geçmesini ve sorumluluğun tek yerde olmasını sağlar."),
        ],
    },
    {
        "slug": "tadilat-butcesi-nasil-hazirlanir",
        "baslik": "Tadilat ve renovasyon bütçesi nasıl hazırlanır? Maliyeti belirleyen 8 kalem",
        "kisa": "Tadilat bütçesi",
        "aciklama": "Ev ve ofis tadilatında maliyeti belirleyen kalemler, bütçeyi korumanın yolları ve teklifleri karşılaştırırken bakılması gerekenler.",
        "tarih": "2026-10-21",
        "kategori": "Tadilat",
        "cizim": "mimari-tasarim",
        "ozet": "Tadilat bütçesini en çok söküm ve altyapı (tesisat, elektrik), ıslak hacimler, zemin kaplamaları, doğramalar, özel imalat mobilyalar ve işçilik belirler. Sağlıklı bir bütçe için önce kapsam ve malzeme listesi yazılı hale getirilmeli, teklifler aynı liste üzerinden karşılaştırılmalı ve yüzde 10 ile 15 arası beklenmedik gider payı ayrılmalıdır.",
        "govde": """
<h2>Önce kapsamı yazın</h2>
<p>Bütçe tahmininin en sık şaşma nedeni, kapsamın kafada kalmasıdır. Hangi odalara dokunulacağı, hangi duvarların kalacağı, tesisatın yenilenip yenilenmeyeceği ve hangi mobilyaların özel üretileceği yazılı hale gelmeden verilen her rakam tahminden ibarettir.</p>

<h2>Maliyeti belirleyen 8 kalem</h2>
<ol>
<li><strong>Söküm ve moloz:</strong> eski kaplamaların, dolapların ve duvarların sökülmesi, molozun taşınması.</li>
<li><strong>Tesisat:</strong> temiz ve atık su hatları, ısıtma. Eski binalarda tesisatın yenilenmesi çoğu zaman şarttır.</li>
<li><strong>Elektrik:</strong> pano, kablolama, priz ve anahtar noktaları, zayıf akım.</li>
<li><strong>Islak hacimler:</strong> banyo ve mutfak; su yalıtımı, seramik, vitrifiye ve armatürler metrekare başına en pahalı alanlardır.</li>
<li><strong>Zemin:</strong> şap, parke ya da seramik; malzeme sınıfı fiyatı ciddi biçimde değiştirir.</li>
<li><strong>Duvar ve tavan:</strong> alçı, asma tavan, boya ve aydınlatma boşlukları.</li>
<li><strong>Doğrama:</strong> pencere ve kapılar; ısı ve ses yalıtımı performansı fiyatı belirler.</li>
<li><strong>Özel imalat:</strong> mutfak, gömme dolap ve sabit mobilyalar.</li>
</ol>

<h2>Teklifleri nasıl karşılaştırmalı?</h2>
<p>Farklı firmalardan gelen teklifleri yalnızca toplam rakama bakarak karşılaştırmak yanıltıcıdır. Aynı kapsam ve aynı malzeme listesi üzerinden, kalem kalem fiyat isteyin. Bir teklif belirgin biçimde düşükse, eksik bırakılan kalemleri arayın.</p>

<h2>Bütçeyi korumanın yolları</h2>
<ul>
<li>Kararları uygulama başlamadan verin; sahadaki değişiklik en pahalı değişikliktir.</li>
<li>Teslim süresi uzun ürünleri erken sipariş edin.</li>
<li>Görünmeyen altyapıdan (tesisat, yalıtım) kısmayın; sonradan düzeltmek kaplamaları da bozar.</li>
<li>Yüzde 10 ile 15 arası beklenmedik gider payı ayırın; özellikle eski binalarda duvarın arkasından sürpriz çıkabilir.</li>
</ul>
""",
        "sss": [
            ("Tadilatta en çok nereden tasarruf edilir?",
             "Kaplama ve armatürlerde marka ve sınıf seçimiyle tasarruf etmek mümkündür. Tesisat, elektrik ve su yalıtımı gibi görünmeyen işlerden kısmak ise ileride daha pahalıya mal olur."),
            ("Tadilat sırasında evde yaşanabilir mi?",
             "Kapsamlı bir tadilatta toz, gürültü ve kesintiler nedeniyle önerilmez. Tek oda ya da banyo gibi sınırlı işlerde planlamayla mümkün olabilir."),
        ],
    },
]
