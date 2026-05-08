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
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/B1KkpgABfPleeIPoYy8x/webhook-trigger/bJivOdKvcs65nQRqpR2B';

if (heroForm) {
  heroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = heroForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Create FormData object
    const formData = new FormData();
    
    // Add text fields
    const inputs = heroForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
      // Get the label text for the key name
      const label = input.previousElementSibling ? input.previousElementSibling.textContent.replace(' *', '') : input.placeholder;
      formData.append(label, input.value);
    });
    
    // Add files
    if (cvInput.files.length > 0) {
      formData.append('CV', cvInput.files[0]);
    }
    if (paymentInput.files.length > 0) {
      formData.append('Payment Screenshot', paymentInput.files[0]);
    }
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Use no-cors if the webhook doesn't support CORS, but FormData might be limited
      });
      
      // Note: with no-cors, we can't check response.ok, so we assume success if no error is thrown
      alert('Success! Your booking request has been sent. We will contact you soon.');
      heroForm.reset();
      cvText.textContent = 'Click to upload';
      paymentText.textContent = 'Click to upload';
      cvText.style.color = 'var(--text-muted)';
      paymentText.style.color = 'var(--text-muted)';
      
    } catch (error) {
      console.error('Webhook Error:', error);
      alert('There was an issue sending your request. Please try again or contact us directly.');
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

// File Upload Display
const cvInput = document.getElementById('cv-input');
const paymentInput = document.getElementById('payment-input');
const cvText = document.getElementById('cv-text');
const paymentText = document.getElementById('payment-text');

if (cvInput) {
  cvInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      cvText.textContent = e.target.files[0].name;
      cvText.style.color = 'var(--primary)';
    }
  });
}

if (paymentInput) {
  paymentInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      paymentText.textContent = e.target.files[0].name;
      paymentText.style.color = 'var(--primary)';
    }
  });
}

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
