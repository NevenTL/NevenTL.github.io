const d = document.documentElement;

// Changement de langue FR / EN (choix mémorisé dans le navigateur)
const langBtn = document.querySelector('.lang');
const toggle = document.querySelector('.toggle'), menu = document.getElementById('menu');
const labels = { fr: ['EN', 'Switch to English', 'Ouvrir le menu'], en: ['FR', 'Passer en français', 'Open menu'] };

function setLang(l) {
  d.lang = l;
  try { localStorage.setItem('lang', l); } catch (e) {}
  langBtn.textContent = labels[l][0];
  langBtn.setAttribute('aria-label', labels[l][1]);
  toggle.setAttribute('aria-label', labels[l][2]);
  document.title = d.dataset[l === 'fr' ? 'titleFr' : 'titleEn'];
  document.querySelector('meta[name=description]').content = d.dataset[l === 'fr' ? 'descFr' : 'descEn'];
}
langBtn.addEventListener('click', () => setLang(d.lang === 'fr' ? 'en' : 'fr'));
setLang(d.lang);

// Menu hamburger
const setMenu = o => { menu.classList.toggle('open', o); toggle.setAttribute('aria-expanded', o); };
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

// Apparition douce au scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Année du pied de page
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
