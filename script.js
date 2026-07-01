/* ===== Studio Rise — interacties ===== */

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: solide achtergrond bij scrollen
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobiel menu
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
navMobile.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Scroll-reveal via IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // kleine getrapte vertraging voor items in dezelfde groep
      e.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Subtiele parallax op de hero-zon
const sun = document.querySelector('.hero__sun');
if (sun && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      sun.style.transform = `translateY(${y * 0.18}px)`;
    }
  }, { passive: true });
}
