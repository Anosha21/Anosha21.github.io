/* ═══════════════════════════════════════════════════════════
   script.js — Anosha Pervaiz Awan | Software Engineer Portfolio
   Enhanced with: Theme Toggle, Mobile Menu, Scroll Reveal, 
   Active Nav Links, Smooth Scroll, Dynamic Elements
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 1. DOM ELEMENTS
  // ═══════════════════════════════════════════════════════════
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('modeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section');
  const header = document.getElementById('header');
  const revealElements = document.querySelectorAll('.reveal');
  const allLinks = document.querySelectorAll('a[href^="#"]');
  const contactForm = document.getElementById('contactForm');

  // ═══════════════════════════════════════════════════════════
  // 2. THEME / DARK MODE (Enhanced)
  // ═══════════════════════════════════════════════════════════
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }

  function setDarkMode() {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (sunIcon && moonIcon) {
      sunIcon.classList.remove('active-icon');
      moonIcon.classList.add('active-icon');
    }
  }

  function setLightMode() {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (sunIcon && moonIcon) {
      sunIcon.classList.add('active-icon');
      moonIcon.classList.remove('active-icon');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. MOBILE MENU
  // ═══════════════════════════════════════════════════════════
  function openMobileMenu() {
    if (mobileNav) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ═══════════════════════════════════════════════════════════
  // 4. SMOOTH SCROLLING (Enhanced)
  // ═══════════════════════════════════════════════════════════
  function smoothScroll(targetElement, offset = 70) {
    if (!targetElement) return;
    
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#" or empty
      if (!href || href === '#' || href === '#0') return;
      
      // Skip external links that start with http or different protocol
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      
      // Skip if target is not an internal section
      if (!href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        closeMobileMenu(); // Close mobile menu if open
        smoothScroll(targetElement);
        
        // Update URL without causing jump (optional)
        history.pushState(null, null, href);
      }
    });
  });

  // ═══════════════════════════════════════════════════════════
  // 5. ACTIVE NAVIGATION LINK ON SCROLL
  // ═══════════════════════════════════════════════════════════
  function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href && href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 6. SCROLL REVEAL ANIMATION
  // ═══════════════════════════════════════════════════════════
  function checkRevealElements() {
    const windowHeight = window.innerHeight;
    const revealThreshold = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealThreshold) {
        element.classList.add('visible');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 7. HEADER BACKGROUND ON SCROLL
  // ═══════════════════════════════════════════════════════════
  function updateHeaderStyle() {
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.style.background = 'rgba(253, 252, 255, 0.95)';
      if (htmlElement.getAttribute('data-theme') === 'dark') {
        header.style.background = 'rgba(14, 10, 26, 0.95)';
      }
      header.style.backdropFilter = 'blur(20px) saturate(1.8)';
    } else {
      header.style.background = '';
      header.style.backdropFilter = '';
    }
  }

  // Update header style based on theme change
  function updateHeaderStyleForTheme() {
    if (window.scrollY > 50) {
      if (htmlElement.getAttribute('data-theme') === 'dark') {
        header.style.background = 'rgba(14, 10, 26, 0.95)';
      } else {
        header.style.background = 'rgba(253, 252, 255, 0.95)';
      }
    } else {
      header.style.background = '';
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 8. FLOATING ANIMATION RESET (Performance)
  // ═══════════════════════════════════════════════════════════
  let ticking = false;
  
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavLink();
        checkRevealElements();
        updateHeaderStyle();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 9. CONTACT FORM HANDLING (if exists)
  // ═══════════════════════════════════════════════════════════
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const message = formData.get('message') || '';
      
      // Show beautiful alert message
      const alertMessage = document.createElement('div');
      alertMessage.textContent = '✨ Thank you for your message! I\'ll get back to you soon. ✨';
      alertMessage.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: slideUp 0.3s ease;
      `;
      
      document.body.appendChild(alertMessage);
      
      setTimeout(() => {
        alertMessage.style.opacity = '0';
        alertMessage.style.transition = 'opacity 0.3s ease';
        setTimeout(() => alertMessage.remove(), 300);
      }, 3000);
      
      contactForm.reset();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 10. RESIZE HANDLER (For responsive adjustments)
  // ═══════════════════════════════════════════════════════════
  let resizeTimer;
  
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-check reveal elements on resize
      checkRevealElements();
      // Close mobile menu if open on resize (better UX)
      if (window.innerWidth > 900 && mobileNav && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    }, 150);
  }

  // ═══════════════════════════════════════════════════════════
  // 11. INITIAL LOAD
  // ═══════════════════════════════════════════════════════════
  function init() {
    // Initialize theme
    initTheme();
    
    // Update header style for initial theme
    updateHeaderStyleForTheme();
    
    // Initial checks
    checkRevealElements();
    updateActiveNavLink();
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Listen for theme changes to update header style
    const observer = new MutationObserver(() => {
      updateHeaderStyleForTheme();
    });
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Optional: Add animation to hero elements after load
    setTimeout(() => {
      const heroLeft = document.querySelector('.hero-content');
      const heroRight = document.querySelector('.hero-graphic');
      if (heroLeft) heroLeft.style.animation = 'fadeInLeft 0.9s ease-out forwards';
      if (heroRight) heroRight.style.animation = 'fadeInRight 0.9s ease-out forwards';
    }, 100);
  }

  // Start everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ═══════════════════════════════════════════════════════════
// 12. ADDITIONAL UTILITIES (Global helpers - optional)
// ═══════════════════════════════════════════════════════════

// Smooth scroll helper (exposed globally if needed)
window.smoothScrollTo = function(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const offset = 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

// Small CSS animation keyframes (in case they don't exist in CSS)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);