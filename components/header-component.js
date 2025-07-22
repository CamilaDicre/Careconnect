class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        // Detectar si estamos en /pages/ o en la raíz
        const isInPages = window.location.pathname.includes('/pages/');
        const prefix = isInPages ? '' : 'pages/';
        const logoSrc = isInPages ? '../assets/Frame - 1.svg' : 'assets/Frame - 1.svg';
        this.shadowRoot.innerHTML = `
            <style>
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
                    display: none;
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
                
                /* Mobile (up to 768px) */
                @media (max-width: 768px) {
                    .careconnect-navbar .careconnect-container {
                        grid-template-columns: 1fr auto auto !important;
                        gap: 16px;
                        padding: 0 20px;
                    }

                    .careconnect-navbar-nav {
                        display: none !important;
                    }

                    .careconnect-mobile-menu-btn {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        width: 44px;
                        height: 44px;
                        border: none;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .careconnect-mobile-menu-btn:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: scale(1.05);
                    }

                    #careconnectLoginSection {
                        display: none !important;
                    }

                    /* Mobile Menu Overlay */
                    .careconnect-navbar-nav.mobile-show {
                        display: flex !important;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.95);
                        backdrop-filter: blur(10px);
                        z-index: 9999;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        gap: 24px;
                    }

                    .careconnect-navbar-nav.mobile-show .careconnect-nav-item {
                        width: 100%;
                        max-width: 300px;
                    }

                    .careconnect-navbar-nav.mobile-show .careconnect-nav-link {
                        display: block;
                        padding: 16px 24px;
                        color: white !important;
                        font-size: 1.2rem;
                        font-weight: 600;
                        text-align: center;
                        border-radius: 12px;
                        transition: all 0.3s ease;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }

                    .careconnect-navbar-nav.mobile-show .careconnect-nav-link:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    }

                    #careconnectLoginSection.mobile-show {
                        display: flex !important;
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                        margin-top: 24px;
                        width: 100%;
                        max-width: 300px;
                    }

                    #careconnectLoginSection.mobile-show #careconnectLoginSignupButton {
                        width: 100%;
                        padding: 16px 24px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        border-radius: 12px;
                        background: var(--pal-primary);
                        color: white;
                        border: none;
                        transition: all 0.3s ease;
                    }

                    #careconnectLoginSection.mobile-show #careconnectLoginSignupButton:hover {
                        background: #4a5fd1;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(65, 105, 225, 0.4);
                    }

                    #careconnectLoginSection.mobile-show .careconnect-theme-toggle-hover {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    }

                    #careconnectLoginSection.mobile-show .careconnect-theme-toggle-hover:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: scale(1.1);
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

                /* Tablet (769px to 1024px) */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .careconnect-navbar .careconnect-container {
                        grid-template-columns: 1fr auto 1fr !important;
                        gap: 20px;
                        padding: 0 30px;
                    }

                    .careconnect-navbar-nav {
                        display: flex !important;
                        position: static;
                        transform: none;
                        left: auto;
                        min-width: auto;
                        justify-content: center;
                        gap: 8px;
                    }

                    .careconnect-navbar-nav .careconnect-nav-link {
                        padding: 12px 16px;
                        font-size: 0.95rem;
                    }

                    .careconnect-mobile-menu-btn {
                        display: none !important;
                    }

                    #careconnectLoginSection {
                        display: flex !important;
                        gap: 12px;
                    }

                    #careconnectLoginSignupButton {
                        padding: 10px 16px;
                        font-size: 0.9rem;
                    }

                    .careconnect-theme-toggle-hover {
                        width: 40px;
                        height: 40px;
                    }
                }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                    }
                }

                @media (max-width: 767.98px) {
                    .navbar-collapse {
                        padding: 20px 16px;
                        margin-top: 8px;
                        border-radius: 12px;
                        left: 8px;
                        right: 8px;
                    }



                    #loginSignupButton {
                        padding: 12px 18px;
                        font-size: 0.95rem;
                        max-width: 260px;
                    }

                    .theme-toggle-hover {
                        width: 36px;
                        height: 36px;
                    }

                    .navbar-brand {
                        font-size: 1.1rem !important;
                        display: flex !important;
                        align-items: center;
                        color: white !important;
                    }

                    .logo-image {
                        width: 36px !important;
                        height: 36px !important;
                        margin-right: 8px;
                    }
                }



                /* Tablet optimizations */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .navbar-nav {
                        position: static;
                        transform: none;
                        left: auto;
                        min-width: auto;
                        justify-content: center;
                    }

                    #loginSection {
                        margin-left: 0;
                    }

                    .navbar-nav .nav-link {
                        padding: 12px 20px !important;
                        font-size: 1rem;
                        letter-spacing: 0.3px;
                    }

                    .navbar-brand {
                        font-size: 1.3rem !important;
                    }

                    .logo-image {
                        width: 48px !important;
                        height: 48px !important;
                    }

                    #loginSignupButton {
                        padding: 10px 20px;
                        font-size: 0.95rem;
                    }

                    .theme-toggle-hover {
                        width: 42px;
                        height: 42px;
                    }
                }

                /* Laptop optimizations */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .navbar-nav {
                        position: static;
                        transform: none;
                        left: auto;
                        min-width: auto;
                        justify-content: center;
                    }

                    #loginSection {
                        margin-left: 0;
                    }

                    .navbar-nav .nav-link {
                        padding: 14px 22px !important;
                        margin: 0 6px;
                        font-size: 1.1rem;
                        letter-spacing: 0.4px;
                    }

                    .navbar-brand {
                        font-size: 1.4rem !important;
                    }

                    .logo-image {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }

                /* Large desktop optimizations */
                @media (min-width: 1440px) {
                    .navbar-nav {
                        position: static;
                        transform: none;
                        left: auto;
                        min-width: auto;
                        justify-content: center;
                    }

                    #loginSection {
                        margin-left: 0;
                    }

                    .navbar-nav .nav-link {
                        padding: 16px 28px !important;
                        margin: 0 8px;
                        font-size: 1.2rem;
                        letter-spacing: 0.5px;
                    }

                    .navbar-brand {
                        font-size: 1.5rem !important;
                    }

                    .logo-image {
                        width: 54px !important;
                        height: 54px !important;
                    }

                    #loginSignupButton {
                        padding: 14px 28px;
                        font-size: 1.1rem;
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
                document.body.classList.toggle('dark-mode');
                const sunIcon = darkModeToggle.querySelector('.careconnect-sun-icon');
                const moonIcon = darkModeToggle.querySelector('.careconnect-moon-icon');
                
                // Smooth rotation animation
                const icon = darkModeToggle.querySelector('.careconnect-theme-icon');
                icon.style.transform = 'rotate(180deg)';
                
                setTimeout(() => {
                    if (document.body.classList.contains('dark-mode')) {
                        // Show sun icon (light mode)
                        sunIcon.style.display = 'block';
                        moonIcon.style.display = 'none';
                        sunIcon.style.color = '#ffd700'; // Golden color for sun
                    } else {
                        // Show moon icon (dark mode)
                        sunIcon.style.display = 'none';
                        moonIcon.style.display = 'block';
                        moonIcon.style.color = '#ffffff'; // White color for moon
                    }
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            });
        }

        // Mobile menu functionality
        this.initializeMobileMenu();
    }

    initializeMobileMenu() {
        const navLinks = this.shadowRoot.querySelectorAll('.careconnect-navbar-nav .careconnect-nav-link');
        const navbarNav = this.shadowRoot.querySelector('.careconnect-navbar-nav');
        const loginSection = this.shadowRoot.querySelector('#careconnectLoginSection');
        const mobileMenuBtn = this.shadowRoot.querySelector('.careconnect-mobile-menu-btn');
        
        // Function to close menu
        const closeMobileMenu = () => {
            if (window.innerWidth <= 991.98) {
                navbarNav.classList.remove('mobile-show');
                loginSection.classList.remove('mobile-show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        };
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNavbar = navbarNav.contains(event.target);
            const isClickOnToggler = mobileMenuBtn.contains(event.target);
            const isClickOnLoginSection = loginSection.contains(event.target);
            
            if (!isClickInsideNavbar && !isClickOnToggler && !isClickOnLoginSection && navbarNav.classList.contains('mobile-show')) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking on login button
        const loginButton = this.shadowRoot.querySelector('#careconnectLoginSignupButton');
        if (loginButton) {
            loginButton.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking on theme toggle
        const themeToggle = this.shadowRoot.querySelector('#careconnectDarkModeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', closeMobileMenu);
        }
    }
}

// Define the custom element
if (!customElements.get('header-component')) {
    customElements.define('header-component', HeaderComponent);
}

// Global function for mobile menu toggle
window.toggleMobileMenu = function() {
    console.log('toggleMobileMenu called');
    const headerComponent = document.querySelector('header-component');
    if (headerComponent && headerComponent.shadowRoot) {
        const navbarNav = headerComponent.shadowRoot.querySelector('.careconnect-navbar-nav');
        const loginSection = headerComponent.shadowRoot.querySelector('#careconnectLoginSection');
        const mobileMenuBtn = headerComponent.shadowRoot.querySelector('.careconnect-mobile-menu-btn');
        
        console.log('Elements found:', { navbarNav, loginSection, mobileMenuBtn });
        
        if (window.innerWidth <= 991.98) {
            if (navbarNav.classList.contains('mobile-show')) {
                console.log('Closing mobile menu');
                navbarNav.classList.remove('mobile-show');
                loginSection.classList.remove('mobile-show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                // Restore body scroll
                document.body.style.overflow = '';
            } else {
                console.log('Opening mobile menu');
                navbarNav.classList.add('mobile-show');
                loginSection.classList.add('mobile-show');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            }
        }
    } else {
        console.log('Header component not found');
    }
}; 