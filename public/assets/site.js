/* Dimart Mimarlık · etkileşimler: açılış, mozaik geçiş, kesintisiz sayfa geçişi, fener, ortam sesi, imleç, görünme ve paralaks. */
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

  /* ---------- ortam sesi (Web Audio ile üretilir, dosya indirmez) ---------- */
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
      var pad = c.createGain(); pad.gain.value = .9;
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
      return true;
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
    chimes: function () {
      var self = this, notes = [587.33, 659.25, 739.99, 880, 987.77, 1174.66];
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (!self.on) return;
        self.bell(notes[Math.floor(Math.random() * notes.length)], 0, .03);
        if (Math.random() < .4) self.bell(notes[Math.floor(Math.random() * notes.length)], self.ctx.currentTime + .7, .02);
        self.chimes();
      }, 7000 + Math.random() * 9000);
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
      this.bell(587.33, c.currentTime + .1, .04); this.bell(880, c.currentTime + .5, .03); this.bell(1174.66, c.currentTime + .9, .02);
      this.chimes();
    },
    stop: function () {
      this.on = false; clearTimeout(this.timer);
      if (!this.ctx) return;
      var c = this.ctx;
      this.bus.gain.cancelScheduledValues(c.currentTime);
      this.bus.gain.setTargetAtTime(0, c.currentTime, .35);
      setTimeout(function () { if (!Ses.on) c.suspend(); }, 1800);
    }
  };

  function sesKur() {
    var b = $('#ses-btn'); if (!b) return;
    var set = function (on) {
      b.setAttribute('aria-pressed', on); b.classList.remove('wait');
      store.set('dm-ses', on ? '1' : '0');
      on ? Ses.start() : Ses.stop();
    };
    b.addEventListener('click', function (e) { e.stopPropagation(); set(!Ses.on); });
    // önceki ziyarette açıksa, tarayıcı izin verdiği ilk etkileşimde yeniden başlat
    if (store.get('dm-ses') === '1') {
      b.classList.add('wait');
      var go = function (e) {
        if (e.target.closest && e.target.closest('#ses-btn')) return;
        ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) { d.removeEventListener(t, go, true); });
        set(true);
      };
      ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) { d.addEventListener(t, go, true); });
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
    ov.addEventListener('click', bitir);
    setTimeout(bitir, 2900);
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

  /* ---------- fener ---------- */
  function fenerKur() {
    var f = d.createElement('div'); f.id = 'fener'; f.setAttribute('aria-hidden', 'true'); d.body.appendChild(f);
    var b = $('#fener-btn');
    var set = function (on) { h.classList.toggle('fener', on); b.setAttribute('aria-pressed', on); store.set('dm-fener', on ? '1' : '0'); };
    b.addEventListener('click', function () { set(!h.classList.contains('fener')); Ses.tick(); });
    if (store.get('dm-fener') === '1' && fine) set(true);
    d.addEventListener('pointermove', function (e) {
      f.style.setProperty('--fx', e.clientX + 'px'); f.style.setProperty('--fy', e.clientY + 'px');
    }, { passive: true });
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
    fenerKur();
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
