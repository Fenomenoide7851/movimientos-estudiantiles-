// ============================================
//  MOVIMIENTOS ESTUDIANTILES — main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ──────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 800);
  });

  // ── PROGRESS BAR ────────────────────────────
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // ── NAVBAR SCROLL ───────────────────────────
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('back-top');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    backTop.classList.toggle('visible', y > 400);
    updateProgress();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── BACK TO TOP ─────────────────────────────
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── HAMBURGER MENU ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── INTERSECTION OBSERVER (reveal) ──────────
  const revealEls = document.querySelectorAll(
    '.timeline-item, .region-card, .uptc-event-card'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // stagger siblings in the same container
        const siblings = [...el.parentElement.children];
        const idx = siblings.indexOf(el);
        setTimeout(() => el.classList.add('visible'), idx * 80);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));

  // ── COUNTER ANIMATION ───────────────────────
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── MODAL ────────────────────────────────────
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose   = document.getElementById('modal-close');

  function openModal(data) {
    document.getElementById('modal-tag').textContent    = data.tag;
    document.getElementById('modal-title').textContent  = data.title;
    document.getElementById('modal-img').src            = data.img;
    document.getElementById('modal-img').alt            = data.title;
    document.getElementById('modal-body-text').innerHTML = data.body;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── REGION CARD CLICK ────────────────────────
  const MODAL_DATA = {
    usa: {
      tag: 'Estados Unidos · Siglo XX',
      title: 'Lucha por los Derechos Civiles y Vietnam',
      img: 'imagenes/guerra de vietnam.jpg',
      body: `
        <p>Los movimientos estudiantiles en Estados Unidos durante los años 60 y 70 representaron una de las épocas de mayor agitación política y social de la historia moderna norteamericana. Dos grandes causas impulsaron esta movilización masiva: la lucha por los derechos civiles de la población afroamericana y la oposición a la guerra de Vietnam.</p>
        <p><strong style="color:var(--gold)">Movimiento de Derechos Civiles:</strong> Desde finales de los años 50, estudiantes afroamericanos organizaron sit-ins, marchas y boicots para combatir la segregación racial. El Student Nonviolent Coordinating Committee (SNCC), fundado en 1960, movilizó a miles de jóvenes universitarios que enfrentaron violencia policial y represión legal. La lucha logró la aprobación de la Ley de Derechos Civiles de 1964 y la Ley de Derecho al Voto de 1965.</p>
        <p><strong style="color:var(--gold)">Vietnam y la cuestión racial:</strong> La guerra de Vietnam agudizó la injusticia racial: los soldados afroamericanos representaban una proporción desproporcionadamente alta de las bajas en combate, mientras que muchos hombres blancos de clase media accedían a exenciones universitarias. Esta inequidad impulsó a estudiantes negros y blancos a unir sus voces en protesta.</p>
        <p><strong style="color:var(--gold)">Masacre de Kent State (4 de mayo de 1970):</strong> Alrededor de 3.000 estudiantes se reunieron en el campus de la Universidad Estatal de Kent para protestar contra la invasión de Camboya. La Guardia Nacional de Ohio abrió fuego, matando a cuatro estudiantes e hiriendo a nueve. La imagen de Mary Ann Vecchio arrodillada junto al cuerpo de Jeffrey Miller, ganadora del Premio Pulitzer, se convirtió en símbolo de la brutalidad del Estado. El evento desencadenó huelgas en más de 1.300 campus universitarios y contribuyó a la retirada de tropas de Camboya.</p>
      `
    },
    europa: {
      tag: 'Europa · Mayo de 1968',
      title: 'El Mayo del 68 y la Revolución Cultural Europea',
      img: 'imagenes/el Mayo del 68 y la Revolución Cultural Europea.jpeg',
      body: `
        <p>El año 1968 marcó un punto de inflexión en la historia política europea. Lo que comenzó como protestas estudiantiles en París se convirtió en un movimiento que sacudió los cimientos de las sociedades occidentales y cuestionó el orden establecido.</p>
        <p><strong style="color:var(--gold)">Francia — El Mayo del 68:</strong> Las protestas comenzaron en la Universidad de Nanterre en marzo de 1968, impulsadas por el rechazo a la sociedad de consumo, el autoritarismo universitario y el capitalismo. Para mayo, millones de trabajadores se sumaron en una huelga general que paralizó al país. El gobierno de De Gaulle estuvo al borde de la caída. Los estudiantes tomaron la Sorbona y el Barrio Latino fue escenario de violentos enfrentamientos con la policía. Las imágenes de los adoquines arrancados y los grafitis —"Seamos realistas, pidamos lo imposible"— quedaron grabados en el imaginario colectivo.</p>
        <p><strong style="color:var(--gold)">Alemania:</strong> El movimiento APO (Außerparlamentarische Opposition) y la figura del líder estudiantil Rudi Dutschke organizaron protestas masivas contra el rearmamiento alemán, la guerra de Vietnam y el conservadurismo de la prensa Springer. El atentado contra Dutschke en 1968 desencadenó violentas protestas en múltiples ciudades.</p>
        <p><strong style="color:var(--gold)">Checoslovaquia — La Primavera de Praga:</strong> Aunque de naturaleza diferente, los estudiantes checoslovacos apoyaron el experimento reformista de Dubček hasta que los tanques soviéticos aplastaron cualquier esperanza de democratización en agosto de 1968.</p>
        <p><strong style="color:var(--gold)">Legado:</strong> El 68 europeo transformó la política, la cultura, las relaciones de género y el pensamiento universitario. Abrió el camino a la segunda ola feminista, el movimiento ecologista y nuevas formas de política participativa.</p>
      `
    },
    china: {
      tag: 'Asia · Tiananmen 1989',
      title: 'La Masacre de la Plaza de Tiananmen',
      img: 'imagenes/masacre en la plaza tianmen.jpeg',
      body: `
        <p>Entre abril y junio de 1989, la Plaza de Tiananmen en Pekín fue el epicentro del mayor movimiento prodemocratico en la historia de China. Lo que comenzó como un homenaje al fallecido reformista Hu Yaobang se convirtió en una demanda masiva de transparencia política, libertad de prensa y fin de la corrupción.</p>
        <p><strong style="color:var(--gold)">El movimiento estudiantil:</strong> Cientos de miles de estudiantes universitarios, intelectuales y trabajadores ocuparon la Plaza de Tiananmen durante semanas. Erigieron una réplica de la Estatua de la Libertad que llamaron "La Diosa de la Democracia". Las protestas se extendieron a más de 400 ciudades chinas. La huelga de hambre de miles de estudiantes conmovió a la opinión pública nacional e internacional.</p>
        <p><strong style="color:var(--gold)">La represión (3-4 de junio de 1989):</strong> El gobierno declaró la ley marcial. En la madrugada del 3 al 4 de junio, el Ejército Popular de Liberación avanzó con tanques y soldados sobre la plaza y las calles circundantes. La cifra de muertos nunca fue confirmada oficialmente; estimaciones independientes hablan de cientos a varios miles de fallecidos. La imagen del "Hombre del Tanque" —un individuo anónimo deteniéndose frente a una columna blindada— se convirtió en uno de los iconos más reconocidos del siglo XX.</p>
        <p><strong style="color:var(--gold)">Consecuencias:</strong> El Partido Comunista chino aplicó una severa represión contra los supervivientes. Muchos líderes estudiantiles huyeron al exilio. Hasta hoy, el tema permanece censurado en China y el debate sobre los sucesos de 1989 continúa siendo tabú dentro del país.</p>
      `
    },
    colombia: {
      tag: 'Colombia · Siglo XX–XXI',
      title: 'Los Movimientos Estudiantiles en Colombia',
      img: 'imagenes/movimientos estutiantiles en colombia.jpg',
      body: `
        <p>La historia del movimiento estudiantil colombiano es una historia de resistencia, represión y conquistas democráticas que se extiende desde el siglo XIX hasta la actualidad.</p>
        <p><strong style="color:var(--gold)">Gonzalo Bravo Pérez (1929):</strong> El primer estudiante mártir del movimiento colombiano. Durante una protesta contra el gobierno de Miguel Abadía Méndez, fue asesinado por la policía. Su muerte galvanizó el movimiento estudiantil y contribuyó a la caída del conservatismo en 1930.</p>
        <p><strong style="color:var(--gold)">1954 — Dictadura de Rojas Pinilla:</strong> El 8 y 9 de junio de 1954 quedaron en la historia como días fatales. Durante protestas estudiantiles, el Ejército abrió fuego, dejando 13 estudiantes muertos. Este hecho se conmemora cada año como el Día del Estudiante Colombiano (8 de junio).</p>
        <p><strong style="color:var(--gold)">Universidad Nacional — Centro de la Resistencia:</strong> La UNAL ha sido históricamente el epicentro del movimiento estudiantil colombiano. Sus campus han sido escenarios de debates políticos, huelgas, tomas y reformas académicas que han marcado la historia del país. En 1971, el movimiento estudiantil nacional logró la expedición de los estatutos que ampliaron la autonomía universitaria.</p>
        <p><strong style="color:var(--gold)">Siglo XXI — Mochilazos y Paro Nacional:</strong> En 2011, el movimiento estudiantil "Mochileros" —con marchas festivas y creativas— frenó la reforma a la Ley 30 de Educación Superior que privatizaría las universidades públicas. En 2018-2019, el movimiento exigió financiamiento pleno de las universidades públicas, logrando un incremento histórico de 4,5 billones de pesos en cuatro años.</p>
      `
    }
  };

  document.querySelectorAll('.region-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.modal;
      if (MODAL_DATA[key]) openModal(MODAL_DATA[key]);
    });
  });

  // ── SMOOTH NAV LINKS ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── TIMELINE FILTER ──────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      timelineItems.forEach(item => {
        if (filter === 'all' || item.dataset.region === filter) {
          item.style.display = 'grid';
          setTimeout(() => item.classList.add('visible'), 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

});
