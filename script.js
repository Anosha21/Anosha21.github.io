/* ═══════════════════════════════════════════════════════════
   script.js — Anosha Pervaiz Awan | Software Engineer Portfolio
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════
   1. THEME TOGGLE
   ════════════════════════════════ */
const html       = document.documentElement;
const themeToggle = document.getElementById('modeToggle');
const sunIcon    = document.getElementById('sunIcon');
const moonIcon   = document.getElementById('moonIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    sunIcon?.classList.remove('active-icon');
    moonIcon?.classList.add('active-icon');
  } else {
    moonIcon?.classList.remove('active-icon');
    sunIcon?.classList.add('active-icon');
  }
}

// On load: respect saved preference, then system preference, default light
const savedTheme   = localStorage.getItem('theme');
const systemDark   = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});


/* ════════════════════════════════
   2. MOBILE NAV
   ════════════════════════════════ */
const hamburger      = document.getElementById('hamburger');
const mobileNav      = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() {
  mobileNav?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMobileNav);
mobileNavClose?.addEventListener('click', closeMobileNav);

// Close on backdrop click
mobileNav?.addEventListener('click', (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// Close on resize past breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileNav();
}, { passive: true });

// Close when any mobile link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link =>
  link.addEventListener('click', closeMobileNav)
);


/* ════════════════════════════════
   3. SMOOTH SCROLL
   ════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    closeMobileNav();

    const navH = parseInt(
      getComputedStyle(html).getPropertyValue('--nav-h') || '68'
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });

    // Update URL cleanly
    history.pushState(null, '', href);
  });
});


/* ════════════════════════════════
   4. ACTIVE NAV LINK ON SCROLL
   ════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 140;
  let current   = '';

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
  });
}


/* ════════════════════════════════
   5. HEADER SHADOW ON SCROLL
   ════════════════════════════════ */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  const scrolled = window.scrollY > 50;
  const isDark   = html.getAttribute('data-theme') === 'dark';

  header.style.boxShadow = scrolled
    ? '0 4px 30px rgba(124, 58, 237, 0.08)'
    : 'none';

  if (scrolled) {
    header.style.background = isDark
      ? 'rgba(14, 10, 26, 0.96)'
      : 'rgba(253, 252, 255, 0.96)';
  } else {
    header.style.background = '';
  }
}

// Re-apply header style when theme changes
new MutationObserver(updateHeader)
  .observe(html, { attributes: true, attributeFilter: ['data-theme'] });


/* ════════════════════════════════
   6. SCROLL REVEAL (staggered)
   ════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Stagger siblings within the same parent grid
    const siblings = [...entry.target.parentElement.children];
    const idx      = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 90}ms`;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ════════════════════════════════
   7. SCROLL HANDLER (throttled)
   ════════════════════════════════ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveNav();
      updateHeader();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Run once on load
updateActiveNav();
updateHeader();


/* ════════════════════════════════
   8. INTEREST CHIP HOVER RIPPLE
   ════════════════════════════════ */
document.querySelectorAll('.interest-chip, .skill-chip').forEach(chip => {
  chip.addEventListener('click', (e) => {
    const rect   = chip.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top  - size / 2}px;
      background: currentColor;
      opacity: 0.18;
      transform: scale(0);
      animation: ripple 0.5s ease-out forwards;
      pointer-events: none;
    `;

    chip.style.position = 'relative';
    chip.style.overflow = 'hidden';
    chip.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});


/* ════════════════════════════════
   9. PROJECT CARD TILT
   ════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const dx    = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy    = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    card.style.transform  = `perspective(900px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateY(-5px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s ease';
  });
});


/* ════════════════════════════════
   10. CONTACT ITEM COPY TO CLIPBOARD
   ════════════════════════════════ */
document.querySelectorAll('.contact-item').forEach(item => {
  const val  = item.querySelector('.contact-val');
  const href = item.getAttribute('href') || '';

  if (!val) return;

  // Only attach copy for email and phone
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    item.addEventListener('click', (e) => {
      const text = val.textContent.trim();
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text)
          .then(() => showToast(`Copied: ${text}`))
          .catch(() => {});
      }
    });
  }
});


/* ════════════════════════════════
   11. TOAST NOTIFICATION
   ════════════════════════════════ */
function showToast(msg) {
  document.querySelector('.portfolio-toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'portfolio-toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem; left: 50%;
    transform: translateX(-50%) translateY(16px);
    background: var(--bg-card);
    color: var(--accent);
    font-family: var(--font-mono, monospace);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    border: 1px solid var(--border-strong, #c4b5fd);
    box-shadow: 0 8px 30px rgba(124,58,237,0.15);
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}


/* ════════════════════════════════
   12. SECURE EXTERNAL LINKS
   ════════════════════════════════ */
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});


/* ════════════════════════════════
   13. INJECT KEYFRAMES
   ════════════════════════════════ */
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;
document.head.appendChild(style);


/* ════════════════════════════════
   14. CONSOLE GREETING
   ════════════════════════════════ */
console.log(
  '%canosha.dev%c Portfolio Loaded ✨',
  'color:#7c3aed;font-family:monospace;font-size:1.1rem;font-weight:bold;',
  'color:#db2777;font-family:monospace;font-size:1rem;'
);
console.log(
  '%c> Anosha Pervaiz Awan\n> Software Engineering @ Riphah International University\n> Mobile Dev · Frontend · UI/UX · AI Apps',
  'color:#9488b0;font-family:monospace;font-size:0.85rem;'
);
