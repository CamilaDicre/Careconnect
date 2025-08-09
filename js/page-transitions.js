// Page Transitions & Logout Management for Careconnect

// Prevenir redeclaración
if (typeof PageTransitions === 'undefined') {
class PageTransitions {
    constructor() {
        this.transitionOverlay = null;
        this.logoutOverlay = null;
        this.init();
    }

    init() {
        this.createTransitionOverlay();
        this.createLogoutOverlay();
        this.bindEvents();
    }

    createTransitionOverlay() {
        this.transitionOverlay = document.createElement('div');
        this.transitionOverlay.className = 'page-transition-overlay';
        
        // Create floating particles
        const particles = Array.from({length: 12}, (_, i) => 
            `<div class="floating-particle" style="
                top: ${Math.random() * 100}%; 
                left: ${Math.random() * 100}%; 
                animation-delay: ${Math.random() * 4}s;
                animation-duration: ${3 + Math.random() * 2}s;
            "></div>`
        ).join('');
        
        this.transitionOverlay.innerHTML = `
            ${particles}
            <div class="page-transition-content">
                <div class="page-transition-spinner"></div>
                <h3>Cargando...</h3>
                <p>Preparando tu experiencia Careconnect</p>
            </div>
        `;
        document.body.appendChild(this.transitionOverlay);
    }

    createLogoutOverlay() {
        // Detectar ruta correcta basada en la ubicación actual
        const isInPages = window.location.pathname.includes('/pages/');
        const isInDashboard = window.location.pathname.includes('/dashboard/');
        const isInCaregiverPro = window.location.pathname.includes('/caregivers pro/');
        
        let homeLink, loginLink;
        if (isInCaregiverPro) {
            homeLink = '../../index.html';
            loginLink = '../../pages/login.html';
        } else if (isInDashboard) {
            homeLink = '../index.html';
            loginLink = '../pages/login.html';
        } else if (isInPages) {
            homeLink = '../index.html';
            loginLink = 'login.html';
        } else {
            homeLink = 'index.html';
            loginLink = 'pages/login.html';
        }
        
        this.logoutOverlay = document.createElement('div');
        this.logoutOverlay.className = 'logout-overlay';
        this.logoutOverlay.innerHTML = `
            <div class="logout-modal">
                <div class="logout-icon">👋</div>
                <h2 class="logout-title">See you soon!</h2>
                <p class="logout-message">
                    Thank you for using Careconnect. We hope you had a great experience and look forward to seeing you again soon!
                </p>
                <div class="logout-actions">
                    <a href="${homeLink}" class="logout-btn">Return to Homepage</a>
                    <a href="${loginLink}" class="logout-btn">Sign In Again</a>
                </div>
            </div>
        `;
        document.body.appendChild(this.logoutOverlay);
    }

    bindEvents() {
        // Handle all internal links for smooth transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            // Skip if it's a logout overlay button
            if (link && link.classList.contains('logout-btn')) {
                return; // Let the normal href handle it
            }
            if (link && this.isInternalLink(link.href)) {
                e.preventDefault();
                this.navigateToPage(link.href);
            }
        });

        // Handle logout buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-logout]') || 
                e.target.closest('[data-logout]') ||
                e.target.textContent.toLowerCase().includes('logout') ||
                e.target.textContent.toLowerCase().includes('sign out')) {
                e.preventDefault();
                this.showLogoutTransition();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.hideTransitionOverlay();
        });
    }

    isInternalLink(href) {
        return href && (
            href.startsWith(window.location.origin) ||
            href.startsWith('./') ||
            href.startsWith('../') ||
            href.startsWith('/') ||
            href.startsWith('pages/') ||
            href.startsWith('dashboard/')
        );
    }

    async navigateToPage(url) {
        try {
            this.showTransitionOverlay();
            
            // Simulate loading time for better UX (shorter delay)
            await this.delay(500);
            
            // Update browser history
            window.history.pushState({}, '', url);
            
            // Load the new page
            const response = await fetch(url);
            const html = await response.text();
            
            // Parse the new page
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Update page title
            document.title = newDoc.title;
            
            // Update main content
            const newMain = newDoc.querySelector('main') || newDoc.body;
            const currentMain = document.querySelector('main') || document.body;
            
            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
            }
            
            // Update any scripts
            this.updateScripts(newDoc);
            
            // Hide transition overlay
            this.hideTransitionOverlay();
            
            // Trigger page load event
            window.dispatchEvent(new CustomEvent('pageLoaded'));
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.hideTransitionOverlay();
            // Fallback to normal navigation
            window.location.href = url;
        }
    }

    updateScripts(newDoc) {
        // Update any necessary scripts or components
        const newScripts = newDoc.querySelectorAll('script');
        newScripts.forEach(script => {
            if (script.src && !document.querySelector(`script[src="${script.src}"]`)) {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.head.appendChild(newScript);
            }
        });
    }

    showTransitionOverlay() {
        this.transitionOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideTransitionOverlay() {
        this.transitionOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    showLogoutTransition() {
        this.logoutOverlay.classList.add('active');
        
        // Auto-redirect after showing the message
        setTimeout(() => {
            this.logoutOverlay.classList.remove('active');
            // Clear any stored user data
            this.clearUserData();
            // Redirect to homepage usando la lógica de rutas correcta
            setTimeout(() => {
                const isInPages = window.location.pathname.includes('/pages/');
                const isInDashboard = window.location.pathname.includes('/dashboard/');
                const isInCaregiverPro = window.location.pathname.includes('/caregivers pro/');
                
                let homeLink;
                if (isInCaregiverPro) {
                    homeLink = '../../index.html';
                } else if (isInDashboard) {
                    homeLink = '../index.html';
                } else if (isInPages) {
                    homeLink = '../index.html';
                } else {
                    homeLink = 'index.html';
                }
                
                window.location.href = homeLink;
            }, 500);
        }, 3000);
    }

    clearUserData() {
        // Clear localStorage items related to user session
        const keysToRemove = [
            'currentUser',
            'userToken',
            'userRole',
            'isLoggedIn',
            'dashboardData'
        ];
        
        keysToRemove.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced logout functionality
class LogoutManager {
    constructor() {
        this.init();
    }

    init() {
        this.createLogoutButtons();
        this.bindLogoutEvents();
    }

    createLogoutButtons() {
        // Find existing logout buttons and enhance them
        const logoutButtons = document.querySelectorAll('[data-logout], .logout-btn, .sign-out-btn');
        
        logoutButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.performLogout();
            });
        });
    }

    bindLogoutEvents() {
        // Listen for logout events from other components
        document.addEventListener('logoutRequested', () => {
            this.performLogout();
        });
    }

    performLogout() {
        // Show logout transition
        const pageTransitions = new PageTransitions();
        pageTransitions.showLogoutTransition();
        
        // Additional cleanup
        this.clearSessionData();
        this.notifyLogout();
    }

    clearSessionData() {
        // Clear session storage
        sessionStorage.clear();
        
        // Clear specific localStorage items
        const userDataKeys = [
            'currentUser',
            'userToken',
            'userRole',
            'isLoggedIn',
            'dashboardData',
            'caregiverData',
            'patientData'
        ];
        
        userDataKeys.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
        });
    }

    notifyLogout() {
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('userLoggedOut', {
            detail: { timestamp: new Date().toISOString() }
        }));
    }
}

