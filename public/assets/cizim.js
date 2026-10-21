/* Dimart Mimarlık · Çizim masası: tarayıcıda oda planı çizme, kapı ve pencere tipleri, standart ölçülerde eşya, zemin ve duvar malzemeleri, renk ve ölçü ayarı, gerçek 3B görünüm, alan hesabı. */
(function () {
  var d = document, w = window;
  var KARE = 24, METRE = 48; // bir ızgara karesi 0,5 m; 48 piksel 1 metre
  var RENK = { ink: '#EDE8E0', soluk: 'rgba(237,232,224,.45)', cizgi: 'rgba(237,232,224,.08)', ana: 'rgba(237,232,224,.16)', y: '#F2B705', bg: '#17140F' };
  var ANAHTAR = 'dm-cizim', DUVAR_H = 2.8;

  /* ---------- malzemeler: k = modül ölçüsü (cm), n = dokudaki modül sayısı, S = sabit doku boyu (m) ---------- */
  var ZEMIN = [
    { ad: 'Boş' },
    { ad: 'Meşe parke', tur: 'parke', a: '#9A7650', b: 'rgba(45,28,12,.35)', k: 15, n: 8, lim: [8, 30, 1], et: 'Tahta genişliği' },
    { ad: 'Ceviz parke', tur: 'parke', a: '#5E4330', b: 'rgba(20,12,6,.45)', k: 15, n: 8, lim: [8, 30, 1], et: 'Tahta genişliği' },
    { ad: 'Balıksırtı meşe', tur: 'balik', a: '#A88459', b: 'rgba(50,30,12,.4)', k: 8, n: 16, lim: [6, 16, 1], et: 'Tahta genişliği' },
    { ad: 'Traverten', tur: 'tas', a: '#CDBB9C', b: 'rgba(120,100,70,.35)', k: 60, n: 2, lim: [30, 120, 5], et: 'Plaka ölçüsü', kare: 1 },
    { ad: 'Beyaz mermer', tur: 'mermer', a: '#E7E3DD', b: 'rgba(110,110,115,.4)', k: 120, n: 1, lim: [60, 160, 10], et: 'Plaka ölçüsü', kare: 1 },
    { ad: 'Siyah mermer', tur: 'mermer', a: '#2B2927', b: 'rgba(235,230,220,.35)', k: 120, n: 1, lim: [60, 160, 10], et: 'Plaka ölçüsü', kare: 1 },
    { ad: 'Seramik açık', tur: 'karo', a: '#D8D3CA', b: 'rgba(90,85,80,.35)', k: 60, n: 2, lim: [20, 120, 5], et: 'Karo ölçüsü', kare: 1 },
    { ad: 'Seramik antrasit', tur: 'karo', a: '#4A4846', b: 'rgba(15,15,15,.5)', k: 60, n: 2, lim: [20, 120, 5], et: 'Karo ölçüsü', kare: 1 },
    { ad: 'Terrazzo', tur: 'terrazzo', a: '#DCD5C8', b: '#8E8576', S: 1.2 },
    { ad: 'Hidrolik karo', tur: 'hidrolik', a: '#D9CFBE', b: '#6E7F78', k: 20, n: 4, lim: [15, 30, 5], et: 'Karo ölçüsü', kare: 1 },
    { ad: 'Mikrobeton', tur: 'siva', a: '#ABA69E', b: 'rgba(70,65,60,.25)', S: 1 },
    { ad: 'Beton', tur: 'beton', a: '#7D7A75', b: 'rgba(30,30,30,.3)', S: 1.5 },
    { ad: 'Halı', tur: 'hali', a: '#8E8476', b: 'rgba(40,35,30,.3)', S: .6 }
  ];
  var BOYA = [
    { ad: 'Beyaz', r: '#F2F0EB' }, { ad: 'Kırık beyaz', r: '#E8E1D3' }, { ad: 'Kum', r: '#D6C8AE' },
    { ad: 'Adaçayı', r: '#B4BDA6' }, { ad: 'Toprak', r: '#B98C6E' }, { ad: 'Gece mavisi', r: '#3F4B5C' }, { ad: 'Antrasit', r: '#3B3A38' }
  ];
  var ZTON = ['#EFEBE4', '#D9CBB0', '#C4A57A', '#A88459', '#7A5A3C', '#4E3B2C', '#B9B6B0', '#8E8C88', '#55534F', '#2B2927', '#7E8F86', '#B6806A'];
  var ETON = ['#EFEBE4', '#D8CDBB', '#B9A58A', '#8A8174', '#5F5A52', '#2E2C2A', '#7A5A3C', '#B08D66', '#6E7F6A', '#3F4B5C', '#9B5D4A', '#C9A44B'];
  /* eşya parça malzemeleri: [ad, renk, pürüzlülük, metalik, doku (ZEMIN sırası)] */
  var PARCA = {
    tezgahUst: { ad: 'Tezgâh malzemesi', l: [['Beyaz kuvars', '#EDEBE6', .25], ['Calacatta mermer', '#ECE8E2', .2, 0, 5], ['Nero marquina', '#2B2927', .2, 0, 6], ['Siyah granit', '#1F1E1D', .3, 0, 9], ['Traverten', '#CDBB9C', .5, 0, 4], ['Meşe masif', '#A88459', .5, 0, 1], ['Beton', '#8E8B85', .7, 0, 12], ['Terrazzo', '#DCD5C8', .35, 0, 9], ['Paslanmaz çelik', '#B8BBBD', .3, .85]] },
    govde: { ad: 'Dolap ve kapak', l: [['Beyaz lake', '#F0EEE9', .35], ['Krem mat', '#E4DACA', .7], ['Kaşmir', '#CBBFAE', .7], ['Adaçayı', '#9AA78F', .7], ['Lacivert', '#2F3B4C', .6], ['Antrasit mat', '#3A3937', .7], ['Siyah mat', '#1D1C1B', .7], ['Meşe kaplama', '#A88459', .55, 0, 1], ['Ceviz kaplama', '#5E4330', .55, 0, 2]] },
    kumas: { ad: 'Döşeme', l: [['Keten bej', '#CDBFA6', .95], ['Bouclé krem', '#E9E3D6', 1], ['Açık gri', '#B9B6B0', .95], ['Gri', '#8E8C88', .95], ['Antrasit', '#4A4846', .95], ['Kadife zeytin', '#5B6548', .8], ['Kadife lacivert', '#2F3B55', .8], ['Hardal', '#B98A2E', .9], ['Kiremit', '#A0563B', .9], ['Taba deri', '#8A5A3A', .5], ['Siyah deri', '#222120', .45]] },
    ahsap: { ad: 'Ahşap ve yüzey', l: [['Açık meşe', '#C4A57A', .6, 0, 1], ['Meşe', '#A88459', .6, 0, 1], ['Ceviz', '#5E4330', .55, 0, 2], ['Siyah ahşap', '#262422', .6], ['Beyaz lake', '#EEEBE5', .4], ['Traverten', '#CDBB9C', .5, 0, 4], ['Beyaz mermer', '#ECE8E2', .25, 0, 5]] }
  };
  var MUTFAK = ['tezgahUst', 'govde'], AHS = ['ahsap'], KUM = ['kumas'];
  var SLOT = {
    tezgah: MUTFAK, eviye: MUTFAK, ocak: MUTFAK, ada: MUTFAK, lavabo: MUTFAK, ciftlavabo: MUTFAK, bulasik: ['tezgahUst'], firin: ['govde'], gardirop: ['govde'], portmanto: ['govde'],
    koltuk3: KUM, koltuk2: KUM, kose: KUM, berjer: KUM, puf: KUM, bar: KUM, ofis: KUM, hali: KUM, yatak2: ['ahsap', 'kumas'], yatak1: ['ahsap', 'kumas'],
    masa2: AHS, masa4: AHS, masa6: AHS, masayuv: AHS, calisma: AHS, sehpa: AHS, yansehpa: AHS, komodin: AHS, sifonyer: AHS, bufe: AHS, tv: AHS, kitaplik: AHS, konsol: AHS, ayakkabi: AHS, makyaj: AHS, sandalye: AHS, dosya: AHS, bebek: AHS
  };
  // 3B modelde hangi sabit rengin hangi parçaya karşılık geldiği
  var KAYNAK = function (tip, slot) {
    var lav = tip === 'lavabo' || tip === 'ciftlavabo';
    if (slot === 'tezgahUst') return lav ? [0xf4f2ee] : [0xece8e0];
    if (slot === 'govde') return lav ? [0x7a5a3c] : tip === 'firin' ? [0xeeebe5] : [0xd6cfc2, 0xd8d0c2];
    if (slot === 'kumas') return tip === 'ofis' ? [0x232220] : tip === 'yatak2' || tip === 'yatak1' ? [0xc8bba6] : [0x8a8174, 0x9a9184, 0xa38b6d, 0xb3a58f];
    if (slot === 'ahsap') return tip === 'calisma' ? [0xeeebe5] : tip === 'dosya' ? [0x6e6b66] : [0x7a5a3c, 0xb08d66];
    return [];
  };
  var KAPI_TIP = {
    celik: { ad: 'Daire giriş kapısı (çelik)', gen: 1, h: 2.1, kanat: 'tek', renk: '#3B3A38' },
    oda: { ad: 'Oda kapısı', gen: .9, h: 2.1, kanat: 'tek', renk: '#ECE7DD' },
    banyo: { ad: 'Banyo kapısı', gen: .8, h: 2.1, kanat: 'tek', renk: '#ECE7DD' },
    balkon: { ad: 'Balkon kapısı (camlı)', gen: .9, h: 2.2, kanat: 'tek', renk: '#3B3A38', cam: 1 },
    cift: { ad: 'Çift kanatlı kapı', gen: 1.6, h: 2.2, kanat: 'cift', renk: '#6B4F35' },
    surgu: { ad: 'Sürgü kapı', gen: 1.2, h: 2.2, kanat: 'surgu', renk: '#B08D66' }
  };
  var PEN_TIP = {
    standart: { ad: 'Standart pencere', gen: 1.2, esik: .9, yuk: 1.2 },
    genis: { ad: 'Geniş pencere', gen: 1.8, esik: .9, yuk: 1.4 },
    yer: { ad: 'Yere kadar pencere', gen: 1.2, esik: 0, yuk: 2.2 },
    mutfak: { ad: 'Mutfak penceresi', gen: 1.2, esik: 1.05, yuk: 1 },
    banyo: { ad: 'Banyo penceresi', gen: .6, esik: 1.6, yuk: .6 }
  };
  var ODA_ADLARI = ['Oda', 'Salon', 'Mutfak', 'Salon ve mutfak', 'Yatak odası', 'Ebeveyn yatak odası', 'Çocuk odası', 'Banyo', 'WC', 'Antre', 'Koridor', 'Çalışma odası', 'Giyinme odası', 'Kiler', 'Balkon', 'Ofis'];

  /* ---------- eşya kütüphanesi: genişlik × derinlik × yükseklik (cm) ---------- */
  var ESYA = [
    ['Oturma', [
      ['koltuk3', 'Üçlü koltuk', 220, 90, 80], ['koltuk2', 'İkili koltuk', 160, 90, 80], ['kose', 'Köşe koltuk', 280, 200, 80],
      ['berjer', 'Berjer', 80, 80, 85], ['puf', 'Puf', 45, 45, 42], ['sehpa', 'Orta sehpa', 120, 60, 40], ['yansehpa', 'Yan sehpa', 50, 50, 50],
      ['tv', 'TV ünitesi', 180, 45, 50], ['kitaplik', 'Kitaplık', 100, 35, 200], ['hali', 'Halı', 200, 300, 1], ['lambader', 'Lambader', 40, 40, 170], ['bitki', 'Saksı bitki', 50, 50, 120]]],
    ['Yatak odası', [
      ['yatak2', 'Çift kişilik yatak', 160, 200, 50], ['yatak1', 'Tek kişilik yatak', 90, 200, 50], ['bebek', 'Bebek yatağı', 70, 130, 90], ['komodin', 'Komodin', 50, 40, 50],
      ['gardirop', 'Gardırop', 180, 60, 220], ['sifonyer', 'Şifonyer', 120, 50, 80], ['makyaj', 'Makyaj masası', 100, 45, 75]]],
    ['Yemek', [
      ['masa2', 'Yemek masası (2 kişilik)', 80, 80, 75], ['masa4', 'Yemek masası (4 kişilik)', 140, 80, 75], ['masa6', 'Yemek masası (6 kişilik)', 180, 90, 75],
      ['masayuv', 'Yuvarlak masa', 110, 110, 75], ['sandalye', 'Sandalye', 45, 50, 85], ['bufe', 'Büfe', 160, 45, 80]]],
    ['Mutfak', [
      ['tezgah', 'Tezgâh modülü', 60, 60, 90], ['eviye', 'Eviye', 80, 60, 90], ['ocak', 'Ocak', 60, 60, 90],
      ['buzdolabi', 'Buzdolabı', 70, 70, 190], ['bulasik', 'Bulaşık makinesi', 60, 60, 85], ['firin', 'Boy dolabı ve fırın', 60, 60, 220],
      ['ada', 'Mutfak adası', 180, 90, 90], ['bar', 'Bar taburesi', 40, 40, 75]]],
    ['Banyo', [
      ['klozet', 'Klozet', 40, 70, 80], ['lavabo', 'Lavabo dolabı', 60, 45, 85], ['ciftlavabo', 'Çift lavabo', 120, 50, 85], ['dus', 'Duş teknesi', 90, 90, 200],
      ['kuvet', 'Küvet', 170, 75, 55], ['camasir', 'Çamaşır makinesi', 60, 60, 85], ['havlupan', 'Havlupan', 50, 10, 120]]],
    ['Antre', [
      ['portmanto', 'Portmanto', 100, 40, 200], ['ayakkabi', 'Ayakkabılık', 100, 35, 100], ['konsol', 'Konsol', 120, 35, 80]]],
    ['Çalışma', [
      ['calisma', 'Çalışma masası', 140, 70, 75], ['ofis', 'Ofis sandalyesi', 60, 60, 100], ['dosya', 'Dosya dolabı', 80, 40, 110]]]
  ];
  var TIP = {};
  ESYA.forEach(function (g) { g[1].forEach(function (e) { TIP[e[0]] = { ad: e[1], w: e[2], d: e[3], h: e[4], kat: g[0] }; }); });

  var rgba = function (h, a) { var n = parseInt(h.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; };

  /* ---------- dokular ---------- */
  var r = function (a) { return Math.random() * a; };
  function desen(m, s) {
    s = s || 128;
    var c = d.createElement('canvas'), x = c.getContext('2d'); c.width = c.height = s;
    x.fillStyle = m.a; x.fillRect(0, 0, s, s); x.strokeStyle = m.b; x.lineWidth = 1;
    var t = m.tur, i, k, q = s / 128;
    if (t === 'parke') {
      for (var y = 0; y < s; y += 16 * q) {
        x.fillStyle = 'rgba(0,0,0,' + r(.12) + ')'; x.fillRect(0, y, s, 16 * q);
        x.beginPath(); x.moveTo(0, y + .5); x.lineTo(s, y + .5); x.stroke();
        var o = (Math.round(y / (16 * q)) % 4) * 32 * q; x.beginPath(); x.moveTo(o % s + .5, y); x.lineTo(o % s + .5, y + 16 * q); x.moveTo((o + 64 * q) % s + .5, y); x.lineTo((o + 64 * q) % s + .5, y + 16 * q); x.stroke();
        x.globalAlpha = .3; for (k = 0; k < 4; k++) { x.beginPath(); x.moveTo(0, y + (2 + r(12)) * q); x.bezierCurveTo(s * .3, y + r(16) * q, s * .6, y + r(16) * q, s, y + (2 + r(12)) * q); x.stroke(); } x.globalAlpha = 1;
      }
    } else if (t === 'balik') {
      for (i = -s; i < s * 2; i += 16 * q) for (k = -32 * q; k < s + 32 * q; k += 32 * q) {
        x.fillStyle = 'rgba(0,0,0,' + r(.12) + ')';
        x.save(); x.translate(i, k); x.rotate(Math.PI / 4); x.fillRect(0, 0, 32 * q, 8 * q); x.strokeRect(0, 0, 32 * q, 8 * q); x.restore();
        x.save(); x.translate(i + 16 * q, k + 16 * q); x.rotate(-Math.PI / 4); x.fillRect(0, 0, 32 * q, 8 * q); x.strokeRect(0, 0, 32 * q, 8 * q); x.restore();
      }
    } else if (t === 'tas') {
      for (i = 0; i < 30; i++) { x.globalAlpha = .15 + r(.4); x.beginPath(); var yy = r(s); x.moveTo(r(10), yy); x.lineTo(s - r(10), yy + r(2) - 1); x.stroke(); }
      x.globalAlpha = .6; x.beginPath(); x.moveTo(0, s / 2 + .5); x.lineTo(s, s / 2 + .5); x.moveTo(0, .5); x.lineTo(s, .5); x.moveTo(s / 2 + .5, 0); x.lineTo(s / 2 + .5, s / 2); x.moveTo(.5, s / 2); x.lineTo(.5, s); x.stroke();
    } else if (t === 'mermer') {
      for (i = 0; i < 9; i++) {
        x.globalAlpha = .2 + r(.5); x.lineWidth = (.5 + r(1.4)) * q; x.beginPath();
        var px = r(s), py = 0; x.moveTo(px, py);
        while (py < s) { px += (r(30) - 12) * q; py += (8 + r(14)) * q; x.lineTo(px, py); }
        x.stroke();
      }
      x.globalAlpha = .5; x.lineWidth = 1; x.strokeRect(.5, .5, s - 1, s - 1);
    } else if (t === 'karo') {
      for (i = 0; i < 2; i++) for (k = 0; k < 2; k++) { x.fillStyle = 'rgba(0,0,0,' + r(.06) + ')'; x.fillRect(i * s / 2, k * s / 2, s / 2, s / 2); }
      x.globalAlpha = .9; x.beginPath(); x.moveTo(0, .5); x.lineTo(s, .5); x.moveTo(0, s / 2 + .5); x.lineTo(s, s / 2 + .5); x.moveTo(.5, 0); x.lineTo(.5, s); x.moveTo(s / 2 + .5, 0); x.lineTo(s / 2 + .5, s); x.stroke();
    } else if (t === 'terrazzo') {
      var renk = [m.b, '#B9AC98', '#6F665A', '#E9E4DA', '#A7957A'];
      for (i = 0; i < 260 * q * q; i++) { x.fillStyle = renk[i % renk.length]; x.globalAlpha = .5 + r(.5); x.beginPath(); var cx = r(s), cy = r(s), rr = (.6 + r(2.6)) * q; x.moveTo(cx + rr, cy); for (k = 1; k < 5; k++) x.lineTo(cx + Math.cos(k * 1.3) * rr * (.6 + r(.6)), cy + Math.sin(k * 1.3) * rr * (.6 + r(.6))); x.fill(); }
    } else if (t === 'hidrolik') {
      var c4 = s / 4;
      for (i = 0; i < 4; i++) for (k = 0; k < 4; k++) {
        var mx = i * c4 + c4 / 2, my = k * c4 + c4 / 2;
        x.fillStyle = m.b; x.globalAlpha = .9;
        x.beginPath(); x.moveTo(mx, my - c4 / 2 + 3 * q); x.lineTo(mx + c4 / 2 - 3 * q, my); x.lineTo(mx, my + c4 / 2 - 3 * q); x.lineTo(mx - c4 / 2 + 3 * q, my); x.closePath(); x.fill();
        x.fillStyle = m.a; x.beginPath(); x.arc(mx, my, c4 / 6, 0, 7); x.fill();
        x.strokeStyle = 'rgba(60,55,50,.35)'; x.globalAlpha = 1; x.strokeRect(i * c4 + .5, k * c4 + .5, c4, c4);
      }
    } else if (t === 'hali') {
      for (i = 0; i < 1400 * q * q; i++) { x.globalAlpha = r(.35); x.fillStyle = i % 2 ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.4)'; x.fillRect(r(s), r(s), q, 2 * q); }
    } else {
      for (i = 0; i < (t === 'beton' ? 220 : 380) * q * q; i++) { x.globalAlpha = r(.5); x.fillStyle = m.b; x.fillRect(r(s), r(s), q, q); }
      if (t === 'beton') { x.globalAlpha = .45; for (i = 0; i < 7; i++) { x.beginPath(); x.arc(r(s), r(s), (1 + r(1.5)) * q, 0, 7); x.stroke(); } }
    }
    x.globalAlpha = 1;
    return c;
  }
  var dCache = {};
  var doku = function (zi, renk, s) { var k = zi + '|' + (renk || '') + '|' + s; if (!dCache[k]) { var m = ZEMIN[zi]; if (renk) m = Object.assign({}, m, { a: renk }); dCache[k] = desen(m, s); } return dCache[k]; };
  var dokuBoyu = function (o) { var m = ZEMIN[o.zemin] || {}; return m.k ? (o.zk || m.k) * m.n / 100 : (m.S || 1.2); };

  /* ---------- 2B eşya sembolleri (yerel koordinat: sol üst 0,0; arka kenar üstte) ---------- */
  var DOLGU = null;
  function sembol(x, t, W, D) {
    var rr = function (a, b, c, e, k) { x.beginPath(); if (x.roundRect) x.roundRect(a, b, c, e, k); else x.rect(a, b, c, e); };
    var cizgi = function () { x.stroke(); };
    var dolu = function (a) { x.fillStyle = 'rgba(23,20,15,.55)'; x.fill(); x.fillStyle = DOLGU ? rgba(DOLGU, .5) : 'rgba(237,232,224,' + (a || .1) + ')'; x.fill(); x.stroke(); };
    var ell = function (cx, cy, rx, ry) { x.beginPath(); x.ellipse(cx, cy, Math.max(rx, .5), Math.max(ry, .5), 0, 0, 7); };
    var kol = W * .1, sir = D * .28, i, n;
    switch (t) {
      case 'koltuk3': case 'koltuk2':
        rr(0, 0, W, D, 4); dolu(.12);
        rr(kol, 0, W - 2 * kol, sir, 2); cizgi();
        n = t === 'koltuk3' ? 3 : 2;
        for (i = 0; i < n; i++) { rr(kol + i * (W - 2 * kol) / n + 1, sir + 1, (W - 2 * kol) / n - 2, D - sir - 3, 3); cizgi(); }
        break;
      case 'kose':
        x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, D * .45); x.lineTo(W * .32, D * .45); x.lineTo(W * .32, D); x.lineTo(0, D); x.closePath(); dolu(.12);
        x.beginPath(); x.moveTo(sir * .7, sir * .7); x.lineTo(W - 4, sir * .7); x.moveTo(sir * .7, sir * .7); x.lineTo(sir * .7, D - 4); x.stroke();
        break;
      case 'berjer':
        rr(0, 0, W, D, 8); dolu(.12); rr(W * .15, D * .25, W * .7, D * .68, 6); cizgi(); break;
      case 'puf': ell(W / 2, D / 2, W / 2, D / 2); dolu(.12); ell(W / 2, D / 2, W * .3, D * .3); cizgi(); break;
      case 'lambader': ell(W / 2, D / 2, W / 2, D / 2); dolu(.06); ell(W / 2, D / 2, W * .12, D * .12); cizgi(); break;
      case 'sehpa': case 'yansehpa': case 'komodin': case 'sifonyer': case 'bufe': case 'dosya': case 'konsol': case 'ayakkabi': case 'makyaj':
        rr(0, 0, W, D, 2); dolu(.1);
        if (t === 'sehpa') { rr(4, 4, W - 8, D - 8, 2); cizgi(); }
        if (t === 'sifonyer' || t === 'bufe' || t === 'ayakkabi') { x.beginPath(); x.moveTo(W / 2, 0); x.lineTo(W / 2, D); x.stroke(); }
        if (t === 'makyaj') { rr(W * .3, 0, W * .4, 3, 1); cizgi(); }
        break;
      case 'tv': rr(0, 0, W, D, 2); dolu(.1); x.fillStyle = RENK.ink; x.fillRect(W * .2, D * .35, W * .6, 2); break;
      case 'kitaplik': case 'gardirop': case 'firin': case 'portmanto':
        rr(0, 0, W, D, 1); dolu(.1); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, D); x.moveTo(W, 0); x.lineTo(0, D); x.globalAlpha = .5; x.stroke(); x.globalAlpha = 1;
        if (t === 'gardirop') { x.beginPath(); x.moveTo(0, D * .2); x.lineTo(W, D * .2); x.stroke(); }
        break;
      case 'hali':
        x.setLineDash([4, 3]); rr(0, 0, W, D, 0); x.fillStyle = DOLGU ? rgba(DOLGU, .35) : 'rgba(242,183,5,.06)'; x.fill(); x.stroke(); x.setLineDash([]);
        rr(6, 6, W - 12, D - 12, 0); x.globalAlpha = .4; x.stroke(); x.globalAlpha = 1; break;
      case 'bitki':
        ell(W / 2, D / 2, W / 2, D / 2); dolu(.06);
        for (i = 0; i < 7; i++) { var a = i / 7 * Math.PI * 2; ell(W / 2 + Math.cos(a) * W * .22, D / 2 + Math.sin(a) * D * .22, W * .16, D * .1); cizgi(); }
        break;
      case 'yatak2': case 'yatak1':
        rr(0, 0, W, D, 3); dolu(.1); rr(0, 0, W, D * .06, 1); dolu(.25);
        n = t === 'yatak2' ? 2 : 1;
        for (i = 0; i < n; i++) { rr(4 + i * (W - 8) / n + 2, D * .09, (W - 8) / n - 4, D * .15, 4); cizgi(); }
        x.beginPath(); x.moveTo(0, D * .36); x.lineTo(W, D * .36); x.moveTo(0, D * .42); x.lineTo(W, D * .3); x.globalAlpha = .6; x.stroke(); x.globalAlpha = 1;
        break;
      case 'bebek': rr(0, 0, W, D, 2); dolu(.1); rr(3, 3, W - 6, D - 6, 2); cizgi(); for (i = 1; i < 6; i++) { x.beginPath(); x.moveTo(0, D * i / 6); x.lineTo(3, D * i / 6); x.moveTo(W - 3, D * i / 6); x.lineTo(W, D * i / 6); x.stroke(); } break;
      case 'masa2': case 'masa4': case 'masa6':
        n = t === 'masa6' ? 3 : t === 'masa2' ? 1 : 2;
        for (i = 0; i < n; i++) { var sx = W * (i + .5) / n - 10; rr(sx, -14, 20, 12, 3); cizgi(); rr(sx, D + 2, 20, 12, 3); cizgi(); }
        rr(0, 0, W, D, 2); dolu(.12); break;
      case 'masayuv':
        for (i = 0; i < 4; i++) { var b = i * Math.PI / 2 + Math.PI / 4; x.save(); x.translate(W / 2 + Math.cos(b) * W * .62, D / 2 + Math.sin(b) * D * .62); x.rotate(b + Math.PI / 2); rr(-10, -6, 20, 12, 3); cizgi(); x.restore(); }
        ell(W / 2, D / 2, W / 2, D / 2); dolu(.12); break;
      case 'sandalye': case 'bar': case 'ofis':
        if (t === 'bar' || t === 'ofis') { ell(W / 2, D / 2, W / 2.2, D / 2.2); dolu(.1); if (t === 'ofis') { rr(W * .15, 0, W * .7, D * .2, 3); cizgi(); } }
        else { rr(0, D * .15, W, D * .85, 3); dolu(.1); rr(0, 0, W, D * .16, 2); cizgi(); }
        break;
      case 'tezgah': case 'eviye': case 'ocak': case 'bulasik': case 'ada': case 'camasir': case 'lavabo': case 'ciftlavabo':
        rr(0, 0, W, D, 1); dolu(.1);
        if (t === 'eviye') { rr(W * .12, D * .2, W * .76, D * .6, 5); cizgi(); ell(W / 2, D * .5, 2, 2); cizgi(); }
        if (t === 'ocak') { [[.3, .3], [.7, .3], [.3, .7], [.7, .7]].forEach(function (p) { ell(W * p[0], D * p[1], W * .13, W * .13); cizgi(); }); }
        if (t === 'bulasik' || t === 'camasir') { x.fillStyle = RENK.soluk; x.font = '500 ' + Math.max(7, W * .14) + 'px Montserrat, sans-serif'; x.textAlign = 'center'; x.fillText(t === 'bulasik' ? 'BM' : 'ÇM', W / 2, D / 2 + 3); if (t === 'camasir') { ell(W / 2, D / 2, W * .32, W * .32); cizgi(); } }
        if (t === 'lavabo') { ell(W / 2, D * .55, W * .32, D * .3); cizgi(); }
        if (t === 'ciftlavabo') { ell(W * .27, D * .55, W * .17, D * .3); cizgi(); ell(W * .73, D * .55, W * .17, D * .3); cizgi(); }
        if (t === 'ada') { rr(W * .55, D * .15, W * .35, D * .5, 4); cizgi(); }
        break;
      case 'buzdolabi': rr(0, 0, W, D, 2); dolu(.12); x.beginPath(); x.moveTo(0, D * .85); x.lineTo(W, D * .85); x.stroke(); x.fillStyle = RENK.soluk; x.font = '500 8px Montserrat, sans-serif'; x.textAlign = 'center'; x.fillText('BZD', W / 2, D / 2 + 3); break;
      case 'klozet': rr(W * .05, 0, W * .9, D * .28, 2); dolu(.12); ell(W / 2, D * .62, W * .42, D * .36); dolu(.08); ell(W / 2, D * .64, W * .26, D * .24); cizgi(); break;
      case 'dus': rr(0, 0, W, D, 2); dolu(.06); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, D); x.moveTo(W, 0); x.lineTo(0, D); x.globalAlpha = .4; x.stroke(); x.globalAlpha = 1; ell(W / 2, D / 2, 3, 3); cizgi(); break;
      case 'kuvet': rr(0, 0, W, D, 4); dolu(.1); rr(W * .06, D * .12, W * .88, D * .76, D * .3); cizgi(); ell(W * .12, D / 2, 2.5, 2.5); cizgi(); break;
      case 'havlupan': rr(0, 0, W, D, 1); dolu(.2); break;
      case 'calisma': rr(0, 0, W, D, 2); dolu(.1); rr(W * .3, D * .08, W * .4, 3, 1); cizgi(); break;
      default: rr(0, 0, W, D, 2); dolu(.1);
    }
  }

  function Masa(kok) {
    var cv = kok.querySelector('canvas'), x = cv.getContext('2d');
    var bilgi = kok.querySelector('[data-toplam]'), ipucu = kok.querySelector('[data-ipucu]'), panel = kok.querySelector('[data-panel]'), sahne = kok.querySelector('[data-3b]');
    var W = 0, H = 0, dpr = 1, z = 1, ox = 0, oy = 0, dokunma = false, ilk = true;
    var TOL = function () { return (dokunma ? 2 : 1) / Math.min(z, 1.5); };
    var plan = { odalar: [], acik: [], esya: [] }, gecmis = [], cizilen = [], fare = null, arac = 'duvar';
    var secZemin = 1, secBoya = 1, secTip = 'koltuk3', secKapi = 'oda', secPen = 'standart', sec = null, surukle = null, uc = false, hayaletA = 0, uzerinde = null;
    try {
      var k = JSON.parse(localStorage.getItem(ANAHTAR));
      if (k && k.odalar) {
        plan = k; plan.acik = plan.acik || []; plan.esya = plan.esya || [];
        plan.odalar.forEach(function (o) { if (o.zemin === undefined) o.zemin = [0, 1, 4, 11, 12][o.mat || 0]; if (o.boya === undefined) o.boya = 0; delete o.mat; if (!ZEMIN[o.zemin]) o.zemin = 0; });
        plan.esya = plan.esya.filter(function (e) { return TIP[e.tip]; });
        plan.esya.forEach(function (e) { if (e.a === undefined) e.a = (e.r || 0) * 90; delete e.r; });
      }
    } catch (e) {}

    var kaydet = function () { try { localStorage.setItem(ANAHTAR, JSON.stringify(plan)); } catch (e) {} };
    var anlik = function () { gecmis.push(JSON.stringify(plan)); if (gecmis.length > 120) gecmis.shift(); };
    var ses = function (f, v) { var S = w.dmSes; if (S && S.on && S.ctx) S.bell(f, 0, v || .015); };
    var m = function (px) { return (px / METRE).toFixed(2).replace('.', ','); };
    var yasla = function (v) { return Math.round(v / (KARE / 2)) * (KARE / 2); };
    var ince = function (v) { return Math.round(v / 2.4) * 2.4; }; // 5 cm
    var alanHesap = function (pts) { var a = 0; pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }); return Math.abs(a) / 2 / (METRE * METRE); };
    var merkez = function (pts) { var cx = 0, cy = 0; pts.forEach(function (p) { cx += p.x; cy += p.y; }); return { x: cx / pts.length, y: cy / pts.length }; };
    var icinde = function (p, pts) {
      var c = false;
      for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) { var a = pts[i], b = pts[j]; if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) c = !c; }
      return c;
    };
    var yon = function (pts) { var a = 0; pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }); return a > 0 ? 1 : -1; };
    var odaBul = function (p) { for (var i = plan.odalar.length - 1; i >= 0; i--) if (icinde(p, plan.odalar[i].pts)) return i; return -1; };
    var duvarRengi = function (o) { return o.duvarR || BOYA[o.boya || 0].r; };
    var desenler = {};
    var desenBul = function (o) {
      if (!ZEMIN[o.zemin].tur) return null;
      var k = o.zemin + '|' + (o.zrenk || ''), p = desenler[k] || (desenler[k] = x.createPattern(doku(o.zemin, o.zrenk, 128), 'repeat'));
      if (p.setTransform && w.DOMMatrix) { var sc = dokuBoyu(o) * METRE / 128; p.setTransform(new DOMMatrix().rotateSelf(o.zaci || 0).scaleSelf(sc, sc)); }
      return p;
    };

    /* eşya geometri */
    var aciRad = function (e) { return (e.a || 0) * Math.PI / 180; };
    var olc = function (e) { var t = TIP[e.tip]; return { w: (e.w || t.w) / 100 * METRE, d: (e.d || t.d) / 100 * METRE }; };
    var yerel = function (p, e) { var a = aciRad(e), c = Math.cos(a), s = Math.sin(a), dx = p.x - e.x, dy = p.y - e.y; return { x: dx * c + dy * s, y: -dx * s + dy * c }; };
    var dunya = function (e, lx, ly) { var a = aciRad(e), c = Math.cos(a), s = Math.sin(a); return { x: e.x + lx * c - ly * s, y: e.y + lx * s + ly * c }; };
    var sapNoktasi = function (e) { return dunya(e, 0, -olc(e).d / 2 - 20); };
    var esyaBul = function (p, hali) {
      for (var i = plan.esya.length - 1; i >= 0; i--) {
        var e = plan.esya[i]; if ((e.tip === 'hali') !== !!hali) continue;
        var o = olc(e), l = yerel(p, e), t = 4 * TOL(); if (Math.abs(l.x) <= o.w / 2 + t && Math.abs(l.y) <= o.d / 2 + t) return i;
      }
      return -1;
    };

    /* açıklık geometri */
    var acikGen = function (a) { return a.gen || (a.tur === 'kapi' ? .9 : 1.2); };
    var acikEsik = function (a) { return a.esik === undefined ? .9 : a.esik; };
    var acikYuk = function (a) { return a.yuk || 1.2; };
    var kapiH = function (a) { return a.h || 2.1; };
    var acikGeo = function (a) {
      var o = plan.odalar[a.oda]; if (!o) return null;
      var p = o.pts[a.kenar], q = o.pts[(a.kenar + 1) % o.pts.length]; if (!p || !q) return null;
      var L = Math.hypot(q.x - p.x, q.y - p.y); if (!L) return null;
      var ux = (q.x - p.x) / L, uy = (q.y - p.y) / L, gen = acikGen(a) * METRE, c = { x: p.x + (q.x - p.x) * a.t, y: p.y + (q.y - p.y) * a.t }, yn = yon(o.pts);
      return { o: o, p: p, q: q, L: L, ux: ux, uy: uy, gen: gen, c: c, s1: { x: c.x - ux * gen / 2, y: c.y - uy * gen / 2 }, s2: { x: c.x + ux * gen / 2, y: c.y + uy * gen / 2 }, nx: -uy * yn, ny: ux * yn };
    };
    var acikBul = function (p) {
      for (var i = plan.acik.length - 1; i >= 0; i--) {
        var g = acikGeo(plan.acik[i]); if (!g) continue;
        var dx = p.x - g.c.x, dy = p.y - g.c.y;
        if (Math.abs(dx * g.ux + dy * g.uy) <= g.gen / 2 + 2 && Math.abs(dx * g.nx + dy * g.ny) <= 10 * TOL()) return i;
      }
      return -1;
    };
    var acikSigdir = function (a) {
      var g = acikGeo(a); if (!g) return;
      var maks = g.L / METRE - .1; if (acikGen(a) > maks) a.gen = Math.max(.3, Math.floor(maks * 20) / 20);
      var pay = (acikGen(a) * METRE / 2 + 3) / g.L; a.t = Math.max(pay, Math.min(1 - pay, a.t));
    };
    var enYakinDuvar = function (p) {
      var best = null;
      plan.odalar.forEach(function (o, oi) {
        o.pts.forEach(function (a, i) {
          var b = o.pts[(i + 1) % o.pts.length], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy); if (!L) return;
          var t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (L * L)));
          var dd = Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t));
          if (dd < 14 * TOL() && (!best || dd < best.d)) best = { d: dd, oda: oi, kenar: i, t: t, L: L };
        });
      });
      return best;
    };
    var dik = function (son, p) { var dx = p.x - son.x, dy = p.y - son.y; return Math.abs(dx) >= Math.abs(dy) ? { x: yasla(p.x), y: son.y } : { x: son.x, y: yasla(p.y) }; };
    var gecerliSec = function () {
      if (!sec) return null;
      var l = sec.tur === 'esya' ? plan.esya : sec.tur === 'acik' ? plan.acik : plan.odalar;
      if (!l[sec.i]) sec = null;
      return sec;
    };
    var bul = function (p) {
      var s = gecerliSec();
      if (s && s.tur === 'esya') { var sp = sapNoktasi(plan.esya[s.i]); if (Math.hypot(p.x - sp.x, p.y - sp.y) < 12 * TOL()) return { tur: 'sap', i: s.i }; }
      var i = esyaBul(p, false); if (i >= 0) return { tur: 'esya', i: i };
      i = acikBul(p); if (i >= 0) return { tur: 'acik', i: i };
      i = esyaBul(p, true); if (i >= 0) return { tur: 'esya', i: i };
      i = odaBul(p); if (i >= 0) return { tur: 'oda', i: i };
      return null;
    };

    var boyut = function () {
      dpr = Math.min(w.devicePixelRatio || 1, 2);
      var b = cv.getBoundingClientRect(); if (!b.width) return; W = b.width; H = b.height;
      cv.width = W * dpr; cv.height = H * dpr;
      if (ilk) { ilk = false; if (plan.odalar.length) sigdir(); else if (W < 600) z = .7; }
      ciz();
      if (uc) U.yeniden();
    };
    var zumla = function (sx, sy, k) {
      var nz = Math.max(.3, Math.min(4, z * k)); if (nz === z) return;
      ox = sx - (sx - ox) * nz / z; oy = sy - (sy - oy) * nz / z; z = nz; ciz();
    };
    var sigdir = function () {
      if (!plan.odalar.length) { z = W < 600 ? .7 : 1; ox = oy = 0; ciz(); return; }
      var a = 1e9, b = 1e9, c = -1e9, e = -1e9;
      plan.odalar.forEach(function (o) { o.pts.forEach(function (p) { a = Math.min(a, p.x); b = Math.min(b, p.y); c = Math.max(c, p.x); e = Math.max(e, p.y); }); });
      z = Math.max(.3, Math.min(2.5, Math.min((W - 60) / (c - a || 1), (H - 60) / (e - b || 1))));
      ox = W / 2 - (a + c) / 2 * z; oy = H / 2 - (b + e) / 2 * z; ciz();
    };
    var olcuYaz = function (a, b, ic) {
      var L = Math.abs(b.x - a.x) + Math.abs(b.y - a.y); if (L < KARE) return;
      var yat = a.y === b.y, o = ic ? -16 : 16;
      x.save(); x.fillStyle = RENK.soluk; x.font = '500 9.5px Montserrat, sans-serif'; x.textAlign = 'center';
      if (yat) x.fillText(m(L), (a.x + b.x) / 2, a.y - o + 3);
      else { x.translate(a.x + o, (a.y + b.y) / 2); x.rotate(-Math.PI / 2); x.fillText(m(L), 0, 3); }
      x.restore();
    };
    var etiket = function (t, px, py, renk) {
      x.save(); x.font = '500 9.5px Montserrat, sans-serif'; x.textAlign = 'center'; x.lineJoin = 'round';
      x.strokeStyle = 'rgba(23,20,15,.9)'; x.lineWidth = 4; x.strokeText(t, px, py); x.fillStyle = renk || RENK.y; x.fillText(t, px, py); x.restore();
    };
    var esyaCiz = function (e, i, hayalet) {
      var o = olc(e), secik = !hayalet && sec && sec.tur === 'esya' && sec.i === i, ust = !hayalet && uzerinde && uzerinde.tur === 'esya' && uzerinde.i === i;
      x.save(); x.translate(e.x, e.y); x.rotate(aciRad(e));
      x.strokeStyle = hayalet || secik ? RENK.y : ust ? '#fff' : 'rgba(237,232,224,.85)'; x.lineWidth = 1; x.globalAlpha = hayalet ? .7 : 1;
      var sl0 = (SLOT[e.tip] || []).filter(function (k) { return e.m && e.m[k] !== undefined; })[0];
      DOLGU = sl0 ? PARCA[sl0].l[e.m[sl0]][1] : e.renk || null;
      x.save(); x.translate(-o.w / 2, -o.d / 2); sembol(x, e.tip, o.w, o.d); x.restore();
      DOLGU = null;
      if (secik) {
        x.strokeStyle = RENK.y; x.setLineDash([3, 3]); x.strokeRect(-o.w / 2 - 4, -o.d / 2 - 4, o.w + 8, o.d + 8); x.setLineDash([]);
        x.beginPath(); x.moveTo(0, -o.d / 2 - 4); x.lineTo(0, -o.d / 2 - 13); x.stroke();
        x.beginPath(); x.arc(0, -o.d / 2 - 20, 7, 0, 7); x.fillStyle = RENK.y; x.fill();
        x.strokeStyle = RENK.bg; x.lineWidth = 1.4; x.beginPath(); x.arc(0, -o.d / 2 - 20, 3.5, -.3, 4.2); x.stroke();
      }
      x.restore();
      if (secik) {
        var t = TIP[e.tip], rr = Math.hypot(o.w, o.d) / 2;
        etiket(t.ad + ' · ' + (e.w || t.w) + '×' + (e.d || t.d) + ' cm · ' + Math.round(e.a || 0) + '°', e.x, e.y + rr + 16);
      }
    };

    function ciz() {
      x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H);
      x.setTransform(dpr * z, 0, 0, dpr * z, dpr * ox, dpr * oy); x.lineWidth = 1 / z;
      var wx0 = Math.floor(-ox / z / KARE) * KARE, wy0 = Math.floor(-oy / z / KARE) * KARE, wx1 = (W - ox) / z, wy1 = (H - oy) / z;
      for (var gx = wx0; gx <= wx1; gx += KARE) { x.strokeStyle = Math.round(gx / KARE) % 4 ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(gx, wy0); x.lineTo(gx, wy1); x.stroke(); }
      for (var gy = wy0; gy <= wy1; gy += KARE) { x.strokeStyle = Math.round(gy / KARE) % 4 ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(wx0, gy); x.lineTo(wx1, gy); x.stroke(); }
      var yol = function (o) { x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath(); };
      plan.odalar.forEach(function (o) {
        yol(o); var ds = desenBul(o);
        if (ds) { x.fillStyle = ds; x.globalAlpha = .92; x.fill(); x.globalAlpha = 1; } else { x.fillStyle = 'rgba(242,183,5,.05)'; x.fill(); }
      });
      plan.esya.forEach(function (e, i) { if (e.tip === 'hali') esyaCiz(e, i); });
      plan.odalar.forEach(function (o) {
        x.lineJoin = 'miter'; x.lineCap = 'square'; x.strokeStyle = RENK.ink; x.lineWidth = 6; yol(o); x.stroke();
        o.pts.forEach(function (p, i) { olcuYaz(p, o.pts[(i + 1) % o.pts.length], false); });
      });
      plan.acik.forEach(function (a, ai) {
        var g = acikGeo(a); if (!g) return;
        var secik = sec && sec.tur === 'acik' && sec.i === ai, ust = uzerinde && uzerinde.tur === 'acik' && uzerinde.i === ai;
        var ink = secik ? RENK.y : ust ? '#fff' : RENK.ink;
        x.lineCap = 'butt'; x.strokeStyle = RENK.bg; x.lineWidth = 8; x.beginPath(); x.moveTo(g.s1.x, g.s1.y); x.lineTo(g.s2.x, g.s2.y); x.stroke();
        x.strokeStyle = ink; x.lineWidth = 1;
        x.beginPath(); x.moveTo(g.s1.x - g.nx * 4, g.s1.y - g.ny * 4); x.lineTo(g.s1.x + g.nx * 4, g.s1.y + g.ny * 4); x.moveTo(g.s2.x - g.nx * 4, g.s2.y - g.ny * 4); x.lineTo(g.s2.x + g.nx * 4, g.s2.y + g.ny * 4); x.stroke();
        if (a.tur === 'kapi') {
          var yn = a.yon === -1 ? -1 : 1, nx = g.nx * yn, ny = g.ny * yn, kt = KAPI_TIP[a.kt] || {};
          var kanat = function (h, dx, dy, L) {
            x.setLineDash([]); x.strokeStyle = ink; x.lineWidth = a.kt === 'celik' ? 2.6 : 1.4;
            x.beginPath(); x.moveTo(h.x, h.y); x.lineTo(h.x + nx * L, h.y + ny * L); x.stroke();
            x.strokeStyle = secik ? RENK.y : RENK.soluk; x.lineWidth = 1; x.setLineDash([3, 3]);
            var a0 = Math.atan2(ny, nx), a1 = Math.atan2(dy, dx), f = a1 - a0;
            while (f > Math.PI) f -= 2 * Math.PI; while (f < -Math.PI) f += 2 * Math.PI;
            x.beginPath(); x.arc(h.x, h.y, L, a0, a1, f < 0); x.stroke(); x.setLineDash([]);
          };
          if (a.kanat === 'cift') { kanat(g.s1, g.ux, g.uy, g.gen / 2); kanat(g.s2, -g.ux, -g.uy, g.gen / 2); }
          else if (a.kanat === 'surgu') {
            x.lineWidth = 2.4; x.strokeStyle = ink; x.beginPath();
            x.moveTo(g.s1.x + g.nx * 2.5, g.s1.y + g.ny * 2.5); x.lineTo(g.c.x + g.ux * g.gen * .08 + g.nx * 2.5, g.c.y + g.uy * g.gen * .08 + g.ny * 2.5);
            x.moveTo(g.c.x - g.ux * g.gen * .08 - g.nx * 2.5, g.c.y - g.uy * g.gen * .08 - g.ny * 2.5); x.lineTo(g.s2.x - g.nx * 2.5, g.s2.y - g.ny * 2.5); x.stroke();
          }
          else if (a.mentese) kanat(g.s2, -g.ux, -g.uy, g.gen); else kanat(g.s1, g.ux, g.uy, g.gen);
          if (kt.cam) { x.strokeStyle = RENK.y; x.lineWidth = 1; x.beginPath(); x.moveTo(g.s1.x, g.s1.y); x.lineTo(g.s2.x, g.s2.y); x.stroke(); }
          if (secik) etiket((kt.ad || 'Kapı') + ' · ' + Math.round(acikGen(a) * 100) + ' cm', g.c.x - g.nx * 22, g.c.y - g.ny * 22 + 3);
        } else {
          x.lineWidth = secik ? 1.8 : 1.2; x.strokeStyle = ink;
          [-3, 3].forEach(function (k) { x.beginPath(); x.moveTo(g.s1.x + g.nx * k, g.s1.y + g.ny * k); x.lineTo(g.s2.x + g.nx * k, g.s2.y + g.ny * k); x.stroke(); });
          x.strokeStyle = RENK.y; x.lineWidth = 1; x.beginPath(); x.moveTo(g.s1.x, g.s1.y); x.lineTo(g.s2.x, g.s2.y); x.stroke();
          if (acikEsik(a) < .05) { x.setLineDash([2, 2]); x.beginPath(); x.moveTo(g.s1.x + g.nx * 8, g.s1.y + g.ny * 8); x.lineTo(g.s2.x + g.nx * 8, g.s2.y + g.ny * 8); x.stroke(); x.setLineDash([]); }
          if (secik) etiket('Pencere · ' + Math.round(acikGen(a) * 100) + '×' + Math.round(acikYuk(a) * 100) + ' cm', g.c.x - g.nx * 22, g.c.y - g.ny * 22 + 3);
        }
      });
      plan.esya.forEach(function (e, i) { if (e.tip !== 'hali') esyaCiz(e, i); });
      plan.odalar.forEach(function (o, oi) {
        var c = merkez(o.pts), secik = sec && sec.tur === 'oda' && sec.i === oi;
        if (secik) { x.save(); x.strokeStyle = RENK.y; x.lineWidth = 2; x.setLineDash([6, 4]); yol(o); x.stroke(); x.restore(); }
        var et = alanHesap(o.pts).toFixed(2).replace('.', ',') + ' m²', dy = o.ad ? 8 : 0;
        if (o.ad) etiket(o.ad.toLocaleUpperCase('tr'), c.x, c.y - 8, RENK.ink);
        x.font = '500 12px Montserrat, sans-serif'; x.textAlign = 'center'; x.lineJoin = 'round';
        x.strokeStyle = 'rgba(23,20,15,.85)'; x.lineWidth = 4; x.strokeText(et, c.x, c.y + 4 + dy);
        x.fillStyle = RENK.y; x.fillText(et, c.x, c.y + 4 + dy);
        if (o.zemin) { x.font = '500 8.5px Montserrat, sans-serif'; var zt = ZEMIN[o.zemin].ad.toLocaleUpperCase('tr'); x.lineWidth = 3; x.strokeText(zt, c.x, c.y + 18 + dy); x.fillStyle = RENK.ink; x.fillText(zt, c.x, c.y + 18 + dy); }
      });
      if (cizilen.length) {
        x.strokeStyle = RENK.y; x.lineWidth = 2; x.lineCap = 'square';
        x.beginPath(); cizilen.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); });
        if (fare) { var u = dik(cizilen[cizilen.length - 1], fare); x.lineTo(u.x, u.y); }
        x.stroke();
        if (fare) olcuYaz(cizilen[cizilen.length - 1], dik(cizilen[cizilen.length - 1], fare), true);
        x.fillStyle = RENK.y; cizilen.forEach(function (p) { x.fillRect(p.x - 3, p.y - 3, 6, 6); });
        if (cizilen.length > 2) { x.lineWidth = 1; x.strokeRect(cizilen[0].x - 7.5, cizilen[0].y - 7.5, 15, 15); }
      }
      if (fare && arac === 'duvar') { var f = cizilen.length ? dik(cizilen[cizilen.length - 1], fare) : { x: yasla(fare.x), y: yasla(fare.y) }; x.fillStyle = RENK.y; x.fillRect(f.x - 2, f.y - 2, 4, 4); }
      if (fare && !uzerinde && !surukle && (arac === 'kapi' || arac === 'pencere')) {
        var dv = enYakinDuvar(fare);
        if (dv) {
          var o2 = plan.odalar[dv.oda], a2 = o2.pts[dv.kenar], b2 = o2.pts[(dv.kenar + 1) % o2.pts.length], gn = (arac === 'kapi' ? KAPI_TIP[secKapi].gen : PEN_TIP[secPen].gen) * METRE / 2;
          var ux = (b2.x - a2.x) / dv.L, uy = (b2.y - a2.y) / dv.L, cx = a2.x + (b2.x - a2.x) * dv.t, cy = a2.y + (b2.y - a2.y) * dv.t;
          x.strokeStyle = RENK.y; x.lineWidth = 8; x.globalAlpha = .6; x.beginPath(); x.moveTo(cx - ux * gn, cy - uy * gn); x.lineTo(cx + ux * gn, cy + uy * gn); x.stroke(); x.globalAlpha = 1;
        }
      }
      if (fare && !uzerinde && !surukle && arac === 'esya') esyaCiz({ tip: secTip, x: ince(fare.x), y: ince(fare.y), a: hayaletA }, -2, true);
      if (fare && (arac === 'zemin' || arac === 'boya')) { var oi2 = odaBul(fare); if (oi2 >= 0) { x.strokeStyle = RENK.y; x.lineWidth = 2; yol(plan.odalar[oi2]); x.stroke(); } }
      var top = plan.odalar.reduce(function (s, o) { return s + alanHesap(o.pts); }, 0);
      if (bilgi) bilgi.textContent = plan.odalar.length + ' oda · ' + plan.esya.length + ' eşya · ' + top.toFixed(2).replace('.', ',') + ' m²';
    }

    /* ---------- panel ---------- */
    var IPUCU = {
      duvar: 'Tıklayarak köşeleri ekleyin, ilk köşeye tıklayınca oda kapanır.',
      kapi: 'Panelden kapı tipini seçin, sonra bir duvara tıklayın.', pencere: 'Panelden pencere tipini seçin, sonra bir duvara tıklayın.',
      esya: 'Listeden bir eşya seçin, plana tıklayıp yerleştirin. R ile döndürün.',
      zemin: 'Bir zemin seçin, uygulamak için odanın içine tıklayın.', boya: 'Bir duvar rengi seçin, uygulamak için odanın içine tıklayın.',
      sec: 'Bir eşyaya, kapıya, pencereye ya da odaya tıklayın; ayarlarını sağdaki panelden değiştirin.'
    };
    var on = function (el, a, b) { if (el) el.setAttribute(a, b); };
    var aralik = function (ad, k, v, min, max, adim, goster) {
      return '<label class="pn-alan"><span>' + ad + '<b data-deger="' + k + '">' + goster + '</b></span><input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + adim + '" value="' + v + '"></label>';
    };
    var secim = function (ad, k, liste, v) {
      return '<div class="pn-alan"><span>' + ad + '</span><div class="pn-sec" data-k="' + k + '">' + liste.map(function (s) { return '<button type="button" data-v="' + s[0] + '" aria-pressed="' + (String(s[0]) === String(v)) + '">' + s[1] + '</button>'; }).join('') + '</div></div>';
    };
    var renkler = function (ad, k, v, liste, dogal) {
      return '<div class="pn-alan"><span>' + ad + '</span><div class="pn-cip" data-k="' + k + '">' +
        '<button type="button" data-v="" class="dogal" title="' + (dogal || 'Doğal renk') + '" aria-label="' + (dogal || 'Doğal renk') + '" aria-pressed="' + !v + '"></button>' +
        liste.map(function (c) { return '<button type="button" data-v="' + c + '" title="' + c + '" aria-label="' + c + '" style="background:' + c + '" aria-pressed="' + (v === c) + '"></button>'; }).join('') +
        '<label class="pn-ozel" title="Özel renk"><input type="color" data-k="' + k + '" aria-label="Özel renk" value="' + (v || '#b0a594') + '"></label></div></div>';
    };
    var cmS = function (v) { return Math.round(v * 100); };
    var degerMetni = function (k) {
      var s = gecerliSec(); if (!s) return '';
      if (s.tur === 'esya') { var e = plan.esya[s.i]; if (k === 'a') return Math.round(e.a || 0) + '°'; }
      if (s.tur === 'acik') {
        var a = plan.acik[s.i];
        if (k === 'gen') return cmS(acikGen(a)) + ' cm'; if (k === 'h') return cmS(kapiH(a)) + ' cm';
        if (k === 'esik') return cmS(acikEsik(a)) + ' cm'; if (k === 'yuk') return cmS(acikYuk(a)) + ' cm';
      }
      if (s.tur === 'oda') { var o = plan.odalar[s.i], z = ZEMIN[o.zemin]; if (k === 'zk' && z.k) { var v = o.zk || z.k; return z.kare ? v + ' × ' + v + ' cm' : v + ' cm'; } }
      return '';
    };
    var degerYaz = function (k) {
      var b = panel && panel.querySelector('[data-deger="' + k + '"]'); if (b) b.textContent = degerMetni(k);
      var s = gecerliSec(), inp = panel && panel.querySelector('input[type=range][data-k="' + k + '"]');
      if (inp && d.activeElement !== inp && s && s.tur === 'esya' && k === 'a') inp.value = plan.esya[s.i].a || 0;
    };
    var zeminButon = function (secili) {
      var h = '<div class="pn-renk">';
      ZEMIN.forEach(function (z, i) { if (i) h += '<button type="button" data-zemin="' + i + '" aria-pressed="' + (i === secili) + '"><i data-onizle="' + i + '"></i><span>' + z.ad + '</span></button>'; });
      return h + '</div>';
    };
    var boyaButon = function (secili, ozel) {
      var h = '<div class="pn-renk">';
      BOYA.forEach(function (b, i) { h += '<button type="button" data-boya="' + i + '" aria-pressed="' + (!ozel && i === secili) + '"><i style="background:' + b.r + '"></i><span>' + b.ad + '</span></button>'; });
      return h + '</div>';
    };
    /* Kapı açılış yönü: menteşe tarafı ve içe/dışa, küçük çizimlerle */
    var acilisSecici = function (a) {
      if (a.kanat === 'surgu') return '';
      var g = acikGeo(a); if (!g) return '';
      var mm = a.mentese ? 1 : 0, yy = a.yon === -1 ? -1 : 1, cift = a.kanat === 'cift', yn = yon(g.o.pts);
      // simge odayı üstte gösterir; menteşe tarafı plandakiyle aynı düşsün
      var svg = function (m, y) {
        var sag = (m ? -1 : 1) * yn > 0, hx = sag ? 37 : 7, ux = sag ? 7 : 37, k;
        if (cift) k = '<path d="M7 22V' + (y === 1 ? 7 : 37) + 'A15 15 0 0 ' + (y === 1 ? 1 : 0) + ' 22 22M37 22V' + (y === 1 ? 7 : 37) + 'A15 15 0 0 ' + (y === 1 ? 0 : 1) + ' 22 22"/>';
        else k = '<path d="M' + hx + ' 22V' + (y === 1 ? -8 : 52) + 'A30 30 0 0 ' + ((sag ? 0 : 1) ^ (y === 1 ? 0 : 1)) + ' ' + ux + ' 22"/><circle cx="' + hx + '" cy="22" r="2.5"/>';
        return '<svg viewBox="0 -10 44 64" aria-hidden="true"><rect class="o" x="0" y="-10" width="44" height="32"/><line class="d" x1="0" y1="22" x2="7" y2="22"/><line class="d" x1="37" y1="22" x2="44" y2="22"/>' + k + '</svg>';
      };
      var liste = cift ? [[0, 1, 'İçe açılır'], [0, -1, 'Dışa açılır']] : [[0, 1, 'İçe açılır'], [1, 1, 'İçe açılır'], [0, -1, 'Dışa açılır'], [1, -1, 'Dışa açılır']];
      return '<p class="pn-baslik">Açılış yönü</p><div class="pn-acilis">' + liste.map(function (o) {
        var on = (cift || o[0] === mm) && o[1] === yy;
        return '<button type="button" data-pis="ac' + o[0] + (o[1] === 1 ? 'i' : 'd') + '" aria-pressed="' + on + '">' + svg(o[0], o[1]) + '<span>' + o[2] + '</span></button>';
      }).join('') + '</div><p class="pn-not pn-ipucu">Açık renkli taraf odanın içi, nokta menteşe. Seçtiğiniz yön planda hemen görünür.</p>';
    };
    function secimPaneli(s) {
      var h = '', geriDon = { esya: '← Eşya listesi', kapi: '← Kapı tipleri', pencere: '← Pencere tipleri' }[arac];
      geriDon = geriDon ? '<button type="button" data-pis="liste">' + geriDon + '</button>' : '';
      if (s.tur === 'esya') {
        var e = plan.esya[s.i], t = TIP[e.tip], ew = e.w || t.w, ed = e.d || t.d;
        h += '<p class="pn-baslik">Seçili eşya</p><p class="pn-ad">' + t.ad + '</p><p class="pn-olcu">' + ew + ' × ' + ed + ' × ' + t.h + ' cm</p>' +
          '<p class="pn-baslik">Döndür <kbd>R</kbd></p><p class="pn-not pn-ipucu">Sarı tutamağı sürükleyin ya da klavyede <b>R</b> tuşuna basın (her basışta 90°). Dokunmatikte eşyaya iki kez dokunun.</p><div class="pn-is"><button type="button" data-pis="sol90">⟲ 90°</button><button type="button" data-pis="sol15">⟲ 15°</button><button type="button" data-pis="sag15">15° ⟳</button><button type="button" data-pis="sag90">90° ⟳</button></div>' +
          aralik('Açı', 'a', e.a || 0, 0, 359, 1, Math.round(e.a || 0) + '°') +
          '<p class="pn-baslik">Ölçü (cm)</p><div class="pn-ikili"><label>Genişlik<input type="number" data-k="w" min="10" max="800" value="' + ew + '"></label><label>Derinlik<input type="number" data-k="d" min="10" max="800" value="' + ed + '"></label></div>' +
          (e.w || e.d ? '<div class="pn-is"><button type="button" data-pis="standart">Standart ölçüye dön</button></div>' : '') +
          ((SLOT[e.tip] || []).length ? (SLOT[e.tip] || []).map(function (sl) {
            var P = PARCA[sl], v = (e.m || {})[sl];
            return '<p class="pn-baslik">' + P.ad + '</p><div class="pn-renk pn-malz">' +
              '<button type="button" data-slot="' + sl + '" data-mi="" aria-pressed="' + (v === undefined) + '"><i class="dogal"></i><span>Standart</span></button>' +
              P.l.map(function (mm, i) { return '<button type="button" data-slot="' + sl + '" data-mi="' + i + '" aria-pressed="' + (v === i) + '"><i ' + (mm[4] !== undefined ? 'data-onizle="' + mm[4] + '" data-ton="' + mm[1] + '"' : 'style="background:' + mm[1] + '"') + '></i><span>' + mm[0] + '</span></button>'; }).join('') + '</div>';
          }).join('') + renkler('Özel renk', 'renk', e.renk || '', ETON, 'Malzeme rengi') : renkler('Renk', 'renk', e.renk || '', ETON)) +
          '<div class="pn-is pn-son"><button type="button" data-pis="kopya">Kopyala</button><button type="button" data-pis="sil">Sil</button>' + geriDon + '</div>';
      } else if (s.tur === 'acik') {
        var a = plan.acik[s.i];
        if (a.tur === 'kapi') {
          var kt = KAPI_TIP[a.kt] || {};
          h += '<p class="pn-baslik">Seçili kapı</p><p class="pn-ad">' + (kt.ad || 'Kapı') + '</p>' + acilisSecici(a) +
            '<div class="pn-alan"><span>Kapı tipi</span><div class="pn-liste">' + Object.keys(KAPI_TIP).map(function (k) { return '<button type="button" data-kt="' + k + '" aria-pressed="' + (a.kt === k) + '"><span>' + KAPI_TIP[k].ad + '</span><small>' + cmS(KAPI_TIP[k].gen) + '</small></button>'; }).join('') + '</div></div>' +
            aralik('Genişlik', 'gen', cmS(acikGen(a)), 60, 260, 5, cmS(acikGen(a)) + ' cm') +
            aralik('Yükseklik', 'h', cmS(kapiH(a)), 190, 270, 5, cmS(kapiH(a)) + ' cm') +
            secim('Kanat', 'kanat', [['tek', 'Tek'], ['cift', 'Çift'], ['surgu', 'Sürgü']], a.kanat || 'tek') +
            renkler('Kanat rengi', 'renk', a.renk || '', ['#ECE7DD', '#D6C8AE', '#B08D66', '#7A5A3C', '#4E3B2C', '#8E8C88', '#3B3A38', '#1E1D1B', '#3F4B5C', '#6E7F6A'], 'Tipin rengi') +
            '<div class="pn-is pn-son"><button type="button" data-pis="dondur">Sıradaki yön ⟳ (R)</button><button type="button" data-pis="sil">Sil</button>' + geriDon + '</div>' +
            '<p class="pn-not">Kapıyı duvar boyunca sürükleyerek kaydırabilirsiniz.</p>';
        } else {
          h += '<p class="pn-baslik">Seçili pencere</p><p class="pn-ad">' + ((PEN_TIP[a.pt] || {}).ad || 'Pencere') + '</p>' +
            '<div class="pn-alan"><span>Pencere tipi</span><div class="pn-liste">' + Object.keys(PEN_TIP).map(function (k) { var p = PEN_TIP[k]; return '<button type="button" data-pt="' + k + '" aria-pressed="' + (a.pt === k) + '"><span>' + p.ad + '</span><small>' + cmS(p.gen) + '×' + cmS(p.yuk) + '</small></button>'; }).join('') + '</div></div>' +
            aralik('Genişlik', 'gen', cmS(acikGen(a)), 40, 500, 5, cmS(acikGen(a)) + ' cm') +
            aralik('Denizlik yüksekliği', 'esik', cmS(acikEsik(a)), 0, 200, 5, cmS(acikEsik(a)) + ' cm') +
            aralik('Pencere yüksekliği', 'yuk', cmS(acikYuk(a)), 30, 270, 5, cmS(acikYuk(a)) + ' cm') +
            renkler('Doğrama rengi', 'renk', a.renk || '', ['#F2F0EB', '#B08D66', '#7A5A3C', '#8E8C88', '#3B3A38', '#1E1D1B'], 'Antrasit') +
            '<div class="pn-is pn-son"><button type="button" data-pis="sil">Sil</button>' + geriDon + '</div>' +
            '<p class="pn-not">Pencereyi duvar boyunca sürükleyerek kaydırabilirsiniz.</p>';
        }
      } else if (s.tur === 'oda') {
        var o = plan.odalar[s.i], z = ZEMIN[o.zemin];
        h += '<p class="pn-baslik">Seçili oda</p><p class="pn-olcu">' + alanHesap(o.pts).toFixed(2).replace('.', ',') + ' m²</p>' +
          '<label class="pn-alan"><span>Oda adı</span><select data-k="ad"><option value="">Seçin</option>' + ODA_ADLARI.map(function (n) { return '<option' + (o.ad === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
          '<p class="pn-baslik">Zemin</p>' + zeminButon(o.zemin);
        if (z.tur) {
          h += renkler('Zemin rengi', 'zrenk', o.zrenk || '', ZTON) +
            (z.k ? aralik(z.et, 'zk', o.zk || z.k, z.lim[0], z.lim[1], z.lim[2], degerMetni('zk')) : '') +
            secim('Döşeme yönü', 'zaci', [[0, '0°'], [45, '45°'], [90, '90°'], [135, '135°']], o.zaci || 0);
        }
        h += '<p class="pn-baslik">Duvar rengi</p>' + boyaButon(o.boya || 0, o.duvarR) + renkler('Özel duvar rengi', 'duvarR', o.duvarR || '', [], 'Listedeki renk') +
          '<div class="pn-is pn-son"><button type="button" data-pis="sil">Odayı sil</button></div>';
      }
      return h;
    }
    function paneliKur() {
      if (!panel) return;
      var h = '', s = gecerliSec();
      if (s) h = secimPaneli(s);
      else if (arac === 'esya') {
        ESYA.forEach(function (g) {
          h += '<p class="pn-baslik">' + g[0] + '</p><div class="pn-liste">';
          g[1].forEach(function (e) { h += '<button type="button" data-tip="' + e[0] + '" aria-pressed="' + (e[0] === secTip) + '"><span>' + e[1] + '</span><small>' + e[2] + '×' + e[3] + '</small></button>'; });
          h += '</div>';
        });
      } else if (arac === 'kapi') {
        h += '<p class="pn-baslik">Kapı tipi</p><div class="pn-liste">' + Object.keys(KAPI_TIP).map(function (k) { return '<button type="button" data-yenikapi="' + k + '" aria-pressed="' + (secKapi === k) + '"><span>' + KAPI_TIP[k].ad + '</span><small>' + cmS(KAPI_TIP[k].gen) + '×' + cmS(KAPI_TIP[k].h) + '</small></button>'; }).join('') + '</div>' +
          '<p class="pn-not">Tipi seçip bir duvara tıklayın. Eklenen kapının genişliğini, kanadını ve açılış yönünü buradan değiştirebilirsiniz.</p>';
      } else if (arac === 'pencere') {
        h += '<p class="pn-baslik">Pencere tipi</p><div class="pn-liste">' + Object.keys(PEN_TIP).map(function (k) { var p = PEN_TIP[k]; return '<button type="button" data-yenipen="' + k + '" aria-pressed="' + (secPen === k) + '"><span>' + p.ad + '</span><small>' + cmS(p.gen) + '×' + cmS(p.yuk) + '</small></button>'; }).join('') + '</div>' +
          '<p class="pn-not">Tipi seçip bir duvara tıklayın. Ölçüleri sonradan değiştirebilirsiniz.</p>';
      } else if (arac === 'zemin') {
        h += '<p class="pn-baslik">Zemin</p>' + zeminButon(secZemin) + '<p class="pn-not">Seçtiğiniz zemin hemen tüm odalara uygulanır (3B\'de de). Yalnızca bir odayı değiştirmek, renk, karo ölçüsü ve döşeme yönü için o odaya tıklayın.</p>';
      } else if (arac === 'boya') {
        h += '<p class="pn-baslik">Duvar rengi</p>' + boyaButon(secBoya, false) + '<p class="pn-not">Seçtiğiniz renk hemen tüm odaların duvarlarına uygulanır (3B\'de de). Yalnızca bir odayı boyamak ya da özel renk için o odaya tıklayın.</p>';
      } else {
        h += '<p class="pn-baslik">Nasıl çalışır</p><ol class="pn-adim">' +
          '<li><b>Duvar</b> ile köşelere tıklayıp odayı kapatın.</li><li><b>Kapı</b> ve <b>Pencere</b> ile tipini seçip duvara tıklayın.</li>' +
          '<li><b>Eşya</b> listesinden seçip plana yerleştirin.</li><li><b>Seç</b> ile her şeye tıklayın: döndürün (<b>R</b> tuşu ya da sarı tutamak), ölçüsünü, rengini, malzemesini değiştirin.</li>' +
          '<li><b>3B</b> ile içinde gezinin; 3B görünümde de tıklayıp düzenleyebilirsiniz.</li></ol>' +
          '<p class="pn-not">Ölçek: bir kare 50 × 50 cm. Duvar yüksekliği 2,80 m. Eşyalar standart ölçülerdedir.</p>';
      }
      var mobilAc = !!s || ['esya', 'kapi', 'pencere', 'zemin', 'boya'].indexOf(arac) >= 0;
      kok.classList.toggle('panel-acik', mobilAc);
      panel.innerHTML = '<button type="button" class="pn-kapat" data-pis="panel-kapat">Kapat ✕</button>' + h;
      Array.prototype.forEach.call(panel.querySelectorAll('[data-onizle]'), function (el) {
        el.style.backgroundImage = 'url(' + doku(+el.dataset.onizle, el.dataset.ton || '', 64).toDataURL() + ')';
      });
    }
    var paneliYenile = function () { var ust = panel ? panel.scrollTop : 0; paneliKur(); if (panel) panel.scrollTop = ust; };
    var ayarla = function (k, v) {
      var s = gecerliSec(); if (!s) return;
      if (s.tur === 'esya') {
        var e = plan.esya[s.i], t = TIP[e.tip];
        if (k === 'a') e.a = ((Math.round(+v) % 360) + 360) % 360;
        if (k === 'w' || k === 'd') { if (!(+v >= 10)) return; var n = Math.min(800, Math.round(+v)); if (n === t[k]) delete e[k]; else e[k] = n; }
        if (k === 'renk') { if (v) { e.renk = v; delete e.m; } else delete e.renk; }
      } else if (s.tur === 'acik') {
        var a = plan.acik[s.i];
        if (k === 'gen') { a.gen = +v / 100; acikSigdir(a); }
        else if (k === 'h') a.h = Math.min(+v / 100, DUVAR_H - .05);
        else if (k === 'esik') { a.esik = +v / 100; if (a.esik + acikYuk(a) > DUVAR_H - .05) a.yuk = Math.max(.3, DUVAR_H - .05 - a.esik); }
        else if (k === 'yuk') a.yuk = Math.max(.3, Math.min(+v / 100, DUVAR_H - .05 - acikEsik(a)));
        else if (k === 'kanat') a.kanat = v; else if (k === 'mentese') a.mentese = +v; else if (k === 'yon') a.yon = +v;
        else if (k === 'renk') { if (v) a.renk = v; else delete a.renk; }
      } else if (s.tur === 'oda') {
        var o = plan.odalar[s.i];
        if (k === 'ad') { if (v) o.ad = v; else delete o.ad; }
        if (k === 'zaci') o.zaci = +v;
        if (k === 'zk') o.zk = +v;
        if (k === 'zrenk') { if (v) o.zrenk = v; else delete o.zrenk; }
        if (k === 'duvarR') { if (v) o.duvarR = v; else delete o.duvarR; }
      }
      kaydet();
    };
    var yeniKapi = function (a, k) { var t = KAPI_TIP[k]; a.kt = k; a.gen = t.gen; a.h = t.h; a.kanat = t.kanat; delete a.renk; acikSigdir(a); };
    var yeniPen = function (a, k) { var t = PEN_TIP[k]; a.pt = k; a.gen = t.gen; a.esik = t.esik; a.yuk = t.yuk; acikSigdir(a); };
    var ucKur = null;
    var ucGuncelle = function () { if (!uc || ucKur) return; ucKur = requestAnimationFrame(function () { ucKur = null; U.kur(false); }); };
    var panelAnlik = false;
    if (panel) {
      panel.addEventListener('click', function (ev) {
        var b = ev.target.closest('button'); if (!b || !panel.contains(b)) return;
        var s = gecerliSec(), ds = b.dataset;
        if (ds.pis === 'panel-kapat') { kok.classList.remove('panel-acik'); return; }
        if (ds.pis) { islem(ds.pis); return; }
        if (ds.tip) { secTip = ds.tip; hayaletA = 0; sec = null; }
        else if (ds.slot && s && s.tur === 'esya') { anlik(); var es2 = plan.esya[s.i]; es2.m = es2.m || {}; if (ds.mi === '') delete es2.m[ds.slot]; else { es2.m[ds.slot] = +ds.mi; delete es2.renk; } if (!Object.keys(es2.m).length) delete es2.m; kaydet(); ses(493.88); }
        else if (ds.yenikapi) secKapi = ds.yenikapi;
        else if (ds.yenipen) secPen = ds.yenipen;
        else if (ds.kt && s) { anlik(); yeniKapi(plan.acik[s.i], ds.kt); kaydet(); }
        else if (ds.pt && s) { anlik(); yeniPen(plan.acik[s.i], ds.pt); kaydet(); }
        else if (ds.zemin !== undefined || ds.boya !== undefined) {
          // seçili oda yoksa seçim hemen tüm odalara uygulanır; tek oda için odaya tıklanır
          var hedef = s && s.tur === 'oda' ? [plan.odalar[s.i]] : plan.odalar;
          if (ds.zemin !== undefined) secZemin = +ds.zemin; else secBoya = +ds.boya;
          if (hedef.length) {
            anlik();
            hedef.forEach(function (o) { if (ds.zemin !== undefined) { o.zemin = +ds.zemin; delete o.zk; delete o.zrenk; } else { o.boya = +ds.boya; delete o.duvarR; } });
            kaydet(); ses(493.88);
            if (ipucu && !(s && s.tur === 'oda') && plan.odalar.length > 1) ipucu.textContent = 'Tüm odalara uygulandı. Yalnızca bir odayı değiştirmek için o odaya tıklayın.';
          }
        }
        else if (ds.v !== undefined) { var kk = b.closest('[data-k]'); if (kk) { anlik(); ayarla(kk.dataset.k, ds.v); } }
        else return;
        paneliYenile(); ciz(); ucGuncelle();
        // telefonda seçimden sonra panel kapanır, plana dokunmak için yer açılır
        if (w.matchMedia && w.matchMedia('(max-width:860px)').matches && (ds.tip || ds.yenikapi || ds.yenipen || (!s && !plan.odalar.length && (ds.zemin !== undefined || ds.boya !== undefined)))) {
          kok.classList.remove('panel-acik'); if (ipucu) ipucu.textContent = 'Şimdi plana dokunun.';
          var kb = cv.getBoundingClientRect(); if (kb.top < 0 || kb.top > w.innerHeight * .4) w.scrollBy({ top: kb.top - 70, behavior: 'smooth' });
        }
      });
      panel.addEventListener('input', function (ev) {
        var el = ev.target, k = el.dataset && el.dataset.k; if (!k) return;
        if (!panelAnlik) { anlik(); panelAnlik = true; }
        ayarla(k, el.value); degerYaz(k);
        if (el.type === 'color') Array.prototype.forEach.call(el.closest('.pn-cip').querySelectorAll('button'), function (b) { b.setAttribute('aria-pressed', 'false'); });
        ciz(); ucGuncelle();
      });
      panel.addEventListener('change', function (ev) {
        panelAnlik = false;
        if (ev.target.tagName === 'SELECT' || ev.target.type === 'number') paneliYenile();
      });
    }
    function islem(n) {
      var s = gecerliSec();
      if (n === 'liste') { sec = null; paneliKur(); ciz(); return; }
      if (!s) return;
      anlik();
      if (s.tur === 'esya') {
        var e = plan.esya[s.i], ek = { sag90: 90, dondur: 90, sol90: 270, sag15: 15, sol15: 345 }[n];
        if (ek) e.a = ((e.a || 0) + ek) % 360;
        if (n === 'standart') { delete e.w; delete e.d; }
        if (n === 'kopya') { var y = JSON.parse(JSON.stringify(e)); y.x += 24; y.y += 24; plan.esya.push(y); sec = { tur: 'esya', i: plan.esya.length - 1 }; }
        if (n === 'sil') { plan.esya.splice(s.i, 1); sec = null; }
      } else if (s.tur === 'acik') {
        var a = plan.acik[s.i];
        if (n === 'dondur') {
          var mm = a.mentese ? 1 : 0, yy = a.yon === -1 ? -1 : 1;
          if (a.kanat === 'cift' || a.kanat === 'surgu') yy = -yy;
          else if (!mm && yy === 1) mm = 1; else if (mm && yy === 1) yy = -1; else if (mm) mm = 0; else yy = 1;
          a.mentese = mm; a.yon = yy;
        }
        var ac = /^ac([01])([id])$/.exec(n);
        if (ac) { a.mentese = +ac[1]; a.yon = ac[2] === 'i' ? 1 : -1; }
        if (n === 'sil') { plan.acik.splice(s.i, 1); sec = null; }
      } else if (s.tur === 'oda') {
        if (n === 'sil') {
          plan.acik = plan.acik.filter(function (a) { return a.oda !== s.i; });
          plan.acik.forEach(function (a) { if (a.oda > s.i) a.oda--; });
          plan.odalar.splice(s.i, 1); sec = null;
        } else { gecmis.pop(); return; }
      }
      kaydet(); ses(493.88); paneliYenile(); ciz(); if (uc) U.kur(false);
    }

    var ekran = function (ev) { var b = cv.getBoundingClientRect(); return { x: ev.clientX - b.left, y: ev.clientY - b.top }; };
    var nokta = function (ev) { var e = ekran(ev); return { x: (e.x - ox) / z, y: (e.y - oy) / z }; };
    /* yakınlaştırma ve kaydırma: tekerlek, iki parmak, Seç aracında boş yeri sürükleme, orta ya da sağ tuş */
    var parmak = {}, kiskac = null, dokunmaOnce = null;
    cv.addEventListener('wheel', function (ev) { ev.preventDefault(); var e = ekran(ev); zumla(e.x, e.y, Math.exp(-ev.deltaY * (ev.ctrlKey ? .01 : .0015))); }, { passive: false });
    cv.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
    var kiskacBasla = function () {
      var k = Object.keys(parmak); if (k.length < 2) return;
      var a = parmak[k[0]], b = parmak[k[1]];
      if (dokunmaOnce && Date.now() - dokunmaOnce.t < 400) { // ilk parmağın yaptığı işi geri al
        cizilen.length = dokunmaOnce.c; if (gecmis.length > dokunmaOnce.g) { plan = JSON.parse(gecmis[dokunmaOnce.g]); gecmis.length = dokunmaOnce.g; kaydet(); paneliKur(); }
      }
      dokunmaOnce = null; surukle = null;
      kiskac = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, m: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, z: z, ox: ox, oy: oy };
    };
    var kiskacSur = function () {
      var k = Object.keys(parmak); if (!kiskac || k.length < 2) return;
      var a = parmak[k[0]], b = parmak[k[1]], d_ = Math.hypot(a.x - b.x, a.y - b.y), m_ = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      var nz = Math.max(.3, Math.min(4, kiskac.z * d_ / kiskac.d)), wx = (kiskac.m.x - kiskac.ox) / kiskac.z, wy = (kiskac.m.y - kiskac.oy) / kiskac.z;
      z = nz; ox = m_.x - wx * nz; oy = m_.y - wy * nz; ciz();
    };
    Array.prototype.forEach.call(kok.querySelectorAll('[data-zum]'), function (b) {
      b.addEventListener('click', function () { var v = b.dataset.zum; if (v === 'sig') sigdir(); else zumla(W / 2, H / 2, v === '+' ? 1.3 : 1 / 1.3); });
    });
    var kapat = function () {
      if (cizilen.length < 3) return;
      var s0 = cizilen[0], son = cizilen[cizilen.length - 1];
      if (son.x !== s0.x && son.y !== s0.y) cizilen.push({ x: s0.x, y: son.y });
      var pts = cizilen.filter(function (p, i, l) { var q = l[(i + 1) % l.length]; return !(p.x === q.x && p.y === q.y); });
      if (alanHesap(pts) < .5) { cizilen = []; ciz(); return; }
      anlik(); plan.odalar.push({ pts: pts, zemin: secZemin || 1, boya: secBoya }); cizilen = []; kaydet();
      ses(293.66, .02); setTimeout(function () { ses(440, .016); }, 120); setTimeout(function () { ses(587.33, .014); }, 240);
      if (ipucu) ipucu.textContent = 'Oda kapandı. Kapı, pencere ve eşya ekleyin; Seç ile odaya tıklayıp adını ve zeminini seçin.';
      ciz();
    };
    var duzenAraci = function () { return arac === 'sec' || arac === 'esya' || arac === 'kapi' || arac === 'pencere'; };

    cv.addEventListener('pointermove', function (ev) {
      if (parmak[ev.pointerId]) parmak[ev.pointerId] = ekran(ev);
      if (kiskac) { kiskacSur(); return; }
      fare = nokta(ev);
      if (surukle && surukle.tur === 'kaydir') { var e0 = ekran(ev); ox = surukle.ox + e0.x - surukle.sx; oy = surukle.oy + e0.y - surukle.sy; ciz(); return; }
      if (surukle) {
        surukle.oynadi = true;
        if (surukle.tur === 'esya') { var e = plan.esya[surukle.i]; e.x = ince(fare.x - surukle.dx); e.y = ince(fare.y - surukle.dy); }
        else if (surukle.tur === 'sap') { var e2 = plan.esya[surukle.i], ad = ev.shiftKey ? 1 : 15, aa = Math.atan2(fare.y - e2.y, fare.x - e2.x) * 180 / Math.PI + 90; e2.a = ((Math.round(aa / ad) * ad) % 360 + 360) % 360; degerYaz('a'); }
        else if (surukle.tur === 'acik') {
          var a = plan.acik[surukle.i], g = acikGeo(a);
          if (g) { var t = ((fare.x - g.p.x) * (g.q.x - g.p.x) + (fare.y - g.p.y) * (g.q.y - g.p.y)) / (g.L * g.L); a.t = Math.round(t * g.L / 2.4) * 2.4 / g.L; acikSigdir(a); }
        }
      } else if (duzenAraci()) {
        uzerinde = bul(fare); if (uzerinde && uzerinde.tur === 'oda' && arac !== 'sec') uzerinde = null;
        cv.style.cursor = !uzerinde ? (arac === 'sec' ? 'default' : 'crosshair') : uzerinde.tur === 'sap' ? 'grab' : uzerinde.tur === 'oda' ? 'pointer' : 'move';
      }
      ciz();
    });
    cv.addEventListener('pointerleave', function () { fare = null; uzerinde = null; ciz(); });
    var birak = function (ev) {
      delete parmak[ev.pointerId]; if (!Object.keys(parmak).length) dokunmaOnce = null;
      if (kiskac) { if (Object.keys(parmak).length < 2) kiskac = null; surukle = null; return; }
      if (surukle && surukle.tur === 'kaydir') { surukle = null; return; }
      if (surukle) { if (surukle.oynadi) kaydet(); else gecmis.pop(); if (surukle.tur === 'sap' || surukle.tur === 'acik') paneliYenile(); }
      surukle = null; ciz();
    };
    cv.addEventListener('pointerup', birak);
    cv.addEventListener('pointercancel', birak);
    cv.addEventListener('pointerdown', function (ev) {
      dokunma = ev.pointerType === 'touch';
      if (dokunma) {
        parmak[ev.pointerId] = ekran(ev);
        if (Object.keys(parmak).length >= 2) { kiskacBasla(); return; }
        dokunmaOnce = { c: cizilen.length, g: gecmis.length, t: Date.now() };
      }
      if (ev.button === 1 || ev.button === 2) { var e1 = ekran(ev); surukle = { tur: 'kaydir', sx: e1.x, sy: e1.y, ox: ox, oy: oy }; try { cv.setPointerCapture(ev.pointerId); } catch (er) {} return; }
      var p = nokta(ev); fare = p;
      var on_ = !cizilen.length && arac === 'duvar' ? bul(p) : null;
      if (on_ && (on_.tur === 'esya' || on_.tur === 'acik')) { arac = 'sec'; basili(); }
      if (arac === 'duvar') {
        if (!cizilen.length) { cizilen.push({ x: yasla(p.x), y: yasla(p.y) }); ses(587.33); }
        else {
          var s0 = cizilen[0];
          if (cizilen.length > 2 && Math.abs(p.x - s0.x) + Math.abs(p.y - s0.y) < 16 * TOL()) { kapat(); return; }
          var u = dik(cizilen[cizilen.length - 1], p), son = cizilen[cizilen.length - 1];
          if (u.x === son.x && u.y === son.y) return;
          cizilen.push(u); ses([329.63, 369.99, 440, 493.88, 587.33][cizilen.length % 5]);
          if (cizilen.length > 3 && u.x === s0.x && u.y === s0.y) { cizilen.pop(); kapat(); return; }
        }
        if (ipucu) ipucu.textContent = cizilen.length < 3 ? 'Tıklayarak köşeleri ekleyin.' : 'Odayı kapatmak için ilk köşeye tıklayın.';
      } else if (arac === 'zemin' || arac === 'boya') {
        var oi = odaBul(p); if (oi < 0) return;
        anlik(); if (arac === 'zemin') { plan.odalar[oi].zemin = secZemin; delete plan.odalar[oi].zk; } else { plan.odalar[oi].boya = secBoya; delete plan.odalar[oi].duvarR; } kaydet(); ses(493.88);
      } else {
        var h = bul(p);
        if (h && h.tur === 'oda' && arac !== 'sec') h = null;
        if (h) {
          if (h.tur === 'sap') { anlik(); surukle = { tur: 'sap', i: h.i }; }
          else {
            sec = { tur: h.tur, i: h.i };
            if (h.tur === 'esya') { anlik(); surukle = { tur: 'esya', i: h.i, dx: p.x - plan.esya[h.i].x, dy: p.y - plan.esya[h.i].y }; }
            else if (h.tur === 'acik') { anlik(); surukle = { tur: 'acik', i: h.i }; }
            else { var e3 = ekran(ev); surukle = { tur: 'kaydir', sx: e3.x, sy: e3.y, ox: ox, oy: oy }; }
          }
          try { cv.setPointerCapture(ev.pointerId); } catch (e) {}
        } else if (arac === 'kapi' || arac === 'pencere') {
          var dv = enYakinDuvar(p);
          if (!dv) { sec = null; if (ipucu) ipucu.textContent = 'Kapı ya da pencere eklemek için bir duvarın üstüne tıklayın.'; }
          else {
            var yeni = { oda: dv.oda, kenar: dv.kenar, t: dv.t, tur: arac };
            anlik(); plan.acik.push(yeni);
            if (arac === 'kapi') yeniKapi(yeni, secKapi); else yeniPen(yeni, secPen);
            sec = { tur: 'acik', i: plan.acik.length - 1 }; kaydet(); ses(arac === 'kapi' ? 440 : 659.25);
            if (ipucu) ipucu.textContent = (arac === 'kapi' ? 'Kapı' : 'Pencere') + ' eklendi. Ölçüsünü ve yönünü sağdaki panelden ayarlayın, duvar boyunca sürükleyin.';
          }
        } else if (arac === 'esya') {
          anlik(); plan.esya.push({ tip: secTip, x: ince(p.x), y: ince(p.y), a: hayaletA }); sec = { tur: 'esya', i: plan.esya.length - 1 }; kaydet(); ses(523.25);
          if (ipucu) ipucu.textContent = TIP[secTip].ad + ' eklendi. Sarı tutamaçla döndürün, sürükleyerek taşıyın; panelden ölçü ve renk verin.';
        } else { sec = null; var e2 = ekran(ev); surukle = { tur: 'kaydir', sx: e2.x, sy: e2.y, ox: ox, oy: oy }; try { cv.setPointerCapture(ev.pointerId); } catch (er) {} }
        paneliKur();
      }
      ciz();
    });
    cv.addEventListener('dblclick', function (ev) {
      if (arac === 'duvar') { kapat(); return; }
      var h = bul(nokta(ev)); if (h && (h.tur === 'esya' || h.tur === 'acik')) { sec = { tur: h.tur, i: h.i }; islem('dondur'); }
    });
    d.addEventListener('keydown', function (ev) {
      if (!d.body.contains(kok) || /input|textarea|select/i.test(ev.target.tagName)) return;
      var s = gecerliSec(), key = ev.key;
      if (key === 'Escape') { cizilen = []; sec = null; paneliKur(); ciz(); if (uc) U.vurgula(); }
      else if (key === 'r' || key === 'R') { if (s && s.tur !== 'oda') islem(s.tur === 'esya' && ev.shiftKey ? 'sol90' : 'dondur'); else if (arac === 'esya') { hayaletA = (hayaletA + 90) % 360; ciz(); } }
      else if ((key === 'Delete' || key === 'Backspace') && s && !cizilen.length) { ev.preventDefault(); islem('sil'); }
      else if ((key === 'z' && (ev.metaKey || ev.ctrlKey)) || (key === 'Backspace' && cizilen.length)) { ev.preventDefault(); geri(); }
      else if (key === 'd' && (ev.metaKey || ev.ctrlKey) && s && s.tur === 'esya') { ev.preventDefault(); islem('kopya'); }
      else if (/^Arrow/.test(key) && s && s.tur === 'esya') {
        ev.preventDefault(); var e = plan.esya[s.i], adim = ev.shiftKey ? 24 : 2.4;
        if (!ev.repeat) anlik();
        if (key === 'ArrowLeft') e.x -= adim; if (key === 'ArrowRight') e.x += adim; if (key === 'ArrowUp') e.y -= adim; if (key === 'ArrowDown') e.y += adim;
        kaydet(); ciz(); ucGuncelle();
      }
    });

    var geri = function () {
      if (cizilen.length) cizilen.pop();
      else if (gecmis.length) { plan = JSON.parse(gecmis.pop()); sec = null; kaydet(); paneliKur(); if (uc) U.kur(false); }
      ciz();
    };
    var butonlar = kok.querySelectorAll('[data-arac]');
    var basili = function () { Array.prototype.forEach.call(butonlar, function (b) { if (b.dataset.arac !== '3b') on(b, 'aria-pressed', b.dataset.arac === arac); }); };
    var secArac = function (a) {
      if (a === '3b') { if (uc) U.kapat(); else U.ac(); return; }
      if (uc && a !== 'zemin' && a !== 'boya' && a !== 'sec') U.kapat();
      arac = a; sec = null; uzerinde = null; basili();
      if (a !== 'duvar') cizilen = [];
      cv.style.cursor = a === 'sec' ? 'default' : 'crosshair';
      if (ipucu) ipucu.textContent = uc ? U.ipucu() : IPUCU[a];
      paneliKur(); ciz(); if (uc) U.vurgula();
    };
    Array.prototype.forEach.call(butonlar, function (b) { b.addEventListener('click', function () { secArac(b.dataset.arac); }); });
    var is = function (n, f) { var b = kok.querySelector('[data-is="' + n + '"]'); if (b) b.addEventListener('click', f); };
    is('geri', geri);
    is('temizle', function () { if (!plan.odalar.length && !cizilen.length && !plan.esya.length) return; anlik(); plan = { odalar: [], acik: [], esya: [] }; cizilen = []; sec = null; kaydet(); paneliKur(); ciz(); if (uc) U.kapat(); });
    is('indir', function () {
      var a = d.createElement('a'); a.download = uc ? 'dimart-cizim-masasi-3b.png' : 'dimart-cizim-masasi.png';
      var kaynak = cv;
      if (uc && U.r) { if (U.vurgu) U.vurgu.visible = false; U.ciz(); kaynak = U.r.domElement; }
      var t = d.createElement('canvas'); t.width = kaynak.width; t.height = kaynak.height;
      var tx = t.getContext('2d'), oran = kaynak.width / Math.max(1, kaynak.clientWidth || W);
      tx.fillStyle = RENK.bg; tx.fillRect(0, 0, t.width, t.height); tx.drawImage(kaynak, 0, 0);
      tx.fillStyle = RENK.soluk; tx.font = '500 ' + 11 * oran + 'px Montserrat, sans-serif'; tx.fillText('dimartmimarlik.com · Çizim masası', 16 * oran, t.height - 16 * oran);
      a.href = t.toDataURL('image/png'); a.click();
      if (uc && U.vurgu) { U.vurgu.visible = true; U.ciz(); }
    });
    is('gonder', function () {
      var top = 0, satir = plan.odalar.map(function (o, i) {
        var al = alanHesap(o.pts); top += al;
        var kenar = o.pts.map(function (p, j) { var q = o.pts[(j + 1) % o.pts.length]; return m(Math.abs(q.x - p.x) + Math.abs(q.y - p.y)); });
        var ac = plan.acik.filter(function (a) { return a.oda === i; });
        var kapi = ac.filter(function (a) { return a.tur === 'kapi'; }).map(function (a) { return ((KAPI_TIP[a.kt] || {}).ad || 'Kapı') + ' ' + cmS(acikGen(a)) + ' cm'; });
        var pen = ac.filter(function (a) { return a.tur === 'pencere'; }).map(function (a) { return cmS(acikGen(a)) + '×' + cmS(acikYuk(a)) + ' cm'; });
        var z = ZEMIN[o.zemin];
        return 'Oda ' + (i + 1) + (o.ad ? ' (' + o.ad + ')' : '') + ': ' + al.toFixed(2).replace('.', ',') + ' m² · kenarlar ' + kenar.join(' · ') + ' m' +
          (o.zemin ? ' · zemin: ' + z.ad + (z.k ? ' ' + (o.zk || z.k) + (z.kare ? '×' + (o.zk || z.k) : '') + ' cm' : '') + (o.zrenk ? ' (' + o.zrenk + ')' : '') : '') +
          ' · duvar: ' + (o.duvarR || BOYA[o.boya || 0].ad) + (kapi.length ? ' · kapılar: ' + kapi.join(', ') : '') + (pen.length ? ' · pencereler: ' + pen.join(', ') : '');
      });
      if (!satir.length) { if (ipucu) ipucu.textContent = 'Önce bir oda çizin.'; return; }
      var say = {}; plan.esya.forEach(function (e) { var t = TIP[e.tip], ad = t.ad + (e.w || e.d ? ' ' + (e.w || t.w) + '×' + (e.d || t.d) : ''); say[ad] = (say[ad] || 0) + 1; });
      var esl = Object.keys(say).map(function (k) { return say[k] + ' × ' + k; });
      var govde = 'Merhaba,\n\nDimart Çizim masasında bir taslak hazırladım (toplam ' + top.toFixed(2).replace('.', ',') + ' m²):\n\n' + satir.join('\n') +
        (esl.length ? '\n\nEşyalar: ' + esl.join(', ') : '') + '\n\nGörselleri bu e-postaya ekliyorum. Projem hakkında görüşmek istiyorum.\n';
      location.href = 'mailto:info@dimartmimarlik.com?subject=' + encodeURIComponent('Çizim masası taslağım · ' + top.toFixed(2).replace('.', ',') + ' m²') + '&body=' + encodeURIComponent(govde);
    });

    /* ---------- 3B görünüm (three.js sitede barındırılır, ilk açılışta yüklenir) ---------- */
    var U = {
      yukle: function (cb) {
        if (w.THREE && w.THREE.OrbitControls) return cb();
        var yuk = function (src, sonra) { var s = d.createElement('script'); s.src = src; s.onload = sonra; s.onerror = function () { if (ipucu) ipucu.textContent = '3B görünüm yüklenemedi.'; }; d.head.appendChild(s); };
        if (ipucu) ipucu.textContent = '3B görünüm hazırlanıyor…';
        if (w.THREE) yuk('/assets/vendor/OrbitControls.js', cb);
        else yuk('/assets/vendor/three.min.js', function () { yuk('/assets/vendor/OrbitControls.js', cb); });
      },
      ipucu: function () { return 'Sürükleyerek döndürün, tekerlekle yakınlaşın. Bir odaya, duvara, kapıya ya da eşyaya tıklayıp sağdaki panelden malzemesini, rengini ve ölçüsünü değiştirin.'; },
      ac: function () {
        if (!plan.odalar.length) { if (ipucu) ipucu.textContent = '3B görünüm için önce bir oda çizin.'; return; }
        U.yukle(function () {
          uc = true; kok.classList.add('uc'); on(kok.querySelector('[data-arac="3b"]'), 'aria-pressed', 'true');
          try { if (!U.r) U.hazirla(); } catch (e) { uc = false; kok.classList.remove('uc'); if (ipucu) ipucu.textContent = 'Tarayıcınız 3B görünümü desteklemiyor.'; return; }
          cizilen = []; if (arac !== 'zemin' && arac !== 'boya') { arac = 'sec'; basili(); }
          U.yeniden(); U.kur(true); paneliKur();
          if (ipucu) ipucu.textContent = U.ipucu();
        });
      },
      kapat: function () { uc = false; kok.classList.remove('uc'); on(kok.querySelector('[data-arac="3b"]'), 'aria-pressed', 'false'); if (ipucu) ipucu.textContent = IPUCU[arac]; boyut(); },
      hazirla: function () {
        var T = w.THREE;
        var r3 = U.r = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        r3.setPixelRatio(Math.min(w.devicePixelRatio || 1, 2)); r3.shadowMap.enabled = true; r3.shadowMap.type = T.PCFSoftShadowMap;
        r3.outputEncoding = T.sRGBEncoding; r3.toneMapping = T.NoToneMapping;
        sahne.appendChild(r3.domElement);
        U.s = new T.Scene(); U.s.background = new T.Color(RENK.bg);
        U.k = new T.PerspectiveCamera(42, 1, .1, 200);
        U.c = new T.OrbitControls(U.k, r3.domElement); U.c.maxPolarAngle = Math.PI / 2.05; U.c.minDistance = 1.5; U.c.maxDistance = 60;
        U.c.addEventListener('change', U.ciz);
        U.s.add(new T.HemisphereLight(0xfff8ee, 0x3a342c, .5));
        var g = new T.DirectionalLight(0xfff3e6, .62); g.position.set(-8, 14, 6); g.castShadow = true;
        g.shadow.mapSize.set(2048, 2048); var sc = g.shadow.camera; sc.left = sc.bottom = -15; sc.right = sc.top = 15; g.shadow.bias = -.0005;
        U.isik = g; U.s.add(g); U.s.add(g.target);
        U.s.add(new T.AmbientLight(0xffffff, .22));
        var yer = new T.Mesh(new T.PlaneGeometry(200, 200), new T.ShadowMaterial({ opacity: .45 }));
        yer.rotation.x = -Math.PI / 2; yer.position.y = -.01; yer.receiveShadow = true; U.s.add(yer);
        U.grup = new T.Group(); U.s.add(U.grup);
        // 3B'de tıklayıp seçme
        var bas = null, ray = new T.Raycaster();
        r3.domElement.addEventListener('pointerdown', function (ev) { bas = { x: ev.clientX, y: ev.clientY }; });
        r3.domElement.addEventListener('pointerup', function (ev) {
          if (!bas || Math.hypot(ev.clientX - bas.x, ev.clientY - bas.y) > 5) { bas = null; return; } bas = null;
          var b = r3.domElement.getBoundingClientRect();
          ray.setFromCamera(new T.Vector2((ev.clientX - b.left) / b.width * 2 - 1, -(ev.clientY - b.top) / b.height * 2 + 1), U.k);
          var hit = ray.intersectObjects(U.grup.children, true), bulunan = null;
          for (var i = 0; i < hit.length && !bulunan; i++) { var o = hit[i].object; while (o && !(o.userData && o.userData.sec)) o = o.parent; if (o) bulunan = o.userData.sec; }
          if ((arac === 'zemin' || arac === 'boya') && bulunan && bulunan.tur === 'oda') {
            anlik(); var od = plan.odalar[bulunan.i];
            if (arac === 'zemin') { od.zemin = secZemin; delete od.zk; } else { od.boya = secBoya; delete od.duvarR; }
            kaydet(); ses(493.88); ciz(); U.kur(false); return;
          }
          sec = bulunan ? { tur: bulunan.tur, i: bulunan.i } : null;
          if (sec && arac !== 'sec') { arac = 'sec'; basili(); }
          paneliKur(); ciz(); U.vurgula(); if (sec) ses(523.25, .01);
        });
      },
      yeniden: function () { var b = sahne.getBoundingClientRect(); if (!U.r || !b.width) return; U.r.setSize(b.width, b.height, false); U.k.aspect = b.width / b.height; U.k.updateProjectionMatrix(); U.ciz(); },
      ciz: function () {
        if (!U.r) return;
        // kameraya bakan duvarlar alçalır, içerisi görünür (maket kesiti)
        var k = U.k.position;
        (U.duvarlar || []).forEach(function (d_) { var dis = (k.x - d_.mx) * d_.nx + (k.z - d_.mz) * d_.nz < 0; d_.g.scale.y = dis && U.kesit ? .1 : 1; });
        U.r.render(U.s, U.k);
      },
      vurgula: function () {
        if (!U.r) return;
        if (U.vurgu) { U.s.remove(U.vurgu); U.vurgu.geometry.dispose(); U.vurgu = null; }
        var s = gecerliSec(), hedef = null;
        if (s) U.grup.traverse(function (o) { var v = o.userData && o.userData.sec; if (!hedef && v && v.tur === s.tur && v.i === s.i && (s.tur !== 'oda' || o.userData.zemin)) hedef = o; });
        if (hedef) { U.vurgu = new w.THREE.BoxHelper(hedef, 0xF2B705); U.s.add(U.vurgu); }
        U.ciz();
      },
      kur: function (kamera) {
        var T = w.THREE, G = U.grup;
        U.duvarlar = []; if (U.kesit === undefined) U.kesit = true;
        while (G.children.length) { var c0 = G.children.pop(); c0.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.map) o.material.map.dispose(); }); }
        if (!plan.odalar.length) { U.vurgula(); return; }
        var minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        plan.odalar.forEach(function (o) { o.pts.forEach(function (p) { minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y); }); });
        if (kamera || !U.merkez) U.merkez = { x: (minx + maxx) / 2 / METRE, z: (miny + maxy) / 2 / METRE };
        var cx = U.merkez.x, cz = U.merkez.z, X = function (px) { return px / METRE - cx; }, Z = function (py) { return py / METRE - cz; };
        var mat = {}, OZEL = null, GOVDE = [0x8a8174, 0x9a9184, 0xa38b6d, 0x7a5a3c, 0xb08d66, 0xd8d0c2, 0xd6cfc2, 0x6e6b66];
        var HARITA = null;
        var MT = function (renk, rough, metal) {
          if (HARITA && HARITA[renk]) {
            var mm = HARITA[renk], kk = 'p|' + mm.join('|');
            if (!mat[kk]) {
              var op = { color: mm[4] !== undefined ? 0xffffff : mm[1], roughness: mm[2], metalness: mm[3] || 0 };
              if (mm[4] !== undefined) { var tt = new T.CanvasTexture(doku(mm[4], mm[1], 256)); tt.encoding = T.sRGBEncoding; tt.anisotropy = 4; op.map = tt; }
              mat[kk] = new T.MeshStandardMaterial(op);
            }
            return mat[kk];
          }
          if (OZEL && GOVDE.indexOf(renk) >= 0) renk = OZEL;
          var key = renk + '|' + rough + '|' + metal; return mat[key] || (mat[key] = new T.MeshStandardMaterial({ color: renk, roughness: rough === undefined ? .8 : rough, metalness: metal || 0 }));
        };
        var kutu = function (par, w_, h_, d_, x_, y_, z_, renk, rough, metal) {
          var me = new T.Mesh(new T.BoxGeometry(w_, h_, d_), MT(renk, rough, metal));
          me.position.set(x_, y_ + h_ / 2, z_); me.castShadow = true; me.receiveShadow = true; par.add(me); return me;
        };
        var silindir = function (par, r1, r2, h_, x_, y_, z_, renk, rough, metal) {
          var me = new T.Mesh(new T.CylinderGeometry(r1, r2, h_, 28), MT(renk, rough, metal)); me.position.set(x_, y_ + h_ / 2, z_); me.castShadow = true; me.receiveShadow = true; par.add(me); return me;
        };
        var camMat = new T.MeshStandardMaterial({ color: 0xbfd4dc, roughness: .05, metalness: .1, transparent: true, opacity: .3 });
        var KUMAS = 0x8a8174, AHSAP = 0x7a5a3c, ACIK = 0xb08d66, BEYAZ = 0xeeebe5, METAL = 0x9a9a9a, SIYAH = 0x232220, SERAMIK = 0xf4f2ee;
        var sandalye = function (sg) { kutu(sg, .44, .04, .44, 0, .44, 0, AHSAP, .6); kutu(sg, .44, .42, .04, 0, .48, -.2, AHSAP, .6); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(sg, .03, .44, .03, k[0] * .19, 0, k[1] * .19, AHSAP, .6); }); };
        // zeminler
        plan.odalar.forEach(function (o, oi) {
          var sh = new T.Shape(); o.pts.forEach(function (p, i) { if (i) sh.lineTo(X(p.x), -Z(p.y)); else sh.moveTo(X(p.x), -Z(p.y)); });
          var malz;
          if (o.zemin) {
            var tx = new T.CanvasTexture(doku(o.zemin, o.zrenk, 256)), S = dokuBoyu(o); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(1 / S, 1 / S); tx.rotation = -(o.zaci || 0) * Math.PI / 180; tx.encoding = T.sRGBEncoding; tx.anisotropy = 8;
            var z = ZEMIN[o.zemin].tur;
            malz = new T.MeshStandardMaterial({ map: tx, roughness: z === 'mermer' ? .25 : z === 'hali' ? 1 : .65 });
          } else malz = MT(0x8f877b, .9);
          var me = new T.Mesh(new T.ShapeGeometry(sh), malz); me.rotation.x = -Math.PI / 2; me.receiveShadow = true; me.userData = { sec: { tur: 'oda', i: oi }, zemin: 1 }; G.add(me);
        });
        // duvarlar: her oda kendi duvarını içe doğru kurar (komşu odalar kendi rengini taşır), açıklıkların çevresinde parçalara bölünür
        var KAL = .12;
        var icKose = function (o, j) { var n = o.pts.length, a = o.pts[(j - 1 + n) % n], b = o.pts[j], c = o.pts[(j + 1) % n]; return ((b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x)) * yon(o.pts) < 0; };
        plan.odalar.forEach(function (o, oi) {
          var renk = duvarRengi(o), ici = yon(o.pts);
          o.pts.forEach(function (p, i) {
            var q = o.pts[(i + 1) % o.pts.length], ax = X(p.x), az = Z(p.y), bx = X(q.x), bz = Z(q.y);
            var L = Math.hypot(bx - ax, bz - az); if (L < .01) return;
            var duvar = new T.Group(); duvar.position.set(ax, 0, az); duvar.rotation.y = -Math.atan2(bz - az, bx - ax); duvar.userData = { sec: { tur: 'oda', i: oi } }; G.add(duvar);
            var nx_ = -ici * (bz - az) / L, nz_ = ici * (bx - ax) / L;
            U.duvarlar.push({ g: duvar, mx: (ax + bx) / 2 + nx_ * KAL / 2, mz: (az + bz) / 2 + nz_ * KAL / 2, nx: nx_, nz: nz_ });
            var ZK = ici * KAL / 2, Lp = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / Lp, uy = (q.y - p.y) / Lp;
            var ac = [];
            plan.acik.forEach(function (a, ai) {
              var g_ = acikGen(a);
              if (a.oda === oi && a.kenar === i) { ac.push({ s: a.t * L - g_ / 2, e: a.t * L + g_ / 2, a: a, ai: ai }); return; }
              var gg = acikGeo(a); if (!gg) return; // komşu odanın aynı duvardaki açıklığı burada da boşluk açar
              var dx = gg.c.x - p.x, dy = gg.c.y - p.y, boy = (dx * ux + dy * uy) / METRE;
              if (Math.abs(dx * uy - dy * ux) < 3 && boy > 0 && boy < L) ac.push({ s: boy - g_ / 2, e: boy + g_ / 2, a: a, ai: ai, yabanci: 1 });
            });
            ac.sort(function (a, b) { return a.s - b.s; });
            var bas = icKose(o, i) ? -KAL : 0, son_ = icKose(o, (i + 1) % o.pts.length) ? L + KAL : L;
            var parca = function (s, e, y0, y1) { if (e - s < .005 || y1 - y0 < .005) return; kutu(duvar, e - s, y1 - y0, KAL, (s + e) / 2, y0, ZK, renk, .92); };
            ac.forEach(function (k) {
              var a = k.a, gen = k.e - k.s, mid = (k.s + k.e) / 2, grp = new T.Group(); grp.position.z = ZK; grp.userData = { sec: { tur: 'acik', i: k.ai } }; duvar.add(grp);
              parca(bas, k.s, 0, DUVAR_H);
              if (k.yabanci) {
                if (a.tur === 'kapi') parca(k.s, k.e, Math.min(kapiH(a), DUVAR_H - .05), DUVAR_H);
                else { parca(k.s, k.e, 0, acikEsik(a)); parca(k.s, k.e, Math.min(acikEsik(a) + acikYuk(a), DUVAR_H - .05), DUVAR_H); }
                bas = k.e; return;
              }
              if (a.tur === 'kapi') {
                var kt = KAPI_TIP[a.kt] || KAPI_TIP.oda, kh = Math.min(kapiH(a), DUVAR_H - .05), yn = (a.yon === -1 ? -1 : 1) * ici, ang = Math.PI / 2.6, kr = a.renk || kt.renk, KASA = 0x4a3b2c;
                parca(k.s, k.e, kh, DUVAR_H);
                kutu(grp, .05, kh, KAL + .03, k.s + .025, 0, 0, KASA, .6); kutu(grp, .05, kh, KAL + .03, k.e - .025, 0, 0, KASA, .6); kutu(grp, gen, .05, KAL + .03, mid, kh - .05, 0, KASA, .6);
                var kanat = function (hx, Lk, sondan) {
                  var g2 = new T.Group(); g2.position.set(hx, 0, 0); grp.add(g2);
                  var yon_ = sondan ? -1 : 1, lw = Lk - .06;
                  if (kt.cam) {
                    kutu(g2, lw, .08, .05, yon_ * (lw / 2 + .03), 0, 0, kr, .5); kutu(g2, lw, .08, .05, yon_ * (lw / 2 + .03), kh - .14, 0, kr, .5);
                    kutu(g2, .08, kh - .06, .05, yon_ * .07, 0, 0, kr, .5); kutu(g2, .08, kh - .06, .05, yon_ * (lw - .01), 0, 0, kr, .5);
                    var cm = new T.Mesh(new T.BoxGeometry(lw - .16, kh - .22, .015), camMat); cm.position.set(yon_ * (lw / 2 + .03), (kh - .06) / 2, 0); g2.add(cm);
                  } else kutu(g2, lw, kh - .06, .045, yon_ * (lw / 2 + .03), 0, 0, kr, a.kt === 'celik' ? .35 : .55, a.kt === 'celik' ? .3 : 0);
                  kutu(g2, .14, .025, .12, yon_ * (lw - .06), 1, 0, METAL, .25, .9);
                  g2.rotation.y = (sondan ? 1 : -1) * yn * ang;
                };
                if (a.kanat === 'cift') { kanat(k.s + .05, gen / 2 - .05, false); kanat(k.e - .05, gen / 2 - .05, true); }
                else if (a.kanat === 'surgu') { kutu(grp, gen * .55, kh - .06, .04, k.s + .05 + gen * .3, 0, ici * (KAL / 2 + .04), kr, .55); kutu(grp, gen + .1, .04, .06, mid, kh, ici * (KAL / 2 + .04), METAL, .3, .8); }
                else if (a.mentese) kanat(k.e - .05, gen - .1, true); else kanat(k.s + .05, gen - .1, false);
              } else {
                var es_ = acikEsik(a), yk = Math.min(acikYuk(a), DUVAR_H - .05 - es_), dr = a.renk || '#3B3A38';
                parca(k.s, k.e, 0, es_); parca(k.s, k.e, es_ + yk, DUVAR_H);
                var cam = new T.Mesh(new T.BoxGeometry(gen - .06, yk - .06, .02), camMat); cam.position.set(mid, es_ + yk / 2, 0); grp.add(cam);
                if (es_ > .02) kutu(grp, gen + .04, .035, KAL + .06, mid, es_ - .035, 0, 0xd9d4ca, .45);
                kutu(grp, gen, .05, .06, mid, es_, 0, dr, .5); kutu(grp, gen, .05, .06, mid, es_ + yk - .05, 0, dr, .5);
                kutu(grp, .05, yk, .06, k.s + .025, es_, 0, dr, .5); kutu(grp, .05, yk, .06, k.e - .025, es_, 0, dr, .5);
                if (gen > .8) kutu(grp, .045, yk, .06, mid, es_, 0, dr, .5);
              }
              bas = k.e;
            });
            parca(bas, son_, 0, DUVAR_H);
          });
        });
        // eşyalar
        plan.esya.forEach(function (e, ei) {
          var t = TIP[e.tip], gw = (e.w || t.w) / 100, gd = (e.d || t.d) / 100, gh = t.h / 100, g_ = new T.Group(), arka = -gd / 2, i, n;
          OZEL = e.renk || null; HARITA = null;
          if (e.m) { HARITA = {}; Object.keys(e.m).forEach(function (sl) { var mm = PARCA[sl] && PARCA[sl].l[e.m[sl]]; if (mm) KAYNAK(e.tip, sl).forEach(function (c) { HARITA[c] = mm; }); }); }
          switch (e.tip) {
            case 'koltuk3': case 'koltuk2':
              kutu(g_, gw, .42, gd, 0, .02, 0, KUMAS, .95); kutu(g_, gw, .4, .2, 0, .42, arka + .1, KUMAS, .95);
              kutu(g_, .16, .22, gd, -gw / 2 + .08, .42, 0, KUMAS, .95); kutu(g_, .16, .22, gd, gw / 2 - .08, .42, 0, KUMAS, .95);
              n = e.tip === 'koltuk3' ? 3 : 2; var iw = (gw - .32) / n; for (i = 0; i < n; i++) kutu(g_, iw - .02, .1, gd - .25, -gw / 2 + .16 + iw * (i + .5), .44, .1, 0x9a9184, .95);
              break;
            case 'kose':
              kutu(g_, gw, .42, gd * .45, 0, .02, -gd / 2 + gd * .225, KUMAS, .95); kutu(g_, gw * .32, .42, gd * .55, -gw / 2 + gw * .16, .02, gd * .225, KUMAS, .95);
              kutu(g_, gw, .4, .2, 0, .42, arka + .1, KUMAS, .95); kutu(g_, .2, .4, gd, -gw / 2 + .1, .42, 0, KUMAS, .95);
              break;
            case 'berjer': kutu(g_, gw, .42, gd, 0, .02, 0, 0xa38b6d, .95); kutu(g_, gw, .45, .16, 0, .42, arka + .08, 0xa38b6d, .95); kutu(g_, .12, .2, gd, -gw / 2 + .06, .42, 0, 0xa38b6d, .95); kutu(g_, .12, .2, gd, gw / 2 - .06, .42, 0, 0xa38b6d, .95); break;
            case 'puf': silindir(g_, gw / 2, gw / 2, gh, 0, 0, 0, 0xa38b6d, .95).scale.z = gd / gw; break;
            case 'lambader': silindir(g_, .16, .16, .03, 0, 0, 0, SIYAH, .4, .5); silindir(g_, .015, .015, gh - .3, 0, 0, 0, SIYAH, .4, .5); var ab = silindir(g_, .14, .2, .3, 0, gh - .3, 0, 0xece3d0, .9); ab.material = new T.MeshStandardMaterial({ color: OZEL || 0xece3d0, emissive: 0x6b5a3a, roughness: .9 }); break;
            case 'sehpa': case 'yansehpa': kutu(g_, gw, .04, gd, 0, gh - .04, 0, ACIK, .5); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(g_, .04, gh - .04, .04, k[0] * (gw / 2 - .05), 0, k[1] * (gd / 2 - .05), SIYAH, .4, .6); }); break;
            case 'tv': kutu(g_, gw, gh - .05, gd, 0, .05, 0, AHSAP, .6); kutu(g_, Math.min(1.23, gw * .8), .72, .04, 0, gh + .2, arka + .1, SIYAH, .2, .3); kutu(g_, .3, .2, .1, 0, gh, arka + .1, SIYAH, .4); break;
            case 'kitaplik': kutu(g_, gw, gh, .02, 0, 0, arka + .01, AHSAP, .6); for (i = 0; i <= 5; i++) kutu(g_, gw, .025, gd, 0, i * (gh - .025) / 5, 0, AHSAP, .6); kutu(g_, .025, gh, gd, -gw / 2, 0, 0, AHSAP, .6); kutu(g_, .025, gh, gd, gw / 2, 0, 0, AHSAP, .6); break;
            case 'hali': kutu(g_, gw, .012, gd, 0, 0, 0, OZEL || 0xb3a58f, 1); break;
            case 'bitki': silindir(g_, .2, .15, .4, 0, 0, 0, 0xc9b9a0, .8); var yap = new T.Mesh(new T.IcosahedronGeometry(.32, 1), MT(0x56683f, .9)); yap.position.y = .85; yap.castShadow = true; g_.add(yap); break;
            case 'yatak2': case 'yatak1':
              kutu(g_, gw, .3, gd, 0, .05, 0, ACIK, .7); kutu(g_, gw - .04, .2, gd - .06, 0, .35, .02, BEYAZ, .95); kutu(g_, gw, .9, .06, 0, 0, arka + .03, ACIK, .7);
              kutu(g_, gw - .02, .05, gd * .6, 0, .55, gd * .18, 0xc8bba6, .95);
              (e.tip === 'yatak2' ? [-.25, .25] : [0]).forEach(function (k) { kutu(g_, Math.min(.6, gw * .4), .12, .4, k * gw, .55, arka + .35, BEYAZ, .95); });
              break;
            case 'bebek': kutu(g_, gw, .08, gd, 0, .3, 0, BEYAZ, .7); [-1, 1].forEach(function (k) { kutu(g_, gw, .55, .03, 0, .3, k * gd / 2, OZEL || BEYAZ, .7); kutu(g_, .03, .55, gd, k * gw / 2, .3, 0, OZEL || BEYAZ, .7); kutu(g_, .04, .3, .04, k * (gw / 2 - .02), 0, gd / 2 - .02, BEYAZ, .7); kutu(g_, .04, .3, .04, k * (gw / 2 - .02), 0, -gd / 2 + .02, BEYAZ, .7); }); break;
            case 'komodin': case 'sifonyer': case 'bufe': case 'dosya': case 'konsol': case 'ayakkabi': case 'makyaj':
              kutu(g_, gw, gh - .05, gd, 0, .05, 0, e.tip === 'dosya' ? 0x6e6b66 : AHSAP, .6);
              if (e.tip === 'makyaj') kutu(g_, gw * .5, .7, .02, 0, gh + .1, arka + .02, 0x9fb3bb, .05, .9);
              break;
            case 'gardirop': case 'firin': case 'portmanto':
              kutu(g_, gw, gh, gd, 0, 0, 0, e.tip === 'firin' ? BEYAZ : 0xd8d0c2, .6);
              if (e.tip === 'firin') kutu(g_, gw - .06, .55, .02, 0, .9, gd / 2, SIYAH, .2, .4); else kutu(g_, .01, gh - .1, .02, 0, .05, gd / 2, 0x8a8478, .5);
              break;
            case 'masa2': case 'masa4': case 'masa6': case 'calisma':
              kutu(g_, gw, .04, gd, 0, .71, 0, e.tip === 'calisma' ? BEYAZ : AHSAP, .5);
              [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(g_, .05, .71, .05, k[0] * (gw / 2 - .06), 0, k[1] * (gd / 2 - .06), e.tip === 'calisma' ? SIYAH : AHSAP, .6); });
              if (e.tip !== 'calisma') { n = e.tip === 'masa6' ? 3 : e.tip === 'masa2' ? 1 : 2; for (i = 0; i < n; i++) [-1, 1].forEach(function (yz) { var sg = new T.Group(); sandalye(sg); sg.position.set(-gw / 2 + gw * (i + .5) / n, 0, yz * (gd / 2 + .12)); sg.rotation.y = yz > 0 ? Math.PI : 0; g_.add(sg); }); }
              break;
            case 'masayuv':
              silindir(g_, gw / 2, gw / 2, .04, 0, .71, 0, AHSAP, .5); silindir(g_, .05, .05, .71, 0, 0, 0, SIYAH, .4, .5); silindir(g_, .25, .25, .02, 0, 0, 0, SIYAH, .4, .5);
              for (i = 0; i < 4; i++) { var sg2 = new T.Group(); sandalye(sg2); var aci = i * Math.PI / 2 + Math.PI / 4; sg2.position.set(Math.cos(aci) * (gw / 2 + .17), 0, Math.sin(aci) * (gw / 2 + .17)); sg2.rotation.y = -aci - Math.PI / 2; g_.add(sg2); }
              break;
            case 'sandalye': sandalye(g_); break;
            case 'bar': silindir(g_, .19, .19, .05, 0, .7, 0, KUMAS, .9); silindir(g_, .025, .025, .7, 0, 0, 0, METAL, .3, .8); silindir(g_, .17, .17, .02, 0, 0, 0, METAL, .3, .8); break;
            case 'ofis': silindir(g_, .25, .25, .08, 0, .45, 0, OZEL || SIYAH, .9); kutu(g_, .45, .5, .06, 0, .55, arka + .1, OZEL || SIYAH, .9); silindir(g_, .03, .03, .45, 0, 0, 0, METAL, .3, .8); silindir(g_, .28, .28, .03, 0, .02, 0, SIYAH, .5); break;
            case 'tezgah': case 'eviye': case 'ocak': case 'bulasik': case 'ada':
              kutu(g_, gw, .86, gd - .02, 0, 0, .01, e.tip === 'bulasik' ? 0xcfcfcf : 0xd6cfc2, .6, e.tip === 'bulasik' ? .3 : 0); kutu(g_, gw, .04, gd, 0, .86, 0, 0xece8e0, .3);
              if (e.tip === 'eviye') { kutu(g_, gw * .7, .02, gd * .55, 0, .885, 0, 0x9da2a5, .2, .9); silindir(g_, .015, .015, .28, 0, .9, arka + .08, METAL, .2, .9); }
              if (e.tip === 'ocak') kutu(g_, gw * .9, .01, gd * .85, 0, .9, 0, SIYAH, .15, .2);
              if (e.tip === 'ada') kutu(g_, gw * .35, .02, gd * .5, gw * .22, .885, -gd * .1, 0x9da2a5, .2, .9);
              break;
            case 'buzdolabi': kutu(g_, gw, gh, gd, 0, 0, 0, OZEL || 0xcfd0d0, .35, .4); kutu(g_, .02, .6, .03, gw / 2 - .08, 1, gd / 2, METAL, .3, .8); break;
            case 'klozet': kutu(g_, gw * .9, .35, .18, 0, .4, arka + .09, SERAMIK, .2); var hz = silindir(g_, .19, .15, .4, 0, 0, .1, SERAMIK, .2); hz.scale.z = 1.35; break;
            case 'lavabo': case 'ciftlavabo':
              kutu(g_, gw, .7, gd, 0, .1, 0, AHSAP, .6); kutu(g_, gw, .1, gd, 0, .8, 0, SERAMIK, .25); kutu(g_, gw - .1, .9, .02, 0, 1.05, arka + .01, 0x9fb3bb, .05, .9);
              (e.tip === 'ciftlavabo' ? [-.25, .25] : [0]).forEach(function (k) { silindir(g_, .015, .015, .2, k * gw, .9, arka + .06, METAL, .2, .9); });
              break;
            case 'dus': kutu(g_, gw, .05, gd, 0, 0, 0, SERAMIK, .3); var cm2 = new T.Mesh(new T.BoxGeometry(.01, 2, gd), camMat); cm2.position.set(gw / 2, 1.05, 0); g_.add(cm2); silindir(g_, .1, .1, .02, 0, 2, arka + .2, METAL, .2, .9); break;
            case 'kuvet': kutu(g_, gw, gh, gd, 0, 0, 0, OZEL || SERAMIK, .25); kutu(g_, gw - .12, .02, gd - .12, 0, gh - .01, 0, 0xdfe8ea, .1); break;
            case 'camasir': kutu(g_, gw, gh, gd, 0, 0, 0, OZEL || BEYAZ, .4); var ka = silindir(g_, .2, .2, .02, 0, 0, 0, 0x8fa0a6, .1, .5); ka.rotation.x = Math.PI / 2; ka.position.set(0, .45, gd / 2); break;
            case 'havlupan': for (i = 0; i < 8; i++) kutu(g_, gw, .02, .03, 0, .2 + i * .12, 0, OZEL || METAL, .3, .8); break;
            default: kutu(g_, gw, gh, gd, 0, 0, 0, AHSAP, .6);
          }
          OZEL = null; HARITA = null;
          g_.position.set(X(e.x), 0, Z(e.y)); g_.rotation.y = -aciRad(e); g_.userData = { sec: { tur: 'esya', i: ei } }; G.add(g_);
        });
        if (kamera) {
          var R = Math.max(maxx - minx, maxy - miny) / METRE * Math.max(1, 1.3 / (U.k.aspect || 1));
          U.k.position.set(R * .45, R * .7 + 3.5, R * .8 + 2.5); U.c.target.set(0, .6, 0); U.c.update();
          U.isik.position.set(-R * .6 - 4, R + 10, R * .4 + 4);
        }
        U.vurgula();
      }
    };

    var tut = kok.querySelector('[data-panel-tut]'); if (tut) tut.addEventListener('click', function () { kok.classList.add('panel-acik'); });
    if (w.IntersectionObserver) new IntersectionObserver(function (g) { kok.classList.toggle('gorunur', g[0].isIntersecting); }, { threshold: .15 }).observe(kok.querySelector('.masa-govde') || kok);
    w.addEventListener('resize', boyut);
    paneliKur(); boyut();
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(ciz);
  }

  function kur() { var k = d.getElementById('masa'); if (k && !k.dataset.kuruldu) { k.dataset.kuruldu = '1'; Masa(k); } }
  d.addEventListener('dm-swap', kur);
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', kur); else kur();
})();
