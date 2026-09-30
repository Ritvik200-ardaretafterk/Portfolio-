/* =============================================
   RITVIK PORTFOLIO — JAVASCRIPT
   Vibrant Orange·Blue·Red·Cream Theme
   Enhanced Animations & Interactions
   ============================================= */

'use strict';

/* ── CANVAS PARTICLE BACKGROUND (shows blurred on inner sections) ── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  const COLORS = [
    'rgba(255,107,43,',
    'rgba(37,99,235,',
    'rgba(239,68,68,',
    'rgba(245,158,11,',
    'rgba(96,165,250,',
    'rgba(255,154,108,',
  ];

  const ORBS = [
    { x: 0.15, y: 0.25, r: 220, color: 'rgba(255,107,43,', alpha: 0.06 },
    { x: 0.85, y: 0.65, r: 260, color: 'rgba(37,99,235,',  alpha: 0.05 },
    { x: 0.5,  y: 0.8,  r: 180, color: 'rgba(239,68,68,',  alpha: 0.04 },
  ];
  let orbPhase = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - 0.5) * 0.4;
    this.vy    = (Math.random() - 0.5) * 0.4;
    this.r     = Math.random() * 2.2 + 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.55 + 0.2;
    this.life  = Math.random() * 200 + 100;
    this.age   = 0;
    this.pulse = Math.random() * Math.PI * 2;
  };
  Particle.prototype.update = function () {
    const dx = mouse.x - this.x, dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150 * 0.45;
      this.vx -= (dx / dist) * force;
      this.vy -= (dy / dist) * force;
    }
    this.vx *= 0.99; this.vy *= 0.99;
    this.x += this.vx; this.y += this.vy;
    this.age++;
    this.pulse += 0.04;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.age > this.life) this.reset();
  };
  Particle.prototype.draw = function () {
    const pulsedAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + pulsedAlpha + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(W * H / 11000), 140);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const a = (1 - dist / 115) * 0.1;
          const hue = (i + j) % 2 === 0 ? `rgba(255,107,43,${a})` : `rgba(37,99,235,${a})`;
          ctx.strokeStyle = hue;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function drawOrbs() {
    orbPhase += 0.008;
    ORBS.forEach((orb, i) => {
      const px = orb.x * W + Math.sin(orbPhase + i * 1.2) * 60;
      const py = orb.y * H + Math.cos(orbPhase + i * 0.9) * 40;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.r);
      grad.addColorStop(0, orb.color + orb.alpha + ')');
      grad.addColorStop(1, orb.color + '0)');
      ctx.beginPath();
      ctx.arc(px, py, orb.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawOrbs();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  initParticles();
  animate();
})();


/* ── CANVAS BLUR CONTROL ── */
(function initCanvasBlur() {
  const ticker  = document.getElementById('rolesTicker');
  const wheel   = document.getElementById('roleWheel');
  const contact = document.getElementById('contact');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ticker.classList.add('hide-ticker');
        wheel.classList.add('hide-wheel');
      } else {
        ticker.classList.remove('hide-ticker');
        wheel.classList.remove('hide-wheel');
      }
    });
  }, { threshold: 0.3 });

  observer.observe(contact);
})();


/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    fx += (mx - fx) * 0.11;
    fy += (my - fy) * 0.11;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .skill-pill, .project-card, .fact-card, .achievement-card, .spec-card, .social-pill, .cta-primary, .cta-ghost').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
  });
})();


/* ── NAVBAR SCROLL EFFECT ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
})();


/* ── HERO METRIC COUNTERS (triggered on load) ── */
(function initHeroMetrics() {
  const metricNums = document.querySelectorAll('.metric-num[data-count]');
  metricNums.forEach((el, i) => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '+';
    let current = 0;
    const step = Math.ceil(target / 80);
    const delay = 900 + i * 220;
    setTimeout(() => {
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (current === target ? suffix : '');
        if (current >= target) {
          clearInterval(timer);
          el.classList.add('counted');
        }
      }, 18);
    }, delay);
  });
})();


/* ── ORB SYSTEM MOUSE PARALLAX ── */
(function initOrbParallax() {
  const orbSystem = document.getElementById('orbSystem');
  if (!orbSystem) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbSystem.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
  });
})();


/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('revealed'), delay * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();


/* ── ACTIVE NAV LINK ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
})();


/* ── COUNTER ANIMATION (freelance section) ── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.target.includes('%') ? '%' : '+';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (current === target ? suffix : '');
        if (current >= target) clearInterval(timer);
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();


/* ── SKILL PILL LEVEL INDICATOR ── */
(function initSkillLevels() {
  document.querySelectorAll('.skill-pill').forEach(pill => {
    const level = pill.dataset.level || 80;
    pill.style.setProperty('--level', level);
  });
})();


