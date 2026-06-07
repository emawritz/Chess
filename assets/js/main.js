/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      

      if (navmenulink.hash === '#hero' || navmenulink.hash === '#services' && 
          (document.getElementById('produccion-audiovisual').style.display === 'block' || 
          document.getElementById('produccion-eventos').style.display === 'block' || 
          document.getElementById('influencer-mkt').style.display === 'block')) {
        navmenulink.classList.add('active');
        return;
      }
      
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  // Función para resetear a la vista principal
  function resetToMainView(targetSection = null) {
    document.querySelectorAll('main > section').forEach(sec => {
      sec.style.display = '';
    });
    document.getElementById('produccion-audiovisual').style.display = 'none';
    document.getElementById('produccion-eventos').style.display = 'none';
    document.getElementById('influencer-mkt').style.display = 'none';
    if (!targetSection) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  // Event listeners para los enlaces del menú
  navmenulinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (document.getElementById('produccion-audiovisual').style.display === 'block' || 
            document.getElementById('produccion-eventos').style.display === 'block' || 
            document.getElementById('influencer-mkt').style.display === 'block') {
          // Si es INICIO o SERVICIOS
        if (link.hash === '#hero' || link.hash === '#services') {
          e.preventDefault();
          resetToMainView(link.hash);
          
          // Esperar un breve momento para que se aplique el display:none
          setTimeout(() => {
            if (link.hash === '#services') {
              const servicesSection = document.querySelector('#services');
              if (servicesSection) {
                servicesSection.scrollIntoView({behavior: 'smooth'});
              }
            }
          }, 50);
        }
      }
    });
  });

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
 * Manejo del historial para las secciones de producción
 */
let productionHistory = {
  currentState: null,
  states: {
    main: 'main',
    audiovisual: 'audiovisual',
    eventos: 'eventos',
    influencer: 'influencer'
  }
};

// Función para actualizar el historial
function updateHistory(state) {
  productionHistory.currentState = state;
  history.pushState({ section: state }, '', state === 'main' ? window.location.pathname : `#${state}`);
}

// Función para manejar el popstate (botón atrás/adelante)
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.section) {
    handleStateChange(event.state.section);
  } else {
    // Si no hay estado (primera carga), ir a main
    handleStateChange('main');
  }
});

// Función para manejar cambios de estado
function handleStateChange(state) {
  switch(state) {
    case productionHistory.states.main:
      resetToMainView();
      break;
    case productionHistory.states.audiovisual:
      showProductionSection('produccion-audiovisual');
      break;
    case productionHistory.states.eventos:
      showProductionSection('produccion-eventos');
      break;
    case productionHistory.states.influencer:
      showProductionSection('influencer-mkt');
      break;
    default:
      resetToMainView();
  }
}

// Función para mostrar sección de producción
function showProductionSection(sectionId) {
  document.querySelectorAll('main > section').forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Modificamos los event listeners de las secciones de producción
document.querySelectorAll('.service-card-wrapper').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', function() {
    let section = this.getAttribute('data-section');
    switch(section) {
      case 'audiovisual':
        showProductionSection('produccion-audiovisual');
        updateHistory(productionHistory.states.audiovisual);
        break;
      case 'eventos':
        showProductionSection('produccion-eventos');
        updateHistory(productionHistory.states.eventos);
        break;
      case 'influencer':
        showProductionSection('influencer-mkt');
        updateHistory(productionHistory.states.influencer);
        break;
    }
  });
});

// Modificamos el botón volver
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.produccion-back').forEach(backBtn => {
    backBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetToMainView();
      updateHistory(productionHistory.states.main);
    });
  });
});

// Inicializamos el estado al cargar la página
window.addEventListener('load', function() {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (hash === productionHistory.states.audiovisual || 
        hash === productionHistory.states.eventos || 
        hash === productionHistory.states.influencer) {
      handleStateChange(hash);
    } else {
      updateHistory(productionHistory.states.main);
    }
  } else {
    updateHistory(productionHistory.states.main);
  }
});

emailjs.init({
    publicKey: "RO46AoxV4bTlxbdnj"
}); 

const modal = document.getElementById("contactModal");
const openBtn = document.querySelector(".contactanos-btn");
const closeBtn = document.querySelector(".close-modal");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

openBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.send("service_4iym4bi", "template_ba0kfvs", {
    from_name: form.name.value,
    from_email: form.email.value,
    message: form.message.value,
    to_email: "camilaiarahess@gmail.com"
  }).then(() => {
    formMessage.style.display = "block";
    form.reset();
    setTimeout(() => {
      modal.style.display = "none";
      formMessage.style.display = "none";
    }, 2000);
  }, (error) => {
    alert("Error al enviar el mensaje: " + JSON.stringify(error));
  });
});

})();
/* Hero v2 — parallax suave de la pieza con mouse */
(function () {
  const piece = document.querySelector('.hero--v2 [data-parallax]');
  if (!piece) return;
  const hero = document.querySelector('.hero--v2');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !hero) return;

  let rafId = null;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = nx * 16;
    targetY = ny * 12;
    if (!rafId) loop();
  });

  hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

  function loop() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    piece.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }
})();

