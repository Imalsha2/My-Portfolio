// Enhanced smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Special handling for Skills tab
        if (this.getAttribute('data-tab') === 'skills-info') {
            // First scroll to resume section
            const resumeSection = document.querySelector('#resume');
            if (resumeSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = resumeSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Then activate the skills tab after a delay
                setTimeout(() => {
                    const skillsTab = document.querySelector('.tab-btn[data-tab="skills-info"]');
                    if (skillsTab) {
                        skillsTab.click();
                    }
                }, 500);
            }
        } else if (targetSection) {
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            // Smooth scroll to target position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Update active state
        updateActiveNavLink(this);
    });
});

// Function to update active navigation link
function updateActiveNavLink(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the specified link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Intersection Observer for section highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSectionId = entry.target.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.navbar a[href="#${currentSectionId}"]`);
            
            if (correspondingNavLink) {
                updateActiveNavLink(correspondingNavLink);
            }
        }
    });
}, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0.1
});

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// About section tabs functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Enhanced header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update scroll progress indicator
    updateScrollProgress();
    
    // Update back to top button visibility
    updateBackToTopButton();
});

// Function to update scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
}

// Function to update back to top button visibility
function updateBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        const scrolled = window.scrollY > 500;
        
        if (scrolled) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth entrance animation for elements
window.addEventListener('load', function() {
    const homeContent = document.querySelector('.home-content');
    const homeImg = document.querySelector('.home-img');
    
    if (homeContent && homeImg) {
        homeContent.style.opacity = '0';
        homeContent.style.transform = 'translateY(40px) scale(0.95)';
        homeImg.style.opacity = '0';
        homeImg.style.transform = 'translateY(40px) scale(0.95)';
        
        setTimeout(() => {
            homeContent.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            homeContent.style.opacity = '1';
            homeContent.style.transform = 'translateY(0) scale(1)';
            
            homeImg.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            homeImg.style.opacity = '1';
            homeImg.style.transform = 'translateY(0) scale(1)';
        }, 500);
    }
});

// Enhanced page initialization with smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize page transitions
    initializePageTransitions();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Initialize contact form
    initializeContactForm();
    
    // Set initial active navigation state
    updateActiveNavOnLoad();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize skill animations
    initializeSkillAnimations();
});

// Function to initialize scroll-based animations with Samasha-style
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add elegant reveal animation
                const elements = entry.target.querySelectorAll(
                    '.project-card, .stat-item, .contact-item, .skill-category, .about-details, .timeline-item'
                );
                
                elements.forEach((el, index) => {
                    el.classList.add('content-reveal');
                    
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 100);
                });
                
                entry.target.classList.add('section-active');
            }
        });
    }, observerOptions);
    
    // Observe all sections for smooth reveals
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize intersection observer for elegant element reveals
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('samasha-reveal', 'animate');
            }
        });
    }, {
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.1
    });
    
    // Observe individual elements
    const animateElements = document.querySelectorAll(
        '.project-card, .stat-item, .contact-item, .skill-category, .about-details'
    );
    
    animateElements.forEach(el => {
        elementObserver.observe(el);
    });
}

// Function to initialize page transitions with Samasha-style animations
function initializePageTransitions() {
    // Enhanced navigation with smooth transitions
    document.querySelectorAll('.navbar a').forEach(link => {
        // Remove existing listeners by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update navigation state immediately
                updateActiveNavLink(this);
                
                // Start smooth scroll with elegant timing
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Use smooth scroll behavior
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Trigger content reveal animations after scroll
                setTimeout(() => {
                    animateSamashaStyleContent(targetSection);
                }, 400);
            }
        });
    });
}

// Function to animate content with Samasha-style elegance
function animateSamashaStyleContent(targetSection) {
    if (targetSection) {
        // Get all animatable elements in the target section
        const elements = targetSection.querySelectorAll(
            '.project-card, .stat-item, .skill-category, .contact-item, .about-details, .timeline-item, .skill-item, h1, h2, h3, p'
        );
        
        // Reset and prepare elements for elegant reveal
        elements.forEach((el, index) => {
            el.classList.add('samasha-reveal');
            
            // Reset styles
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) rotateX(10deg)';
            el.style.filter = 'blur(2px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            
            // Animate each element with elegant staggered timing
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) rotateX(0deg)';
                el.style.filter = 'blur(0px)';
                el.classList.add('animate');
            }, index * 100 + 200);
        });
        
        // Special handling for headers and important text
        const headers = targetSection.querySelectorAll('h1, h2, h3, .section-title');
        headers.forEach((header, index) => {
            header.classList.add('text-reveal');
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.classList.add('animate');
            }, index * 50 + 100);
        });
        
        // Add elegant card hover effects
        const cards = targetSection.querySelectorAll('.project-card, .skill-category, .contact-item');
        cards.forEach(card => {
            card.classList.add('elegant-card');
        });
    }
}

// Function to initialize skill hover animations
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Function to initialize mobile navigation
function initializeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle && navbar) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navbar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on navigation links
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Function to initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigate with arrow keys
        if (e.ctrlKey || e.metaKey) {
            const sections = ['home', 'resume', 'projects', 'contacts'];
            const activeLink = document.querySelector('.navbar a.active');
            const currentHref = activeLink ? activeLink.getAttribute('href') : '#home';
            const currentIndex = sections.findIndex(section => currentHref === `#${section}`);
            
            let nextIndex = currentIndex;
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                nextIndex = currentIndex + 1;
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                nextIndex = currentIndex - 1;
            }
            
            if (nextIndex !== currentIndex) {
                const nextSection = sections[nextIndex];
                const nextLink = document.querySelector(`.navbar a[href="#${nextSection}"]`);
                if (nextLink) {
                    nextLink.click();
                }
            }
        }
    });
}

