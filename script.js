// Dark/Light mode toggle
const modeToggle = document.getElementById('modeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  sunIcon.classList.remove('active-mode');
  moonIcon.classList.add('active-mode');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  sunIcon.classList.add('active-mode');
  moonIcon.classList.remove('active-mode');
}

// Toggle theme
modeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.remove('active-mode');
    moonIcon.classList.add('active-mode');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    sunIcon.classList.add('active-mode');
    moonIcon.classList.remove('active-mode');
  }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real portfolio, this would send an email.');
    contactForm.reset();
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});