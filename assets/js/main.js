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
const navmenu = document.querySelector('#navmenu');

function mobileNavToogle() {
    // Alternar la clase en el body
    document.body.classList.toggle('mobile-nav-active');
    
    // Alternar icono del botón
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    
    // Alternar visibilidad del menú
    const navUl = navmenu.querySelector('ul');
    if (document.body.classList.contains('mobile-nav-active')) {
        navUl.style.display = 'block';
    } else {
        navUl.style.display = 'none';
    }
}

if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileNavToogle();
    });
}

/**
 * Cerrar menú al hacer clic en enlace
 */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
            mobileNavToogle();
        }
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
const openBtns = document.querySelectorAll(".contactanos-btn");
const closeBtn = document.querySelector(".close-modal");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

openBtns.forEach(openBtn => {
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    modal.style.display = "block";
  });
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

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del modal
  const videoModal = document.getElementById('videoModal');
  const modalVideoPlayer = document.getElementById('modalVideoPlayer');
  const videoLoadingSpinner = document.getElementById('videoLoadingSpinner');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const timeDisplay = document.getElementById('timeDisplay');
  let lastScrollY = 0; // para guardar la posición previa

  // Obtener todos los items del portfolio que tienen video
  const portfolioItems = document.querySelectorAll('.portfolio-item[data-video-src]');

  portfolioItems.forEach(item => {
      const playButton = item.querySelector('.play-button');
      const videoSrc = item.dataset.videoSrc;

      
      function showVideoModal() {
        lastScrollY = window.scrollY; // guardar posición antes de abrir
        window.scrollTo(0, 0); // mover al tope
        videoLoadingSpinner.classList.add('active');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // bloquear scroll
        
        setTimeout(() => {
          modalVideoPlayer.src = videoSrc;

          modalVideoPlayer.addEventListener('canplay', function onCanPlay() {
              videoLoadingSpinner.classList.remove('active');
              modalVideoPlayer.play();
              modalVideoPlayer.removeEventListener('canplay', onCanPlay);
          });

          modalVideoPlayer.addEventListener('error', function onError() {
              videoLoadingSpinner.classList.remove('active');
              alert('Error al cargar el video');
              hideVideoModal();
              modalVideoPlayer.removeEventListener('error', onError);
          });
        }, 2000);
      }
      
      // Event listener para el botón de play
      if (playButton) {
          playButton.addEventListener('click', function(e) {
              e.stopPropagation();
              showVideoModal();
          });
      }
  });

  // Función para ocultar el modal de video
  function hideVideoModal() {
      modalVideoPlayer.pause();
      modalVideoPlayer.removeAttribute('src');
      modalVideoPlayer.load();
      videoModal.classList.remove('active');
      videoLoadingSpinner.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll del body
      window.scrollTo(0, lastScrollY); // volver a la posición previa
      playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      progressBar.style.width = '0%';
      timeDisplay.textContent = '0:00 / 0:00';
  }
  
  // Función para formatear tiempo
  function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Función para actualizar la barra de progreso
  function updateProgress() {
      if (modalVideoPlayer.duration) {
          const progress = (modalVideoPlayer.currentTime / modalVideoPlayer.duration) * 100;
          progressBar.style.width = progress + '%';
          
          const current = formatTime(modalVideoPlayer.currentTime);
          const duration = formatTime(modalVideoPlayer.duration);
          timeDisplay.textContent = `${current} / ${duration}`;
      }
  }

  // Ajustar object-fit basado en orientación del video
  modalVideoPlayer.addEventListener('loadedmetadata', () => {
      if (modalVideoPlayer.videoHeight > modalVideoPlayer.videoWidth) {
          // Vertical
          modalVideoPlayer.style.objectFit = 'contain';
      } else {
          // Horizontal
          modalVideoPlayer.style.objectFit = 'contain';
      }
  });
  
  // Event Listeners del modal
  
  // Cerrar modal
  closeVideoModal.addEventListener('click', function(e) {
      e.stopPropagation();
      hideVideoModal();
  });

  // Cerrar modal al hacer clic fuera del contenido
  videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) {
          hideVideoModal();
      }
  });
  
  // Play/Pause toggle
  playPauseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (modalVideoPlayer.paused) {
          modalVideoPlayer.play();
          playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      } else {
          modalVideoPlayer.pause();
          playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
  });
  
  // Actualizar progreso
  modalVideoPlayer.addEventListener('timeupdate', updateProgress);
  
  // Seek en la barra de progreso
  progressContainer.addEventListener('click', function(e) {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      
      if (modalVideoPlayer.duration) {
          modalVideoPlayer.currentTime = percentage * modalVideoPlayer.duration;
      }
  });
  
  // Cuando el video termina
  modalVideoPlayer.addEventListener('ended', function() {
      playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      progressBar.style.width = '100%';
  });
  
  // Manejar tecla Escape para cerrar modal
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
          hideVideoModal();
      }
  });

  // Prevenir cierre del modal al hacer clic en el contenido del video
  document.querySelector('.video-modal-content').addEventListener('click', function(e) {
      e.stopPropagation();
  });
});

})();