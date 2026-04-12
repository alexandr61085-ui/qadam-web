// Smooth scroll fallback for Safari < 15.4 (no native scroll-behavior: smooth)
if (!('scrollBehavior' in document.documentElement.style)) {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// Header scroll effect
const hdr = document.getElementById('header');
window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

// Fade-in on scroll
const obs = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: .12 }
);
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Mobile burger menu — SVG icons rendered via DOM to avoid innerHTML XSS pattern
const toggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

function makeSvg(paths) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '22'); svg.setAttribute('height', '22');
  svg.setAttribute('viewBox', '0 0 22 22'); svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  paths.forEach(d => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
  });
  return svg;
}

const ICON_BURGER = () => makeSvg(['M3 5h16M3 11h16M3 17h16']);
const ICON_CLOSE  = () => makeSvg(['M4 4l14 14M18 4L4 18']);

function setIcon(iconFn) {
  toggle.replaceChildren(iconFn());
}

function closeMenu() {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Открыть меню');
  setIcon(ICON_BURGER);
}

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  setIcon(isOpen ? ICON_CLOSE : ICON_BURGER);
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
