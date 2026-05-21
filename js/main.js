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

// Données issues de l'annuaire public people.epfl.ch.
// "classe" = section + semestre. "tel" laissé vide (non public sur l'annuaire) :
// à compléter manuellement uniquement avec l'accord de la personne.
// Les 4 membres sans email n'ont pas de fiche publique trouvée — à compléter à la main.
const members = [
  { name:"Salma El Yadouni", role:"Présidente", pole:"executif", initials:"SE", classe:"Systèmes de communication — Master 1", email:"salma.elyadouni@epfl.ch", tel:"" },
  { name:"Nafissa Bahbouhi", role:"Vice-Présidente", pole:"executif", initials:"NB", classe:"Physique — Bachelor 3", email:"nafissa.bahbouhi@epfl.ch", tel:"" },
  { name:"Rinas Nejjari", role:"Trésorier", pole:"executif", initials:"RN", classe:"Mathématiques — Bachelor 4", email:"rinas.nejjari@epfl.ch", tel:"" },
  { name:"Ilias Jari", role:"Secrétaire Général", pole:"executif", initials:"IJ", classe:"Génie civil — Bachelor 6", email:"mohamed.jari@epfl.ch", tel:"" },
  { name:"Maroua El Azhari", role:"Resp. Communication", pole:"communication", initials:"MA", classe:"", email:"", tel:"" },
  { name:"Ismail Merroun", role:"Pôle Communication", pole:"communication", initials:"IM", classe:"Informatique — Bachelor 1", email:"ismail.merroun@epfl.ch", tel:"" },
  { name:"Ayoub El Yakoubi", role:"Pôle Communication", pole:"communication", initials:"AY", classe:"Informatique — Bachelor", email:"ayoub.elyakoubi@epfl.ch", tel:"" },
  { name:"Samia Labdidi", role:"Pôle Communication", pole:"communication", initials:"SL", classe:"", email:"", tel:"" },
  { name:"Zineb Kebdani", role:"Resp. Événementiel", pole:"evenement", initials:"ZK", classe:"Cours de mathématiques spéciales (CMS)", email:"zineb.kebdani@epfl.ch", tel:"" },
  { name:"Ali Bendaoud", role:"Pôle Événement", pole:"evenement", initials:"AB", classe:"Systèmes de communication — Bachelor 5", email:"ali.bendaoud@epfl.ch", tel:"" },
  { name:"Selma Mkinsi", role:"Pôle Événement", pole:"evenement", initials:"SM", classe:"Génie civil — Bachelor 5", email:"selma.mkinsi@epfl.ch", tel:"" },
  { name:"Sara Oubarka", role:"Pôle Événement", pole:"evenement", initials:"SO", classe:"", email:"", tel:"" },
  { name:"Adnan Sekkal", role:"Resp. Sponsoring", pole:"sponsoring", initials:"AS", classe:"", email:"", tel:"" },
  { name:"Ismail Moudden", role:"Pôle Sponsoring", pole:"sponsoring", initials:"IM", classe:"Systèmes de communication — Bachelor 6", email:"ismail.moudden@epfl.ch", tel:"" },
  { name:"Amine Benbouya", role:"Pôle Sponsoring", pole:"sponsoring", initials:"AB", classe:"", email:"mohammed.benbouya@epfl.ch", tel:"" },
  { name:"Choaib Akile Razzaq", role:"Pôle Sponsoring", pole:"sponsoring", initials:"CR", classe:"Informatique — Bachelor 3", email:"choaib.akilerazzaq@epfl.ch", tel:"" },
];

const poleLabels = { executif:"Exécutif", communication:"Communication", evenement:"Événement", sponsoring:"Sponsoring" };
const poleColors = { executif:"#c1121f", communication:"#2d6a4f", evenement:"#7b5ea7", sponsoring:"#1a6fa3" };

function renderMembers(filter) {
  const grid = document.getElementById('poleGrid');
  const filtered = filter === 'all' ? members : members.filter(m => m.pole === filter);
  grid.innerHTML = filtered.map(m => {
    // index réel dans le tableau "members" (et non dans la liste filtrée)
    const idx = members.indexOf(m);
    return `
    <div class="member-card" role="button" tabindex="0"
         onclick="openMember(${idx})"
         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openMember(${idx});}">
      <div class="member-avatar" style="background:linear-gradient(135deg,${poleColors[m.pole]},${poleColors[m.pole]}88)">${m.initials}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role}</div>
      <div class="member-pole-badge" style="background:${poleColors[m.pole]}22;color:${poleColors[m.pole]}">${poleLabels[m.pole]}</div>
    </div>
  `;
  }).join('');
}

// === FICHE MEMBRE (MODALE) ===
function openMember(i) {
  const m = members[i];
  if (!m) return;

  const modal = document.getElementById('memberModal');
  const color = poleColors[m.pole];

  // Avatar (initiales) + couleur du pôle
  const avatar = document.getElementById('mmAvatar');
  avatar.textContent = m.initials;
  avatar.style.background = `linear-gradient(135deg,${color},${color}88)`;

  document.getElementById('mmName').textContent = m.name;
  document.getElementById('mmRole').textContent = m.role;

  const badge = document.getElementById('mmBadge');
  badge.textContent = poleLabels[m.pole];
  badge.style.background = color + '22';
  badge.style.color = color;

  // Classe actuelle
  document.getElementById('mmClasse').textContent = m.classe ? m.classe : '—';

  // Email : cliquable seulement si renseigné
  const email = document.getElementById('mmEmail');
  if (m.email) {
    email.textContent = m.email;
    email.href = 'mailto:' + m.email;
    email.classList.remove('mm-empty');
  } else {
    email.textContent = '—';
    email.removeAttribute('href');
    email.classList.add('mm-empty');
  }

  // Téléphone : cliquable seulement si renseigné
  const tel = document.getElementById('mmTel');
  if (m.tel) {
    tel.textContent = m.tel;
    tel.href = 'tel:' + m.tel.replace(/\s/g, '');
    tel.classList.remove('mm-empty');
  } else {
    tel.textContent = '—';
    tel.removeAttribute('href');
    tel.classList.add('mm-empty');
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMember() {
  const modal = document.getElementById('memberModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('memberModalClose');
  const overlay = document.getElementById('memberModalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeMember);
  if (overlay) overlay.addEventListener('click', closeMember);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMember();
  });
});

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