/**
 * Main JavaScript file for Careconnect website
 * Contains functionality for navbar scroll, dark mode, and counter animations
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbarScroll();
    initializeDarkMode();
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
 * Handles navbar appearance on scroll
 */
function initializeNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Initializes dark mode toggle functionality
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    console.log(darkModeToggle)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-moon-fill')) {
                icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            } else {
                icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            }
            // Toggle button color
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.style.backgroundColor = '#222';
                darkModeToggle.style.color = '#fff';
                icon.style.color = '#fff';
            } else {
                darkModeToggle.style.backgroundColor = '';
                darkModeToggle.style.color = '';
                icon.style.color = '';
            }
        });
    }
}

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
