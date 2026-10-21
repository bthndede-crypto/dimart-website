/* Dimart Mimarlık · Çizim masası: tarayıcıda oda planı çizme, kapı ve pencere, standart ölçülerde eşya, zemin ve duvar malzemeleri, gerçek 3B görünüm, alan hesabı. */
(function () {
  var d = document, w = window;
  var KARE = 24, METRE = 48; // bir ızgara karesi 0,5 m; 48 piksel 1 metre
  var RENK = { ink: '#EDE8E0', soluk: 'rgba(237,232,224,.45)', cizgi: 'rgba(237,232,224,.08)', ana: 'rgba(237,232,224,.16)', y: '#F2B705', bg: '#17140F' };
  var ANAHTAR = 'dm-cizim', DUVAR_H = 2.8;

  /* ---------- malzemeler ---------- */
  var ZEMIN = [
    { ad: 'Boş' },
    { ad: 'Meşe parke', tur: 'parke', a: '#9A7650', b: 'rgba(45,28,12,.35)' },
    { ad: 'Ceviz parke', tur: 'parke', a: '#5E4330', b: 'rgba(20,12,6,.45)' },
    { ad: 'Balıksırtı meşe', tur: 'balik', a: '#A88459', b: 'rgba(50,30,12,.4)' },
    { ad: 'Traverten', tur: 'tas', a: '#CDBB9C', b: 'rgba(120,100,70,.35)' },
    { ad: 'Beyaz mermer', tur: 'mermer', a: '#E7E3DD', b: 'rgba(110,110,115,.4)' },
    { ad: 'Siyah mermer', tur: 'mermer', a: '#2B2927', b: 'rgba(235,230,220,.35)' },
    { ad: 'Seramik 60×60 açık', tur: 'karo', a: '#D8D3CA', b: 'rgba(90,85,80,.35)' },
    { ad: 'Seramik 60×60 antrasit', tur: 'karo', a: '#4A4846', b: 'rgba(15,15,15,.5)' },
    { ad: 'Terrazzo', tur: 'terrazzo', a: '#DCD5C8', b: '#8E8576' },
    { ad: 'Hidrolik karo', tur: 'hidrolik', a: '#D9CFBE', b: '#6E7F78' },
    { ad: 'Mikrobeton', tur: 'siva', a: '#ABA69E', b: 'rgba(70,65,60,.25)' },
    { ad: 'Beton', tur: 'beton', a: '#7D7A75', b: 'rgba(30,30,30,.3)' },
    { ad: 'Halı', tur: 'hali', a: '#8E8476', b: 'rgba(40,35,30,.3)' }
  ];
  var BOYA = [
    { ad: 'Beyaz', r: '#F2F0EB' }, { ad: 'Kırık beyaz', r: '#E8E1D3' }, { ad: 'Kum', r: '#D6C8AE' },
    { ad: 'Adaçayı', r: '#B4BDA6' }, { ad: 'Toprak', r: '#B98C6E' }, { ad: 'Gece mavisi', r: '#3F4B5C' }, { ad: 'Antrasit', r: '#3B3A38' }
  ];

  /* ---------- eşya kütüphanesi: genişlik × derinlik × yükseklik (cm) ---------- */
  var ESYA = [
    ['Oturma', [
      ['koltuk3', 'Üçlü koltuk', 220, 90, 80], ['koltuk2', 'İkili koltuk', 160, 90, 80], ['kose', 'Köşe koltuk', 280, 200, 80],
      ['berjer', 'Berjer', 80, 80, 85], ['sehpa', 'Orta sehpa', 120, 60, 40], ['yansehpa', 'Yan sehpa', 50, 50, 50],
      ['tv', 'TV ünitesi', 180, 45, 50], ['kitaplik', 'Kitaplık', 100, 35, 200], ['hali', 'Halı', 200, 300, 1], ['bitki', 'Saksı bitki', 50, 50, 120]]],
    ['Yatak odası', [
      ['yatak2', 'Çift kişilik yatak', 160, 200, 50], ['yatak1', 'Tek kişilik yatak', 90, 200, 50], ['komodin', 'Komodin', 50, 40, 50],
      ['gardirop', 'Gardırop', 180, 60, 220], ['sifonyer', 'Şifonyer', 120, 50, 80]]],
    ['Yemek', [
      ['masa4', 'Yemek masası (4 kişilik)', 140, 80, 75], ['masa6', 'Yemek masası (6 kişilik)', 180, 90, 75],
      ['masayuv', 'Yuvarlak masa', 110, 110, 75], ['sandalye', 'Sandalye', 45, 50, 85], ['bufe', 'Büfe', 160, 45, 80]]],
    ['Mutfak', [
      ['tezgah', 'Tezgâh modülü', 60, 60, 90], ['eviye', 'Eviye', 80, 60, 90], ['ocak', 'Ocak', 60, 60, 90],
      ['buzdolabi', 'Buzdolabı', 70, 70, 190], ['bulasik', 'Bulaşık makinesi', 60, 60, 85], ['firin', 'Boy dolabı ve fırın', 60, 60, 220],
      ['ada', 'Mutfak adası', 180, 90, 90], ['bar', 'Bar taburesi', 40, 40, 75]]],
    ['Banyo', [
      ['klozet', 'Klozet', 40, 70, 80], ['lavabo', 'Lavabo dolabı', 60, 45, 85], ['dus', 'Duş teknesi', 90, 90, 200],
      ['kuvet', 'Küvet', 170, 75, 55], ['camasir', 'Çamaşır makinesi', 60, 60, 85], ['havlupan', 'Havlupan', 50, 10, 120]]],
    ['Çalışma', [
      ['calisma', 'Çalışma masası', 140, 70, 75], ['ofis', 'Ofis sandalyesi', 60, 60, 100], ['dosya', 'Dosya dolabı', 80, 40, 110]]]
  ];
  var TIP = {};
  ESYA.forEach(function (g) { g[1].forEach(function (e) { TIP[e[0]] = { ad: e[1], w: e[2], d: e[3], h: e[4], kat: g[0] }; }); });

  /* ---------- dokular ---------- */
  var r = function (a) { return Math.random() * a; };
  function desen(m, s) {
    s = s || 128;
    var c = d.createElement('canvas'), x = c.getContext('2d'); c.width = c.height = s;
    x.fillStyle = m.a; x.fillRect(0, 0, s, s); x.strokeStyle = m.b; x.lineWidth = 1;
    var t = m.tur, i, k, q = s / 128;
    if (t === 'parke') {
      for (var y = 0; y < s; y += 12 * q) {
        x.fillStyle = 'rgba(0,0,0,' + r(.12) + ')'; x.fillRect(0, y, s, 12 * q);
        x.beginPath(); x.moveTo(0, y + .5); x.lineTo(s, y + .5); x.stroke();
        var o = (Math.round(y / (12 * q)) % 3) * 42 * q; x.beginPath(); x.moveTo(o % s + .5, y); x.lineTo(o % s + .5, y + 12 * q); x.moveTo((o + 64 * q) % s + .5, y); x.lineTo((o + 64 * q) % s + .5, y + 12 * q); x.stroke();
        x.globalAlpha = .3; for (k = 0; k < 4; k++) { x.beginPath(); x.moveTo(0, y + (2 + r(8)) * q); x.bezierCurveTo(s * .3, y + r(12) * q, s * .6, y + r(12) * q, s, y + (2 + r(8)) * q); x.stroke(); } x.globalAlpha = 1;
      }
    } else if (t === 'balik') {
      for (i = -s; i < s * 2; i += 16 * q) for (k = -32 * q; k < s + 32 * q; k += 32 * q) {
        x.fillStyle = 'rgba(0,0,0,' + r(.12) + ')';
        x.save(); x.translate(i, k); x.rotate(Math.PI / 4); x.fillRect(0, 0, 32 * q, 8 * q); x.strokeRect(0, 0, 32 * q, 8 * q); x.restore();
        x.save(); x.translate(i + 16 * q, k + 16 * q); x.rotate(-Math.PI / 4); x.fillRect(0, 0, 32 * q, 8 * q); x.strokeRect(0, 0, 32 * q, 8 * q); x.restore();
      }
    } else if (t === 'tas') {
      for (i = 0; i < 30; i++) { x.globalAlpha = .15 + r(.4); x.beginPath(); var yy = r(s); x.moveTo(r(10), yy); x.lineTo(s - r(10), yy + r(2) - 1); x.stroke(); }
      x.globalAlpha = .6; x.beginPath(); x.moveTo(0, s / 2 + .5); x.lineTo(s, s / 2 + .5); x.moveTo(s / 2 + .5, 0); x.lineTo(s / 2 + .5, s / 2); x.moveTo(.5, s / 2); x.lineTo(.5, s); x.stroke();
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
      for (i = 0; i < 1400 * q * q; i++) { x.globalAlpha = r(.35); x.fillStyle = i % 2 ? '#6E6559' : '#A39888'; x.fillRect(r(s), r(s), q, 2 * q); }
    } else {
      for (i = 0; i < (t === 'beton' ? 220 : 380) * q * q; i++) { x.globalAlpha = r(.5); x.fillStyle = m.b; x.fillRect(r(s), r(s), q, q); }
      if (t === 'beton') { x.globalAlpha = .45; for (i = 0; i < 7; i++) { x.beginPath(); x.arc(r(s), r(s), (1 + r(1.5)) * q, 0, 7); x.stroke(); } }
    }
    x.globalAlpha = 1;
    return c;
  }

  /* ---------- 2B eşya sembolleri (yerel koordinat: sol üst 0,0; arka kenar üstte) ---------- */
  function sembol(x, t, W, D) {
    var rr = function (a, b, c, e, k) { x.beginPath(); if (x.roundRect) x.roundRect(a, b, c, e, k); else x.rect(a, b, c, e); };
    var cizgi = function () { x.stroke(); };
    var dolu = function (a) { x.fillStyle = 'rgba(23,20,15,.55)'; x.fill(); x.fillStyle = 'rgba(237,232,224,' + (a || .1) + ')'; x.fill(); x.stroke(); };
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
      case 'sehpa': case 'yansehpa': case 'komodin': case 'sifonyer': case 'bufe': case 'dosya':
        rr(0, 0, W, D, 2); dolu(.1);
        if (t === 'sehpa') { rr(4, 4, W - 8, D - 8, 2); cizgi(); }
        if (t === 'sifonyer' || t === 'bufe') { x.beginPath(); x.moveTo(W / 2, 0); x.lineTo(W / 2, D); x.stroke(); }
        break;
      case 'tv': rr(0, 0, W, D, 2); dolu(.1); x.fillStyle = RENK.ink; x.fillRect(W * .2, D * .35, W * .6, 2); break;
      case 'kitaplik': case 'gardirop': case 'firin':
        rr(0, 0, W, D, 1); dolu(.1); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, D); x.moveTo(W, 0); x.lineTo(0, D); x.globalAlpha = .5; x.stroke(); x.globalAlpha = 1;
        if (t === 'gardirop') { x.beginPath(); x.moveTo(0, D * .2); x.lineTo(W, D * .2); x.stroke(); }
        break;
      case 'hali':
        x.setLineDash([4, 3]); rr(0, 0, W, D, 0); x.fillStyle = 'rgba(242,183,5,.06)'; x.fill(); x.stroke(); x.setLineDash([]);
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
      case 'masa4': case 'masa6':
        n = t === 'masa6' ? 3 : 2;
        for (i = 0; i < n; i++) { var sx = W * (i + .5) / n - 10; rr(sx, -14, 20, 12, 3); cizgi(); rr(sx, D + 2, 20, 12, 3); cizgi(); }
        rr(0, 0, W, D, 2); dolu(.12); break;
      case 'masayuv':
        for (i = 0; i < 4; i++) { var b = i * Math.PI / 2 + Math.PI / 4; x.save(); x.translate(W / 2 + Math.cos(b) * W * .62, D / 2 + Math.sin(b) * D * .62); x.rotate(b + Math.PI / 2); rr(-10, -6, 20, 12, 3); cizgi(); x.restore(); }
        ell(W / 2, D / 2, W / 2, D / 2); dolu(.12); break;
      case 'sandalye': case 'bar': case 'ofis':
        if (t === 'bar' || t === 'ofis') { ell(W / 2, D / 2, W / 2.2, D / 2.2); dolu(.1); if (t === 'ofis') { rr(W * .15, 0, W * .7, D * .2, 3); cizgi(); } }
        else { rr(0, D * .15, W, D * .85, 3); dolu(.1); rr(0, 0, W, D * .16, 2); cizgi(); }
        break;
      case 'tezgah': case 'eviye': case 'ocak': case 'bulasik': case 'ada': case 'camasir': case 'lavabo':
        rr(0, 0, W, D, 1); dolu(.1);
        if (t === 'eviye') { rr(W * .12, D * .2, W * .76, D * .6, 5); cizgi(); ell(W / 2, D * .5, 2, 2); cizgi(); }
        if (t === 'ocak') { [[.3, .3], [.7, .3], [.3, .7], [.7, .7]].forEach(function (p) { ell(W * p[0], D * p[1], W * .13, W * .13); cizgi(); }); }
        if (t === 'bulasik' || t === 'camasir') { x.fillStyle = RENK.soluk; x.font = '500 ' + Math.max(7, W * .14) + 'px Montserrat, sans-serif'; x.textAlign = 'center'; x.fillText(t === 'bulasik' ? 'BM' : 'ÇM', W / 2, D / 2 + 3); if (t === 'camasir') { ell(W / 2, D / 2, W * .32, W * .32); cizgi(); } }
        if (t === 'lavabo') { ell(W / 2, D * .55, W * .32, D * .3); cizgi(); }
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
    var W = 0, H = 0, dpr = 1;
    var plan = { odalar: [], acik: [], esya: [] }, gecmis = [], cizilen = [], fare = null, arac = 'duvar';
    var secZemin = 1, secBoya = 1, secTip = 'koltuk3', secili = -1, surukle = null, uc = false, hayaletR = 0;
    var desenler = ZEMIN.map(function (m) { return m.tur ? x.createPattern(desen(m), 'repeat') : null; });
    try {
      var k = JSON.parse(localStorage.getItem(ANAHTAR));
      if (k && k.odalar) {
        plan = k; plan.acik = plan.acik || []; plan.esya = plan.esya || [];
        plan.odalar.forEach(function (o) { if (o.zemin === undefined) o.zemin = [0, 1, 4, 11, 12][o.mat || 0]; if (o.boya === undefined) o.boya = 0; });
      }
    } catch (e) {}

    var kaydet = function () { try { localStorage.setItem(ANAHTAR, JSON.stringify(plan)); } catch (e) {} };
    var anlik = function () { gecmis.push(JSON.stringify(plan)); if (gecmis.length > 80) gecmis.shift(); };
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
    var odaBul = function (p) { for (var i = plan.odalar.length - 1; i >= 0; i--) if (icinde(p, plan.odalar[i].pts)) return i; return -1; };
    var olcuEsya = function (e) { var t = TIP[e.tip], a = t.w / 100 * METRE, b = t.d / 100 * METRE; return e.r % 2 ? { w: b, d: a } : { w: a, d: b }; };
    var esyaBul = function (p) {
      for (var i = plan.esya.length - 1; i >= 0; i--) { var e = plan.esya[i], o = olcuEsya(e); if (Math.abs(p.x - e.x) <= o.w / 2 + 3 && Math.abs(p.y - e.y) <= o.d / 2 + 3) return i; }
      return -1;
    };
    var enYakinDuvar = function (p) {
      var best = null;
      plan.odalar.forEach(function (o, oi) {
        o.pts.forEach(function (a, i) {
          var b = o.pts[(i + 1) % o.pts.length], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy); if (!L) return;
          var t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (L * L)));
          var dd = Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t));
          if (dd < 14 && (!best || dd < best.d)) best = { d: dd, oda: oi, kenar: i, t: t, L: L };
        });
      });
      return best;
    };
    var dik = function (son, p) { var dx = p.x - son.x, dy = p.y - son.y; return Math.abs(dx) >= Math.abs(dy) ? { x: yasla(p.x), y: son.y } : { x: son.x, y: yasla(p.y) }; };
    var yon = function (pts) { var a = 0; pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }); return a > 0 ? 1 : -1; };

    var boyut = function () {
      dpr = Math.min(w.devicePixelRatio || 1, 2);
      var b = cv.getBoundingClientRect(); if (!b.width) return; W = b.width; H = b.height;
      cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); ciz();
      if (uc) U.yeniden();
    };
    var olcuYaz = function (a, b, ic) {
      var L = Math.abs(b.x - a.x) + Math.abs(b.y - a.y); if (L < KARE) return;
      var yat = a.y === b.y, o = ic ? -16 : 16;
      x.save(); x.fillStyle = RENK.soluk; x.font = '500 9.5px Montserrat, sans-serif'; x.textAlign = 'center';
      if (yat) x.fillText(m(L), (a.x + b.x) / 2, a.y - o + 3);
      else { x.translate(a.x + o, (a.y + b.y) / 2); x.rotate(-Math.PI / 2); x.fillText(m(L), 0, 3); }
      x.restore();
    };
    var esyaCiz = function (e, i, hayalet) {
      var t = TIP[e.tip], a = t.w / 100 * METRE, b = t.d / 100 * METRE;
      x.save(); x.translate(e.x, e.y); x.rotate(e.r * Math.PI / 2);
      x.strokeStyle = hayalet || i === secili ? RENK.y : 'rgba(237,232,224,.85)'; x.lineWidth = 1; x.globalAlpha = hayalet ? .7 : 1;
      x.translate(-a / 2, -b / 2); sembol(x, e.tip, a, b);
      x.restore();
      if (i === secili && !hayalet) {
        var o = olcuEsya(e); x.save(); x.strokeStyle = RENK.y; x.setLineDash([3, 3]); x.strokeRect(e.x - o.w / 2 - 4, e.y - o.d / 2 - 4, o.w + 8, o.d + 8); x.setLineDash([]);
        x.fillStyle = RENK.y; x.font = '500 9px Montserrat, sans-serif'; x.textAlign = 'center';
        x.fillText(t.ad + ' · ' + t.w + '×' + t.d, e.x, e.y - o.d / 2 - 10); x.restore();
      }
    };

    function ciz() {
      x.clearRect(0, 0, W, H); x.lineWidth = 1;
      for (var gx = 0; gx <= W; gx += KARE) { x.strokeStyle = gx % (KARE * 4) ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(gx + .5, 0); x.lineTo(gx + .5, H); x.stroke(); }
      for (var gy = 0; gy <= H; gy += KARE) { x.strokeStyle = gy % (KARE * 4) ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(0, gy + .5); x.lineTo(W, gy + .5); x.stroke(); }
      plan.odalar.forEach(function (o) {
        x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath();
        if (desenler[o.zemin]) { x.fillStyle = desenler[o.zemin]; x.globalAlpha = .9; x.fill(); x.globalAlpha = 1; } else { x.fillStyle = 'rgba(242,183,5,.05)'; x.fill(); }
      });
      plan.esya.forEach(function (e, i) { if (e.tip === 'hali') esyaCiz(e, i); });
      plan.odalar.forEach(function (o, oi) {
        x.lineJoin = 'miter'; x.lineCap = 'square'; x.strokeStyle = RENK.ink; x.lineWidth = 6;
        x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath(); x.stroke();
        plan.acik.filter(function (a) { return a.oda === oi; }).forEach(function (a) {
          var p = o.pts[a.kenar], q = o.pts[(a.kenar + 1) % o.pts.length]; if (!p || !q) return;
          var L = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / L, uy = (q.y - p.y) / L;
          var gen = (a.tur === 'kapi' ? .9 : 1.2) * METRE, c = { x: p.x + (q.x - p.x) * a.t, y: p.y + (q.y - p.y) * a.t };
          var s1 = { x: c.x - ux * gen / 2, y: c.y - uy * gen / 2 }, s2 = { x: c.x + ux * gen / 2, y: c.y + uy * gen / 2 };
          x.lineCap = 'butt'; x.strokeStyle = RENK.bg; x.lineWidth = 8; x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(s2.x, s2.y); x.stroke();
          var nx = -uy * yon(o.pts), ny = ux * yon(o.pts);
          x.strokeStyle = RENK.ink; x.lineWidth = 1;
          if (a.tur === 'kapi') {
            x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(s1.x + nx * gen, s1.y + ny * gen); x.stroke();
            x.strokeStyle = RENK.soluk; x.setLineDash([3, 3]);
            var a0 = Math.atan2(ny, nx), a1 = Math.atan2(uy, ux), f = a1 - a0;
            while (f > Math.PI) f -= 2 * Math.PI; while (f < -Math.PI) f += 2 * Math.PI;
            x.beginPath(); x.arc(s1.x, s1.y, gen, a0, a1, f < 0); x.stroke(); x.setLineDash([]);
          } else {
            x.lineWidth = 1.2; [-3, 3].forEach(function (k) { x.beginPath(); x.moveTo(s1.x + nx * k, s1.y + ny * k); x.lineTo(s2.x + nx * k, s2.y + ny * k); x.stroke(); });
            x.strokeStyle = RENK.y; x.lineWidth = 1; x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(s2.x, s2.y); x.stroke();
          }
        });
        o.pts.forEach(function (p, i) { olcuYaz(p, o.pts[(i + 1) % o.pts.length], false); });
      });
      plan.esya.forEach(function (e, i) { if (e.tip !== 'hali') esyaCiz(e, i); });
      plan.odalar.forEach(function (o) {
        var c = merkez(o.pts);
        x.font = '500 12px Montserrat, sans-serif'; x.textAlign = 'center'; x.lineJoin = 'round';
        var et = alanHesap(o.pts).toFixed(2).replace('.', ',') + ' m²';
        if (o.zemin) { x.strokeStyle = 'rgba(23,20,15,.85)'; x.lineWidth = 4; x.strokeText(et, c.x, c.y + 4); }
        x.fillStyle = RENK.y; x.fillText(et, c.x, c.y + 4);
        if (o.zemin) { x.font = '500 8.5px Montserrat, sans-serif'; var zt = ZEMIN[o.zemin].ad.toLocaleUpperCase('tr'); x.lineWidth = 3; x.strokeText(zt, c.x, c.y + 18); x.fillStyle = RENK.ink; x.fillText(zt, c.x, c.y + 18); }
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
      if (fare && (arac === 'kapi' || arac === 'pencere')) { var dv = enYakinDuvar(fare); if (dv) { var o2 = plan.odalar[dv.oda], a2 = o2.pts[dv.kenar], b2 = o2.pts[(dv.kenar + 1) % o2.pts.length]; x.strokeStyle = RENK.y; x.lineWidth = 3; x.beginPath(); x.moveTo(a2.x, a2.y); x.lineTo(b2.x, b2.y); x.stroke(); } }
      if (fare && arac === 'esya') esyaCiz({ tip: secTip, x: ince(fare.x), y: ince(fare.y), r: hayaletR }, -2, true);
      if (fare && (arac === 'zemin' || arac === 'boya')) { var oi2 = odaBul(fare); if (oi2 >= 0) { var o3 = plan.odalar[oi2]; x.strokeStyle = RENK.y; x.lineWidth = 2; x.beginPath(); o3.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath(); x.stroke(); } }
      var top = plan.odalar.reduce(function (s, o) { return s + alanHesap(o.pts); }, 0);
      if (bilgi) bilgi.textContent = plan.odalar.length + ' oda · ' + plan.esya.length + ' eşya · ' + top.toFixed(2).replace('.', ',') + ' m²';
    }

    /* ---------- panel ---------- */
    var IPUCU = {
      duvar: 'Tıklayarak köşeleri ekleyin, ilk köşeye tıklayınca oda kapanır.',
      kapi: 'Kapı eklemek için bir duvara tıklayın.', pencere: 'Pencere eklemek için bir duvara tıklayın.',
      esya: 'Listeden bir eşya seçin, plana tıklayıp yerleştirin. R ile döndürün.',
      zemin: 'Bir zemin seçin, uygulamak için odanın içine tıklayın.', boya: 'Bir duvar rengi seçin, uygulamak için odanın içine tıklayın. 3B görünümde görünür.',
      sec: 'Eşyayı tutup sürükleyin. R ile döndürün, Delete ile silin.'
    };
    var on = function (el, a, b) { if (el) el.setAttribute(a, b); };
    function paneliKur() {
      if (!panel) return;
      var h = '';
      if (arac === 'esya') {
        ESYA.forEach(function (g) {
          h += '<p class="pn-baslik">' + g[0] + '</p><div class="pn-liste">';
          g[1].forEach(function (e) { h += '<button type="button" data-tip="' + e[0] + '" aria-pressed="' + (e[0] === secTip) + '"><span>' + e[1] + '</span><small>' + e[2] + '×' + e[3] + '</small></button>'; });
          h += '</div>';
        });
      } else if (arac === 'zemin') {
        h += '<p class="pn-baslik">Zemin</p><div class="pn-renk">';
        ZEMIN.forEach(function (z, i) { if (i) h += '<button type="button" data-zemin="' + i + '" aria-pressed="' + (i === secZemin) + '"><i data-onizle="' + i + '"></i><span>' + z.ad + '</span></button>'; });
        h += '</div>';
      } else if (arac === 'boya') {
        h += '<p class="pn-baslik">Duvar rengi</p><div class="pn-renk">';
        BOYA.forEach(function (b, i) { h += '<button type="button" data-boya="' + i + '" aria-pressed="' + (i === secBoya) + '"><i style="background:' + b.r + '"></i><span>' + b.ad + '</span></button>'; });
        h += '</div>';
      } else if (arac === 'sec' && secili >= 0 && plan.esya[secili]) {
        var e = plan.esya[secili], t = TIP[e.tip];
        h += '<p class="pn-baslik">Seçili eşya</p><p class="pn-ad">' + t.ad + '</p><p class="pn-olcu">' + t.w + ' × ' + t.d + ' × ' + t.h + ' cm</p>' +
          '<div class="pn-is"><button type="button" data-pis="dondur">Döndür</button><button type="button" data-pis="kopya">Kopyala</button><button type="button" data-pis="sil">Sil</button></div>';
      } else {
        h += '<p class="pn-baslik">' + ({ duvar: 'Duvar', kapi: 'Kapı · 90 cm', pencere: 'Pencere · 120 cm', sec: 'Seç ve taşı' }[arac] || '') + '</p><p class="pn-not">' + IPUCU[arac] + '</p>' +
          '<p class="pn-not">Ölçek: bir kare 50 × 50 cm. Duvar yüksekliği 2,80 m. Eşyalar standart ölçülerdedir.</p>';
      }
      panel.innerHTML = h;
      Array.prototype.forEach.call(panel.querySelectorAll('[data-onizle]'), function (el) {
        el.style.backgroundImage = 'url(' + desen(ZEMIN[+el.dataset.onizle], 64).toDataURL() + ')';
      });
    }
    if (panel) panel.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.tip) { secTip = b.dataset.tip; hayaletR = 0; }
      if (b.dataset.zemin) secZemin = +b.dataset.zemin;
      if (b.dataset.boya) secBoya = +b.dataset.boya;
      if (b.dataset.pis) { islem(b.dataset.pis); return; }
      paneliKur(); ciz();
    });
    function islem(n) {
      var e = plan.esya[secili]; if (!e) return;
      anlik();
      if (n === 'dondur') e.r = (e.r + 1) % 4;
      if (n === 'sil') { plan.esya.splice(secili, 1); secili = -1; }
      if (n === 'kopya') { plan.esya.push({ tip: e.tip, x: e.x + 24, y: e.y + 24, r: e.r }); secili = plan.esya.length - 1; }
      kaydet(); ses(493.88); paneliKur(); ciz();
    }

    var nokta = function (ev) { var b = cv.getBoundingClientRect(); return { x: ev.clientX - b.left, y: ev.clientY - b.top }; };
    var kapat = function () {
      if (cizilen.length < 3) return;
      var s0 = cizilen[0], son = cizilen[cizilen.length - 1];
      if (son.x !== s0.x && son.y !== s0.y) cizilen.push({ x: s0.x, y: son.y });
      var pts = cizilen.filter(function (p, i, l) { var q = l[(i + 1) % l.length]; return !(p.x === q.x && p.y === q.y); });
      if (alanHesap(pts) < .5) { cizilen = []; ciz(); return; }
      anlik(); plan.odalar.push({ pts: pts, zemin: 0, boya: 0 }); cizilen = []; kaydet();
      ses(293.66, .02); setTimeout(function () { ses(440, .016); }, 120); setTimeout(function () { ses(587.33, .014); }, 240);
      if (ipucu) ipucu.textContent = 'Oda kapandı. Kapı, pencere ve eşya ekleyin, zemin seçin.';
      ciz();
    };

    cv.addEventListener('pointermove', function (ev) {
      fare = nokta(ev);
      if (surukle) { var e = plan.esya[surukle.i]; e.x = ince(fare.x - surukle.dx); e.y = ince(fare.y - surukle.dy); surukle.oynadi = true; }
      else if (arac === 'sec') cv.style.cursor = esyaBul(fare) >= 0 ? 'move' : 'default';
      ciz();
    });
    cv.addEventListener('pointerleave', function () { fare = null; ciz(); });
    cv.addEventListener('pointerup', function () { if (surukle) { if (surukle.oynadi) kaydet(); else gecmis.pop(); } surukle = null; });
    cv.addEventListener('pointerdown', function (ev) {
      var p = nokta(ev); fare = p;
      if (arac === 'duvar') {
        if (!cizilen.length) { cizilen.push({ x: yasla(p.x), y: yasla(p.y) }); ses(587.33); }
        else {
          var s0 = cizilen[0];
          if (cizilen.length > 2 && Math.abs(p.x - s0.x) + Math.abs(p.y - s0.y) < 16) { kapat(); return; }
          var u = dik(cizilen[cizilen.length - 1], p), son = cizilen[cizilen.length - 1];
          if (u.x === son.x && u.y === son.y) return;
          cizilen.push(u); ses([329.63, 369.99, 440, 493.88, 587.33][cizilen.length % 5]);
          if (cizilen.length > 3 && u.x === s0.x && u.y === s0.y) { cizilen.pop(); kapat(); return; }
        }
        if (ipucu) ipucu.textContent = cizilen.length < 3 ? 'Tıklayarak köşeleri ekleyin.' : 'Odayı kapatmak için ilk köşeye tıklayın.';
      } else if (arac === 'kapi' || arac === 'pencere') {
        var dv = enYakinDuvar(p); if (!dv) return;
        var pay = ((arac === 'kapi' ? .9 : 1.2) * METRE / 2 + 4) / dv.L; if (pay >= .5) return;
        anlik(); plan.acik.push({ oda: dv.oda, kenar: dv.kenar, t: Math.max(pay, Math.min(1 - pay, dv.t)), tur: arac }); kaydet(); ses(arac === 'kapi' ? 440 : 659.25);
      } else if (arac === 'esya') {
        anlik(); plan.esya.push({ tip: secTip, x: ince(p.x), y: ince(p.y), r: hayaletR }); kaydet(); ses(523.25);
        if (ipucu) ipucu.textContent = TIP[secTip].ad + ' eklendi. Başka eşya ekleyin ya da Seç ile taşıyın.';
      } else if (arac === 'zemin' || arac === 'boya') {
        var oi = odaBul(p); if (oi < 0) return;
        anlik(); if (arac === 'zemin') plan.odalar[oi].zemin = secZemin; else plan.odalar[oi].boya = secBoya; kaydet(); ses(493.88);
      } else if (arac === 'sec') {
        var i = esyaBul(p); secili = i;
        if (i >= 0) { anlik(); surukle = { i: i, dx: p.x - plan.esya[i].x, dy: p.y - plan.esya[i].y }; try { cv.setPointerCapture(ev.pointerId); } catch (e) {} }
        paneliKur();
      }
      ciz();
    });
    cv.addEventListener('dblclick', function () { if (arac === 'duvar') kapat(); });
    d.addEventListener('keydown', function (ev) {
      if (!d.body.contains(kok) || /input|textarea/i.test(ev.target.tagName)) return;
      if (ev.key === 'Escape') { cizilen = []; secili = -1; paneliKur(); ciz(); }
      if (ev.key === 'r' || ev.key === 'R') { if (arac === 'esya') { hayaletR = (hayaletR + 1) % 4; ciz(); } else if (secili >= 0) islem('dondur'); }
      if ((ev.key === 'Delete' || ev.key === 'Backspace') && secili >= 0 && !cizilen.length) { ev.preventDefault(); islem('sil'); return; }
      if ((ev.key === 'z' && (ev.metaKey || ev.ctrlKey)) || (ev.key === 'Backspace' && cizilen.length)) { ev.preventDefault(); geri(); }
    });

    var geri = function () {
      if (cizilen.length) cizilen.pop();
      else if (gecmis.length) { plan = JSON.parse(gecmis.pop()); secili = -1; kaydet(); paneliKur(); if (uc) U.kur(); }
      ciz();
    };
    var butonlar = kok.querySelectorAll('[data-arac]');
    var secArac = function (a) {
      if (a === '3b') { if (uc) U.kapat(); else U.ac(); return; }
      if (uc) U.kapat();
      arac = a; if (a !== 'sec') secili = -1;
      Array.prototype.forEach.call(butonlar, function (b) { if (b.dataset.arac !== '3b') on(b, 'aria-pressed', b.dataset.arac === a); });
      if (a !== 'duvar') cizilen = [];
      cv.style.cursor = a === 'sec' ? 'default' : 'crosshair';
      if (ipucu) ipucu.textContent = IPUCU[a];
      paneliKur(); ciz();
    };
    Array.prototype.forEach.call(butonlar, function (b) { b.addEventListener('click', function () { secArac(b.dataset.arac); }); });
    var is = function (n, f) { var b = kok.querySelector('[data-is="' + n + '"]'); if (b) b.addEventListener('click', f); };
    is('geri', geri);
    is('temizle', function () { if (!plan.odalar.length && !cizilen.length && !plan.esya.length) return; anlik(); plan = { odalar: [], acik: [], esya: [] }; cizilen = []; secili = -1; kaydet(); paneliKur(); ciz(); if (uc) U.kapat(); });
    is('indir', function () {
      var a = d.createElement('a'); a.download = uc ? 'dimart-cizim-masasi-3b.png' : 'dimart-cizim-masasi.png';
      var kaynak = cv;
      if (uc && U.r) { U.ciz(); kaynak = U.r.domElement; }
      var t = d.createElement('canvas'); t.width = kaynak.width; t.height = kaynak.height;
      var tx = t.getContext('2d'), oran = kaynak.width / Math.max(1, kaynak.clientWidth || W);
      tx.fillStyle = RENK.bg; tx.fillRect(0, 0, t.width, t.height); tx.drawImage(kaynak, 0, 0);
      tx.fillStyle = RENK.soluk; tx.font = '500 ' + 11 * oran + 'px Montserrat, sans-serif'; tx.fillText('dimartmimarlik.com · Çizim masası', 16 * oran, t.height - 16 * oran);
      a.href = t.toDataURL('image/png'); a.click();
    });
    is('gonder', function () {
      var top = 0, satir = plan.odalar.map(function (o, i) {
        var al = alanHesap(o.pts); top += al;
        var kenar = o.pts.map(function (p, j) { var q = o.pts[(j + 1) % o.pts.length]; return m(Math.abs(q.x - p.x) + Math.abs(q.y - p.y)); });
        var ac = plan.acik.filter(function (a) { return a.oda === i; }), kapi = ac.filter(function (a) { return a.tur === 'kapi'; }).length, pen = ac.length - kapi;
        return 'Oda ' + (i + 1) + ': ' + al.toFixed(2).replace('.', ',') + ' m² · kenarlar ' + kenar.join(' · ') + ' m' + (o.zemin ? ' · zemin: ' + ZEMIN[o.zemin].ad : '') + ' · duvar: ' + BOYA[o.boya || 0].ad + (kapi ? ' · ' + kapi + ' kapı' : '') + (pen ? ' · ' + pen + ' pencere' : '');
      });
      if (!satir.length) { if (ipucu) ipucu.textContent = 'Önce bir oda çizin.'; return; }
      var say = {}; plan.esya.forEach(function (e) { say[TIP[e.tip].ad] = (say[TIP[e.tip].ad] || 0) + 1; });
      var es = Object.keys(say).map(function (k) { return say[k] + ' × ' + k; });
      var govde = 'Merhaba,\n\nDimart Çizim masasında bir taslak hazırladım (toplam ' + top.toFixed(2).replace('.', ',') + ' m²):\n\n' + satir.join('\n') +
        (es.length ? '\n\nEşyalar: ' + es.join(', ') : '') + '\n\nGörselleri bu e-postaya ekliyorum. Projem hakkında görüşmek istiyorum.\n';
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
      ac: function () {
        if (!plan.odalar.length) { if (ipucu) ipucu.textContent = '3B görünüm için önce bir oda çizin.'; return; }
        U.yukle(function () {
          uc = true; kok.classList.add('uc'); on(kok.querySelector('[data-arac="3b"]'), 'aria-pressed', 'true');
          try { if (!U.r) U.hazirla(); } catch (e) { uc = false; kok.classList.remove('uc'); if (ipucu) ipucu.textContent = 'Tarayıcınız 3B görünümü desteklemiyor.'; return; }
          U.yeniden(); U.kur();
          if (ipucu) ipucu.textContent = 'Sürükleyerek döndürün, tekerlekle yakınlaşın, sağ tık ya da iki parmakla kaydırın.';
        });
      },
      kapat: function () { uc = false; kok.classList.remove('uc'); on(kok.querySelector('[data-arac="3b"]'), 'aria-pressed', 'false'); if (ipucu) ipucu.textContent = IPUCU[arac]; },
      hazirla: function () {
        var T = w.THREE;
        var r3 = U.r = new T.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        r3.setPixelRatio(Math.min(w.devicePixelRatio || 1, 2)); r3.shadowMap.enabled = true; r3.shadowMap.type = T.PCFSoftShadowMap;
        r3.outputEncoding = T.sRGBEncoding; r3.toneMapping = T.ACESFilmicToneMapping; r3.toneMappingExposure = 1.05;
        sahne.appendChild(r3.domElement);
        U.s = new T.Scene(); U.s.background = new T.Color(RENK.bg);
        U.k = new T.PerspectiveCamera(42, 1, .1, 200);
        U.c = new T.OrbitControls(U.k, r3.domElement); U.c.maxPolarAngle = Math.PI / 2.05; U.c.minDistance = 2; U.c.maxDistance = 60;
        U.c.addEventListener('change', U.ciz);
        U.s.add(new T.HemisphereLight(0xfff4e0, 0x2a241c, .55));
        var g = new T.DirectionalLight(0xffeedd, 1.1); g.position.set(-8, 14, 6); g.castShadow = true;
        g.shadow.mapSize.set(2048, 2048); var sc = g.shadow.camera; sc.left = sc.bottom = -15; sc.right = sc.top = 15; g.shadow.bias = -.0005;
        U.isik = g; U.s.add(g); U.s.add(g.target);
        U.s.add(new T.AmbientLight(0xffffff, .18));
        var yer = new T.Mesh(new T.PlaneGeometry(200, 200), new T.ShadowMaterial({ opacity: .45 }));
        yer.rotation.x = -Math.PI / 2; yer.position.y = -.01; yer.receiveShadow = true; U.s.add(yer);
        U.grup = new T.Group(); U.s.add(U.grup);
      },
      yeniden: function () { var b = sahne.getBoundingClientRect(); if (!U.r || !b.width) return; U.r.setSize(b.width, b.height, false); U.k.aspect = b.width / b.height; U.k.updateProjectionMatrix(); U.ciz(); },
      ciz: function () { if (U.r) U.r.render(U.s, U.k); },
      kur: function () {
        var T = w.THREE, G = U.grup;
        while (G.children.length) { var c0 = G.children.pop(); c0.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); }
        if (!plan.odalar.length) { U.ciz(); return; }
        var minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        plan.odalar.forEach(function (o) { o.pts.forEach(function (p) { minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x); miny = Math.min(miny, p.y); maxy = Math.max(maxy, p.y); }); });
        var cx = (minx + maxx) / 2 / METRE, cz = (miny + maxy) / 2 / METRE, X = function (px) { return px / METRE - cx; }, Z = function (py) { return py / METRE - cz; };
        var mat = {}, MT = function (renk, rough, metal) { var key = renk + '|' + rough + '|' + metal; return mat[key] || (mat[key] = new T.MeshStandardMaterial({ color: renk, roughness: rough === undefined ? .8 : rough, metalness: metal || 0 })); };
        var kutu = function (par, w_, h_, d_, x_, y_, z_, renk, rough, metal) {
          var me = new T.Mesh(new T.BoxGeometry(w_, h_, d_), MT(renk, rough, metal));
          me.position.set(x_, y_ + h_ / 2, z_); me.castShadow = true; me.receiveShadow = true; par.add(me); return me;
        };
        var silindir = function (par, r1, r2, h_, x_, y_, z_, renk, rough, metal) {
          var me = new T.Mesh(new T.CylinderGeometry(r1, r2, h_, 28), MT(renk, rough, metal)); me.position.set(x_, y_ + h_ / 2, z_); me.castShadow = true; me.receiveShadow = true; par.add(me); return me;
        };
        var KUMAS = 0x8a8174, AHSAP = 0x7a5a3c, ACIK = 0xb08d66, BEYAZ = 0xeeebe5, METAL = 0x9a9a9a, SIYAH = 0x232220, SERAMIK = 0xf4f2ee;
        var sandalye = function (sg) { kutu(sg, .44, .04, .44, 0, .44, 0, AHSAP, .6); kutu(sg, .44, .42, .04, 0, .48, -.2, AHSAP, .6); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(sg, .03, .44, .03, k[0] * .19, 0, k[1] * .19, AHSAP, .6); }); };
        // zeminler
        plan.odalar.forEach(function (o) {
          var sh = new T.Shape(); o.pts.forEach(function (p, i) { if (i) sh.lineTo(X(p.x), -Z(p.y)); else sh.moveTo(X(p.x), -Z(p.y)); });
          var malz;
          if (o.zemin) {
            var tx = new T.CanvasTexture(desen(ZEMIN[o.zemin], 256)); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(1 / 2.6, 1 / 2.6); tx.encoding = T.sRGBEncoding; tx.anisotropy = 8;
            var z = ZEMIN[o.zemin].tur;
            malz = new T.MeshStandardMaterial({ map: tx, roughness: z === 'mermer' ? .25 : z === 'hali' ? 1 : .65 });
          } else malz = MT(0x8f877b, .9);
          var me = new T.Mesh(new T.ShapeGeometry(sh), malz); me.rotation.x = -Math.PI / 2; me.receiveShadow = true; G.add(me);
        });
        // duvarlar: açıklıkların çevresinde parçalara bölünür
        var KAL = .12;
        plan.odalar.forEach(function (o, oi) {
          var renk = BOYA[o.boya || 0].r, ici = yon(o.pts);
          o.pts.forEach(function (p, i) {
            var q = o.pts[(i + 1) % o.pts.length], ax = X(p.x), az = Z(p.y), bx = X(q.x), bz = Z(q.y);
            var L = Math.hypot(bx - ax, bz - az); if (L < .01) return;
            var duvar = new T.Group(); duvar.position.set(ax, 0, az); duvar.rotation.y = -Math.atan2(bz - az, bx - ax); G.add(duvar);
            var ac = plan.acik.filter(function (a) { return a.oda === oi && a.kenar === i; }).map(function (a) { var g_ = a.tur === 'kapi' ? .9 : 1.2; return { s: a.t * L - g_ / 2, e: a.t * L + g_ / 2, tur: a.tur }; }).sort(function (a, b) { return a.s - b.s; });
            var bas = -KAL / 2;
            var parca = function (s, e, y0, y1) { if (e - s < .005 || y1 - y0 < .005) return; kutu(duvar, e - s, y1 - y0, KAL, (s + e) / 2, y0, 0, renk, .92); };
            ac.forEach(function (a) {
              parca(bas, a.s, 0, DUVAR_H);
              if (a.tur === 'kapi') {
                parca(a.s, a.e, 2.1, DUVAR_H);
                // aralık açık kapı kanadı, odanın içine doğru
                var kanat = new T.Group(); kanat.position.set(a.s, 0, 0); duvar.add(kanat);
                kutu(kanat, .86, 2.06, .04, .43, 0, 0, 0x6b4f35, .6);
                kanat.rotation.y = -ici * Math.PI / 2.6;
              } else {
                parca(a.s, a.e, 0, .9); parca(a.s, a.e, 2.1, DUVAR_H);
                var cam = new T.Mesh(new T.BoxGeometry(a.e - a.s, 1.2, .02), new T.MeshStandardMaterial({ color: 0xbfd4dc, roughness: .05, metalness: .1, transparent: true, opacity: .3 }));
                cam.position.set((a.s + a.e) / 2, 1.5, 0); duvar.add(cam);
                kutu(duvar, a.e - a.s, .04, KAL + .04, (a.s + a.e) / 2, .88, 0, 0xd9d4ca, .5);
                kutu(duvar, .04, 1.2, KAL, (a.s + a.e) / 2, .9, 0, 0x3a3835, .5);
              }
              bas = a.e;
            });
            parca(bas, L + KAL / 2, 0, DUVAR_H);
          });
        });
        // eşyalar
        plan.esya.forEach(function (e) {
          var t = TIP[e.tip], gw = t.w / 100, gd = t.d / 100, gh = t.h / 100, g_ = new T.Group(), arka = -gd / 2, i, n;
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
            case 'sehpa': case 'yansehpa': kutu(g_, gw, .04, gd, 0, gh - .04, 0, ACIK, .5); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(g_, .04, gh - .04, .04, k[0] * (gw / 2 - .05), 0, k[1] * (gd / 2 - .05), SIYAH, .4, .6); }); break;
            case 'tv': kutu(g_, gw, gh - .05, gd, 0, .05, 0, AHSAP, .6); kutu(g_, 1.23, .72, .04, 0, gh + .2, arka + .1, SIYAH, .2, .3); kutu(g_, .3, .2, .1, 0, gh, arka + .1, SIYAH, .4); break;
            case 'kitaplik': kutu(g_, gw, gh, .02, 0, 0, arka + .01, AHSAP, .6); for (i = 0; i <= 5; i++) kutu(g_, gw, .025, gd, 0, i * (gh - .025) / 5, 0, AHSAP, .6); kutu(g_, .025, gh, gd, -gw / 2, 0, 0, AHSAP, .6); kutu(g_, .025, gh, gd, gw / 2, 0, 0, AHSAP, .6); break;
            case 'hali': kutu(g_, gw, .012, gd, 0, 0, 0, 0xb3a58f, 1); break;
            case 'bitki': silindir(g_, .2, .15, .4, 0, 0, 0, 0xc9b9a0, .8); var yap = new T.Mesh(new T.IcosahedronGeometry(.32, 1), MT(0x56683f, .9)); yap.position.y = .85; yap.castShadow = true; g_.add(yap); break;
            case 'yatak2': case 'yatak1':
              kutu(g_, gw, .3, gd, 0, .05, 0, ACIK, .7); kutu(g_, gw - .04, .2, gd - .06, 0, .35, .02, BEYAZ, .95); kutu(g_, gw, .9, .06, 0, 0, arka + .03, ACIK, .7);
              kutu(g_, gw - .02, .05, gd * .6, 0, .55, gd * .18, 0xc8bba6, .95);
              (e.tip === 'yatak2' ? [-.37, .37] : [0]).forEach(function (k) { kutu(g_, .6, .12, .4, k * gw, .55, arka + .35, BEYAZ, .95); });
              break;
            case 'komodin': case 'sifonyer': case 'bufe': case 'dosya': kutu(g_, gw, gh - .05, gd, 0, .05, 0, e.tip === 'dosya' ? 0x6e6b66 : AHSAP, .6); break;
            case 'gardirop': case 'firin':
              kutu(g_, gw, gh, gd, 0, 0, 0, e.tip === 'firin' ? BEYAZ : 0xd8d0c2, .6);
              if (e.tip === 'firin') kutu(g_, gw - .06, .55, .02, 0, .9, gd / 2, SIYAH, .2, .4); else kutu(g_, .01, gh - .1, .02, 0, .05, gd / 2, 0x8a8478, .5);
              break;
            case 'masa4': case 'masa6': case 'calisma':
              kutu(g_, gw, .04, gd, 0, .71, 0, e.tip === 'calisma' ? BEYAZ : AHSAP, .5);
              [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (k) { kutu(g_, .05, .71, .05, k[0] * (gw / 2 - .06), 0, k[1] * (gd / 2 - .06), e.tip === 'calisma' ? SIYAH : AHSAP, .6); });
              if (e.tip !== 'calisma') { n = e.tip === 'masa6' ? 3 : 2; for (i = 0; i < n; i++) [-1, 1].forEach(function (yz) { var sg = new T.Group(); sandalye(sg); sg.position.set(-gw / 2 + gw * (i + .5) / n, 0, yz * (gd / 2 + .12)); sg.rotation.y = yz > 0 ? Math.PI : 0; g_.add(sg); }); }
              break;
            case 'masayuv':
              silindir(g_, .55, .55, .04, 0, .71, 0, AHSAP, .5); silindir(g_, .05, .05, .71, 0, 0, 0, SIYAH, .4, .5); silindir(g_, .25, .25, .02, 0, 0, 0, SIYAH, .4, .5);
              for (i = 0; i < 4; i++) { var sg2 = new T.Group(); sandalye(sg2); var aci = i * Math.PI / 2 + Math.PI / 4; sg2.position.set(Math.cos(aci) * .72, 0, Math.sin(aci) * .72); sg2.rotation.y = -aci - Math.PI / 2; g_.add(sg2); }
              break;
            case 'sandalye': sandalye(g_); break;
            case 'bar': silindir(g_, .19, .19, .05, 0, .7, 0, KUMAS, .9); silindir(g_, .025, .025, .7, 0, 0, 0, METAL, .3, .8); silindir(g_, .17, .17, .02, 0, 0, 0, METAL, .3, .8); break;
            case 'ofis': silindir(g_, .25, .25, .08, 0, .45, 0, SIYAH, .9); kutu(g_, .45, .5, .06, 0, .55, arka + .1, SIYAH, .9); silindir(g_, .03, .03, .45, 0, 0, 0, METAL, .3, .8); silindir(g_, .28, .28, .03, 0, .02, 0, SIYAH, .5); break;
            case 'tezgah': case 'eviye': case 'ocak': case 'bulasik': case 'ada':
              kutu(g_, gw, .86, gd - .02, 0, 0, .01, e.tip === 'bulasik' ? 0xcfcfcf : 0xd6cfc2, .6, e.tip === 'bulasik' ? .3 : 0); kutu(g_, gw, .04, gd, 0, .86, 0, 0xece8e0, .3);
              if (e.tip === 'eviye') { kutu(g_, gw * .7, .02, gd * .55, 0, .885, 0, 0x9da2a5, .2, .9); silindir(g_, .015, .015, .28, 0, .9, arka + .08, METAL, .2, .9); }
              if (e.tip === 'ocak') kutu(g_, gw * .9, .01, gd * .85, 0, .9, 0, SIYAH, .15, .2);
              if (e.tip === 'ada') kutu(g_, gw * .35, .02, gd * .5, gw * .22, .885, -gd * .1, 0x9da2a5, .2, .9);
              break;
            case 'buzdolabi': kutu(g_, gw, gh, gd, 0, 0, 0, 0xcfd0d0, .35, .4); kutu(g_, .02, .6, .03, gw / 2 - .08, 1, gd / 2, METAL, .3, .8); break;
            case 'klozet': kutu(g_, gw * .9, .35, .18, 0, .4, arka + .09, SERAMIK, .2); var hz = silindir(g_, .19, .15, .4, 0, 0, .1, SERAMIK, .2); hz.scale.z = 1.35; break;
            case 'lavabo': kutu(g_, gw, .7, gd, 0, .1, 0, AHSAP, .6); kutu(g_, gw, .1, gd, 0, .8, 0, SERAMIK, .25); kutu(g_, gw - .1, .9, .02, 0, 1.05, arka + .01, 0x9fb3bb, .05, .9); break;
            case 'dus': kutu(g_, gw, .05, gd, 0, 0, 0, SERAMIK, .3); var cm = new T.Mesh(new T.BoxGeometry(.01, 2, gd), new T.MeshStandardMaterial({ color: 0xcfe0e6, transparent: true, opacity: .25, roughness: .05 })); cm.position.set(gw / 2, 1.05, 0); g_.add(cm); silindir(g_, .1, .1, .02, 0, 2, arka + .2, METAL, .2, .9); break;
            case 'kuvet': kutu(g_, gw, gh, gd, 0, 0, 0, SERAMIK, .25); kutu(g_, gw - .12, .02, gd - .12, 0, gh - .01, 0, 0xdfe8ea, .1); break;
            case 'camasir': kutu(g_, gw, gh, gd, 0, 0, 0, BEYAZ, .4); var ka = silindir(g_, .2, .2, .02, 0, 0, 0, 0x8fa0a6, .1, .5); ka.rotation.x = Math.PI / 2; ka.position.set(0, .45, gd / 2); break;
            case 'havlupan': for (i = 0; i < 8; i++) kutu(g_, gw, .02, .03, 0, .2 + i * .12, 0, METAL, .3, .8); break;
            default: kutu(g_, gw, gh, gd, 0, 0, 0, AHSAP, .6);
          }
          g_.position.set(X(e.x), 0, Z(e.y)); g_.rotation.y = -e.r * Math.PI / 2; G.add(g_);
        });
        var R = Math.max(maxx - minx, maxy - miny) / METRE;
        U.k.position.set(R * .45, R * .7 + 3.5, R * .8 + 2.5); U.c.target.set(0, .6, 0); U.c.update();
        U.isik.position.set(-R * .6 - 4, R + 10, R * .4 + 4);
        U.ciz();
      }
    };

    w.addEventListener('resize', boyut);
    paneliKur(); boyut();
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(ciz);
  }

  function kur() { var k = d.getElementById('masa'); if (k && !k.dataset.kuruldu) { k.dataset.kuruldu = '1'; Masa(k); } }
  d.addEventListener('dm-swap', kur);
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', kur); else kur();
})();
