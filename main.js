// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission Handling
const heroForm = document.getElementById('heroSessionForm');

if (heroForm) {
  heroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = heroForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Thank you! Your booking request has been submitted. Our team will verify your payment and contact you shortly.');
      heroForm.reset();
      
    } catch (error) {
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// Glass Card Mouse Glow Effect
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Add shadow to nav on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(255, 255, 255, 0.8)';
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    nav.style.position = 'fixed';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.boxShadow = 'none';
    nav.style.position = 'absolute';
  }
});
