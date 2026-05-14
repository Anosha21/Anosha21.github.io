/* ═══════════════════════════════════════════════════════════
   script.js — Anosha Pervaiz Awan | Software Engineer Portfolio
   Enhanced with: Theme Toggle, Mobile Menu, Scroll Reveal, 
   Active Nav Links, Smooth Scroll, Dynamic Elements,
   Certificate Modal & Interactions
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

  // Certificate Modal Elements
  const certModal = document.getElementById('certModal');
  const modalCertImage = document.getElementById('modalCertImage');
  const closeModalBtn = document.querySelector('.close-modal');

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
  // 8. CERTIFICATE MODAL FUNCTIONALITY
  // ═══════════════════════════════════════════════════════════
  
  // Function to show certificate modal with image
  window.showCertModal = function(buttonElement) {
    if (!certModal || !modalCertImage) return;
    
    // Find the parent cert-card
    const certCard = buttonElement.closest('.cert-card');
    if (!certCard) return;
    
    // Get the image URL from data attribute
    let imgUrl = certCard.getAttribute('data-cert-img');
    
    // Fallback images based on certificate type if no data attribute
    if (!imgUrl) {
      const certTitle = certCard.querySelector('h3')?.innerText || '';
      if (certTitle.includes('Mobile App Development')) {
        imgUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23fef5ea'/%3E%3Ctext x='50%25' y='45%25' font-size='28' font-family='Georgia' text-anchor='middle' fill='%23b45f2b'%3ECERTIFICATE OF ACHIEVEMENT%3C/text%3E%3Ctext x='50%25' y='55%25' font-size='20' font-family='sans-serif' text-anchor='middle' fill='%234a3b2c'%3EAnosha Pervaiz Awan%3C/text%3E%3Ctext x='50%25' y='68%25' font-size='14' text-anchor='middle' fill='%23665442'%3EMobile App Development · DevelopersHub Corporation%3C/text%3E%3Ctext x='50%25' y='78%25' font-size='12' text-anchor='middle' fill='%23876b56'%3EMarch 10, 2026 – April 25, 2026%3C/text%3E%3C/svg%3E";
      } else if (certTitle.includes('AI Fundamentals')) {
        imgUrl = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format";
      } else {
        imgUrl = "https://cdn.dribbble.com/users/1512216/screenshots/6651159/media/78f29e1668a65affefe3473061cb7c91.png?resize=400x300&vertical=center";
      }
    }
    
    modalCertImage.src = imgUrl;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };
  
  // Function to close certificate modal
  window.closeCertModal = function() {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  
  // Close modal when clicking on the close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCertModal);
  }
  
  // Close modal when clicking outside the modal content
  if (certModal) {
    certModal.addEventListener('click', function(e) {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });
  
  // Initialize all certificate view buttons
  function initCertificateButtons() {
    const certButtons = document.querySelectorAll('.btn-view-cert');
    certButtons.forEach(button => {
      // Remove any existing listeners by cloning and replacing
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      newButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.showCertModal(this);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 9. FLOATING ANIMATION RESET (Performance)
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
  // 10. CONTACT FORM HANDLING (if exists)
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
  // 11. RESIZE HANDLER (For responsive adjustments)
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
      // Re-initialize certificate buttons after potential DOM changes
      initCertificateButtons();
    }, 150);
  }

  // ═══════════════════════════════════════════════════════════
  // 12. INITIAL LOAD
  // ═══════════════════════════════════════════════════════════
  function init() {
    // Initialize theme
    initTheme();
    
    // Update header style for initial theme
    updateHeaderStyleForTheme();
    
    // Initial checks
    checkRevealElements();
    updateActiveNavLink();
    
    // Initialize certificate modal buttons
    initCertificateButtons();
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Listen for theme changes to update header style
    const observer = new MutationObserver(() => {
      updateHeaderStyleForTheme();
    });
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Re-run certificate button init when DOM changes (for dynamic content)
    const domObserver = new MutationObserver(() => {
      initCertificateButtons();
    });
    domObserver.observe(document.body, { childList: true, subtree: true });
    
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
// 13. ADDITIONAL UTILITIES (Global helpers - optional)
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
  
  /* Additional animation for certificate cards */
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .cert-card {
    animation: fadeInScale 0.5s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);
