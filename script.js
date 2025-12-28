// ========================================
// PARTICLES BACKGROUND
// ========================================
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// ========================================
// TYPING EFFECT
// ========================================
function typeWriter() {
  const text = `const developer = {
  name: 'Arthur',
  skills: ['HTML', 'CSS', 'JS'],
  passion: 'criar experiências'
};`;
  
  const element = document.querySelector('.typing-text');
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent = text.substring(0, i + 1);
      i++;
      setTimeout(type, 50);
    }
  }
  
  type();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
              progressBar.style.width = width;
            }, 200);
          }
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function setupNavbarScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.background = 'rgba(10, 10, 15, 0.95)';
      header.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.1)';
    } else {
      header.style.background = 'rgba(10, 10, 15, 0.8)';
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// ACTIVE NAV LINK
// ========================================
function setupActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
}

// ========================================
// MOBILE MENU
// ========================================
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// ========================================
// TILT EFFECT FOR PROJECT CARDS
// ========================================
function setupTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// CURSOR TRAIL EFFECT
// ========================================
function setupCursorTrail() {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function setupScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  `;
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  `;

  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
  });
}

// ========================================
// LOADING ANIMATION
// ========================================
function setupLoadingAnimation() {
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });
}

// ========================================
// PROJECT CARDS HOVER EFFECT
// ========================================
function setupProjectCardsEffect() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      projectCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.opacity = '0.5';
          otherCard.style.filter = 'blur(2px)';
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      projectCards.forEach(otherCard => {
        otherCard.style.opacity = '1';
        otherCard.style.filter = 'blur(0)';
      });
    });
  });
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  typeWriter();
  setupScrollAnimations();
  setupNavbarScroll();
  setupActiveNavLink();
  setupMobileMenu();
  setupTiltEffect();
  setupSmoothScroll();
  setupCursorTrail();
  setupScrollToTop();
  setupLoadingAnimation();
  setupProjectCardsEffect();
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
let ticking = false;

function requestTick(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Recalculate any size-dependent values here
}, 250));