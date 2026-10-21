/* Dimart Mimarlık · Çizim masası: tarayıcıda dik açılı oda planı çizme, kapı ve pencere, malzeme, 3B görünüm, alan hesabı. */
(function () {
  var d = document, w = window;
  var KARE = 24, METRE = 48; // bir ızgara karesi 0,5 m
  var RENK = { ink: '#EDE8E0', soluk: 'rgba(237,232,224,.45)', cizgi: 'rgba(237,232,224,.08)', ana: 'rgba(237,232,224,.16)', y: '#F2B705', bg: '#17140F' };
  var MALZEME = [
    { ad: 'Boş', taban: null },
    { ad: 'Meşe parke', taban: '#8A6A45', cizgi: 'rgba(40,24,10,.35)', tur: 'parke' },
    { ad: 'Traverten', taban: '#CDBB9C', cizgi: 'rgba(120,100,70,.35)', tur: 'tas' },
    { ad: 'Sıva', taban: '#B9AE9E', cizgi: 'rgba(90,80,70,.25)', tur: 'siva' },
    { ad: 'Beton', taban: '#7D7A75', cizgi: 'rgba(30,30,30,.3)', tur: 'beton' }
  ];
  var ANAHTAR = 'dm-cizim';

  function desen(m) {
    var c = d.createElement('canvas'), x = c.getContext('2d'), s = m.tur === 'parke' ? 96 : 64;
    c.width = c.height = s;
    x.fillStyle = m.taban; x.fillRect(0, 0, s, s);
    x.strokeStyle = m.cizgi; x.lineWidth = 1;
    var r = function (a) { return Math.random() * a; };
    if (m.tur === 'parke') {
      for (var y = 0; y < s; y += 12) {
        x.beginPath(); x.moveTo(0, y + .5); x.lineTo(s, y + .5); x.stroke();
        var o = (y / 12 % 2) * 40; x.beginPath(); x.moveTo(o + .5, y); x.lineTo(o + .5, y + 12); x.moveTo(o + 64.5, y); x.lineTo(o + 64.5, y + 12); x.stroke();
        x.globalAlpha = .25; for (var k = 0; k < 4; k++) { x.beginPath(); x.moveTo(0, y + 3 + r(7)); x.bezierCurveTo(30, y + r(12), 60, y + r(12), s, y + 3 + r(7)); x.stroke(); } x.globalAlpha = 1;
      }
    } else if (m.tur === 'tas') {
      for (var i = 0; i < 26; i++) { x.globalAlpha = .2 + r(.4); x.beginPath(); var yy = r(s); x.moveTo(r(10), yy); x.lineTo(s - r(10), yy + r(2) - 1); x.stroke(); }
      x.globalAlpha = .5; x.beginPath(); x.moveTo(0, s / 2 + .5); x.lineTo(s, s / 2 + .5); x.moveTo(s / 2 + .5, 0); x.lineTo(s / 2 + .5, s); x.stroke();
    } else {
      for (var j = 0; j < (m.tur === 'beton' ? 160 : 260); j++) { x.globalAlpha = r(.5); x.fillStyle = m.cizgi; x.fillRect(r(s), r(s), 1, 1); }
      if (m.tur === 'beton') { x.globalAlpha = .4; for (var q = 0; q < 6; q++) { x.beginPath(); x.arc(r(s), r(s), 1 + r(1.5), 0, 7); x.stroke(); } }
    }
    x.globalAlpha = 1;
    return c;
  }

  function Masa(kok) {
    var cv = kok.querySelector('canvas'), x = cv.getContext('2d');
    var bilgi = kok.querySelector('[data-toplam]'), ipucu = kok.querySelector('[data-ipucu]');
    var W = 0, H = 0, dpr = 1;
    var plan = { odalar: [], acik: [] }, gecmis = [], cizilen = [], fare = null, arac = 'duvar', ucb = false, u3 = 0, hedef3 = 0;
    var desenler = MALZEME.map(function (m) { return m.taban ? x.createPattern(desen(m), 'repeat') : null; });
    try { var k = JSON.parse(localStorage.getItem(ANAHTAR)); if (k && k.odalar) plan = k; } catch (e) {}

    var kaydet = function () { try { localStorage.setItem(ANAHTAR, JSON.stringify(plan)); } catch (e) {} };
    var anlik = function () { gecmis.push(JSON.stringify(plan)); if (gecmis.length > 60) gecmis.shift(); };
    var ses = function (f, v) { var S = w.dmSes; if (S && S.on && S.ctx) S.bell(f, 0, v || .015); };
    var m = function (px) { return (px / METRE).toFixed(2).replace('.', ','); };
    var yasla = function (v) { return Math.round(v / (KARE / 2)) * (KARE / 2); };
    var alanHesap = function (pts) { var a = 0; pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }); return Math.abs(a) / 2 / (METRE * METRE); };
    var merkez = function (pts) { var cx = 0, cy = 0; pts.forEach(function (p) { cx += p.x; cy += p.y; }); return { x: cx / pts.length, y: cy / pts.length }; };
    var icinde = function (p, pts) {
      var c = false;
      for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        var a = pts[i], b = pts[j];
        if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) c = !c;
      }
      return c;
    };
    var enYakinDuvar = function (p) {
      var best = null;
      plan.odalar.forEach(function (o, oi) {
        o.pts.forEach(function (a, i) {
          var b = o.pts[(i + 1) % o.pts.length], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
          if (!L) return;
          var t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (L * L)));
          var px = a.x + dx * t, py = a.y + dy * t, dd = Math.hypot(p.x - px, p.y - py);
          if (dd < 14 && (!best || dd < best.d)) best = { d: dd, oda: oi, kenar: i, t: t, L: L };
        });
      });
      return best;
    };
    var dik = function (son, p) {
      var dx = p.x - son.x, dy = p.y - son.y;
      return Math.abs(dx) >= Math.abs(dy) ? { x: yasla(p.x), y: son.y } : { x: son.x, y: yasla(p.y) };
    };

    var boyut = function () {
      dpr = Math.min(w.devicePixelRatio || 1, 2);
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); ciz();
    };
    var olcuYaz = function (a, b, ic) {
      var L = Math.abs(b.x - a.x) + Math.abs(b.y - a.y); if (L < KARE) return;
      var yat = a.y === b.y, o = ic ? -16 : 16;
      x.save(); x.fillStyle = RENK.soluk; x.font = '500 9.5px Montserrat, sans-serif'; x.textAlign = 'center';
      if (yat) x.fillText(m(L), (a.x + b.x) / 2, a.y - o + 3);
      else { x.translate(a.x + o, (a.y + b.y) / 2); x.rotate(-Math.PI / 2); x.fillText(m(L), 0, 3); }
      x.restore();
    };
    var yon = function (pts) { var a = 0; pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; a += p.x * q.y - q.x * p.y; }); return a > 0 ? 1 : -1; };

    function ciz() {
      x.clearRect(0, 0, W, H);
      // ızgara
      x.lineWidth = 1;
      for (var gx = 0; gx <= W; gx += KARE) { x.strokeStyle = gx % (KARE * 4) ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(gx + .5, 0); x.lineTo(gx + .5, H); x.stroke(); }
      for (var gy = 0; gy <= H; gy += KARE) { x.strokeStyle = gy % (KARE * 4) ? RENK.cizgi : RENK.ana; x.beginPath(); x.moveTo(0, gy + .5); x.lineTo(W, gy + .5); x.stroke(); }
      var e = u3 < .5 ? 4 * u3 * u3 * u3 : 1 - Math.pow(-2 * u3 + 2, 3) / 2;
      var ox = 30 * e, oy = -54 * e;
      // tabanlar
      plan.odalar.forEach(function (o) {
        x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath();
        if (desenler[o.mat]) { x.fillStyle = desenler[o.mat]; x.globalAlpha = .85; x.fill(); x.globalAlpha = 1; }
        else { x.fillStyle = 'rgba(242,183,5,.05)'; x.fill(); }
      });
      // duvarlar
      plan.odalar.forEach(function (o, oi) {
        x.lineJoin = 'miter'; x.lineCap = 'square';
        x.strokeStyle = RENK.ink; x.lineWidth = 6;
        x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath(); x.stroke();
        // açıklıklar: duvarı kes, sembolü çiz
        plan.acik.filter(function (a) { return a.oda === oi; }).forEach(function (a) {
          var p = o.pts[a.kenar], q = o.pts[(a.kenar + 1) % o.pts.length]; if (!p || !q) return;
          var L = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / L, uy = (q.y - p.y) / L;
          var gen = (a.tur === 'kapi' ? .9 : 1.2) * METRE, c = { x: p.x + (q.x - p.x) * a.t, y: p.y + (q.y - p.y) * a.t };
          var s1 = { x: c.x - ux * gen / 2, y: c.y - uy * gen / 2 }, s2 = { x: c.x + ux * gen / 2, y: c.y + uy * gen / 2 };
          x.lineCap = 'butt'; x.strokeStyle = RENK.bg; x.lineWidth = 8;
          x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(s2.x, s2.y); x.stroke();
          x.lineWidth = 1; x.strokeStyle = RENK.ink;
          var nx = -uy * yon(o.pts), ny = ux * yon(o.pts);
          if (a.tur === 'kapi') {
            var uc = { x: s1.x + nx * gen, y: s1.y + ny * gen };
            x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(uc.x, uc.y); x.stroke();
            x.strokeStyle = RENK.soluk; x.setLineDash([3, 3]);
            var a0 = Math.atan2(ny, nx), a1 = Math.atan2(uy, ux), fark = a1 - a0;
            while (fark > Math.PI) fark -= 2 * Math.PI; while (fark < -Math.PI) fark += 2 * Math.PI;
            x.beginPath(); x.arc(s1.x, s1.y, gen, a0, a1, fark < 0); x.stroke(); x.setLineDash([]);
          } else {
            x.fillStyle = RENK.bg; x.strokeStyle = RENK.ink; x.lineWidth = 1.2;
            [-3, 3].forEach(function (k) { x.beginPath(); x.moveTo(s1.x + nx * k, s1.y + ny * k); x.lineTo(s2.x + nx * k, s2.y + ny * k); x.stroke(); });
            x.strokeStyle = RENK.y; x.lineWidth = 1; x.beginPath(); x.moveTo(s1.x, s1.y); x.lineTo(s2.x, s2.y); x.stroke(); x.strokeStyle = RENK.ink;
            x.beginPath(); x.moveTo(s1.x - nx * 3, s1.y - ny * 3); x.lineTo(s1.x + nx * 3, s1.y + ny * 3); x.moveTo(s2.x - nx * 3, s2.y - ny * 3); x.lineTo(s2.x + nx * 3, s2.y + ny * 3); x.stroke();
          }
        });
        if (e < .05) o.pts.forEach(function (p, i) { olcuYaz(p, o.pts[(i + 1) % o.pts.length], false); });
      });
      // 3B: duvarlar yükselir
      if (e > 0) {
        plan.odalar.forEach(function (o) {
          o.pts.forEach(function (p, i) {
            var q = o.pts[(i + 1) % o.pts.length];
            x.fillStyle = 'rgba(237,232,224,.06)'; x.strokeStyle = 'rgba(237,232,224,.5)'; x.lineWidth = 1;
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.lineTo(q.x + ox, q.y + oy); x.lineTo(p.x + ox, p.y + oy); x.closePath(); x.fill();
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(p.x + ox, p.y + oy); x.stroke();
          });
          x.strokeStyle = RENK.ink; x.beginPath(); o.pts.forEach(function (p, i) { i ? x.lineTo(p.x + ox, p.y + oy) : x.moveTo(p.x + ox, p.y + oy); }); x.closePath(); x.stroke();
        });
      }
      // alan etiketleri
      plan.odalar.forEach(function (o) {
        var c = merkez(o.pts);
        x.fillStyle = RENK.y; x.font = '500 12px Montserrat, sans-serif'; x.textAlign = 'center';
        x.fillText(alanHesap(o.pts).toFixed(2).replace('.', ',') + ' m²', c.x + ox, c.y + oy + 4);
        if (o.mat) { x.fillStyle = RENK.soluk; x.font = '500 8.5px Montserrat, sans-serif'; x.fillText(MALZEME[o.mat].ad.toLocaleUpperCase('tr'), c.x + ox, c.y + oy + 18); }
      });
      // çizilmekte olan oda
      if (cizilen.length) {
        x.strokeStyle = RENK.y; x.lineWidth = 2; x.lineCap = 'square';
        x.beginPath(); cizilen.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); });
        if (fare) { var u = dik(cizilen[cizilen.length - 1], fare); x.lineTo(u.x, u.y); }
        x.stroke();
        if (fare) { var son = cizilen[cizilen.length - 1], u2 = dik(son, fare); olcuYaz(son, u2, true); }
        x.fillStyle = RENK.y; cizilen.forEach(function (p) { x.fillRect(p.x - 3, p.y - 3, 6, 6); });
        if (cizilen.length > 2) { x.strokeStyle = RENK.y; x.lineWidth = 1; x.strokeRect(cizilen[0].x - 7.5, cizilen[0].y - 7.5, 15, 15); }
      }
      // imleç
      if (fare && arac === 'duvar') { var f = cizilen.length ? dik(cizilen[cizilen.length - 1], fare) : { x: yasla(fare.x), y: yasla(fare.y) }; x.fillStyle = RENK.y; x.fillRect(f.x - 2, f.y - 2, 4, 4); }
      if (fare && (arac === 'kapi' || arac === 'pencere')) { var dv = enYakinDuvar(fare); if (dv) { var o2 = plan.odalar[dv.oda], a2 = o2.pts[dv.kenar], b2 = o2.pts[(dv.kenar + 1) % o2.pts.length]; x.strokeStyle = RENK.y; x.lineWidth = 3; x.beginPath(); x.moveTo(a2.x, a2.y); x.lineTo(b2.x, b2.y); x.stroke(); } }
      // toplam
      var top = plan.odalar.reduce(function (s, o) { return s + alanHesap(o.pts); }, 0);
      if (bilgi) bilgi.textContent = plan.odalar.length + ' oda · ' + top.toFixed(2).replace('.', ',') + ' m²';
    }

    var anim = function () {
      var hiz = .045;
      if (Math.abs(u3 - hedef3) < hiz) { u3 = hedef3; ciz(); return; }
      u3 += u3 < hedef3 ? hiz : -hiz; ciz(); requestAnimationFrame(anim);
    };
    var nokta = function (e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    var kapat = function () {
      if (cizilen.length < 3) return;
      var s0 = cizilen[0], son = cizilen[cizilen.length - 1];
      if (son.x !== s0.x && son.y !== s0.y) cizilen.push({ x: s0.x, y: son.y });
      var pts = cizilen.filter(function (p, i, l) { var q = l[(i + 1) % l.length]; return !(p.x === q.x && p.y === q.y); });
      if (alanHesap(pts) < .5) { cizilen = []; ciz(); return; }
      anlik(); plan.odalar.push({ pts: pts, mat: 0 }); cizilen = []; kaydet();
      ses(293.66, .02); setTimeout(function () { ses(440, .016); }, 120); setTimeout(function () { ses(587.33, .014); }, 240);
      if (ipucu) ipucu.textContent = 'Oda kapandı. Kapı ve pencere ekleyin ya da malzeme seçin.';
      ciz();
    };

    cv.addEventListener('pointermove', function (e) { fare = nokta(e); ciz(); });
    cv.addEventListener('pointerleave', function () { fare = null; ciz(); });
    cv.addEventListener('pointerdown', function (e) {
      if (hedef3) { secArac('duvar'); }
      var p = nokta(e); fare = p;
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
      } else if (arac === 'malzeme') {
        for (var i = plan.odalar.length - 1; i >= 0; i--) if (icinde(p, plan.odalar[i].pts)) { anlik(); plan.odalar[i].mat = (plan.odalar[i].mat + 1) % MALZEME.length; kaydet(); ses(493.88); break; }
      }
      ciz();
    });
    cv.addEventListener('dblclick', function () { if (arac === 'duvar') kapat(); });
    d.addEventListener('keydown', function (e) {
      if (!d.body.contains(kok)) return;
      if (e.key === 'Escape') { cizilen = []; ciz(); }
      if ((e.key === 'z' && (e.metaKey || e.ctrlKey)) || (e.key === 'Backspace' && cizilen.length)) { e.preventDefault(); geri(); }
    });

    var geri = function () {
      if (cizilen.length) cizilen.pop();
      else if (gecmis.length) { plan = JSON.parse(gecmis.pop()); kaydet(); }
      ciz();
    };
    var butonlar = kok.querySelectorAll('[data-arac]');
    var secArac = function (a) {
      if (a === '3b') { hedef3 = hedef3 ? 0 : 1; kok.querySelector('[data-arac="3b"]').setAttribute('aria-pressed', !!hedef3); anim(); return; }
      if (hedef3) { hedef3 = 0; kok.querySelector('[data-arac="3b"]').setAttribute('aria-pressed', 'false'); anim(); }
      arac = a;
      Array.prototype.forEach.call(butonlar, function (b) { if (b.dataset.arac !== '3b') b.setAttribute('aria-pressed', b.dataset.arac === a); });
      if (a !== 'duvar') cizilen = [];
      if (ipucu) ipucu.textContent = { duvar: 'Tıklayarak köşeleri ekleyin, ilk köşeye tıklayınca oda kapanır.', kapi: 'Kapı eklemek için bir duvara tıklayın.', pencere: 'Pencere eklemek için bir duvara tıklayın.', malzeme: 'Malzemeyi değiştirmek için bir odanın içine tıklayın.' }[a];
      ciz();
    };
    Array.prototype.forEach.call(butonlar, function (b) { b.addEventListener('click', function () { secArac(b.dataset.arac); }); });
    var is = function (n, f) { var b = kok.querySelector('[data-is="' + n + '"]'); if (b) b.addEventListener('click', f); };
    is('geri', geri);
    is('temizle', function () { if (!plan.odalar.length && !cizilen.length) return; anlik(); plan = { odalar: [], acik: [] }; cizilen = []; kaydet(); ciz(); });
    is('indir', function () {
      var a = d.createElement('a'); a.download = 'dimart-cizim-masasi.png';
      var t = d.createElement('canvas'); t.width = cv.width; t.height = cv.height;
      var tx = t.getContext('2d'); tx.fillStyle = RENK.bg; tx.fillRect(0, 0, t.width, t.height); tx.drawImage(cv, 0, 0);
      tx.fillStyle = RENK.soluk; tx.font = '500 ' + 11 * dpr + 'px Montserrat, sans-serif'; tx.fillText('dimartmimarlik.com · Çizim masası', 16 * dpr, t.height - 16 * dpr);
      a.href = t.toDataURL('image/png'); a.click();
    });
    is('gonder', function () {
      var top = 0, satir = plan.odalar.map(function (o, i) {
        var al = alanHesap(o.pts); top += al;
        var kenar = o.pts.map(function (p, j) { var q = o.pts[(j + 1) % o.pts.length]; return m(Math.abs(q.x - p.x) + Math.abs(q.y - p.y)); });
        var ac = plan.acik.filter(function (a) { return a.oda === i; });
        var kapi = ac.filter(function (a) { return a.tur === 'kapi'; }).length, pen = ac.length - kapi;
        return 'Oda ' + (i + 1) + ': ' + al.toFixed(2).replace('.', ',') + ' m² · kenarlar ' + kenar.join(' · ') + ' m' + (o.mat ? ' · ' + MALZEME[o.mat].ad : '') + (kapi ? ' · ' + kapi + ' kapı' : '') + (pen ? ' · ' + pen + ' pencere' : '');
      });
      if (!satir.length) { if (ipucu) ipucu.textContent = 'Önce bir oda çizin.'; return; }
      var govde = 'Merhaba,\n\nDimart Çizim masasında bir taslak hazırladım (toplam ' + top.toFixed(2).replace('.', ',') + ' m²):\n\n' + satir.join('\n') + '\n\nGörseli bu e-postaya ekliyorum. Projem hakkında görüşmek istiyorum.\n';
      location.href = 'mailto:info@dimartmimarlik.com?subject=' + encodeURIComponent('Çizim masası taslağım · ' + top.toFixed(2).replace('.', ',') + ' m²') + '&body=' + encodeURIComponent(govde);
    });
    w.addEventListener('resize', boyut);
    boyut();
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(ciz);
  }

  function kur() { var k = d.getElementById('masa'); if (k && !k.dataset.kuruldu) { k.dataset.kuruldu = '1'; Masa(k); } }
  d.addEventListener('dm-swap', kur);
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', kur); else kur();
})();
