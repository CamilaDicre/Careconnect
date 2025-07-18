
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
    loadComponent('header-component', '/components/header.html');
    
    // Load footer
    loadComponent('footer-component', '/components/footer.html');
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}); 