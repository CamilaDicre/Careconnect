<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d00cf54a1d29db8648a719cf1408093b389ec981
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
    loadComponent('header-component', '/components/header.html', () => {
        const loginScript = document.createElement('script');
        loginScript.src = 'js/login.js';
        document.body.appendChild(loginScript);
        const mainScript = document.createElement('script');
        mainScript.src = 'main.js';
        document.body.appendChild(mainScript);
    });
    // Load footer
    loadComponent('footer-component', '/components/footer.html');

    if (window.location.pathname.endsWith('login.html')) {
        var loginSignupBtn = document.getElementById('loginSignupButton');
        if (loginSignupBtn) loginSignupBtn.style.display = 'none';
    }
<<<<<<< HEAD
=======
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load components when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    loadComponent('header-component', 'components/header.html');
    
    // Load footer
    loadComponent('footer-component', 'components/footer.html');
>>>>>>> 9d7b88c1af6013c69bd288d56a3395a7d5a8f659
=======
>>>>>>> d00cf54a1d29db8648a719cf1408093b389ec981
}); 