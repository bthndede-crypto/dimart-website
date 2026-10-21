/* Dimart Mimarlık · etkileşimler: açılış, mozaik geçiş, kesintisiz sayfa geçişi, eskiz, müzik, imleç, görünme ve paralaks. */
(function () {
  var d = document, h = d.documentElement, w = window;
  h.classList.add('js');
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce) h.classList.add('static');
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

  /* ---------- ortam sesi: Web Audio ile üretilen hafif doku + çok kısık piyano (Satie, Gymnopédies; Gregory Tait, CC BY 4.0) ---------- */
  var Ses = {
    ctx: null, on: false, bus: null, wet: null, timer: 0,
    build: function () {
      var AC = w.AudioContext || w.webkitAudioContext;
      if (!AC) return false;
      var c = this.ctx = new AC();
      var master = this.bus = c.createGain();
      master.gain.value = 0;
      var comp = c.createDynamicsCompressor();
      master.connect(comp); comp.connect(c.destination);
      // yankı: üretilmiş darbe tepkisi
      var len = c.sampleRate * 3.2, ir = c.createBuffer(2, len, c.sampleRate);
      for (var ch = 0; ch < 2; ch++) {
        var data = ir.getChannelData(ch);
        for (var i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
      var rev = c.createConvolver(); rev.buffer = ir;
      var wet = this.wet = c.createGain(); wet.gain.value = .5;
      wet.connect(rev); rev.connect(master);
      // sıcak taban sesi: D majör yayılımı, yavaş nefes alan filtre
      var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = .4;
      var lfo = c.createOscillator(), lfoG = c.createGain();
      lfo.frequency.value = .035; lfoG.gain.value = 260; lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
      var pad = this.pad = c.createGain(); pad.gain.value = .3;
      lp.connect(pad); pad.connect(master); pad.connect(wet);
      [[73.42, .05], [110, .04], [146.83, .03], [220, .016], [277.18, .008], [329.63, .006]].forEach(function (n, k) {
        ['sine', 'triangle'].forEach(function (type, j) {
          var o = c.createOscillator(), g = c.createGain();
          o.type = type; o.frequency.value = n[0]; o.detune.value = j ? 4 + k : -3 - k;
          g.gain.value = n[1] * (j ? .5 : 1);
          var tl = c.createOscillator(), tg = c.createGain();
          tl.frequency.value = .05 + k * .013; tg.gain.value = n[1] * .45; tl.connect(tg); tg.connect(g.gain); tl.start();
          o.connect(g); g.connect(lp); o.start();
        });
      });
      // hava: kahverengi gürültü, yavaşça gelip giden
      var nb = c.createBuffer(1, c.sampleRate * 6, c.sampleRate), nd = nb.getChannelData(0), last = 0;
      for (var m = 0; m < nd.length; m++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; nd[m] = last * 3.2; }
      this.noise = nb;
      var air = c.createBufferSource(); air.buffer = nb; air.loop = true;
      var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 420; bp.Q.value = .5;
      var ag = c.createGain(); ag.gain.value = .07;
      var al = c.createOscillator(), alg = c.createGain(); al.frequency.value = .06; alg.gain.value = .04; al.connect(alg); alg.connect(ag.gain); al.start();
      air.connect(bp); bp.connect(ag); ag.connect(master); air.start();
      // müzik: sayfa geçişlerinde kesilmez, parçalar arasında kısa bir sessizlik bırakır
      var a = this.audio = new Audio();
      a.preload = 'none';
      var mg = this.mg = c.createGain(); mg.gain.value = .5;
      try {
        var src = c.createMediaElementSource(a);
        src.connect(mg); mg.connect(master);
        var mw = c.createGain(); mw.gain.value = .12; mg.connect(mw); mw.connect(wet);
      } catch (e) {}
      var self = this;
      a.addEventListener('ended', function () {
        self.parca = (self.parca + 1) % self.liste.length; self.konum = 0;
        clearTimeout(self.mt); self.mt = setTimeout(function () { if (self.on) self.cal(); }, 6000);
      });
      w.addEventListener('pagehide', function () {
        try { sessionStorage.setItem('dm-muzik', self.parca + ':' + Math.floor(a.currentTime || 0)); } catch (e) {}
      });
      var k = null; try { k = sessionStorage.getItem('dm-muzik'); } catch (e) {}
      if (k) { k = k.split(':'); this.parca = (+k[0] || 0) % this.liste.length; this.konum = +k[1] || 0; }
      return true;
    },
    liste: ['/assets/muzik/gymnopedie-1.mp3', '/assets/muzik/gymnopedie-3.mp3'],
    parca: 0, konum: 0,
    cal: function () {
      var a = this.audio; if (!a) return;
      var url = this.liste[this.parca];
      if (a.getAttribute('src') !== url) {
        a.src = url;
        var t = this.konum;
        if (t) a.addEventListener('loadedmetadata', function f() { a.removeEventListener('loadedmetadata', f); try { a.currentTime = t; } catch (e) {} });
      }
      var p = a.play(); if (p && p.catch) p.catch(function () {});
    },
    bell: function (f, t, v) {
      var c = this.ctx; if (!c) return;
      t = t || c.currentTime;
      [1, 2.01, 3.98].forEach(function (mul, i) {
        var o = c.createOscillator(), g = c.createGain();
        o.frequency.value = f * mul;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime((v || .05) / (i * 2.5 + 1), t + .015);
        g.gain.exponentialRampToValueAtTime(.0001, t + 4.5 / (i + 1));
        o.connect(g); g.connect(Ses.wet); g.connect(Ses.bus);
        o.start(t); o.stop(t + 5);
      });
    },
    burst: function (dur, f0, f1, vol, q) {
      var c = this.ctx; if (!this.on || !c) return;
      var t = c.currentTime, s = c.createBufferSource(); s.buffer = this.noise;
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = q || 1.2;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
      var g = c.createGain();
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * .35); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(this.bus); g.connect(this.wet);
      s.start(t, Math.random() * 4); s.stop(t + dur + .05);
    },
    tick: function () { var n = Date.now(); if (n - (this._t || 0) < 60) return; this._t = n; this.burst(.05, 3200, 2200, .05, 4); },
    whoosh: function () { this.burst(1.1, 260, 1600, .35, .8); },
    start: function () {
      if (!this.ctx && !this.build()) return;
      var c = this.ctx;
      c.resume();
      this.on = true;
      this.bus.gain.cancelScheduledValues(c.currentTime);
      this.bus.gain.setTargetAtTime(.6, c.currentTime, 1.4);
      this.bell(587.33, c.currentTime + .1, .025); this.bell(880, c.currentTime + .5, .018);
      clearTimeout(this.mt); this.mt = setTimeout(function () { if (Ses.on) Ses.cal(); }, 1200);
    },
    stop: function () {
      this.on = false; clearTimeout(this.timer); clearTimeout(this.mt);
      if (!this.ctx) return;
      var c = this.ctx, a = this.audio;
      this.bus.gain.cancelScheduledValues(c.currentTime);
      this.bus.gain.setTargetAtTime(0, c.currentTime, .35);
      setTimeout(function () { if (!Ses.on) { if (a) { Ses.konum = a.currentTime; a.pause(); } c.suspend(); } }, 1800);
    }
  };

  function sesKur() {
    var b = $('#ses-btn'); if (!b) return;
    var olaylar = ['pointerdown', 'keydown', 'touchend'], bekle = null;
    var birak = function () {
      if (!bekle) return;
      olaylar.forEach(function (t) { d.removeEventListener(t, bekle, true); });
      bekle = null; b.classList.remove('wait');
    };
    var set = function (on) {
      birak();
      b.setAttribute('aria-pressed', on);
      store.set('dm-ses', on ? '1' : '0');
      on ? Ses.start() : Ses.stop();
    };
    Ses.ayarla = set;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      // açılışta çalmayı bekliyorsa tıklama kapatır
      set(bekle ? false : !Ses.on);
    });
    // varsayılan açık: tarayıcılar sesi ilk etkileşime kadar beklettiği için ilk dokunuşta başlar
    if (store.get('dm-ses') !== '0') {
      b.classList.add('wait'); b.setAttribute('aria-pressed', 'true');
      bekle = function (e) {
        if (e.target.closest && e.target.closest('#ses-btn, .intro-ov')) return;
        set(true);
      };
      olaylar.forEach(function (t) { d.addEventListener(t, bekle, true); });
    }
  }

  /* ---------- mozaik geçiş (Studio KO'nun kare kare açılan perdesi) ---------- */
  var Moz = {
    cv: null,
    init: function () {
      var cv = this.cv = d.createElement('canvas'); cv.id = 'mozaik'; cv.setAttribute('aria-hidden', 'true');
      d.body.appendChild(cv);
    },
    run: function (cover, dur) {
      var cv = this.cv, self = this;
      return new Promise(function (res) {
        if (reduce) { cv.classList.toggle('on', cover); var x0 = cv.getContext('2d'); if (cover) { self.size(); x0.fillStyle = self.col(); x0.fillRect(0, 0, cv.width, cv.height); } res(); return; }
        var W = w.innerWidth, H = w.innerHeight, dpr = Math.min(w.devicePixelRatio || 1, 2);
        self.size();
        var x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
        var cols = W < 700 ? 9 : 22, s = Math.ceil(W / cols), rows = Math.ceil(H / s), cells = [];
        for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++)
          cells.push([c * s, r * s, Math.random() * dur * .45, dur * (.25 + Math.random() * .3)]);
        var col = self.col(), t0 = performance.now();
        cv.classList.add('on');
        (function frame(now) {
          var t = now - t0, done = true;
          x.clearRect(0, 0, W, H); x.fillStyle = col;
          for (var i = 0; i < cells.length; i++) {
            var q = cells[i], p = Math.min(1, Math.max(0, (t - q[2]) / q[3]));
            if (p < 1) done = false;
            p = 1 - Math.pow(1 - p, 4);
            x.globalAlpha = cover ? p : 1 - p;
            if (x.globalAlpha > .002) x.fillRect(q[0], q[1], s + .5, s + .5);
          }
          x.globalAlpha = 1;
          if (!done) return requestAnimationFrame(frame);
          if (!cover) cv.classList.remove('on');
          res();
        })(t0);
      });
    },
    size: function () {
      var dpr = Math.min(w.devicePixelRatio || 1, 2);
      this.cv.width = w.innerWidth * dpr; this.cv.height = w.innerHeight * dpr;
    },
    col: function () { return getComputedStyle(h).getPropertyValue('--bg').trim() || '#100E0C'; }
  };

  /* ---------- açılış ---------- */
  function acilis() {
    if (!h.classList.contains('intro')) return;
    var ov = $('.intro-ov'), bitti = false;
    var bitir = function () {
      if (bitti) return; bitti = true;
      try { sessionStorage.setItem('dm-intro', '1'); } catch (e) {}
      Moz.run(true, 1).then(function () {
        h.classList.remove('intro');
        gozle();
        return Moz.run(false, 1500);
      });
    };
    // müzik kapatılmadıysa açılış "Müzikle girin" ile biter: tarayıcılar sesi ancak bir tıklamayla başlatır
    if (store.get('dm-ses') === '0') { ov.addEventListener('click', bitir); setTimeout(bitir, 2900); return; }
    setTimeout(function () { ov.classList.add('gir'); var g = $('.intro-ses', ov); if (g) g.focus({ preventScroll: true }); }, 2600);
    ov.addEventListener('click', function (e) {
      var sessiz = e.target.closest && e.target.closest('.intro-sessiz');
      if (Ses.ayarla) Ses.ayarla(!sessiz);
      bitir();
    });
  }

  /* ---------- görünme, paralaks, kaydırma çizgisi ---------- */
  var io = null, para = [], steps = null;
  function gozle() {
    if (io) io.disconnect();
    var els = $$('#sayfa [data-r]');
    if (!('IntersectionObserver' in w)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .01 });
    els.forEach(function (e) { if (!h.classList.contains('intro')) io.observe(e); });
    para = fine && !reduce ? $$('#sayfa [data-speed]') : [];
    steps = $('#sayfa .steps');
    kaydir();
  }
  var tick = false, sonY = 0;
  function kaydir() {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      tick = false;
      var vh = w.innerHeight, max = d.documentElement.scrollHeight - vh;
      var y = w.scrollY, top = $('.top');
      h.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
      if (top && !h.classList.contains('menu')) {
        top.classList.toggle('solid', y > 40);
        if (Math.abs(y - sonY) > 6) { top.classList.toggle('hide', y > sonY && y > 240); sonY = y; }
      }
      para.forEach(function (el) {
        var r = el.getBoundingClientRect(), mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (mid * parseFloat(el.dataset.speed)).toFixed(1) + 'px,0)';
      });
      if (steps) {
        var sr = steps.getBoundingClientRect(), mob = w.innerWidth <= 860;
        var p = mob ? (vh * .8 - sr.top) / sr.height : (vh * .9 - sr.top) / (vh * .5);
        steps.style.setProperty('--sp', Math.max(0, Math.min(1, p)).toFixed(3));
      }
    });
  }

  /* ---------- kesintisiz sayfa geçişi: ses ve kabuk kalır, içerik değişir ---------- */
  var mesgul = false;
  function yerel(a) {
    if (!a || a.target || a.hasAttribute('download')) return null;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || !/(\/|\.html)$/.test(u.pathname)) return null;
    return u;
  }
  function git(url, push) {
    if (mesgul) return; mesgul = true;
    Ses.whoosh();
    menu(false);
    var sayfa = fetch(url, { headers: { 'X-Requested-With': 'dimart' } }).then(function (r) {
      if (!r.ok && r.status !== 404) throw 0; return r.text();
    });
    Promise.all([sayfa, Moz.run(true, 700)]).then(function (v) {
      degistir(v[0]);
      d.dispatchEvent(new Event('dm-swap'));
      if (push) history.pushState({}, '', url);
      navIsaretle();
      var hash = new URL(url, location.href).hash, hedef = hash && d.getElementById(decodeURIComponent(hash.slice(1)));
      w.scrollTo(0, hedef ? hedef.getBoundingClientRect().top + w.scrollY - 20 : 0);
      gozle();
      mesgul = false;
      return Moz.run(false, 900);
    }).catch(function () { location.href = url; });
  }
  function degistir(html) {
    var yeni = new DOMParser().parseFromString(html, 'text/html');
    var eski = $('#sayfa'), gelen = yeni.getElementById('sayfa');
    if (!gelen) throw 0;
    eski.replaceWith(d.importNode(gelen, true));
    d.title = yeni.title;
    ['meta[name="description"]', 'link[rel="canonical"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'meta[name="robots"]', '#ld'].forEach(function (s) {
      var a = $(s, d.head), b = $(s, yeni.head);
      if (a && b) a.replaceWith(d.importNode(b, true));
      else if (a) a.remove();
      else if (b) d.head.appendChild(d.importNode(b, true));
    });
    var sy = $('#sayfa'); sy.setAttribute('tabindex', '-1');
    sy.focus({ preventScroll: true });
  }
  function navIsaretle() {
    $$('.nav-list a').forEach(function (a) {
      var u = new URL(a.href, location.href);
      if (location.pathname.indexOf(u.pathname) === 0) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* ---------- menü: tam ekran, üzerine gelinen sayfanın çizimi sağda çizilir ---------- */
  function onizle(i) {
    $$('.nav-pv .frame').forEach(function (f, k) {
      f.classList.toggle('on', k === i);
      if (k === i) { f.classList.remove('in'); void f.offsetWidth; f.classList.add('in'); } else f.classList.remove('in');
    });
  }
  function menu(ac) {
    var b = $('#menu-btn'), n = $('#nav'); if (!b) return;
    if (n.classList.contains('open') === ac) return;
    n.classList.toggle('open', ac); h.classList.toggle('menu', ac); b.setAttribute('aria-expanded', ac);
    if (ac) {
      var cur = $('.nav-list a[aria-current]');
      onizle(cur ? +cur.dataset.i : 0);
      $('.top').classList.remove('hide');
    }
  }
  function menuKur() {
    $('#menu-btn').addEventListener('click', function () { menu(!$('#nav').classList.contains('open')); Ses.whoosh(); });
    $$('.nav-list a').forEach(function (a) {
      var i = +a.dataset.i;
      a.addEventListener('pointerenter', function () { onizle(i); });
      a.addEventListener('focus', function () { onizle(i); });
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });
  }

  /* ---------- eskiz: imleç dik açılarla çizer, köşelere kare nokta, uzunluklar ölçü gibi yazılır, çizgiler yavaşça silinir ---------- */
  function eskizKur() {
    var b = $('#eskiz-btn'); if (!b) return;
    var kagit = d.createElement('div'); kagit.id = 'eskiz-kagit'; kagit.setAttribute('aria-hidden', 'true');
    var cv = d.createElement('canvas'); cv.id = 'eskiz'; cv.setAttribute('aria-hidden', 'true');
    d.body.appendChild(kagit); d.body.appendChild(cv);
    var x = cv.getContext('2d'), dpr = 1, W = 0, H = 0, on = false, raf = 0;
    var parca = [], kose = [], alan = [], yol = [], A = null, P = null, yon = null, son = 0;
    var NOTA = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99], ni = 0;
    var nota = function (v) { if (!Ses.on) return; ni = (ni + 1 + Math.floor(Math.random() * 3)) % NOTA.length; Ses.bell(NOTA[ni], 0, v || .012); };
    var tara = d.createElement('canvas'); tara.width = tara.height = 8;
    var tx = tara.getContext('2d'); tx.strokeStyle = 'rgba(242,183,5,.5)'; tx.lineWidth = 1;
    tx.beginPath(); tx.moveTo(0, 8); tx.lineTo(8, 0); tx.moveTo(-2, 2); tx.lineTo(2, -2); tx.moveTo(6, 10); tx.lineTo(10, 6); tx.stroke();
    var desen = null;
    var ipucu = d.createElement('p'); ipucu.className = 'eskiz-ipucu'; ipucu.setAttribute('aria-hidden', 'true');
    ipucu.textContent = 'Fareyle çizin · bir odayı kapatın, alanını ölçelim'; d.body.appendChild(ipucu);
    var OMUR = 3800, SOL = 1600, ESIK = 16, GRID = 24;
    var boyut = function () {
      dpr = Math.min(w.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var yasla = function (v) { return Math.round(v / GRID * 2) * GRID / 2; };
    var olcu = function (l) { return (l / 100).toFixed(2).replace('.', ','); };
    var ekle = function (a, c, t) {
      if (Math.abs(a.x - c.x) + Math.abs(a.y - c.y) < 6) return c;
      var s0 = yol[0];
      // başlangıca dönen çizgi odayı kapatır: tarama, alan ve küçük bir akor
      if (yol.length >= 3 && Math.abs(c.x - s0.x) + Math.abs(c.y - s0.y) < 40) {
        var son2 = yol[yol.length - 1], kap = yon === 'x' ? { x: s0.x, y: son2.y } : { x: son2.x, y: s0.y };
        parca.push({ a: a, b: kap, t: t });
        if (kap.x !== s0.x || kap.y !== s0.y) parca.push({ a: kap, b: s0, t: t });
        var pts = yol.slice(1).concat([kap, s0]).filter(function (p, i, l) { return i === 0 || p.x !== l[i - 1].x || p.y !== l[i - 1].y; });
        var ar = 0, cx = 0, cy = 0;
        pts.forEach(function (p, i) { var q = pts[(i + 1) % pts.length]; ar += p.x * q.y - q.x * p.y; cx += p.x; cy += p.y; });
        ar = Math.abs(ar) / 2;
        if (ar > 2500) {
          alan.push({ pts: [s0].concat(pts), m: ar / 10000, x: cx / pts.length, y: cy / pts.length, t: t });
          if (Ses.on) { Ses.bell(293.66, 0, .016); Ses.bell(440, Ses.ctx.currentTime + .12, .012); Ses.bell(587.33, Ses.ctx.currentTime + .24, .01); }
        }
        kose.push({ x: kap.x, y: kap.y, t: t });
        yol = [s0];
        return s0;
      }
      parca.push({ a: a, b: c, t: t });
      kose.push({ x: c.x, y: c.y, t: t });
      yol.push(c);
      nota();
      return c;
    };
    var hareket = function (e) {
      kagit.style.setProperty('--fx', e.clientX + 'px'); kagit.style.setProperty('--fy', e.clientY + 'px');
      if (!on) return;
      var n = performance.now(), p = { x: e.clientX, y: e.clientY };
      // uzun duraklama ya da sıçrama: yeni bir çizgi başlat
      if (!A || n - son > 900 || Math.abs(p.x - P.x) + Math.abs(p.y - P.y) > 220) { A = { x: yasla(p.x), y: yasla(p.y) }; yon = null; yol = [A]; kose.push({ x: A.x, y: A.y, t: n }); }
      son = n; P = p;
      var dx = p.x - A.x, dy = p.y - A.y;
      if (!yon) { if (Math.max(Math.abs(dx), Math.abs(dy)) > ESIK) yon = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; }
      else if (yon === 'x' && Math.abs(dy) > ESIK * 1.6) { var c = { x: yasla(p.x), y: A.y }; A = ekle(A, c, n); yon = 'y'; }
      else if (yon === 'y' && Math.abs(dx) > ESIK * 1.6) { var c2 = { x: A.x, y: yasla(p.y) }; A = ekle(A, c2, n); yon = 'x'; }
      // imleç başlangıç noktasına geldiyse odayı kendiliğinden kapat
      if (yon && yol.length >= 3) {
        var s0 = yol[0], uc = yon === 'x' ? { x: p.x, y: A.y } : { x: A.x, y: p.y };
        if (Math.abs(uc.x - s0.x) + Math.abs(uc.y - s0.y) < 18) { A = ekle(A, yon === 'x' ? { x: s0.x, y: A.y } : { x: A.x, y: s0.y }, n); yon = null; }
      }
      if (!raf) raf = requestAnimationFrame(ciz);
    };
    var cizgi = function (a, c, al, olc) {
      x.strokeStyle = 'rgba(237,232,224,' + (.6 * al) + ')';
      x.beginPath(); x.moveTo(a.x + .5, a.y + .5); x.lineTo(c.x + .5, c.y + .5); x.stroke();
      var L = Math.abs(c.x - a.x) + Math.abs(c.y - a.y);
      if (!olc || L < 70) return;
      // ölçü çizgisi: kısa uç işaretleri ve ortada uzunluk
      var yat = a.y === c.y, o = 12;
      x.strokeStyle = 'rgba(237,232,224,' + (.28 * al) + ')';
      x.beginPath();
      if (yat) { x.moveTo(a.x + .5, a.y - o - 4); x.lineTo(a.x + .5, a.y - o + 4); x.moveTo(c.x + .5, c.y - o - 4); x.lineTo(c.x + .5, c.y - o + 4); x.moveTo(a.x, a.y - o + .5); x.lineTo(c.x, c.y - o + .5); }
      else { x.moveTo(a.x + o - 4, a.y + .5); x.lineTo(a.x + o + 4, a.y + .5); x.moveTo(c.x + o - 4, c.y + .5); x.lineTo(c.x + o + 4, c.y + .5); x.moveTo(a.x + o + .5, a.y); x.lineTo(c.x + o + .5, c.y); }
      x.stroke();
      x.fillStyle = 'rgba(237,232,224,' + (.55 * al) + ')';
      x.font = '500 9px Montserrat, sans-serif'; x.textAlign = 'center';
      if (yat) x.fillText(olcu(L), (a.x + c.x) / 2, a.y - o - 6);
      else { x.save(); x.translate(a.x + o + 12, (a.y + c.y) / 2); x.rotate(-Math.PI / 2); x.fillText(olcu(L), 0, 0); x.restore(); }
    };
    var ciz = function () {
      raf = 0;
      var n = performance.now(), al = function (t) { var g = n - t; return g < OMUR ? 1 : Math.max(0, 1 - (g - OMUR) / SOL); };
      parca = parca.filter(function (s) { return al(s.t) > 0; });
      kose = kose.filter(function (k) { return al(k.t) > 0; });
      alan = alan.filter(function (k) { return al(k.t) > 0; });
      x.clearRect(0, 0, W, H); x.lineWidth = 1;
      if (!desen) desen = x.createPattern(tara, 'repeat');
      alan.forEach(function (k) {
        var g = n - k.t, a = al(k.t) * Math.min(1, g / 500);
        x.save(); x.globalAlpha = a * .55; x.fillStyle = desen;
        x.beginPath(); k.pts.forEach(function (p, i) { i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y); }); x.closePath(); x.fill();
        x.globalAlpha = a; x.fillStyle = '#F2B705'; x.font = '500 11px Montserrat, sans-serif'; x.textAlign = 'center';
        x.fillText(k.m.toFixed(2).replace('.', ',') + ' m²', k.x, k.y + 4);
        x.restore();
      });
      parca.forEach(function (s) { cizgi(s.a, s.b, al(s.t), true); });
      if (on && A && P && n - son < 900) {
        var uc = yon === 'y' ? { x: A.x, y: P.y } : { x: P.x, y: A.y };
        cizgi(A, uc, 1, true);
        x.fillStyle = 'rgba(242,183,5,.9)'; x.fillRect(uc.x - 1.5, uc.y - 1.5, 4, 4);
      }
      kose.forEach(function (k) { x.fillStyle = 'rgba(242,183,5,' + al(k.t) + ')'; x.fillRect(k.x - 1.5, k.y - 1.5, 4, 4); });
      if (parca.length || kose.length || alan.length || (on && n - son < 900)) raf = requestAnimationFrame(ciz);
    };
    var set = function (v) {
      on = v; h.classList.toggle('eskiz', v); b.setAttribute('aria-pressed', v); store.set('dm-eskiz', v ? '1' : '0');
      if (v) boyut(); A = null;
      clearTimeout(ipucu._t); ipucu.classList.toggle('on', v);
      if (v) ipucu._t = setTimeout(function () { ipucu.classList.remove('on'); }, 4200);
    };
    b.addEventListener('click', function (e) { e.stopPropagation(); set(!on); Ses.tick(); });
    w.addEventListener('resize', function () { if (on) boyut(); });
    d.addEventListener('pointermove', hareket, { passive: true });
    d.addEventListener('dm-swap', function () { A = null; });
    if (store.get('dm-eskiz') === '1' && fine) { set(true); ipucu.classList.remove('on'); }
  }


  /* ---------- imleç ---------- */
  function imlecKur() {
    if (!fine || reduce) return;
    var c = d.createElement('div'); c.className = 'cursor'; c.setAttribute('aria-hidden', 'true');
    var lbl = d.createElement('span'); c.appendChild(lbl); d.body.appendChild(c);
    var x = -100, y = -100, cx = x, cy = y, son = null;
    d.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY; c.classList.add('show');
      var t = e.target.closest && e.target.closest('a,button,summary,[data-cursor]');
      if (t !== son) {
        son = t;
        var label = t && t.getAttribute('data-cursor');
        c.classList.toggle('label', !!label); c.classList.toggle('link', !!t && !label);
        lbl.textContent = label || '';
        if (t) Ses.tick();
      }
    }, { passive: true });
    d.addEventListener('pointerleave', function () { c.classList.remove('show'); });
    d.addEventListener('dm-swap', function () { son = null; c.classList.remove('label', 'link'); lbl.textContent = ''; });
    (function loop() {
      cx += (x - cx) * .22; cy += (y - cy) * .22;
      c.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- başlat ---------- */
  function basla() {
    Moz.init();
    eskizKur();
    imlecKur();
    sesKur();
    var sy = $('#sayfa'); if (sy) sy.setAttribute('tabindex', '-1');
    menuKur();
    d.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a'), u = yerel(a);
      if (!u) return;
      if (u.pathname === location.pathname) {
        e.preventDefault(); menu(false);
        var hedef = u.hash && d.getElementById(decodeURIComponent(u.hash.slice(1)));
        w.scrollTo({ top: hedef ? hedef.getBoundingClientRect().top + w.scrollY - 20 : 0, behavior: reduce ? 'auto' : 'smooth' });
        if (u.hash) history.replaceState({}, '', u.href);
        return;
      }
      e.preventDefault();
      git(u.href, true);
    });
    w.addEventListener('popstate', function () { git(location.href, false); });
    w.addEventListener('scroll', kaydir, { passive: true });
    w.addEventListener('resize', kaydir);
    d.addEventListener('toggle', function (e) { if (e.target.tagName === 'DETAILS') Ses.tick(); }, true);
    gozle();
    acilis();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', basla); else basla();
})();
