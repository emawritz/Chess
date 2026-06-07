/* ============================================================
   Chess — GSAP + ScrollTrigger + Lenis
   Full kinetic stack: entrance, ambient, interactions.
   ============================================================ */
(function () {
  if (typeof gsap === 'undefined') return;

  document.documentElement.classList.add('has-gsap');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasST = typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ==========================================================
     LENIS — smooth scroll global
     ========================================================== */
  if (typeof Lenis !== 'undefined' && !reduce) {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1
    });
    if (hasST) lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: -68, duration: 1.3 });
      });
    });
  }

  const hero = document.querySelector('body.chess-v3 .hero--v2');
  if (!hero) return;

  /* ==========================================================
     REFS
     ========================================================== */
  const header   = document.querySelector('.header--v2');
  const navItems = document.querySelectorAll('.header--v2 .navmenu li');
  const cta      = document.querySelector('.header--v2 .header-cta');
  const meta     = hero.querySelector('.hero-meta');
  const metaText = hero.querySelector('.hero-meta__text');
  const words    = hero.querySelectorAll('.hero-heading .word');
  const sub      = hero.querySelector('.hero-sub');
  const ctas     = hero.querySelector('.hero-cta');
  const primary  = hero.querySelector('.btn-primary-chess');
  const piece    = hero.querySelector('.fluid-shape');
  const pieceImg = hero.querySelector('.fluid-shape .fluid-img');
  const sideLbl  = hero.querySelector('.hero-side-label');
  const scrollCue= hero.querySelector('.hero-scroll');
  const marquee  = hero.querySelector('.hero-marquee');
  const pattern  = hero.querySelector('.hero-pattern');

  /* ==========================================================
     INITIAL STATE (only opacity + transform, no visibility)
     ========================================================== */
  gsap.set([meta, sub, ctas, sideLbl, scrollCue, marquee].filter(Boolean), { opacity: 0, y: 16 });
  gsap.set(words, { clipPath: 'inset(-10% -8% 100% -8%)', y: '0.55em' });
  gsap.set(piece, { opacity: 0, x: 30, y: 60, scale: 0.78, rotate: -5, filter: 'blur(6px)' });
  gsap.set(navItems, { opacity: 0, y: -8 });
  gsap.set(cta, { opacity: 0, scale: 0.92 });

  // Tablero: arranca inclinado bajo + zoom + blur — cámara que se acomoda
  if (pattern) {
    gsap.set(pattern, {
      '--rotx': '18deg',
      '--scale': 1.4,
      opacity: 0,
      filter: 'blur(14px)'
    });
  }

  if (reduce) {
    gsap.set([meta, sub, ctas, sideLbl, scrollCue, marquee].filter(Boolean), { opacity: 1, y: 0 });
    gsap.set(words, { clipPath: 'inset(-10% -8% -8% -8%)', y: 0 });
    gsap.set(piece, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'none' });
    gsap.set(navItems, { opacity: 1, y: 0 });
    gsap.set(cta, { opacity: 1, scale: 1 });
    if (pattern) gsap.set(pattern, { '--rotx': '62deg', '--scale': 1, opacity: 1 });
    return;
  }

  /* ==========================================================
     TYPING META
     ========================================================== */
  if (metaText) {
    const full = metaText.textContent;
    metaText.textContent = '';
    metaText.style.whiteSpace = 'nowrap';
    metaText.style.borderRight = '2px solid var(--c-blue)';
    metaText.dataset.full = full;
  }

  /* ==========================================================
     HERO ENTRANCE TIMELINE
     ========================================================== */
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // Header items entran primero
  tl.to(navItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, 0)
    .to(cta, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.15)

    // TABLERO — entrada cinematográfica:
    // rotX 18°→62° (cámara se inclina), scale 1.4→1 (zoom-out), blur 14→0 (focus pull)
    .to(pattern, {
      '--rotx': '62deg',
      '--scale': 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 2.2,
      ease: 'expo.out'
    }, 0.1)

    // Meta
    .to(meta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6)
    .call(() => {
      if (!metaText) return;
      const full = metaText.dataset.full || '';
      const step = 0.035;
      full.split('').forEach((ch, i) => {
        gsap.delayedCall(i * step, () => { metaText.textContent += ch; });
      });
      gsap.delayedCall(full.length * step + 0.4, () => {
        metaText.style.borderRight = '0';
      });
    })

    // Headline con cortina clip-path
    .to(words, {
      clipPath: 'inset(-10% -8% -8% -8%)',
      y: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: 'expo.out'
    }, 0.9)

    .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.35)
    .to(ctas, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.5)

    // Pieza se materializa
    .to(piece, {
      opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'expo.out'
    }, 1.1)

    .to([sideLbl, scrollCue].filter(Boolean), {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1
    }, 1.8)

    .to(marquee, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 2.0)

    // Arranca ambient después del entrance
    .call(() => startAmbient());

  /* ==========================================================
     AMBIENT ANIMATIONS — loops perpetuos post-entrance
     ========================================================== */
  let ambientStarted = false;
  function startAmbient() {
    if (ambientStarted) return;
    ambientStarted = true;

    // 1. Pieza breath — sube/baja + rotate suave
    if (piece) {
      gsap.to(piece, {
        y: -12,
        rotate: -0.8,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    // 2. Tablero ambient — NO animamos nada más en el pattern para no
    //    entrar en conflicto con ScrollTrigger ni con el parallax.
    //    El tablero ya tiene vida con mouse parallax y scroll-driven.

    // 3. Scroll cue: línea azul desciende en loop
    if (scrollCue) {
      const line = scrollCue.querySelector('.hero-scroll__line');
      if (line) {
        gsap.fromTo(line, { '--cue': 0 }, {
          '--cue': 1,
          duration: 1.6,
          ease: 'power2.inOut',
          repeat: -1
        });
      }
    }
  }

  /* ==========================================================
     INTERACTIONS
     ========================================================== */

  // Pattern parallax con mouse (quickSetter — lo más perf)
  if (pattern) {
    const qx = gsap.quickSetter(pattern, '--px', 'px');
    const qy = gsap.quickSetter(pattern, '--py', 'px');
    let tx = 0, ty = 0, cx = 0, cy = 0, rafId = null;
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx * -22;
      ty = ny * -14;
      if (!rafId) rafId = requestAnimationFrame(parallax);
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    function parallax() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      qx(cx);
      qy(cy);
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        rafId = requestAnimationFrame(parallax);
      } else rafId = null;
    }
  }

  // Pieza: micro-tilt 3D hacia el cursor
  if (pieceImg && piece) {
    piece.style.perspective = '900px';
    pieceImg.style.transformOrigin = '50% 80%';
    const qrx = gsap.quickTo(pieceImg, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const qry = gsap.quickTo(pieceImg, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const qsc = gsap.quickTo(pieceImg, 'scale',     { duration: 0.6, ease: 'power3.out' });
    hero.addEventListener('mousemove', (e) => {
      const r = piece.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      qrx(Math.max(-8, Math.min(8, -dy * 8)));
      qry(Math.max(-10, Math.min(10, dx * 10)));
      // Scale up when cursor inside bounds
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      qsc(inside ? 1.03 : 1);
    });
    hero.addEventListener('mouseleave', () => { qrx(0); qry(0); qsc(1); });
  }

  // CTA primario magnético con quickTo
  if (primary) {
    const qmx = gsap.quickTo(primary, 'x', { duration: 0.35, ease: 'power3.out' });
    const qmy = gsap.quickTo(primary, 'y', { duration: 0.35, ease: 'power3.out' });
    const radius = 140, strength = 0.4;
    const move = (e) => {
      const r = primary.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < radius) {
        const fall = 1 - d / radius;
        qmx(dx * strength * fall);
        qmy(dy * strength * fall);
      } else {
        qmx(0); qmy(0);
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
  }

  // Hover en palabras del headline — pequeño tilt
  words.forEach((w) => {
    w.addEventListener('mouseenter', () => {
      gsap.to(w, { x: 6, duration: 0.4, ease: 'power3.out' });
    });
    w.addEventListener('mouseleave', () => {
      gsap.to(w, { x: 0, duration: 0.6, ease: 'power3.out' });
    });
  });

  /* ==========================================================
     SCROLL-DRIVEN (ScrollTrigger)
     ========================================================== */
  if (!hasST) return;

  // Tablero: rotX más profundo y escala mayor al scrollear
  // fromTo con immediateRender:false — no pisa el estado de la entrance/ambient
  if (pattern) {
    gsap.fromTo(pattern,
      { '--rotx': '62deg', '--scale': 1 },
      {
        '--rotx': '78deg',
        '--scale': 1.22,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      }
    );
  }

  // Header: clase .scrolled pasando 20px
  if (header) {
    ScrollTrigger.create({
      start: 'top -20',
      end: 99999,
      onToggle: (self) => header.classList.toggle('scrolled', self.isActive)
    });
  }

  // Marquee: pausa en hover (CSS fallback, acá redundante pero explícito)
  if (marquee) {
    const track = marquee.querySelector('.hero-marquee__track');
    if (track) {
      marquee.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
      marquee.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
    }
  }

  /* ==========================================================
     ABOUT v2 — scroll reveals
     ========================================================== */
  const about = document.querySelector('.about--v2');
  if (about && hasST) {
    const fades = about.querySelectorAll('[data-av2-fade]');
    const reveals = about.querySelectorAll('[data-av2-reveal]');
    const chessTitle = about.querySelector('.about-v2__title[data-av2-reveal]');
    const playWord = about.querySelector('.about-v2__play[data-av2-reveal]');
    const frames = about.querySelectorAll('.about-v2__frame');
    const closing = about.querySelector('.about-v2__closing');
    const pieces = about.querySelectorAll('.about-v2__piece');

    // Fade + rise en bloques meta / eyebrow / body
    fades.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // CHESS outline — clip reveal + pequeño zoom
    if (chessTitle) {
      gsap.fromTo(chessTitle,
        { clipPath: 'inset(0 0 100% 0)', y: 40, scale: 0.98 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0, scale: 1,
          duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: chessTitle, start: 'top 80%', once: true }
        }
      );
    }

    // ¿JUGAMOS? — entrada clip-reveal + salida scroll-driven + glow pulse
    if (playWord) {
      gsap.set(playWord, { display: 'inline-block' });

      // ENTRADA: cortina desde abajo + scale up
      gsap.fromTo(playWord,
        { clipPath: 'inset(0 0 100% 0)', y: 60, scale: 0.88, filter: 'blur(8px)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0, scale: 1, filter: 'blur(0px)',
          duration: 1.5, ease: 'expo.out',
          scrollTrigger: { trigger: playWord, start: 'top 85%', once: true }
        }
      );

      // AMBIENT: glow pulse sutil (text-shadow) mientras esté en viewport
      gsap.fromTo(playWord,
        { textShadow: '0 10px 50px rgba(0,0,0,0.3), 0 0 0px rgba(255,255,255,0)' },
        {
          textShadow: '0 10px 50px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.35)',
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: playWord,
            start: 'top 90%',
            end: 'bottom -10%',
            toggleActions: 'play pause resume pause'
          }
        }
      );

      // SALIDA: solo cuando el word mismo ya subió cerca del tope del viewport
      gsap.to(playWord, {
        scale: 0.88,
        y: -40,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: playWord,
          start: 'top 15%',   // arranca solo cuando el word ya casi salió por arriba
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }

    // Filmstrip reveal: stagger de frames entrando desde la derecha
    if (frames.length) {
      gsap.fromTo(frames,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: about.querySelector('.about-v2__film'), start: 'top 85%', once: true }
        }
      );
    }

    // Closing: fade general del bloque (sin tocar piezas)
    if (closing) {
      gsap.fromTo(closing,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: closing, start: 'top 80%', once: true }
        }
      );
    }

    /* ----------------------------------------------------------
       Piezas del closing — entrance + ambient + mouse reactive
       Base:  left  → y 18,  rotate -8,  scale 1
              right → y -6,  rotate 12,  scale 1.48
       ---------------------------------------------------------- */
    const pieceLeft  = about.querySelector('.about-v2__piece--left');
    const pieceRight = about.querySelector('.about-v2__piece--right');
    const playRow    = about.querySelector('.about-v2__play-row');

    if (pieceLeft && pieceRight && playRow) {
      // Override el transform CSS — desde ahora manda GSAP
      gsap.set(pieceLeft,  { x: 0, y: 18, rotation: -8,  scale: 1,    opacity: 0 });
      gsap.set(pieceRight, { x: 0, y: -6, rotation: 12,  scale: 1.48, opacity: 0 });

      // Entrance: slide desde los bordes con bounce, staggered
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: closing, start: 'top 75%', once: true },
        onComplete: startPieceAmbient
      });

      entrance
        .fromTo(pieceLeft,
          { x: -180, y: 60, rotation: -30, scale: 0.85, opacity: 0 },
          { x: 0, y: 18, rotation: -8, scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.3)' },
          0
        )
        .fromTo(pieceRight,
          { x: 180, y: -60, rotation: 40, scale: 1.28, opacity: 0 },
          { x: 0, y: -6, rotation: 12, scale: 1.48, opacity: 1, duration: 1.3, ease: 'back.out(1.3)' },
          0.25
        );

      // Ambient: seesaw contrafase (una sube mientras la otra baja)
      function startPieceAmbient() {
        const reduceLocal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceLocal) return;

        gsap.to(pieceLeft, {
          y: 4, rotation: -12,
          duration: 4.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
        gsap.to(pieceRight, {
          y: -20, rotation: 17,
          duration: 4.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.1
        });
      }

      // Mouse reactive: tilt extra hacia el cursor cuando el mouse está cerca
      const qLRot = gsap.quickTo(pieceLeft,  'rotation', { duration: 0.8, ease: 'power3.out' });
      const qRRot = gsap.quickTo(pieceRight, 'rotation', { duration: 0.8, ease: 'power3.out' });
      const qLY   = gsap.quickTo(pieceLeft,  'y',        { duration: 0.8, ease: 'power3.out' });
      const qRY   = gsap.quickTo(pieceRight, 'y',        { duration: 0.8, ease: 'power3.out' });

      let baseLRot = -8, baseRRot = 12;
      let baseLY = 18, baseRY = -6;

      playRow.addEventListener('mouseenter', () => {
        // pausar ambient sin matarlo — matamos y recreamos al leave
        gsap.killTweensOf([pieceLeft, pieceRight]);
      });

      playRow.addEventListener('mousemove', (e) => {
        const r = playRow.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
        qLRot(baseLRot + nx * -6);
        qRRot(baseRRot + nx * 6);
        qLY(baseLY - Math.abs(nx) * 4);
        qRY(baseRY - Math.abs(nx) * 4);
      });

      playRow.addEventListener('mouseleave', () => {
        // Volver al ambient loop
        gsap.to(pieceLeft, { y: baseLY, rotation: baseLRot, duration: 0.6, ease: 'power3.out', onComplete: () => {
          gsap.to(pieceLeft, { y: 4, rotation: -12, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }});
        gsap.to(pieceRight, { y: baseRY, rotation: baseRRot, duration: 0.6, ease: 'power3.out', onComplete: () => {
          gsap.to(pieceRight, { y: -20, rotation: 17, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        }});
      });
    }
  }

  /* ==========================================================
     SERVICES v2 — scroll reveals + card interactions
     ========================================================== */
  const services = document.querySelector('.services--v2');
  if (services && hasST) {
    const sFades = services.querySelectorAll('[data-sv2-fade]');
    const sTitle = services.querySelector('[data-sv2-reveal]');
    const sCards = services.querySelectorAll('[data-sv2-card]');

    // Meta + intro fade
    sFades.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    // Title: cada línea con clip-reveal staggered
    if (sTitle) {
      const lines = sTitle.querySelectorAll('.line');
      gsap.fromTo(lines,
        { clipPath: 'inset(-10% -5% 100% -5%)', y: '0.5em' },
        {
          clipPath: 'inset(-10% -5% -5% -5%)',
          y: 0,
          duration: 1.1, ease: 'expo.out', stagger: 0.14,
          scrollTrigger: { trigger: sTitle, start: 'top 82%', once: true }
        }
      );
    }

    // Cards: entrance staggered desde abajo con leve rotation
    if (sCards.length) {
      gsap.fromTo(sCards,
        { opacity: 0, y: 60, rotate: 1 },
        {
          opacity: 1, y: 0, rotate: 0,
          duration: 1, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: services.querySelector('.services-v2__grid'), start: 'top 85%', once: true }
        }
      );

      // IDLE LOOPS distintos por personaje + hover interactions
      // Config: una config por card con su propia personalidad de movimiento
      const charConfig = [
        // Eventos (rook caminando) — bounce + ligero tilt
        { y: [-10, 4], rot: [-2.5, 2.5], dur: 2.8, delay: 0 },
        // Audiovisual (camera) — más vertical, el gesto de caminar con cámara
        { y: [-6, 6],  rot: [-3.5, 1.5], dur: 2.4, delay: 0.4 },
        // Influencer (king selfie) — bamboleo lateral mayor
        { y: [-5, 5],  rot: [-4.5, 4.5], dur: 3.2, delay: 0.8 }
      ];

      sCards.forEach((card, i) => {
        const visual = card.querySelector('.services-v2__card-visual img');
        const num = card.querySelector('.services-v2__card-num');
        if (!visual) return;

        const cfg = charConfig[i] || charConfig[0];
        card.style.perspective = '900px';

        // Idle walk/bounce loop
        const idle = gsap.timeline({ repeat: -1, yoyo: true, delay: cfg.delay });
        idle.fromTo(visual,
          { y: cfg.y[0], rotation: cfg.rot[0] },
          { y: cfg.y[1], rotation: cfg.rot[1], duration: cfg.dur, ease: 'sine.inOut' }
        );

        // Number pulse idle
        if (num) {
          gsap.to(num, {
            textShadow: '0 0 28px rgba(30, 50, 245, 0.5)',
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.3
          });
        }

        // Mouse 3D tilt (rotationX/Y — no pelea con rotation Z del idle)
        const qrx = gsap.quickTo(visual, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const qry = gsap.quickTo(visual, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          qrx(-dy * 10);
          qry(dx * 12);
        });
        card.addEventListener('mouseleave', () => { qrx(0); qry(0); });

        // Card hover: personaje BRINCA (scale + extra Y pop)
        let hoverTween;
        card.addEventListener('mouseenter', () => {
          idle.timeScale(1.8); // acelera el idle también
          hoverTween && hoverTween.kill();
          hoverTween = gsap.to(visual, {
            scale: 1.15,
            duration: 0.5,
            ease: 'back.out(1.8)'
          });
        });
        card.addEventListener('mouseleave', () => {
          idle.timeScale(1);
          hoverTween && hoverTween.kill();
          gsap.to(visual, { scale: 1, duration: 0.6, ease: 'power3.out' });
        });
      });
    }
  }

  /* ==========================================================
     PORTFOLIO v2 — scroll reveals + item interactions
     ========================================================== */
  const portfolio = document.querySelector('.portfolio--v2');
  if (portfolio && hasST) {
    const pFades = document.querySelectorAll('[data-pv2-fade]');
    const pReveals = document.querySelectorAll('[data-pv2-reveal]');
    const pItems = portfolio.querySelectorAll('[data-pv2-item]');

    // Fade general (meta + intro + clientes wall)
    pFades.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    // Titulos con clip-reveal por línea
    pReveals.forEach((title) => {
      const lines = title.querySelectorAll('.line');
      if (!lines.length) return;
      gsap.fromTo(lines,
        { clipPath: 'inset(-10% -5% 100% -5%)', y: '0.5em' },
        {
          clipPath: 'inset(-10% -5% -5% -5%)', y: 0,
          duration: 1.1, ease: 'expo.out', stagger: 0.14,
          scrollTrigger: { trigger: title, start: 'top 82%', once: true }
        }
      );
    });

    // Items del grid: entrance escalonado con slight shift
    if (pItems.length) {
      gsap.fromTo(pItems,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: portfolio.querySelector('.portfolio-v2__grid'), start: 'top 85%', once: true }
        }
      );
    }

    // Click → abrir detalle del servicio correspondiente
    // Mapeo categoría → id de sección oculta
    const catToSection = {
      'AUDIOVISUAL': 'produccion-audiovisual',
      'EVENTOS':     'produccion-eventos',
      'INFLUENCER':  'influencer-mkt'
    };
    // Deep-link: nombre del item del portfolio → h2 exacto dentro del detalle
    const nameToH2 = {
      "jack daniel's":         "JACK DANIEL'S",
      'spiritu blu':           'FESTIVAL FEEL GIN',
      'juli puente':           'JULI PUENTE',
      'reebok':                'EMANERO FT REBOOK',
      'atalaya':               'ATALAYA BY PROJECT RESET'
    };
    const normalize = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const findTargetH2 = (sectionEl, wantedText) => {
      if (!sectionEl || !wantedText) return null;
      const want = normalize(wantedText);
      const candidates = sectionEl.querySelectorAll('h2');
      for (const h of candidates) {
        if (normalize(h.textContent) === want) return h;
      }
      return null;
    };
    const scrollToEl = (el) => {
      if (!el) return;
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    pItems.forEach((item) => {
      const cat = item.querySelector('.portfolio-v2__cat');
      if (!cat) return;
      const key = cat.textContent.trim().toUpperCase();
      const sectionId = catToSection[key];
      if (!sectionId) return;
      const nameEl = item.querySelector('.portfolio-v2__name');
      const itemName = nameEl ? normalize(nameEl.textContent) : '';
      const targetH2Text = nameToH2[itemName] || null;
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Trigger el service card del mismo tipo (reutiliza lógica existente)
        const serviceMap = {
          'produccion-audiovisual': 'audiovisual',
          'produccion-eventos':     'eventos',
          'influencer-mkt':         'influencer'
        };
        const serviceKey = serviceMap[sectionId];
        const serviceCard = document.querySelector(`.service-card-wrapper[data-section="${serviceKey}"]`);
        if (serviceCard) {
          serviceCard.click();
          if (targetH2Text) {
            setTimeout(() => {
              const sectionEl = document.getElementById(sectionId);
              const h2 = findTargetH2(sectionEl, targetH2Text);
              if (h2) scrollToEl(h2);
            }, 400);
          }
        } else {
          // Fallback: mostrar la sección manualmente y scrollear
          const target = document.getElementById(sectionId);
          if (target) {
            // Ocultar las otras
            ['produccion-audiovisual','produccion-eventos','influencer-mkt'].forEach(id => {
              const s = document.getElementById(id);
              if (s) s.style.display = (id === sectionId ? 'block' : 'none');
            });
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
      // Cursor pointer y tab accesible
      item.style.cursor = 'pointer';
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  /* ==========================================================
     FOOTER v2 — scroll reveals + form mailto fallback
     ========================================================== */
  const footer = document.querySelector('.footer--v2');
  if (footer && hasST) {
    const fFades = footer.querySelectorAll('[data-fv2-fade]');
    const fReveals = footer.querySelectorAll('[data-fv2-reveal]');

    fFades.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    fReveals.forEach((title) => {
      const lines = title.querySelectorAll('.line');
      if (!lines.length) return;
      gsap.fromTo(lines,
        { clipPath: 'inset(-10% -5% 100% -5%)', y: '0.5em' },
        {
          clipPath: 'inset(-10% -5% -5% -5%)', y: 0,
          duration: 1.1, ease: 'expo.out', stagger: 0.14,
          scrollTrigger: { trigger: title, start: 'top 85%', once: true }
        }
      );
    });
  }

  // Contact form — Web3Forms async submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ok = document.getElementById('formMessage');
      const showMessage = (text, isError) => {
        if (!ok) return;
        ok.textContent = text;
        ok.hidden = false;
        ok.classList.toggle('is-error', !!isError);
      };
      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success) {
          showMessage('✓ Mensaje enviado. Te respondemos en 24hs.', false);
          contactForm.reset();
        } else {
          showMessage('✗ Error al enviar. Escribinos a camilaiarahess@gmail.com', true);
        }
      } catch (err) {
        showMessage('✗ Error al enviar. Escribinos a camilaiarahess@gmail.com', true);
      }
    });
  }
})();

/* ============ STATS BAND v2 ============ */
(function initStatsV2(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
  const section=document.querySelector('.stats--v2');
  if(!section)return;
  const meta=section.querySelector('.stats-v2__meta');
  const cells=gsap.utils.toArray('.stats-v2__cell', section);
  const values=gsap.utils.toArray('.stats-v2__value', section);

  gsap.to(meta,{opacity:1,duration:.6,ease:'power2.out',
    scrollTrigger:{trigger:section,start:'top 80%'}});

  cells.forEach((cell,i)=>{
    gsap.from(cell,{
      y:60,opacity:0,duration:.8,ease:'expo.out',delay:i*0.08,
      scrollTrigger:{trigger:section,start:'top 70%'}
    });
  });

  values.forEach(el=>{
    const target=parseInt(el.dataset.count,10)||0;
    const obj={n:0};
    ScrollTrigger.create({
      trigger:el,start:'top 85%',once:true,
      onEnter:()=>{
        gsap.to(obj,{n:target,duration:1.8,ease:'power3.out',
          onUpdate:()=>{el.textContent=Math.round(obj.n);}});
      }
    });
  });
})();
