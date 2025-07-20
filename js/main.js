/**
 * Main JavaScript file for Careconnect website
 * Contains functionality for counter animations and dashboard management
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
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
                counter.textContent = Math.ceil(current) + counter.getAttribute('data-prefix');
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + counter.getAttribute('data-prefix');
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
