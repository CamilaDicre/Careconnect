/**
 * Main JavaScript file for Careconnect website
 * Contains functionality for counter animations and dashboard management
 */

// Splash screen mejorada
class SplashScreen {
  constructor() {
    this.createSplashScreen();
  }
  
  createSplashScreen() {
    const splashHTML = `
      <div id="splash-screen" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
      ">
        <!-- Partículas animadas -->
        <div class="splash-particle" style="position: absolute; width: 8px; height: 8px; background: rgba(255,255,255,0.4); border-radius: 50%; top: 15%; left: 10%; animation: splashParticle 4s ease-in-out infinite;"></div>
        <div class="splash-particle" style="position: absolute; width: 6px; height: 6px; background: rgba(255,255,255,0.3); border-radius: 50%; top: 65%; left: 85%; animation: splashParticle 5s ease-in-out infinite 0.5s;"></div>
        <div class="splash-particle" style="position: absolute; width: 10px; height: 10px; background: rgba(255,255,255,0.2); border-radius: 50%; top: 85%; left: 20%; animation: splashParticle 3.5s ease-in-out infinite 1s;"></div>
        <div class="splash-particle" style="position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 50%; top: 25%; left: 80%; animation: splashParticle 4.5s ease-in-out infinite 1.5s;"></div>
        
        <div style="text-align: center; color: white; position: relative; z-index: 10;">
          <div style="margin-bottom: 30px; animation: logoEntrance 1.5s cubic-bezier(0.23, 1, 0.32, 1);">
            <img src="assets/Frame - 1.svg" alt="Careconnect" style="width: 150px; height: auto; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
          </div>
          <h1 style="font-size: 53px; font-weight: 700; margin: 0 0 15px 0; animation: textSlideIn 1s ease-out 0.5s both;">Careconnect</h1>
          <p style="font-size: 42px; font-weight: 800; margin: 0 0 40px 0; opacity: 0.95; animation: textSlideIn 1s ease-out 0.7s both; letter-spacing: 1px;">Connecting Care, Empowering Lives</p>
          
          <!-- Loading bar -->
          <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin: 0 auto; position: relative; overflow: hidden; animation: barEntrance 1s ease-out 1s both;">
            <div id="loading-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,1)); border-radius: 2px; transition: width 0.3s ease;"></div>
          </div>
          
          <div style="margin-top: 20px; font-size: 23px; opacity: 0.8; animation: textSlideIn 1s ease-out 1.2s both;">
            Loading your experience...
          </div>
        </div>
        
        <style>
          @keyframes logoEntrance {
            from { 
              opacity: 0; 
              transform: scale(0.5) rotate(-10deg);
            }
            to { 
              opacity: 1; 
              transform: scale(1) rotate(0deg);
            }
          }
          
          @keyframes textSlideIn {
            from { 
              opacity: 0; 
              transform: translateY(30px);
            }
            to { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          
          @keyframes barEntrance {
            from { 
              opacity: 0; 
              transform: scaleX(0);
            }
            to { 
              opacity: 1; 
              transform: scaleX(1);
            }
          }
          
          @keyframes splashParticle {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            25% { 
              transform: translateY(-25px) translateX(15px);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-12px) translateX(-8px);
              opacity: 0.6;
            }
            75% { 
              transform: translateY(-18px) translateX(12px);
              opacity: 0.9;
            }
          }
          
          @keyframes fadeOut {
            to { opacity: 0; }
          }
        </style>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', splashHTML);
    this.animateLoading();
  }
  
  animateLoading() {
    const progressBar = document.getElementById('loading-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      
      progressBar.style.width = progress + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.hideSplash(), 500);
      }
    }, 200);
  }
  
  hideSplash() {
    const splash = document.getElementById('splash-screen');
    splash.style.animation = 'fadeOut 1s ease-out forwards';
    
    setTimeout(() => {
      splash.remove();
    }, 1000);
  }
}

// Inicializar splash screen cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Solo mostrar splash en la página principal
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    new SplashScreen();
  }
  
  // Código original
  initializeCounters();
  // Hide dashboard if not logged in
  const dashboardWrapper = document.getElementById('dashboardWrapper');
  if (dashboardWrapper) {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      dashboardWrapper.style.display = 'none';
    } else {
      dashboardWrapper.style.display = '';
    }
  }
});

/**
 * Initializes counter animation functionality
 */
function initializeCounters() {
    const speed = 100; // Controls animation speed (lower = faster)
    
    // Function to animate a single counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        
        function updateCount() {
            const increment = target / speed;
            current += increment;
            
            if (current < target) {
                counter.textContent = counter.getAttribute('data-prefix') == "$" ? counter.getAttribute('data-prefix') + Math.ceil(current) : Math.ceil(current) + counter.getAttribute('data-prefix');
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = counter.getAttribute('data-prefix') == "$" ? counter.getAttribute('data-prefix') + target : target + counter.getAttribute('data-prefix')
            }
        }
        
        updateCount();
    }

    // Set up Intersection Observer for counter animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When statistics section is visible, animate all counters
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
                // Only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing the statistics section
    const statisticsSection = document.querySelector('.statistics-section');
    if (statisticsSection) {
        observer.observe(statisticsSection);
    }
}
