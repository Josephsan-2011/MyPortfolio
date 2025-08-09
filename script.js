// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll - maintaining dark theme
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.7)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.4)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .service-card, .stat-item, .contact-method');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (in a real app, you'd send this to a server)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to your server
        // For now, we'll just log it to the console
        console.log('Contact Form Submission:', {
            name,
            email,
            phone,
            message
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Only run typing animation if it hasn't been run before
        if (!sessionStorage.getItem('typingAnimationComplete')) {
            typeWriter(heroTitle, originalText, 50);
            sessionStorage.setItem('typingAnimationComplete', 'true');
        }
    }
});

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero section parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Floating card parallax
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        const cardRate = scrolled * 0.2;
        floatingCard.style.transform = `translateY(${cardRate}px)`;
    }
    
    // Service cards parallax
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const cardRate = scrolled * (0.1 + index * 0.02);
        card.style.transform = `translateY(${cardRate}px)`;
    });
    
    // About cards parallax
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        const cardRate = scrolled * (0.05 + index * 0.03);
        card.style.transform = `translateY(${cardRate}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

document.head.appendChild(loadingStyles);

// Enhanced interactive elements with Apple-like animations
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Add hover effect to stats with smooth transitions
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Add smooth hover effects to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Add floating animation to the globe icon
    const globeIcon = document.querySelector('.floating-card i');
    if (globeIcon) {
        globeIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        globeIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Add futuristic space shuttle effects
document.addEventListener('DOMContentLoaded', () => {
    // Logo interaction
    const logoTexts = document.querySelectorAll('.logo-text, .footer-logo-text');
    logoTexts.forEach(logo => {
        logo.addEventListener('click', () => {
            showNotification('🚀 Mission Control: Joseph San Systems Online! 🚀', 'success');
            logo.style.transform = 'scale(1.2) rotate(10deg)';
            logo.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // Astronaut interaction
    const astronaut = document.querySelector('.astronaut');
    if (astronaut) {
        astronaut.addEventListener('click', () => {
            showNotification('👨‍🚀 Greetings from space! Ready to build amazing websites together! 🚀', 'success');
            astronaut.style.transform = 'scale(1.3) rotate(360deg)';
            astronaut.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                astronaut.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
        
        // Make astronaut cursor pointer to show it's clickable
        astronaut.style.cursor = 'pointer';
    }
    
    const globeIcon = document.querySelector('.floating-card i');
    if (globeIcon) {
        globeIcon.addEventListener('click', () => {
            showNotification('🚀 Initiating space shuttle protocols! Ready for launch! 🚀', 'success');
            // Add rocket launch effect
            globeIcon.style.transform = 'scale(1.5) rotate(360deg)';
            globeIcon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                globeIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }
    
    // Add scanning line effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ffff, transparent);
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
                animation: scan 1s ease-in-out;
                z-index: 10;
            `;
            this.appendChild(scanLine);
            
            setTimeout(() => {
                scanLine.remove();
            }, 1000);
        });
    });
    
    // Add holographic effect to stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'hologram 2s ease-in-out infinite';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
});

// Add CSS for new animations
const futuristicStyles = document.createElement('style');
futuristicStyles.textContent = `
    @keyframes scan {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(100%); opacity: 0; }
    }
    
    @keyframes hologram {
        0%, 100% { 
            box-shadow: 
                0 10px 30px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(0, 255, 255, 0.2) inset,
                0 0 30px rgba(0, 255, 255, 0.1);
        }
        50% { 
            box-shadow: 
                0 10px 30px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(0, 255, 255, 0.4) inset,
                0 0 50px rgba(0, 255, 255, 0.4),
                0 0 100px rgba(0, 255, 255, 0.2);
        }
    }
    
    .floating-card {
        animation: float 8s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        0% { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 255, 255, 0.2) inset, 0 0 30px rgba(0, 255, 255, 0.1); }
        100% { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 255, 255, 0.4) inset, 0 0 50px rgba(0, 255, 255, 0.3); }
    }
`;

document.head.appendChild(futuristicStyles);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on form inputs submits the form
    if (e.key === 'Enter' && e.target.matches('input, textarea')) {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Add some personality with futuristic space messages
const motivationalMessages = [
    "🚀 Initiating launch sequence! Dream big, code bigger! 🚀",
    "🌌 From Iowa to the stars! Mission control, we have liftoff! 🌌",
    "💻 Building digital spacecrafts, one website at a time! 💻",
    "✨ Age is just a number, innovation is everything! ✨",
    "🌐 Connecting galaxies through code! 🌐",
    "🔮 Future technology, present skills! 🔮",
    "⚡ Powering the digital universe! ⚡"
];

// Show a random motivational message every 30 seconds
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every 30 seconds
        const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        showNotification(randomMessage, 'info');
    }
}, 30000);
