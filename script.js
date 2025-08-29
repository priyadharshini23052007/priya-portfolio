// script.js
document.addEventListener('DOMContentLoaded', function () {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // smooth scroll for nav links
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.remove('show'); // close on mobile
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // update active nav while scrolling
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));

  // animate skill bars when they appear
  const skillFills = document.querySelectorAll('.skill-fill');
  const sObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = el.getAttribute('data-percent') || '80';
        el.style.width = pct + '%';
        sObserver.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(f => sObserver.observe(f));

  // simple contact form handling (no backend) - just client validation and friendly message
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      return;
    }

    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = 'Please provide a valid email address.';
      return;
    }

    // pretend sending
    status.textContent = 'Message ready to send (demo). Thank you — I will reply soon!';
    form.reset();
  });
});
