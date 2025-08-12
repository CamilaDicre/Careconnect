// Early apply saved theme to avoid FOUC
(function applySavedThemeEarly() {
    try {
        const savedTheme = localStorage.getItem('careconnect-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.remove('light');
            document.body.classList.add('dark-mode');
        } else if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        }
    } catch (e) {}
})();

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
        this.initializeTheme();
    }

    render() {
        // Detectar si estamos en /pages/ o en la raíz
        const isInPages = window.location.pathname.includes('/pages/');
        const prefix = isInPages ? '' : 'pages/';
        const logoSrc = isInPages ? '../assets/Frame - 1.svg' : 'assets/Frame - 1.svg';
        this.shadowRoot.innerHTML = `
            <style>
                :host-context(.dark-mode) .careconnect-navbar {
                    background: rgba(20, 24, 35, 0.9) !important;
                    border-bottom-color: rgba(255, 255, 255, 0.06) !important;
                }
                :host-context(.dark-mode) .careconnect-brand { color: #e5e7eb !important; }
                :host-context(.dark-mode) .careconnect-nav-link { color: #e5e7eb !important; }
                :host-context(.dark-mode) .careconnect-nav-link:hover { color: #93c5fd !important; }
                :host-context(.dark-mode) #careconnectLoginSignupButton {
                    background-color: #0f172a !important;
                    border-color: #3b82f6 !important;
                    color: #e5e7eb !important;
                }
                :host-context(.dark-mode) .careconnect-theme-toggle-hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border-color: rgba(255, 255, 255, 0.12) !important;
                    color: #e5e7eb !important;
                }
                :host-context(.dark-mode) .careconnect-navbar-scrolled {
                    background: rgba(15, 23, 42, 0.92) !important;
                }
                :host-context(.dark-mode) .careconnect-hamburger-line { background-color: #e5e7eb !important; }
                :host-context(.dark-mode) .careconnect-mobile-menu-overlay {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%) !important;
                }
                :host-context(.dark-mode) .careconnect-mobile-nav-link { color: #e5e7eb !important; }
                :host-context(.dark-mode) .careconnect-mobile-login-btn {
                    background: linear-gradient(135deg, #0b1220 0%, #111827 100%) !important;
                    color: #93c5fd !important;
                    border-color: rgba(255,255,255,0.15) !important;
                }
                /* Root Variables */
                :root {
                    --pal-primary: royalblue;
                }

                /* Header styles */
                :host {
                    display: block;
                }

                body {
                    padding-top: 80px;
                }

                .careconnect-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                    background: transparent;
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex !important;
                    align-items: center !important;
                    height: 80px;
                    padding: 0;
                }

                .careconnect-navbar-scrolled {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .careconnect-navbar-expand-lg {
                    flex-wrap: nowrap !important;
                    width: 100%;
                }

                .careconnect-navbar .careconnect-container {
                    position: relative;
                    display: grid !important;
                    grid-template-columns: 1fr 1fr 1fr !important;
                    align-items: center !important;
                    width: 100%;
                    gap: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                .careconnect-navbar-collapse {
                    display: none !important;
                }

                .careconnect-navbar-nav {
                    display: flex !important;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    justify-content: center;
                    flex-direction: row !important;
                    grid-column: 2;
                }

                .careconnect-navbar-nav .careconnect-nav-item {
                    display: flex !important;
                }

                #careconnectLoginSection {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: flex-end;
                    grid-column: 3;
                }

                .careconnect-brand-container {
                    grid-column: 1;
                    justify-self: start;
                }

                /* Brand container */
                .careconnect-brand-container {
                    gap: 12px;
                    position: relative;
                    z-index: 3;
                    display: flex !important;
                    align-items: center !important;
                    flex-shrink: 0;
                }

                .careconnect-brand {
                    color: white;
                    font-weight: 700;
                    font-family: "Poppins";
                    margin: 0;
                    transition: all 0.3s ease;
                    font-size: 1.4rem;
                    letter-spacing: 0.5px;
                    text-decoration: none;
                }

                .careconnect-navbar-scrolled .careconnect-brand {
                    color: var(--pal-primary) !important;
                }

                .careconnect-nav-link {
                    color: white !important;
                    font-weight: 600;
                    padding: 14px 24px !important;
                    border-radius: 50px;
                    margin: 0 10px;
                    transition: all 0.3s ease;
                    position: relative;
                    font-size: 1.1rem;
                    letter-spacing: 0.5px;
                    text-decoration: none;
                }

                .careconnect-navbar-scrolled .careconnect-nav-link {
                    color: #555 !important;
                }

                .careconnect-nav-link:hover, .careconnect-nav-link.active {
                    color: var(--pal-primary) !important;
                }

                /* Accessibility improvements */
                .careconnect-nav-link:focus {
                    outline: 2px solid var(--pal-primary);
                    outline-offset: 2px;
                    border-radius: 50px;
                }

                #careconnectLoginSignupButton {
                    background-color: var(--pal-primary) !important;
                    color: white !important;
                    font-family: 'Poppins';
                    font-weight: 600;
                    padding: 12px 24px;
                    font-size: 1rem;
                    border: 2px solid var(--pal-primary);
                    transition: all 0.3s ease;
                    border-radius: 50px;
                    letter-spacing: 0.3px;
                    cursor: pointer;
                }

                #careconnectLoginSignupButton:focus {
                    outline: 2px solid white;
                    outline-offset: 2px;
                }

                .careconnect-theme-toggle-hover {
                    transition: all 0.3s ease;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                }

                .careconnect-theme-icon {
                    transition: all 0.3s ease;
                }

                .careconnect-sun-icon,
                .careconnect-moon-icon {
                    transition: all 0.3s ease;
                }

                .careconnect-sun-icon {
                    color: #ffd700;
                }

                .careconnect-moon-icon {
                    color: #ffffff;
                }

                .careconnect-theme-toggle-hover:focus {
                    outline: 2px solid var(--pal-primary);
                    outline-offset: 2px;
                }

                .careconnect-theme-toggle-hover:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .careconnect-navbar-scrolled .careconnect-theme-toggle-hover:hover {
                    background: rgba(0, 0, 0, 0.2);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                /* Dark mode styles for scrolled navbar */
                .careconnect-navbar-scrolled .careconnect-theme-toggle-hover {
                    background: rgba(0, 0, 0, 0.1);
                    border-color: rgba(0, 0, 0, 0.2);
                    color: #333;
                }

                .careconnect-navbar-scrolled .careconnect-sun-icon {
                    color: #ffd700;
                }

                .careconnect-navbar-scrolled .careconnect-moon-icon {
                    color: #333;
                }

                .careconnect-brand:focus {
                    outline: 2px solid white;
                    outline-offset: 2px;
                    border-radius: 4px;
                }

                .careconnect-mobile-menu-btn {
                    border: none;
                    padding: 10px;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .careconnect-mobile-menu-btn:hover {
                    background: rgba(65, 105, 225, 0.15);
                    transform: scale(1.05);
                }

                .careconnect-mobile-menu-btn:focus {
                    box-shadow: 0 0 0 3px rgba(65, 105, 225, 0.25);
                    outline: none;
                }

                /* Hamburger menu styles */
                .careconnect-hamburger-menu {
                    width: 20px;
                    height: 16px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .careconnect-hamburger-line {
                    width: 100%;
                    height: 2px;
                    background-color: white;
                    border-radius: 1px;
                    transition: all 0.3s ease;
                    transform-origin: center;
                }

                .careconnect-navbar-scrolled .careconnect-hamburger-line {
                    background-color: #333;
                }

                /* Active hamburger menu styles */
                .careconnect-mobile-menu-btn[aria-expanded="true"] {
                    background: rgba(65, 105, 225, 0.2);
                    transform: scale(1.05);
                }

                .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }

                .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(2) {
                    opacity: 0;
                }

                .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }

                /* Force hamburger animation with inline styles */
                .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line {
                    transition: all 0.3s ease !important;
                }

                /* Logo hover effect */
                .careconnect-logo-image {
                    transition: all 0.3s ease;
                }

                .careconnect-brand:hover .careconnect-logo-image {
                    transform: rotate(5deg) scale(1.1);
                }

                /* Header Interactive Effects */
                .careconnect-nav-link-hover {
                    position: relative;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .careconnect-nav-link-hover::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: -100%;
                    width: 100%;
                    height: 2px;
                    background: var(--pal-primary);
                    transition: left 0.3s ease;
                }

                .careconnect-nav-link-hover:hover::before {
                    left: 0;
                }

                .careconnect-nav-link-hover:hover {
                    transform: translateY(-2px);
                    color: var(--pal-primary) !important;
                }

                /* Login button hover effect */
                .careconnect-login-btn-hover {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .careconnect-login-btn-hover::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }

                .careconnect-login-btn-hover:hover::before {
                    left: 100%;
                }

                .careconnect-login-btn-hover:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(65, 105, 225, 0.3);
                }

                /* Theme toggle hover effect */
                .theme-toggle-hover:hover {
                    transform: scale(1.1);
                    background: rgba(65, 105, 225, 0.2);
                    border-color: var(--pal-primary);
                    color: var(--pal-primary) !important;
                }

                .navbar-scrolled .theme-toggle-hover:hover {
                    background: rgba(65, 105, 225, 0.2);
                    border-color: var(--pal-primary);
                    color: var(--pal-primary) !important;
                }

                .theme-toggle-hover i {
                    transition: all 0.3s ease;
                }

                .theme-toggle-hover:hover i {
                    transform: rotate(180deg);
                }

                /* Logo hover effect */
                .navbar-brand {
                    transition: all 0.3s ease;
                }

                .navbar-brand:hover {
                    transform: scale(1.05);
                    color: var(--pal-primary) !important;
                }

                /* Modern Responsive Design */
                
                /* Mobile Menu Overlay - Only for mobile devices */
                .careconnect-mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(25, 118, 210, 0.98) 0%, rgba(99, 164, 255, 0.95) 100%);
                    backdrop-filter: blur(15px);
                    z-index: 9998;
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .careconnect-mobile-menu-overlay.show {
                    display: flex;
                    opacity: 1;
                }

                .careconnect-mobile-menu-content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    gap: 24px;
                    box-sizing: border-box;
                }

                .careconnect-mobile-menu-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 48px;
                    height: 48px;
                    border: none;
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.25);
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(10px);
                }

                .careconnect-mobile-menu-close:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: scale(1.1);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .careconnect-mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                    max-width: 320px;
                    margin-bottom: 32px;
                    align-items: center;
                }

                .careconnect-mobile-nav-item {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .careconnect-mobile-nav-link {
                    display: block;
                    padding: 18px 32px;
                    color: white !important;
                    font-size: 1.3rem;
                    font-weight: 600;
                    text-align: center;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.25);
                    text-decoration: none;
                    width: 100%;
                    max-width: 280px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(10px);
                }

                .careconnect-mobile-nav-link:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                    color: white !important;
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .careconnect-mobile-login-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    width: 100%;
                    max-width: 320px;
                }

                .careconnect-mobile-login-btn {
                    width: 100%;
                    max-width: 280px;
                    padding: 18px 32px;
                    font-size: 1.2rem;
                    font-weight: 700;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    color: #1976d2;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(10px);
                }

                .careconnect-mobile-login-btn:hover {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                .careconnect-mobile-theme-toggle {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(10px);
                }

                .careconnect-mobile-theme-toggle:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: scale(1.1);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                    border-color: rgba(255, 255, 255, 0.4);
                }

                /* Mobile (up to 768px) */
                @media (max-width: 768px) {
                    .careconnect-navbar .careconnect-container {
                        grid-template-columns: 1fr auto auto !important;
                        gap: 12px;
                        padding: 0 15px;
                        max-width: 100%;
                        overflow: hidden;
                    }

                    .careconnect-navbar-nav {
                        display: none !important;
                    }

                    .careconnect-mobile-menu-btn {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        border: none;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        flex-shrink: 0;
                        grid-column: 3 !important;
                        justify-self: end !important;
                    }

                    .careconnect-mobile-menu-btn:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: scale(1.05);
                    }

                    #careconnectLoginSection {
                        display: none !important;
                    }
                    
                    .careconnect-brand {
                        font-size: 1.2rem !important;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    
                    .careconnect-logo-image {
                        width: 40px !important;
                        height: 40px !important;
                        flex-shrink: 0;
                    }

                    /* Hamburger Animation */
                    .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }

                    .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(2) {
                        opacity: 0;
                    }

                    .careconnect-mobile-menu-btn[aria-expanded="true"] .careconnect-hamburger-line:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                }

                /* Hide mobile menu on larger screens */
                @media (min-width: 769px) {
                    .careconnect-mobile-menu-overlay {
                        display: none !important;
                    }
                    
                    .careconnect-mobile-menu-btn {
                        display: none !important;
                    }
                }

                /* Tablet (769px to 1024px) */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .careconnect-navbar .careconnect-container {
                        grid-template-columns: 1fr auto 1fr !important;
                        gap: 20px;
                        padding: 0 30px;
                        max-width: 100%;
                        overflow: hidden;
                    }

                    .careconnect-navbar-nav {
                        display: flex !important;
                        position: static;
                        transform: none;
                        left: auto;
                        min-width: auto;
                        justify-content: center;
                        gap: 8px;
                        flex-wrap: wrap;
                    }

                    .careconnect-navbar-nav .careconnect-nav-link {
                        padding: 12px 16px;
                        font-size: 0.95rem;
                        white-space: nowrap;
                    }

                    .careconnect-mobile-menu-btn {
                        display: none !important;
                    }

                    #careconnectLoginSection {
                        display: flex !important;
                        gap: 12px;
                        flex-shrink: 0;
                    }

                    #careconnectLoginSignupButton {
                        padding: 10px 16px;
                        font-size: 0.9rem;
                        white-space: nowrap;
                    }

                    .careconnect-theme-toggle-hover {
                        width: 40px;
                        height: 40px;
                        flex-shrink: 0;
                    }
                    
                    .careconnect-brand {
                        font-size: 1.3rem !important;
                        white-space: nowrap;
                    }
                }
                
                /* Extra small screens (up to 480px) */
                @media (max-width: 480px) {
                    .careconnect-navbar .careconnect-container {
                        gap: 8px;
                        padding: 0 10px;
                    }
                    
                    .careconnect-brand {
                        font-size: 1rem !important;
                    }
                    
                    .careconnect-logo-image {
                        width: 35px !important;
                        height: 35px !important;
                    }
                    
                    .careconnect-mobile-menu-btn {
                        width: 36px;
                        height: 36px;
                    }
                }

                /* Container and layout styles */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                    background: linear-gradient(135deg, #1a2035 0%, #2a3147 100%);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex !important;
                    align-items: center !important;
                }

                .navbar-expand-lg {
                    flex-wrap: nowrap !important;
                    width: 100%;
                }

                .navbar .container {
                    position: relative;
                    display: flex !important;
                    align-items: center !important;
                    width: 100%;
                }

                .navbar-collapse {
                    flex-basis: 100%;
                    flex-grow: 1;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    display: flex !important;
                }

                .navbar-nav {
                    display: flex !important;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;
                    min-width: 400px;
                    justify-content: center;
                    flex-direction: row !important;
                }

                .navbar-nav .nav-item {
                    display: flex !important;
                }

                #loginSection {
                    position: relative;
                    z-index: 2;
                    margin-left: auto;
                    display: flex !important;
                    flex-direction: row !important;
                }

                /* Ensure proper layout on all screen sizes */
                @media (min-width: 992px) {
                    .navbar-nav {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        min-width: 400px;
                    }
                }

                /* Container and layout styles */
                .careconnect-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                .careconnect-d-flex {
                    display: flex !important;
                }

                .careconnect-align-items-center {
                    align-items: center !important;
                }

                .careconnect-gap-3 {
                    gap: 1rem !important;
                }

                .careconnect-mx-auto {
                    margin-left: auto !important;
                    margin-right: auto !important;
                }

                .careconnect-mb-0 {
                    margin-bottom: 0 !important;
                }

                .careconnect-d-none {
                    display: none !important;
                }

                .careconnect-position-relative {
                    position: relative !important;
                }

                .careconnect-fw-bold {
                    font-weight: 700 !important;
                }

                .careconnect-fs-4 {
                    font-size: 1.5rem !important;
                }

                .d-flex {
                    display: flex !important;
                }

                .align-items-center {
                    align-items: center !important;
                }

                .gap-3 {
                    gap: 1rem !important;
                }

                .mx-auto {
                    margin-left: auto !important;
                    margin-right: auto !important;
                }

                .mb-0 {
                    margin-bottom: 0 !important;
                }

                .d-none {
                    display: none !important;
                }

                .position-relative {
                    position: relative !important;
                }

                .fw-bold {
                    font-weight: 700 !important;
                }

                .fs-4 {
                    font-size: 1.5rem !important;
                }

                .careconnect-btn {
                    display: inline-block;
                    font-weight: 400;
                    text-align: center;
                    vertical-align: middle;
                    user-select: none;
                    border: 1px solid transparent;
                    padding: 0.375rem 0.75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: 0.25rem;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }

                .careconnect-btn-outline-primary {
                    color: var(--pal-primary);
                    border-color: var(--pal-primary);
                }

                .careconnect-rounded-pill {
                    border-radius: 50rem !important;
                }

                .careconnect-text-center {
                    text-align: center !important;
                }

                .careconnect-justify-content-center {
                    justify-content: center !important;
                }

                .careconnect-w-100 {
                    width: 100% !important;
                }

                .careconnect-ms-auto {
                    margin-left: auto !important;
                }

                .careconnect-me-2 {
                    margin-right: 0.5rem !important;
                }

                .careconnect-btn-outline-danger {
                    color: #dc3545;
                    border-color: #dc3545;
                }

                .text-center {
                    text-align: center !important;
                }

                .justify-content-center {
                    justify-content: center !important;
                }

                .w-100 {
                    width: 100% !important;
                }

                .ms-auto {
                    margin-left: auto !important;
                }

                .me-2 {
                    margin-right: 0.5rem !important;
                }

                .btn-outline-danger {
                    color: #dc3545;
                    border-color: #dc3545;
                }

                /* Bootstrap Icons */
                .bi {
                    display: inline-block;
                    font-family: "bootstrap-icons";
                    font-style: normal;
                    font-weight: normal !important;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    vertical-align: text-bottom;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                .bi-moon-fill::before {
                    content: "\\f47a";
                }

                .bi-sun-fill::before {
                    content: "\\f4c9";
                }

                /* Theme toggle hover effect */
                .theme-toggle-hover:hover {
                    transform: scale(1.1);
                    background: rgba(65, 105, 225, 0.2);
                    border-color: var(--pal-primary);
                    color: var(--pal-primary) !important;
                }

                .navbar-scrolled .theme-toggle-hover:hover {
                    background: rgba(65, 105, 225, 0.2);
                    border-color: var(--pal-primary);
                    color: var(--pal-primary) !important;
                }

                .theme-toggle-hover i {
                    transition: all 0.3s ease;
                }

                .theme-toggle-hover:hover i {
                    transform: rotate(180deg);
                }
            </style>

            <header>
                <nav class="careconnect-navbar careconnect-navbar-expand-lg careconnect-fixed-top">
                    <div class="careconnect-container">
                        <!-- Logo and Brand on the left -->
                        <div class="careconnect-brand-container careconnect-d-flex careconnect-align-items-center" style="gap: 4px;">
                            <img src="${logoSrc}" class="careconnect-logo-image" style="width: 50px; height: 50px;" alt="Careconnect logo">
                            <a class="careconnect-brand careconnect-fw-bold careconnect-fs-4 careconnect-mb-0" href="${isInPages ? '../index.html' : 'index.html'}" style="margin-left: 0;">areconnect</a>
                        </div>
                        
                        <!-- Center Navigation -->
                        <ul class="careconnect-navbar-nav">
                            <li class="careconnect-nav-item">
                                <a class="careconnect-nav-link careconnect-nav-link-hover" href="${isInPages ? '../index.html' : 'index.html'}">Home</a>
                            </li>
                            <li class="careconnect-nav-item">
                                <a class="careconnect-nav-link careconnect-nav-link-hover" href="${isInPages ? 'about.html' : 'pages/about.html'}">About</a>
                            </li>
                            <li class="careconnect-nav-item">
                                <a class="careconnect-nav-link careconnect-nav-link-hover" href="${isInPages ? 'articles.html' : 'pages/articles.html'}">Articles</a>
                            </li>
                            <li class="careconnect-nav-item">
                                <a class="careconnect-nav-link careconnect-nav-link-hover" href="${isInPages ? 'contact.html' : 'pages/contact.html'}">Contact</a>
                            </li>
                        </ul>

                        <!-- Right side buttons container -->
                        <div id="careconnectLoginSection" class="careconnect-d-flex careconnect-align-items-center careconnect-gap-3">
                            <!-- Login Button -->
                            <button class="careconnect-btn careconnect-btn-outline-primary careconnect-d-flex careconnect-align-items-center careconnect-rounded-pill careconnect-login-btn-hover" id="careconnectLoginSignupButton" onclick="window.location.href='${isInPages ? 'login.html' : 'pages/login.html'}'">
                                <span>Log in</span>
                                <span class="careconnect-mx-1">/</span>
                                <span>Sign Up</span>
                            </button>
                            
                            <!-- Theme Toggle Button -->
                            <button class="careconnect-btn careconnect-theme-toggle-hover" id="careconnectDarkModeToggle" title="Toggle dark mode">
                                <svg class="careconnect-theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Sun Icon (Light Mode) -->
                                    <g class="careconnect-sun-icon" style="display: none;">
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                                        <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </g>
                                    <!-- Moon Icon (Dark Mode) -->
                                    <g class="careconnect-moon-icon">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        <!-- Mobile menu button -->
                        <button class="careconnect-mobile-menu-btn" type="button" onclick="toggleMobileMenu()" id="careconnectMobileToggle">
                            <div class="careconnect-hamburger-menu">
                                <span class="careconnect-hamburger-line"></span>
                                <span class="careconnect-hamburger-line"></span>
                                <span class="careconnect-hamburger-line"></span>
                            </div>
                        </button>
                    </div>
                </nav>

                <!-- Mobile Menu Overlay -->
                <div class="careconnect-mobile-menu-overlay" id="careconnectMobileMenuOverlay">
                    <div class="careconnect-mobile-menu-content">
                        <button class="careconnect-mobile-menu-close" onclick="closeMobileMenu()">
                            <i class="bi bi-x-lg"></i>
                        </button>
                        
                        <!-- Mobile Navigation -->
                        <nav class="careconnect-mobile-nav">
                            <div class="careconnect-mobile-nav-item">
                                <a class="careconnect-mobile-nav-link" href="${isInPages ? '../index.html' : 'index.html'}">Home</a>
                            </div>
                            <div class="careconnect-mobile-nav-item">
                                <a class="careconnect-mobile-nav-link" href="${isInPages ? 'about.html' : 'pages/about.html'}">About</a>
                            </div>
                            <div class="careconnect-mobile-nav-item">
                                <a class="careconnect-mobile-nav-link" href="${isInPages ? 'articles.html' : 'pages/articles.html'}">Articles</a>
                            </div>
                            <div class="careconnect-mobile-nav-item">
                                <a class="careconnect-mobile-nav-link" href="${isInPages ? 'contact.html' : 'pages/contact.html'}">Contact</a>
                            </div>
                        </nav>

                        <!-- Mobile Login Section -->
                        <div class="careconnect-mobile-login-section">
                            <button class="careconnect-mobile-login-btn" onclick="window.location.href='${isInPages ? 'login.html' : 'pages/login.html'}'">
                                Log in / Sign Up
                            </button>
                            <button class="careconnect-mobile-theme-toggle" id="careconnectMobileDarkModeToggle" title="Toggle dark mode">
                                <svg class="careconnect-theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Sun Icon (Light Mode) -->
                                    <g class="careconnect-sun-icon" style="display: none;">
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                                        <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </g>
                                    <!-- Moon Icon (Dark Mode) -->
                                    <g class="careconnect-moon-icon">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    attachEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = this.shadowRoot.querySelector('.careconnect-navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('careconnect-navbar-scrolled');
            } else {
                navbar.classList.remove('careconnect-navbar-scrolled');
            }
        });

        // Dark mode toggle
        const darkModeToggle = this.shadowRoot.querySelector('#careconnectDarkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }

        // Mobile dark mode toggle
        const mobileDarkModeToggle = this.shadowRoot.querySelector('#careconnectMobileDarkModeToggle');
        if (mobileDarkModeToggle) {
            mobileDarkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }

        // Mobile menu functionality
        this.initializeMobileMenu();
    }

    initializeTheme() {
        try {
            const savedTheme = localStorage.getItem('careconnect-theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
            document.body.classList.toggle('dark-mode', isDark);
            this.updateThemeIcons(isDark);
        } catch (err) {
            // Fallback without persistence
            const isDark = document.body.classList.contains('dark-mode');
            this.updateThemeIcons(isDark);
        }
    }

    updateThemeIcons(isDark) {
        const sunIcons = this.shadowRoot.querySelectorAll('.careconnect-sun-icon');
        const moonIcons = this.shadowRoot.querySelectorAll('.careconnect-moon-icon');
        if (isDark) {
            sunIcons.forEach(el => { el.style.display = 'block'; el.style.color = '#ffd700'; });
            moonIcons.forEach(el => { el.style.display = 'none'; });
        } else {
            sunIcons.forEach(el => { el.style.display = 'none'; });
            moonIcons.forEach(el => { el.style.display = 'block'; el.style.color = '#ffffff'; });
        }
    }

    toggleDarkMode() {
        const willBeDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', willBeDark);
        try {
            localStorage.setItem('careconnect-theme', willBeDark ? 'dark' : 'light');
        } catch (err) {}
        const sunIcons = this.shadowRoot.querySelectorAll('.careconnect-sun-icon');
        const moonIcons = this.shadowRoot.querySelectorAll('.careconnect-moon-icon');
        
        // Smooth rotation animation
        const icons = this.shadowRoot.querySelectorAll('.careconnect-theme-icon');
        icons.forEach(icon => {
            icon.style.transform = 'rotate(180deg)';
        });
        
        setTimeout(() => {
            if (willBeDark) {
                // Show sun icon (light mode)
                sunIcons.forEach(sunIcon => {
                    sunIcon.style.display = 'block';
                    sunIcon.style.color = '#ffd700'; // Golden color for sun
                });
                moonIcons.forEach(moonIcon => {
                    moonIcon.style.display = 'none';
                });
            } else {
                // Show moon icon (dark mode)
                sunIcons.forEach(sunIcon => {
                    sunIcon.style.display = 'none';
                });
                moonIcons.forEach(moonIcon => {
                    moonIcon.style.display = 'block';
                    moonIcon.style.color = '#ffffff'; // White color for moon
                });
            }
            icons.forEach(icon => {
                icon.style.transform = 'rotate(0deg)';
            });
        }, 150);
    }

    initializeMobileMenu() {
        const mobileMenuBtn = this.shadowRoot.querySelector('.careconnect-mobile-menu-btn');
        const mobileMenuOverlay = this.shadowRoot.querySelector('.careconnect-mobile-menu-overlay');
        const mobileNavLinks = this.shadowRoot.querySelectorAll('.careconnect-mobile-nav-link');
        const mobileLoginBtn = this.shadowRoot.querySelector('.careconnect-mobile-login-btn');
        
        // Function to close menu
        const closeMobileMenu = () => {
            if (window.innerWidth <= 768) {
                mobileMenuOverlay.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        };
        
        // Function to open menu
        const openMobileMenu = () => {
            if (window.innerWidth <= 768) {
                mobileMenuOverlay.classList.add('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        };

        // Close menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking on login button
        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (event) => {
            if (event.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileMenuOverlay.classList.contains('show')) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('show')) {
                closeMobileMenu();
            }
            // Hide mobile menu completely on larger screens
            if (window.innerWidth > 768) {
                mobileMenuOverlay.style.display = 'none';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}

// Define the custom element
if (!customElements.get('header-component')) {
    customElements.define('header-component', HeaderComponent);
}

// Global function for mobile menu toggle
window.toggleMobileMenu = function() {
    const headerComponent = document.querySelector('header-component');
    if (headerComponent && headerComponent.shadowRoot) {
        const mobileMenuBtn = headerComponent.shadowRoot.querySelector('.careconnect-mobile-menu-btn');
        const mobileMenuOverlay = headerComponent.shadowRoot.querySelector('.careconnect-mobile-menu-overlay');
        
        // Only work on mobile devices (768px and below)
        if (window.innerWidth <= 768) {
            if (mobileMenuOverlay.classList.contains('show')) {
                // Close menu
                mobileMenuOverlay.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                // Open menu
                mobileMenuOverlay.classList.add('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        }
    }
};

// Global function for closing mobile menu
window.closeMobileMenu = function() {
    const headerComponent = document.querySelector('header-component');
    if (headerComponent && headerComponent.shadowRoot) {
        const mobileMenuBtn = headerComponent.shadowRoot.querySelector('.careconnect-mobile-menu-btn');
        const mobileMenuOverlay = headerComponent.shadowRoot.querySelector('.careconnect-mobile-menu-overlay');
        
        // Only work on mobile devices (768px and below)
        if (window.innerWidth <= 768) {
            mobileMenuOverlay.classList.remove('show');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
}; 