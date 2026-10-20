"""Blog yazıları. Hepsi Dimart için özgün yazılmıştır; başka sitelerden alıntı yoktur.

Her yazı: slug, başlık, açıklama, tarih, kategori, çizim (CIZIMLER anahtarı), kısa cevap (özet), gövde HTML'i, SSS.
Yeni yazı eklemek için listeye bir sözlük ekleyip `python3 tools/build.py` çalıştırmak yeterli.
"""

YAZILAR = [
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

<h2>Genellikle istenen belgeler</h2>
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
