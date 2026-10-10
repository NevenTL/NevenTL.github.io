const d = document.documentElement;
const langBtn = document.querySelector('.lang');
const toggle = document.querySelector('.toggle'), menu = document.getElementById('menu');
const labels = { fr: ['EN', 'Switch to English', 'Ouvrir le menu'], en: ['FR', 'Passer en français', 'Open menu'] };

// Changement de langue FR / EN (choix mémorisé dans le navigateur)
function setLang(l) {
  d.lang = l;
  try { localStorage.setItem('lang', l); } catch (e) {}
  if (langBtn) {
    langBtn.querySelectorAll('span').forEach(s => s.classList.toggle('on', s.dataset.l === l));
    langBtn.setAttribute('aria-label', labels[l][1]);
  }
  if (toggle) toggle.setAttribute('aria-label', labels[l][2]);
  const t = d.dataset[l === 'fr' ? 'titleFr' : 'titleEn'];
  const m = d.dataset[l === 'fr' ? 'descFr' : 'descEn'];
  const meta = document.querySelector('meta[name=description]');
  if (t) document.title = t;
  if (m && meta) meta.content = m;
}
if (langBtn) {
  if (!langBtn.querySelector('span')) langBtn.innerHTML = '<span data-l="fr">FR</span><span data-l="en">EN</span>';
  langBtn.addEventListener('click', () => setLang(d.lang === 'fr' ? 'en' : 'fr'));
  setLang(d.lang === 'en' ? 'en' : 'fr');
}

// Menu hamburger
if (toggle && menu) {
  const setMenu = o => { menu.classList.toggle('open', o); toggle.setAttribute('aria-expanded', o); };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
}

// Apparition douce au scroll (si indisponible, tout reste visible)
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  d.classList.remove('js');
}

// Année du pied de page
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
