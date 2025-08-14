// Helpers
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// Theme persistence
const THEME_KEY = 'jo.theme';
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const html = document.documentElement;
  if (theme === 'system') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
  if (saved) {
    setTheme(saved);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// Fade-in reveal using IntersectionObserver
function initFadeReveal() {
  const elements = $$('.fade-reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

// Parallax effect for hero layers
function initParallax() {
  const layers = $$('.parallax .layer');
  if (layers.length === 0) return;

  let ticking = false;
  function updateParallax(scrollY) {
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallaxSpeed || '0.2');
      const translateY = Math.round(scrollY * speed);
      layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax(window.scrollY || window.pageYOffset);
        ticking = false;
      });
      ticking = true;
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile nav toggle
function initNavToggle() {
  const nav = $('.site-nav');
  const toggle = $('.nav-toggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-expanded', String(!expanded));
  });
}

// Theme buttons
function initThemeButtons() {
  $$('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });
}

// Footer year
function initYear() {
  const yearSpan = $('#year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// Prevent default form submission for demo
function initForm() {
  const form = $('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    console.log('Contact form submission:', payload);
    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Sent ✔';
    setTimeout(() => (form.querySelector('button[type="submit"]').textContent = 'Send'), 1600);
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeButtons();
  initFadeReveal();
  initParallax();
  initNavToggle();
  initYear();
});


