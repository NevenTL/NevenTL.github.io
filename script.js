// Menu hamburger
const t = document.querySelector('.toggle'), m = document.getElementById('menu');
const setMenu = o => { m.classList.toggle('open', o); t.setAttribute('aria-expanded', o); };
t.addEventListener('click', () => setMenu(!m.classList.contains('open')));
m.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

// Apparition douce au scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Année du pied de page
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
