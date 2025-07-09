async function loadComponent(elementId, componentPath, callback) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        if (callback) callback();
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load header, then load login.js and main.js
    loadComponent('header-component', 'components/header.html', () => {
        const loginScript = document.createElement('script');
        loginScript.src = 'js/login.js';
        document.body.appendChild(loginScript);
        const mainScript = document.createElement('script');
        mainScript.src = 'main.js';
        document.body.appendChild(mainScript);
    });
    // Load footer
    loadComponent('footer-component', 'components/footer.html');

    if (window.location.pathname.endsWith('login.html')) {
        var loginSignupBtn = document.getElementById('loginSignupButton');
        if (loginSignupBtn) loginSignupBtn.style.display = 'none';
    }
}); 