/* =============================================
   RITVIK PORTFOLIO — JAVASCRIPT
   Animations, Interactions & Special Effects
   ============================================= */

'use strict';

/* ── CANVAS PARTICLE BACKGROUND ── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], connections = [], mouse = { x: -9999, y: -9999 };

  const COLORS = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(167,139,250,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - 0.5) * 0.35;
    this.vy    = (Math.random() - 0.5) * 0.35;
    this.r     = Math.random() * 1.8 + 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.2;
    this.life  = Math.random() * 200 + 100;
    this.age   = 0;
  };
  Particle.prototype.update = function () {
    const dx = mouse.x - this.x, dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 140) {
      const force = (140 - dist) / 140 * 0.4;
      this.vx -= (dx / dist) * force;
      this.vy -= (dy / dist) * force;
    }
    this.vx *= 0.99; this.vy *= 0.99;
    this.x += this.vx; this.y += this.vy;
    this.age++;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.age > this.life) this.reset();
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(W * H / 14000), 120);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const a = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = `rgba(124,58,237,${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
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

  document.querySelectorAll('a, button, .skill-pill, .project-card, .fact-card, .achievement-card').forEach(el => {
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

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
})();


/* ── TYPEWRITER EFFECT ── */
(function initTypewriter() {
  const el = document.getElementById('titleDynamic');
  const phrases = [
    'Full-Stack Apps',
    'Real-Time Systems',
    'AI-Powered Tools',
    'Scalable Backends',
    'Beautiful UIs',
    'E-Commerce Platforms',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 90);
  }
  type();
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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
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


/* ── COUNTER ANIMATION ── */
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


/* ── PROJECT CARD TILT EFFECT ── */
(function initTilt() {
  document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const rx    = ((e.clientY - cy) / (rect.height / 2)) * 4;
      const ry    = ((e.clientX - cx) / (rect.width  / 2)) * -4;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
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

  // Simulate send (replace with real EmailJS or backend call)
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


/* ── GLITCH EFFECT ON HERO NAME ── */
(function initGlitch() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;
  setInterval(() => {
    nameEl.style.textShadow = `
      ${Math.random() * 4 - 2}px 0 rgba(124,58,237,0.7),
      ${Math.random() * -4}px 0 rgba(6,182,212,0.5)
    `;
    setTimeout(() => { nameEl.style.textShadow = ''; }, 120);
  }, 4000);
})();


/* ── NAV ACTIVE STYLE ── */
(function addActiveNavStyle() {
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--text-primary); background: rgba(124,58,237,0.12); }`;
  document.head.appendChild(style);
})();


/* ── SCROLL PROGRESS BAR ── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 10000;
    background: linear-gradient(90deg, #7c3aed, #06b6d4);
    transition: width 0.1s; pointer-events: none;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
})();


/* ── FLOATING PARTICLES ON ACHIEVEMENT HOVER ── */
(function initAchievementSparkle() {
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const dist  = Math.random() * 60 + 30;
        spark.style.cssText = `
          position: absolute;
          width: 4px; height: 4px;
          background: hsl(${Math.random() * 80 + 240}, 90%, 70%);
          border-radius: 50%;
          top: 50%; left: 50%;
          pointer-events: none;
          z-index: 10;
          animation: spark-out 0.7s ease-out forwards;
          --tx: ${Math.cos(angle) * dist}px;
          --ty: ${Math.sin(angle) * dist}px;
        `;
        card.style.overflow = 'hidden';
        card.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
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


/* ── PAGE LOAD ANIMATION ── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  });
})();