// Function to initialize navigation behavior
function initializeNavigation() {
    // Add click listeners to navigation links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active state
            updateActiveNavLink(this);
        });
    });
}

// Function to set initial active nav state
function updateActiveNavOnLoad() {
    const currentHash = window.location.hash || '#home';
    const activeLink = document.querySelector(`.navbar a[href="${currentHash}"]`);
    
    if (activeLink) {
        updateActiveNavLink(activeLink);
    } else {
        // Default to home if no hash or invalid hash
        const homeLink = document.querySelector('.navbar a[href="#home"]');
        if (homeLink) {
            updateActiveNavLink(homeLink);
        }
    }
}

// Function to initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello! I'm ${name}.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/94769264200?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Message sent via WhatsApp!');
        });
    }
}

// Download CV function
function downloadCVFile() {
    // Set the CV file path - Updated to match your actual CV file
    const cvFilePath = './files/Imalsha Hansinee - SE.pdf';
    const cvFileName = 'Imalsha Hansinee-CV.pdf';
    
    // Get the download button
    const downloadBtn = document.querySelector('.cv-download');
    const originalText = downloadBtn.innerHTML;
    
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        
        // Set the file path and download name
        link.href = cvFilePath;
        link.download = cvFileName;
        link.style.display = 'none';
        
        // Add the link to the document
        document.body.appendChild(link);
        
        // Trigger the download
        link.click();
        
        // Remove the link from the document
        document.body.removeChild(link);
        
        // Show success message
        downloadBtn.innerHTML = '<i class="bx bx-check"></i> Downloaded!';
        downloadBtn.style.background = 'linear-gradient(135deg, #00cc6a, #009954)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        }, 2000);
        
    } catch (error) {
        console.error('CV download failed:', error);
        
        // Show error message
        downloadBtn.innerHTML = '<i class="bx bx-error"></i> CV Not Found';
        downloadBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a5a)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        }, 3000);
    }
}