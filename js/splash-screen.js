// Splash Screen Manager for Careconnect
class SplashScreenManager {
    constructor() {
        this.splashScreen = null;
        this.isFirstVisit = this.checkFirstVisit();
        this.init();
    }

    checkFirstVisit() {
        // Check if user has visited recently (within last hour)
        const lastVisit = localStorage.getItem('careconnect_last_visit');
        const now = Date.now();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (!lastVisit || (now - parseInt(lastVisit)) > oneHour) {
            localStorage.setItem('careconnect_last_visit', now.toString());
            return true;
        }
        return false;
    }

    init() {
        // Only show splash screen on first visit or if explicitly requested
        if (this.isFirstVisit || window.location.search.includes('splash=true')) {
            this.createSplashScreen();
            this.showSplashScreen();
        } else {
            // Add subtle page entrance animation instead
            this.addQuickPageAnimation();
        }
    }

    createSplashScreen() {
        this.splashScreen = document.createElement('div');
        this.splashScreen.className = 'splash-screen';
        
        // Create particles
        const particles = Array.from({length: 20}, (_, i) => 
            `<div class="splash-particle" style="
                top: ${Math.random() * 100}%; 
                left: ${Math.random() * 100}%; 
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${4 + Math.random() * 3}s;
            "></div>`
        ).join('');
        
        this.splashScreen.innerHTML = `
            ${particles}
            <div class="splash-content">
                <div class="splash-logo">
                    <img src="assets/Frame - 1.svg" alt="Careconnect Logo">
                </div>
                <h1 class="splash-title">Careconnect</h1>
                <p class="splash-subtitle">Conectamos, Tú Cuidas</p>
                <div class="splash-loader">
                    <div class="splash-progress">
                        <div class="splash-progress-bar"></div>
                    </div>
                    <div class="splash-dots">
                        <div class="splash-dot"></div>
                        <div class="splash-dot"></div>
                        <div class="splash-dot"></div>
                    </div>
                </div>
            </div>
            <div class="welcome-message">
                Preparando tu experiencia Careconnect...
            </div>
        `;
        
        document.body.appendChild(this.splashScreen);
    }

    showSplashScreen() {
        // Ensure splash screen is visible
        document.body.style.overflow = 'hidden';
        
        // Hide splash screen after animation completes
        setTimeout(() => {
            this.hideSplashScreen();
        }, 2800); // Slightly longer than CSS animation
    }

    hideSplashScreen() {
        if (this.splashScreen) {
            this.splashScreen.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Remove splash screen element after transition
            setTimeout(() => {
                if (this.splashScreen && this.splashScreen.parentNode) {
                    this.splashScreen.parentNode.removeChild(this.splashScreen);
                }
                
                // Trigger page content animation
                this.animatePageContent();
            }, 800);
        }
    }

    addQuickPageAnimation() {
        // Add a subtle entrance animation for returning visitors
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Wait for DOM to be ready, then animate
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
            
            // Clean up styles after animation
            setTimeout(() => {
                document.body.style.removeProperty('opacity');
                document.body.style.removeProperty('transform');
                document.body.style.removeProperty('transition');
                this.animatePageContent();
            }, 600);
        });
    }

    animatePageContent() {
        // Animate page elements after splash screen
        const elementsToAnimate = [
            { selector: '.hero-section', delay: 0 },
            { selector: '.reasons-section', delay: 100 },
            { selector: '.services-section', delay: 200 },
            { selector: '.testimonials-section', delay: 300 },
            { selector: '.statistics-section', delay: 400 },
            { selector: 'header-component', delay: 50 },
            { selector: 'footer-component', delay: 500 }
        ];

        elementsToAnimate.forEach(({ selector, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                    
                    // Clean up styles after animation
                    setTimeout(() => {
                        element.style.removeProperty('opacity');
                        element.style.removeProperty('transform');
                        element.style.removeProperty('transition');
                    }, 800);
                }, delay + (index * 50));
            });
        });

        // Animate cards and buttons
        this.animateCards();
        this.enhanceButtons();
    }

    animateCards() {
        const cards = document.querySelectorAll(
            '.service-card, .testimonial-card, .stat-item, .feature-card, .auth-card'
        );
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                });
                
                setTimeout(() => {
                    card.style.removeProperty('opacity');
                    card.style.removeProperty('transform');
                    card.style.removeProperty('transition');
                }, 600);
            }, index * 80);
        });
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('button, .btn, .back-home-btn, a[class*="btn"]');
        
        buttons.forEach(button => {
            // Add smooth hover effects
            button.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '';
            });
            
            // Add click effect
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-2px) scale(1)';
            });
        });
    }

    // Public method to manually trigger splash screen
    static showSplash() {
        const splashManager = new SplashScreenManager();
        splashManager.isFirstVisit = true;
        splashManager.createSplashScreen();
        splashManager.showSplashScreen();
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SplashScreenManager();
});

// Export for manual use
if (typeof window !== 'undefined') {
    window.SplashScreenManager = SplashScreenManager;
}
