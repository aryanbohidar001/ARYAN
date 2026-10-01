document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING EFFECT
  const roles = [
    'Software Developer',
    'CSE Undergraduate',
    'Full-Stack Engineer',
    'Backend Specialist',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextElement = document.getElementById('typed-text');

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1800; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
  }

  if (typedTextElement) {
    typeRole();
  }

  // 2. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 180) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. INTERSECTION OBSERVER SCROLL REVEAL
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach((sec) => {
    revealObserver.observe(sec);
  });

  // 4. DESKTOP 3D TILT EFFECT ON PROJECT CARDS
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth > 992) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // 5. SKILL TABS FILTERING
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillBadges = document.querySelectorAll('.skill-badge');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      skillBadges.forEach((badge) => {
        if (category === 'all' || badge.dataset.category === category) {
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      });
    });
  });

  // 6. COPY EMAIL BUTTON
  const copyBtn = document.getElementById('copy-btn');
  const emailText = document.getElementById('email-text');
  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // 7. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = 'Sending message...';
      formStatus.style.color = 'var(--primary-cyan)';

      setTimeout(() => {
        formStatus.textContent = '✓ Message sent successfully! Thanks for reaching out.';
        formStatus.style.color = '#10b981';
        contactForm.reset();
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }, 1000);
    });
  }

  // 8. THEME TOGGLE (LIGHT / DARK)
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('pure_theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      document.documentElement.classList.toggle('dark', !isLight);
      localStorage.setItem('pure_theme', isLight ? 'light' : 'dark');
    });
  }
});