/* ── PROJECT CARD 3D TILT EFFECT ── */
(function initTilt() {
  document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const rx    = ((e.clientY - cy) / (rect.height / 2)) * 5;
      const ry    = ((e.clientX - cx) / (rect.width  / 2)) * -5;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ── CONTACT FORM ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const form    = document.getElementById('contactForm');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.style.display    = 'none';
    success.style.display = 'flex';
    form.reset();
  }, 1200);
}


/* ── SMOOTH SCROLL NAVBAR ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── HERO NAME GLITCH ── */
(function initGlitch() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;
  setInterval(() => {
    nameEl.style.textShadow = `
      ${Math.random() * 4 - 2}px 0 rgba(255,107,43,0.7),
      ${Math.random() * -4}px 0 rgba(37,99,235,0.5)
    `;
    setTimeout(() => { nameEl.style.textShadow = ''; }, 120);
  }, 4500);
})();


/* ── NAV ACTIVE STYLE ── */
(function addActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--orange-light) !important; background: rgba(255,107,43,0.1); }`;
  document.head.appendChild(style);
})();


/* ── SCROLL PROGRESS BAR ── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 10000;
    background: linear-gradient(90deg, #ff6b2b, #ef4444, #2563eb);
    transition: width 0.1s; pointer-events: none;
    box-shadow: 0 0 8px rgba(255,107,43,0.5);
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
})();


/* ── ACHIEVEMENT CARD SPARKLE BURST ── */
(function initAchievementSparkle() {
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const dist  = Math.random() * 70 + 30;
        const colors = ['#ff6b2b', '#2563eb', '#ef4444', '#f59e0b', '#60a5fa', '#fca5a5'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.cssText = `
          position: absolute;
          width: 5px; height: 5px;
          background: ${color};
          border-radius: 50%;
          top: 50%; left: 50%;
          pointer-events: none;
          z-index: 10;
          animation: spark-out 0.75s ease-out forwards;
          --tx: ${Math.cos(angle) * dist}px;
          --ty: ${Math.sin(angle) * dist}px;
          box-shadow: 0 0 6px ${color};
        `;
        card.style.overflow = 'hidden';
        card.appendChild(spark);
        setTimeout(() => spark.remove(), 750);
      }
    });
  });

  const sparkStyle = document.createElement('style');
  sparkStyle.textContent = `
    @keyframes spark-out {
      0%   { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); }
    }
  `;
  document.head.appendChild(sparkStyle);
})();


/* ── MAGNETIC BUTTON EFFECT ── */
(function initMagnetic() {
  document.querySelectorAll('.cta-primary, .cta-ghost, .btn-hire, .btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ── SKILL CATEGORY STAGGER ANIMATION ── */
(function initSkillStagger() {
  const categories = document.querySelectorAll('.skill-category');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  categories.forEach(cat => {
    cat.style.opacity = '0';
    cat.style.transform = 'translateY(30px)';
    cat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(cat);
  });
})();


/* ── PAGE LOAD ANIMATION ── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.7s ease';
    document.body.style.opacity = '1';
  });
})();


/* ── FLOATING PARTICLE TRAIL ON MOUSE ── */
(function initMouseTrail() {
  const trailColors = ['#ff6b2b', '#2563eb', '#ef4444', '#f59e0b'];
  let throttle = 0;

  document.addEventListener('mousemove', e => {
    if (Date.now() - throttle < 60) return;
    throttle = Date.now();

    const dot = document.createElement('div');
    const color = trailColors[Math.floor(Math.random() * trailColors.length)];
    dot.style.cssText = `
      position: fixed;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: ${color};
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9990;
      transform: translate(-50%, -50%);
      opacity: 0.7;
      animation: trail-fade 0.6s ease-out forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  });

  const trailStyle = document.createElement('style');
  trailStyle.textContent = `
    @keyframes trail-fade {
      0%   { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0) translateY(-20px); }
    }
  `;
  document.head.appendChild(trailStyle);
})();


/* ── SPEC CARD 3D TILT ── */
(function initSpecCardTilt() {
  document.querySelectorAll('.spec-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / (rect.height / 2)) * 8;
      const ry   = ((e.clientX - cx) / (rect.width  / 2)) * -8;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.06) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();


/* ── SECTION ENTRY FLASH HIGHLIGHT ── */
(function initSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed; inset: 0;
    pointer-events: none;
    z-index: 5;
    opacity: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(255,107,43,0.04), transparent 70%);
    transition: opacity 0.4s;
  `;
  document.body.appendChild(flash);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        flash.style.opacity = '1';
        setTimeout(() => { flash.style.opacity = '0'; }, 400);
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
})();
