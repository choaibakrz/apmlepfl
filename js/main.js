// === THEME TOGGLE ===
// (Initial theme is set inline in <head> to avoid flash of wrong theme.)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('apml-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('apml-theme', 'light');
      }
    });
  }

  // === MOBILE NAV BURGER ===
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    const closeMenu = () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('active', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
    // close when resizing back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) closeMenu();
    });
  }
});

const members = [
  { name:"Salma El Yadouni", role:"Présidente", pole:"executif", initials:"SE" },
  { name:"Nafissa Bahbouhi", role:"Vice-Présidente", pole:"executif", initials:"NB" },
  { name:"Rinas Nejjari", role:"Trésorier", pole:"executif", initials:"RN" },
  { name:"Ilias Jari", role:"Secrétaire Général", pole:"executif", initials:"IJ" },
  { name:"Maroua El Azhari", role:"Resp. Communication", pole:"communication", initials:"MA" },
  { name:"Ismail Merroun", role:"Pôle Communication", pole:"communication", initials:"IM" },
  { name:"Ayoub El Yakoubi", role:"Pôle Communication", pole:"communication", initials:"AY" },
  { name:"Samia Labdidi", role:"Pôle Communication", pole:"communication", initials:"SL" },
  { name:"Zineb Kebdani", role:"Resp. Événementiel", pole:"evenement", initials:"ZK" },
  { name:"Ali Bendaoud", role:"Pôle Événement", pole:"evenement", initials:"AB" },
  { name:"Selma Mkinsi", role:"Pôle Événement", pole:"evenement", initials:"SM" },
  { name:"Sara Oubarka", role:"Pôle Événement", pole:"evenement", initials:"SO" },
  { name:"Adnan Sekkal", role:"Resp. Sponsoring", pole:"sponsoring", initials:"AS" },
  { name:"Ismail Moudden", role:"Pôle Sponsoring", pole:"sponsoring", initials:"IM" },
  { name:"Amine Benbouya", role:"Pôle Sponsoring", pole:"sponsoring", initials:"AB" },
  { name:"Choaib Akile Razzaq", role:"Pôle Sponsoring", pole:"sponsoring", initials:"CR" },
];

const poleLabels = { executif:"Exécutif", communication:"Communication", evenement:"Événement", sponsoring:"Sponsoring" };
const poleColors = { executif:"#c1121f", communication:"#2d6a4f", evenement:"#7b5ea7", sponsoring:"#1a6fa3" };

function renderMembers(filter) {
  const grid = document.getElementById('poleGrid');
  const filtered = filter === 'all' ? members : members.filter(m => m.pole === filter);
  grid.innerHTML = filtered.map(m => `
    <div class="member-card">
      <div class="member-avatar" style="background:linear-gradient(135deg,${poleColors[m.pole]},${poleColors[m.pole]}88)">${m.initials}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role}</div>
      <div class="member-pole-badge" style="background:${poleColors[m.pole]}22;color:${poleColors[m.pole]}">${poleLabels[m.pole]}</div>
    </div>
  `).join('');
}

function filterPole(evt, pole) {
  document.querySelectorAll('.pole-tab').forEach(t => t.classList.remove('active'));
  const btn = (evt && evt.target && evt.target.closest) ? evt.target.closest('.pole-tab') : null;
  if (btn) btn.classList.add('active');
  renderMembers(pole);
}

renderMembers('all');

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:0.1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));