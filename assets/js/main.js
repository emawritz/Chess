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
document.querySelectorAll('h4').forEach(el => {
  if (el.textContent.trim().toUpperCase().includes('PRODUCCION AUDIOVISUAL')) {
    el.addEventListener('click', function() {
      showProductionSection('produccion-audiovisual');
      updateHistory(productionHistory.states.audiovisual);
    });
  }
  if (el.textContent.trim().toUpperCase().includes('PRODUCCION DE EVENTOS')) {
    el.addEventListener('click', function() {
      showProductionSection('produccion-eventos');
      updateHistory(productionHistory.states.eventos);
    });
  }
  if (el.textContent.trim().toUpperCase().includes('INFLUENCER MKT')) {
    el.addEventListener('click', function() {
      showProductionSection('influencer-mkt');
      updateHistory(productionHistory.states.influencer);
    });
  }
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
})();