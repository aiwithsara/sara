// ===== Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .stagger-children').forEach(el => {
    fadeInObserver.observe(el);
});

// Add fade-in class to section elements
document.querySelectorAll('.section-header, .skill-card, .timeline-item, .event-card, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// ===== Skill Cards Stagger Animation =====
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skillsGrid.classList.add('stagger-children');
    fadeInObserver.observe(skillsGrid);
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Typing Effect for Hero (Optional Enhancement) =====
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Stats Counter Animation =====
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                setTimeout(updateCount, stepTime);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCount();
    });
}

// Trigger stats animation when hero section is in view
const heroSection = document.querySelector('.hero');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (heroSection) {
    statsObserver.observe(heroSection);
}

// ===== Parallax Effect for Background Shapes =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Console Welcome Message =====
console.log('%c👋 Welcome to Saraswathy\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cBuilt with passion for creating memorable experiences.', 'font-size: 14px; color: #f97316;');

// ===== Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// ===== 3D Tilt Effect for Cards =====
const tiltCards = document.querySelectorAll('.skill-card, .event-card, .testimonial-card');

tiltCards.forEach(card => {
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

// ===== Ripple Effect on Buttons =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.classList.add('ripple');
    
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Magnetic Button Effect =====
const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Text Reveal Animation =====
const textReveals = document.querySelectorAll('.text-reveal');
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

textReveals.forEach(el => textRevealObserver.observe(el));

// ===== Video Card Click Handler =====
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        // In a real implementation, this would open a video modal
        // For now, we'll add a visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Alert placeholder - replace with actual video modal
        console.log('Video clicked - implement video modal here');
    });
});

// ===== Smooth Section Highlighting =====
const allSections = document.querySelectorAll('section[id]');
const observerConfig = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerConfig);

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const eventType = formData.get('eventType');
        const message = formData.get('message');
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Event Inquiry: ${eventType || 'General'}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Event Type: ${eventType || 'Not specified'}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:saraswathykasi30@gmail.com?subject=${subject}&body=${body}`;
        
        // Visual feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Opening email client...</span>';
        submitBtn.disabled = true;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '✓ Email client opened! Please send the email to complete your inquiry.';
            successMsg.style.cssText = `
                background: rgba(34, 197, 94, 0.1);
                border: 1px solid rgba(34, 197, 94, 0.3);
                color: #22c55e;
                padding: 12px 16px;
                border-radius: 12px;
                margin-top: 16px;
                font-size: 0.9rem;
                text-align: center;
            `;
            
            const existingMsg = this.querySelector('.form-success');
            if (existingMsg) existingMsg.remove();
            
            this.appendChild(successMsg);
            
            // Remove message after 5 seconds
            setTimeout(() => successMsg.remove(), 5000);
        }, 1000);
    });
}

// ===== Form Input Animations =====
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
