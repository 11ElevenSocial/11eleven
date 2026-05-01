// ── SHARED NAV + FOOTER ──────────────────────────────────────────────────────
// Edit SITE_CONFIG to customise every page at once

const SITE_CONFIG = {
  brandName:    "11 ELEVEN SOCIAL",
  tagline:      "Creative Marketing Agency",
  email:        "sales@11elevensocial.in",
  instagram:    "@11eleven.social",
  tiktok:       "@11elevensocial",
  linkedin:     "11elevensocial",
  location:     "Based in Delhi · Servicable Worldwide",
};

const NAV_LINKS = [
  { label: "About Me",      href: "index.html"       },
  { label: "Past Clients",  href: "clients.html"     },
  { label: "Our Work",       href: "content.html"     },
  { label: "Productions",   href: "hospitality.html" },
  { label: "Services",      href: "services.html"    },
  { label: "Testimonial",      href: "feedback.html"    },
  { label: "Get Quote",       href: "contact.html"     },
];

function injectNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  const html = `
  <nav class="site-nav" id="siteNav">
    <div class="nav-inner">
      <a class="nav-brand" href="index.html">${SITE_CONFIG.brandName}</a>
      <ul class="nav-list">
        ${NAV_LINKS.map(l => `
          <li><a href="${l.href}" class="${current === l.href ? 'active' : ''}">${l.label}</a></li>
        `).join('')}
      </ul>
      <button class="nav-burger" id="navBurger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="navMobile">
      ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
    </div>
  </nav>`;
  document.body.insertAdjacentHTML('afterbegin', html);

  // Burger toggle
  document.getElementById('navBurger').addEventListener('click', () => {
    document.getElementById('navMobile').classList.toggle('open');
  });

  // Scroll shade
  window.addEventListener('scroll', () => {
    document.getElementById('siteNav').classList.toggle('scrolled', scrollY > 10);
  }, { passive: true });
}

function injectFooter() {
  const html = `
  <footer class="site-footer">
    <p class="footer-brand">${SITE_CONFIG.brandName}</p>
    <p class="footer-sub">${SITE_CONFIG.tagline}</p>
    <div class="footer-links">
      <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
      <span>·</span>
      <a href="contact.html">Get in Touch</a>
    </div>
    <p class="footer-copy">© ${new Date().getFullYear()} ${SITE_CONFIG.brandName}. All rights reserved.</p>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
});
