/* ============================================================
   11ELEVEN SOCIAL — main.js
   Page loader · Scroll reveal · Counters · Form
   ============================================================ */

/* ─── PAGE LOADER ─────────────────────────────────────── */
(function () {
  const loader = document.createElement('div');
  loader.id = 'pageLoader';
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-logo">11<span>ELEVEN</span><br/>SOCIAL</div>
      <div class="loader-bar"><div class="loader-fill"></div></div>
    </div>`;
  document.body.appendChild(loader);

  const style = document.createElement('style');
  style.textContent = `
    #pageLoader {
      position: fixed; inset: 0; z-index: 9999;
      background: var(--pink-bg);
      display: flex; align-items: center; justify-content: center;
      transition: opacity .5s ease, visibility .5s ease;
    }
    #pageLoader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .loader-inner { text-align: center; }
    .loader-logo {
      font-family: var(--font-display);
      font-size: 28px; font-style: italic; font-weight: 700;
      color: var(--rose); line-height: 1.1; margin-bottom: 24px;
      animation: loaderPulse 1.2s ease-in-out infinite alternate;
    }
    .loader-logo span { color: var(--rose-dark); }
    .loader-bar {
      width: 180px; height: 2px;
      background: rgba(180,50,58,.15);
      border-radius: 2px; overflow: hidden; margin: 0 auto;
    }
    .loader-fill {
      height: 100%; width: 0%; background: var(--rose);
      border-radius: 2px;
      animation: loaderProgress 0.9s cubic-bezier(.4,0,.2,1) forwards;
    }
    @keyframes loaderPulse {
      from { opacity: .6; transform: scale(.98); }
      to   { opacity: 1;  transform: scale(1);   }
    }
    @keyframes loaderProgress {
      0%   { width: 0%; }
      60%  { width: 75%; }
      100% { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  function hide() {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 950);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 950));
  }
})();

/* ─── PAGE TRANSITION (link clicks) ──────────────────── */
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'pageTransition';
  const s = document.createElement('style');
  s.textContent = `
    #pageTransition {
      position: fixed; inset: 0; z-index: 9998;
      background: var(--rose);
      transform: scaleX(0); transform-origin: left;
      transition: transform .35s cubic-bezier(.76,0,.24,1);
      pointer-events: none;
    }
    #pageTransition.in  { transform: scaleX(1); transform-origin: left; }
    #pageTransition.out { transform: scaleX(0); transform-origin: right; }
  `;
  document.head.appendChild(s);
  document.body.appendChild(overlay);

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || a.target === '_blank') return;
    e.preventDefault();
    overlay.className = 'in';
    setTimeout(() => { window.location.href = href; }, 360);
  });

  window.addEventListener('pageshow', () => {
    overlay.className = 'out';
  });
})();

/* ─── SCROLL REVEAL ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('on'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

/* ─── ANIMATED COUNTERS ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      if (isNaN(target)) return;
      const isFloat = String(target).includes('.');
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = isFloat
          ? (ease * target).toFixed(1)
          : Math.round(ease * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      }
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
});

/* ─── CONTACT FORM ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        // animate in
        success.style.opacity = '0';
        success.style.transition = 'opacity .4s';
        requestAnimationFrame(() => { success.style.opacity = '1'; });
      }
      form.reset();
    }, 1400);
  });
});

/* ─── ACTIVE NAV LINK HIGHLIGHT ───────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
  const links = document.querySelectorAll('.nav-list a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 100) cur = s.id;
    });
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      l.classList.toggle('active', href.endsWith(`#${cur}`));
    });
  }, { passive: true });
});
