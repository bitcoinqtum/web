// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize the website
function init() {
    // Set up navigation
    setupNavigation();
    
    // Set up mobile menu toggle
    setupMobileMenu();
    
    // Set initial active page based on URL hash or default to welcome
    const hash = window.location.hash.substring(1);
    const initialPage = hash || 'welcome';
    switchPage(initialPage);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            if (['welcome', 'introduction', 'contact'].includes(targetId)) {
                e.preventDefault();
                switchPage(targetId);
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchPage(hash);
        }
    });
    
    // Add some interactive effects
    addInteractiveEffects();
    
    console.log('BitcoinQ website initialized successfully');
}

// Set up navigation links
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
            
            // Update URL hash
            history.pushState(null, null, `#${pageId}`);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Set up mobile menu toggle
function setupMobileMenu() {
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update menu icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Switch between pages
function switchPage(pageId) {
    // Validate pageId
    const validPages = ['welcome', 'introduction', 'contact'];
    if (!validPages.includes(pageId)) {
        console.warn(`Invalid page ID: ${pageId}, defaulting to welcome`);
        pageId = 'welcome';
    }
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Log page change for debugging
    console.log(`Switched to page: ${pageId}`);
}

// Add interactive effects
function addInteractiveEffects() {
    // Add hover effect to info boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // In a real implementation, this would link to social media
            console.log('Social icon clicked - would navigate to social media page');
        });
    });
    
    // Add loading animation to GIF
    const welcomeGif = document.querySelector('.welcome-gif');
    if (welcomeGif) {
        welcomeGif.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        // Set initial opacity to 0 for fade-in effect
        welcomeGif.style.opacity = '0';
    }
    
    // Process email obfuscation
    processEmailObfuscation();
}

// Process email obfuscation to prevent bot scraping
function processEmailObfuscation() {
    const emailLink = document.querySelector('.email-link');
    if (!emailLink) return;
    
    const obfuscatedEmail = emailLink.getAttribute('data-email-obfuscated');
    if (!obfuscatedEmail) return;
    
    // Decode the obfuscated email
    const decodedEmail = obfuscatedEmail
        .replace(/\[at\]/g, '@')
        .replace(/\[dot\]/g, '.');
    
    // Update the link text and href
    emailLink.textContent = decodedEmail;
    emailLink.href = `mailto:${decodedEmail}`;
    
    // Add typing effect to email (optional)
    const originalText = emailLink.textContent;
    emailLink.addEventListener('mouseenter', function() {
        this.textContent = 'Click to email us!';
    });
    
    emailLink.addEventListener('mouseleave', function() {
        this.textContent = originalText;
    });
    
    console.log('Email obfuscation processed successfully');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for debugging (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        switchPage,
        setupNavigation
    };
}
