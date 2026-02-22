// ============================================
//   SHREYA JAIN PORTFOLIO – script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top  = mouseY - 4 + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX - 16 + 'px';
    cursorRing.style.top  = ringY - 16 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on links/buttons
  const interactables = document.querySelectorAll('a, .btn, .skill-pill, .project-card, .icon-btn');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width  = '48px';
      cursorRing.style.height = '48px';
      cursorRing.style.borderColor = 'rgba(79,255,176,0.6)';
      cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width  = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.borderColor = 'rgba(79,255,176,0.4)';
      cursor.style.transform = 'scale(1)';
    });
  });

  // ── FADE-UP SCROLL ANIMATION ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── ACTIVE NAV HIGHLIGHT ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navObserver.observe(s));

  // ── TYPING EFFECT for role ──
  const roleEl = document.querySelector('.typing-role');
  if (roleEl) {
    const roles = [
      'Full Stack Developer',
      'MERN Stack Engineer',
      'Backend Systems Builder',
      'CS (AI & ML) Student',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function typeRole() {
      const current = roles[roleIdx];
      if (!deleting) {
        roleEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(typeRole, 1800);
          return;
        }
      } else {
        roleEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx  = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(typeRole, deleting ? 45 : 80);
    }
    typeRole();
  }

  // ── SKILL PILL hover glow (color-coded) ──
  document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.boxShadow = '0 0 20px rgba(79,255,176,0.08)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.boxShadow = '';
    });
  });

  // ── NAV SHADOW ON SCROLL ──
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 40) {
      nav.style.borderBottomColor = 'rgba(26,32,48,0.8)';
    } else {
      nav.style.borderBottomColor = 'rgba(26,32,48,0.6)';
    }
  });

});