/* Header v2 — add .scrolled after 20px */
(function () {
  const header = document.querySelector('.header--v2');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============================================================
   Hero v3 — Kinetic interactions
   ============================================================ */
(function () {
  const hero = document.querySelector('body.chess-v3 .hero--v2');
  if (!hero) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Meta label — efecto tipeo terminal ---------------------------- */
  const meta = hero.querySelector('.hero-meta');
  if (meta && !reduce) {
    meta.classList.add('is-typing');
    setTimeout(() => {
      meta.classList.remove('is-typing');
      meta.classList.add('is-typed');
    }, 1950);
  }

  /* 2. Pattern parallax con mouse ------------------------------------ */
  const pattern = hero.querySelector('.hero-pattern');
  if (pattern && !reduce) {
    pattern.classList.add('is-interactive');
    let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * -18;
      targetY = ny * -12;
      if (!rafId) loop();
    });
    hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    function loop() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      pattern.style.setProperty('--px', curX.toFixed(2) + 'px');
      pattern.style.setProperty('--py', curY.toFixed(2) + 'px');
      if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }
  }

  /* 3. Pieza: después del drop, agregar breath infinito -------------- */
  const piece = hero.querySelector('.fluid-shape');
  if (piece && !reduce) {
    piece.addEventListener('animationend', (e) => {
      if (e.animationName === 'v3-piece-drop') piece.classList.add('is-settled');
    }, { once: true });
    setTimeout(() => piece.classList.add('is-settled'), 1700);

    /* Micro-tilt de la pieza hacia el cursor (sutil) */
    let tx = 0, ty = 0, ctx = 0, cty = 0, trafId = null;
    hero.addEventListener('mousemove', (e) => {
      const rect = piece.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      tx = Math.max(-6, Math.min(6, -dy * 6));
      ty = Math.max(-8, Math.min(8, dx * 8));
      if (!trafId) tloop();
    });
    function tloop() {
      ctx += (tx - ctx) * 0.08;
      cty += (ty - cty) * 0.08;
      piece.style.setProperty('--tilt-x', ctx.toFixed(2) + 'deg');
      piece.style.setProperty('--tilt-y', cty.toFixed(2) + 'deg');
      if (Math.abs(tx - ctx) > 0.05 || Math.abs(ty - cty) > 0.05) {
        trafId = requestAnimationFrame(tloop);
      } else { trafId = null; }
    }
  }

  /* Scroll-driven perspective + depth del tablero -------------------- */
  const pattern2 = hero.querySelector('.hero-pattern');
  if (pattern2 && !reduce) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const h = hero.offsetHeight;
        const progress = Math.min(y / h, 1);
        const rotX = 62 + progress * 14;
        const scale = 1 + progress * 0.18;
        pattern2.style.setProperty('--rotx', rotX + 'deg');
        pattern2.style.setProperty('--scale', scale.toFixed(3));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 4. CTA magnético ------------------------------------------------- */
  const magnet = hero.querySelector('.btn-primary-chess');
  if (magnet && !reduce) {
    const strength = 0.35, radius = 140;
    let mx = 0, my = 0, cmx = 0, cmy = 0, mrafId = null;
    function within(e) {
      const r = magnet.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const fall = 1 - dist / radius;
        mx = dx * strength * fall;
        my = dy * strength * fall;
      } else {
        mx = 0; my = 0;
      }
      if (!mrafId) mloop();
    }
    function mloop() {
      cmx += (mx - cmx) * 0.18;
      cmy += (my - cmy) * 0.18;
      magnet.style.transform = `translate3d(${cmx.toFixed(2)}px, ${cmy.toFixed(2)}px, 0)`;
      if (Math.abs(mx - cmx) > 0.1 || Math.abs(my - cmy) > 0.1) {
        mrafId = requestAnimationFrame(mloop);
      } else {
        mrafId = null;
        if (mx === 0 && my === 0) magnet.style.transform = '';
      }
    }
    window.addEventListener('mousemove', within, { passive: true });
  }

  /* 5. Scroll fade del contenido del hero ---------------------------- */
  if (!reduce) {
    const content = hero.querySelector('.content-col');
    const visual = hero.querySelector('.col-lg-5');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const h = hero.offsetHeight;
      if (y > h) return;
      const progress = Math.min(y / (h * 0.75), 1);
      const opacity = 1 - progress;
      const translateY = progress * -40;
      if (content) {
        content.style.opacity = opacity;
        content.style.transform = `translateY(${translateY}px)`;
      }
      if (visual) {
        visual.style.opacity = opacity;
        visual.style.transform = `translateY(${translateY * 0.6}px)`;
      }
    }, { passive: true });
  }
})();
