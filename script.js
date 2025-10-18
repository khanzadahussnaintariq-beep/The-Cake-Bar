// Global variables
let currentRating = 0;
let lines = [];
let lineTimeout;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize star rating
    initializeStarRating();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize forms
    initializeForms();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Update active nav on scroll
    updateNavOnScroll();
    
    // Initialize image modal
    initializeImageModal();
    
    // Initialize dynamic background animation (Innovasynx style)
    initializeDynamicBackground();
    
    // Initialize interactive lines
    initializeInteractiveLines();
});

// Dynamic Background Animation - Similar to Innovasynx
function initializeDynamicBackground() {
    const dynamicBg = document.getElementById('dynamicBackground');
    
    // Create floating geometric shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random shape type
        const shapeTypes = ['circle', 'square', 'triangle'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 60 + 20}px;
            height: ${Math.random() * 60 + 20}px;
            background: rgba(${139 + Math.random() * 100}, ${111 + Math.random() * 50}, ${71 + Math.random() * 30}, 0.1);
            border-radius: ${shapeType === 'circle' ? '50%' : shapeType === 'triangle' ? '0' : '10px'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatShape ${15 + Math.random() * 20}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
            backdrop-filter: blur(1px);
        `;
        
        if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = '15px solid transparent';
            shape.style.borderRight = '15px solid transparent';
            shape.style.borderBottom = `30px solid rgba(${139 + Math.random() * 100}, ${111 + Math.random() * 50}, ${71 + Math.random() * 30}, 0.1)`;
            shape.style.width = '0';
            shape.style.height = '0';
        }
        
        dynamicBg.appendChild(shape);
    }
    
    // Add CSS animation for floating shapes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatShape {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 0.3;
            }
            25% { 
                transform: translate(50px, -30px) rotate(90deg) scale(1.1);
                opacity: 0.6;
            }
            50% { 
                transform: translate(-30px, -60px) rotate(180deg) scale(0.9);
                opacity: 0.4;
            }
            75% { 
                transform: translate(-60px, 30px) rotate(270deg) scale(1.2);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mouse interaction effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create ripple effect
        createRipple(mouseX, mouseY);
    });
    
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: rippleEffect 2s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        dynamicBg.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 2000);
    }
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Interactive Lines Animation - Fixed for dark/light mode
function initializeInteractiveLines() {
    const linesContainer = document.getElementById('interactiveLines');
    
    // Create lines
    for (let i = 0; i < 50; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.width = Math.random() * 100 + 50 + 'px';
        line.style.height = '2px';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.opacity = '0';
        linesContainer.appendChild(line);
        lines.push(line);
    }
    
    // Mouse move event
    document.addEventListener('mousemove', function(e) {
        // Clear previous timeout
        clearTimeout(lineTimeout);
        
        // Show lines near cursor
        const rect = document.body.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        lines.forEach(line => {
            const lineRect = line.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - lineRect.left, 2) + 
                Math.pow(mouseY - lineRect.top, 2)
            );
            
            if (distance < 200) {
                // Use dark brown color for both light and dark modes
                line.style.background = '#8b6f47';
                line.style.opacity = Math.max(0.1, 0.5 - distance / 400);
            } else {
                line.style.opacity = '0';
            }
        });
        
        // Set timeout to hide lines
        lineTimeout = setTimeout(() => {
            lines.forEach(line => {
                line.style.opacity = '0';
            });
        }, 1000);
    });
}

// Image Modal functionality
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    // Add click events to all images with zoom effect
    document.querySelectorAll('.special-item-image img, .menu-item-image img, .payment-option-image img, .logo-image img, .gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth scrolling for all anchor links
function initializeSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Update active navigation on scroll
function updateNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Mobile menu functionality - Fixed
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        toggleIcon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            toggleIcon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            toggleIcon.className = 'fas fa-bars';
        }
    });
}

// Star rating functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStarDisplay();
        });

        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            updateStarDisplay(hoverRating);
        });
    });

    document.querySelector('.star-rating').addEventListener('mouseleave', function() {
        updateStarDisplay();
    });

    function updateStarDisplay(hoverRating = null) {
        const rating = hoverRating || currentRating;
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRating === 0) {
                showNotification('Please select a rating before submitting.', 'error');
                return;
            }
            
            // Add new review to the page
            const name = document.getElementById('reviewName').value;
            const text = document.getElementById('reviewText').value;
            addNewReview(name, currentRating, text);
            
            showNotification('Thank you for your review!');
            this.reset();
            currentRating = 0;
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
            });
        });
    }
}

// Add new review to the page
function addNewReview(name, rating, text) {
    const reviewsContainer = document.querySelector('.reviews-track');
    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    newReview.innerHTML = `
        <div class="review-header">
            <span class="reviewer-name">${name}</span>
            <span class="review-stars">${stars}</span>
        </div>
        <p class="review-text">"${text}"</p>
    `;
    
    reviewsContainer.appendChild(newReview);
    
    // Animate the new review
    setTimeout(() => {
        newReview.classList.add('animate');
    }, 100);
}

// Login functionality
function openLogin() {
    // Create login modal
    const loginModal = document.createElement('div');
    loginModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: var(--white); padding: 3rem; border-radius: 25px; box-shadow: 0 20px 60px var(--shadow); max-width: 400px; width: 90%; position: relative;">
                <button onclick="this.closest('div').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: var(--text-light); cursor: pointer;">×</button>
                <h2 style="color: var(--dark-brown); margin-bottom: 2rem; text-align: center;">Login to The Cake Bar</h2>
                <form id="loginForm">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Email</label>
                        <input type="email" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Password</label>
                        <input type="password" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">Login</button>
                    <p style="text-align: center; color: var(--text-light); font-size: 0.9rem;">Don't have an account? <a href="#" onclick="openSignup(); this.closest('div').remove();" style="color: var(--light-brown); text-decoration: none; font-weight: 500;">Sign up here</a></p>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(loginModal);
    
    // Handle login form submission
    const loginForm = loginModal.querySelector('#loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Login successful! Welcome back to The Cake Bar.');
        loginModal.remove();
    });
}

// Signup functionality
function openSignup() {
    const signupModal = document.createElement('div');
    signupModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: var(--white); padding: 3rem; border-radius: 25px; box-shadow: 0 20px 60px var(--shadow); max-width: 400px; width: 90%; position: relative; max-height: 90vh; overflow-y: auto;">
                <button onclick="this.closest('div').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: var(--text-light); cursor: pointer;">×</button>
                <h2 style="color: var(--dark-brown); margin-bottom: 2rem; text-align: center;">Join The Cake Bar</h2>
                <form id="signupForm">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Full Name</label>
                        <input type="text" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Email</label>
                        <input type="email" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Phone Number</label>
                        <input type="tel" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Password</label>
                        <input type="password" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 500;">Confirm Password</label>
                        <input type="password" required style="width: 100%; padding: 1rem; border: 2px solid var(--secondary-cream); border-radius: 15px; font-family: inherit; background: var(--primary-cream); color: var(--text-dark);">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">Create Account</button>
                    <p style="text-align: center; color: var(--text-light); font-size: 0.9rem;">Already have an account? <a href="#" onclick="openLogin(); this.closest('div').remove();" style="color: var(--light-brown); text-decoration: none; font-weight: 500;">Login here</a></p>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(signupModal);
    
    // Handle signup form submission
    const signupForm = signupModal.querySelector('#signupForm');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const passwords = this.querySelectorAll('input[type="password"]');
        if (passwords[0].value !== passwords[1].value) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        showNotification('Account created successfully! Welcome to The Cake Bar.');
        signupModal.remove();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'error' ? '#e74c3c' : 'var(--light-brown)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px var(--shadow-hover);
        z-index: 10001;
        font-weight: 500;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Enhanced scroll effects for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(212, 165, 116, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = '0 5px 30px var(--shadow-hover)';
    } else {
        header.style.background = 'rgba(212, 165, 116, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px var(--shadow)';
    }
    
    // Dark mode header adjustments
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(139, 111, 71, 0.98)';
        } else {
            header.style.background = 'rgba(139, 111, 71, 0.95)';
        }
    }
});

console.log('🎂 The Cake Bar website loaded successfully!');
console.log('✨ Enhanced Features: Dynamic background animation, horizontal scrolling menus, optimized sections, and more!');
console.log('🌟 Background animation inspired by Innovasynx - Interactive geometric shapes and mouse effects!');