// Enhanced Page Animation System
class PageAnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.addPageEnterAnimation();
        this.animateElementsOnLoad();
        this.setupIntersectionObserver();
    }

    addPageEnterAnimation() {
        // Add entrance animation to the main content
        document.body.classList.add('page-enter');
        
        // Remove the class after animation completes
        setTimeout(() => {
            document.body.classList.remove('page-enter');
        }, 800);
    }

    animateElementsOnLoad() {
        // Animate sections with longer delays
        const sections = document.querySelectorAll('section, .auth-container, .hero-section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.3}s`;
            section.classList.add('section-fade-in');
        });

        // Animate cards with more spacing
        const cards = document.querySelectorAll('.card, .service-card, .testimonial-card, .auth-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('card-entrance');
        });

        // Animate buttons
        const buttons = document.querySelectorAll('.btn, button, .back-home-btn');
        buttons.forEach(button => {
            button.classList.add('btn-smooth-hover');
        });
    }

    setupIntersectionObserver() {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate on scroll
        const observeElements = document.querySelectorAll(
            '.testimonial-card, .service-item, .stat-item, .feature-card'
        );
        observeElements.forEach(el => observer.observe(el));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
    new LogoutManager();
    new PageAnimationSystem();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible again
        document.body.classList.remove('page-hidden');
    } else {
        // Page became hidden
        document.body.classList.add('page-hidden');
    }
});
} // Cierre del if para prevenir redeclaración

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PageTransitions, LogoutManager };
} 