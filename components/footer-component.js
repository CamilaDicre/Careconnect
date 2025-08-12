class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const isInPages = window.location.pathname.includes('/pages/');
        const isInDashboard = window.location.pathname.includes('/dashboard/');
        const isInCaregiverPro = window.location.pathname.includes('/caregivers pro/');

        // prefix to reach root files (index.html, privacy-policy.html, assets, etc.)
        const rootPrefix = isInCaregiverPro ? '../../' : (isInDashboard || isInPages) ? '../' : '';
        const logoSrc = `${rootPrefix}assets/Frame - 1.svg`;
        // prefix to reach files under pages/
        const pagesPrefix = isInCaregiverPro ? '../../pages/' : isInDashboard ? '../pages/' : isInPages ? '' : 'pages/';
        const aboutLink = `${pagesPrefix}about.html`;
        const articlesLink = `${pagesPrefix}articles.html`;
        const contactLink = `${pagesPrefix}contact.html`;
        this.shadowRoot.innerHTML = `
            <style>
                /* Root Variables */
                :root {
                    --pal-primary: royalblue;
                }

                /* Footer styles - Optimized for seniors */
                .footer-section {
                    background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
                    color: white;
                    padding: 80px 0 0;
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                }

                .footer-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 6px;
                    background: linear-gradient(90deg, #0d47a1, #1565c0);
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px;
                    margin-bottom: 50px;
                }

                .footer-col-newsletter {
                    grid-column: 4;
                }

                .footer-section h3 {
                    color: var(--pal-primary);
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 25px;
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 0.5px;
                }

                .footer-section p {
                    color: #e8e8e8;
                    line-height: 1.9;
                    margin-bottom: 20px;
                    font-size: 1.1rem;
                    font-weight: 400;
                }

                .footer-section .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-section .footer-links li {
                    margin-bottom: 16px;
                }

                .footer-section .footer-links a {
                    color: #e8e8e8;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1.1rem;
                    display: inline-block;
                    position: relative;
                    font-weight: 500;
                    padding: 8px 0;
                }

                .footer-section .footer-links a:hover {
                    color: var(--pal-primary);
                    transform: translateX(8px);
                    font-weight: 600;
                }

                .footer-section .footer-links a::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: var(--pal-primary);
                    transition: width 0.3s ease;
                }

                /* Brand logo badge for higher contrast */
                .brand-logo-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: auto;
                    height: auto;
                    background: transparent;
                    border: none;
                    border-radius: 0;
                    box-shadow: none;
                    backdrop-filter: none;
                }

                .brand-logo-badge img {
                    width: 30px;
                    height: 30px;
                    /* Show native SVG colors (no inversion) */
                    filter: none;
                }

                .footer-section .footer-links a:hover::before {
                    width: 100%;
                }

                .footer-section .footer-services-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-section .footer-services-list li {
                    color: #e8e8e8;
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin-bottom: 16px;
                    padding: 8px 0;
                }

                .footer-section .newsletter-form {
                    margin-top: 25px;
                }

                .footer-section .newsletter-form h4 {
                    color: var(--pal-primary);
                    margin-bottom: 20px;
                    font-size: 1.3rem;
                    font-weight: 600;
                }

                .newsletter-input-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .footer-section .newsletter-form .newsletter-input {
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 12px 50px 12px 16px;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    width: 100%;
                    height: 44px;
                }

                .footer-section .newsletter-form .newsletter-input:focus {
                    outline: none;
                    border-color: var(--pal-primary);
                    box-shadow: 0 0 0 4px rgba(65, 105, 225, 0.2);
                    background: rgba(255, 255, 255, 0.2);
                }

                .footer-section .newsletter-form .newsletter-input::placeholder {
                    color: #bdc3c7;
                    font-weight: 400;
                }

                .newsletter-send-btn {
                    position: absolute;
                    right: 6px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--pal-primary);
                    border: none;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                }

                .newsletter-send-btn:hover {
                    background: #4a69bd;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 4px 12px rgba(65, 105, 225, 0.4);
                }

                .newsletter-send-btn:active {
                    transform: translateY(-50%) scale(0.95);
                }

                .footer-section .social-links {
                    display: flex;
                    gap: 20px;
                    margin-top: 25px;
                }

                .footer-section .social-links a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 55px;
                    height: 55px;
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    text-decoration: none;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    font-size: 1.4rem;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }

                .footer-section .social-links a:hover {
                    background: var(--pal-primary);
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(65, 105, 225, 0.5);
                    border-color: var(--pal-primary);
                }

                .footer-section .contact-info {
                    margin-top: 25px;
                }

                .footer-section .contact-info .contact-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    color: #e8e8e8;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

                .footer-section .contact-info .contact-item i {
                    margin-right: 15px;
                    color: var(--pal-primary);
                    font-size: 1.3rem;
                    width: 25px;
                    text-align: center;
                }

                .footer-section .contact-info .contact-item span {
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                .copyright-bar {
                    background: rgba(0, 0, 0, 0.3);
                    padding: 30px 0;
                    text-align: center;
                    border-top: 2px solid rgba(255, 255, 255, 0.1);
                    margin-top: 0;
                }

                .copyright-bar .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                .copyright-bar p {
                    margin: 0;
                    color: #bdc3c7;
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: 1.6;
                }

                .copyright-bar a {
                    color: var(--pal-primary);
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .copyright-bar a:hover {
                    color: #4a69bd;
                    text-decoration: underline;
                }

                .copyright-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .copyright-text p {
                    margin: 0;
                    color: #bdc3c7;
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: 1.6;
                }

                .legal-links {
                    display: flex;
                    gap: 30px;
                    flex-wrap: wrap;
                }

                .legal-links a {
                    color: #bdc3c7;
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    padding: 5px 0;
                }

                .legal-links a:hover {
                    color: var(--pal-primary);
                    font-weight: 600;
                }

                /* Responsive styles - Optimized for seniors */
                @media (max-width: 768px) {
                    .footer-section {
                        padding: 50px 0 0;
                    }

                    .footer-content {
                        padding: 0 20px;
                        max-width: 100%;
                        overflow: hidden;
                    }

                    .copyright-bar .container {
                        padding: 0 20px;
                        max-width: 100%;
                        overflow: hidden;
                    }

                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .footer-col-newsletter {
                        grid-column: 1;
                    }

                    .footer-section h3 {
                        font-size: 1.6rem;
                        margin-bottom: 20px;
                        word-wrap: break-word;
                    }

                    .footer-section p {
                        font-size: 1.05rem;
                        line-height: 1.8;
                        word-wrap: break-word;
                    }

                    .footer-section .footer-links a {
                        font-size: 1.05rem;
                        padding: 10px 0;
                        word-wrap: break-word;
                    }

                    .footer-section .social-links {
                        justify-content: center;
                        gap: 25px;
                        flex-wrap: wrap;
                    }

                    .footer-section .social-links a {
                        width: 60px;
                        height: 60px;
                        font-size: 1.6rem;
                        flex-shrink: 0;
                    }

                    .footer-section .contact-info .contact-item {
                        font-size: 1.05rem;
                        margin-bottom: 18px;
                        word-wrap: break-word;
                    }

                    .footer-section .contact-info .contact-item i {
                        font-size: 1.4rem;
                        width: 30px;
                        flex-shrink: 0;
                    }

                    .footer-section .newsletter-form .newsletter-input {
                        padding: 14px 50px 14px 18px;
                        font-size: 1rem;
                        height: 48px;
                        max-width: 100%;
                    }

                    .newsletter-send-btn {
                        width: 36px;
                        height: 36px;
                        font-size: 1rem;
                    }

                    .copyright-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 15px;
                    }

                    .legal-links {
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }

                    .legal-links a {
                        font-size: 1rem;
                        padding: 8px 0;
                        white-space: nowrap;
                    }
                }

                @media (max-width: 576px) {
                    .footer-section {
                        padding: 40px 0 0;
                    }

                    .footer-content {
                        padding: 0 15px;
                    }

                    .copyright-bar .container {
                        padding: 0 15px;
                    }

                    .footer-grid {
                        gap: 35px;
                    }

                    .footer-section h3 {
                        font-size: 1.5rem;
                        margin-bottom: 18px;
                        word-wrap: break-word;
                    }

                    .footer-section p {
                        font-size: 1rem;
                        line-height: 1.7;
                        word-wrap: break-word;
                    }

                    .footer-section .footer-links a {
                        font-size: 1rem;
                        padding: 12px 0;
                        word-wrap: break-word;
                    }

                    .footer-section .newsletter-form .newsletter-input {
                        padding: 12px 50px 12px 16px;
                        font-size: 0.95rem;
                        height: 44px;
                        max-width: 100%;
                    }

                    .newsletter-send-btn {
                        width: 32px;
                        height: 32px;
                        font-size: 0.9rem;
                    }

                    .footer-section .social-links {
                        gap: 20px;
                    }

                    .footer-section .social-links a {
                        width: 50px;
                        height: 50px;
                        font-size: 1.3rem;
                        flex-shrink: 0;
                    }

                    .footer-section .contact-info .contact-item {
                        font-size: 1rem;
                        margin-bottom: 16px;
                        word-wrap: break-word;
                    }

                    .footer-section .contact-info .contact-item i {
                        font-size: 1.2rem;
                        width: 25px;
                        flex-shrink: 0;
                    }

                    .copyright-bar {
                        padding: 25px 0;
                    }

                    .copyright-bar p {
                        font-size: 0.95rem;
                        word-wrap: break-word;
                    }

                    .legal-links {
                        gap: 15px;
                        flex-wrap: wrap;
                    }

                    .legal-links a {
                        font-size: 0.9rem;
                        padding: 6px 0;
                        white-space: nowrap;
                    }
                }
                
                /* Extra small screens (up to 480px) */
                @media (max-width: 480px) {
                    .footer-content {
                        padding: 0 10px;
                    }
                    
                    .copyright-bar .container {
                        padding: 0 10px;
                    }
                    
                    .footer-section h3 {
                        font-size: 1.4rem;
                    }
                    
                    .footer-section p {
                        font-size: 0.95rem;
                    }
                    
                    .footer-section .footer-links a {
                        font-size: 0.95rem;
                    }
                    
                    .footer-section .social-links {
                        gap: 15px;
                    }
                    
                    .footer-section .social-links a {
                        width: 45px;
                        height: 45px;
                        font-size: 1.2rem;
                    }
                    
                    .legal-links {
                        gap: 10px;
                    }
                    
                    .legal-links a {
                        font-size: 0.85rem;
                    }
                }

                /* Container and layout styles */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                .row {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0 -15px;
                }

                .col-lg-3, .col-md-6 {
                    padding: 0 15px;
                    margin-bottom: 30px;
                }

                .col-lg-3 {
                    flex: 0 0 25%;
                    max-width: 25%;
                }

                .col-md-6 {
                    flex: 0 0 50%;
                    max-width: 50%;
                }

                @media (max-width: 991.98px) {
                    .col-lg-3 {
                        flex: 0 0 50%;
                        max-width: 50%;
                    }
                }

                @media (max-width: 767.98px) {
                    .col-lg-3, .col-md-6 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                }

                .d-flex {
                    display: flex !important;
                }

                .align-items-center {
                    align-items: center !important;
                }

                .justify-content-center {
                    justify-content: center !important;
                }

                .text-center {
                    text-align: center !important;
                }

                .mb-3 {
                    margin-bottom: 1rem !important;
                }

                .mb-4 {
                    margin-bottom: 1.5rem !important;
                }

                .mt-3 {
                    margin-top: 1rem !important;
                }

                .mt-4 {
                    margin-top: 1.5rem !important;
                }

                .me-3 {
                    margin-right: 1rem !important;
                }

                .form-control {
                    display: block;
                    width: 100%;
                    padding: 0.375rem 0.75rem;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #212529;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }

                .btn {
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

                .bi-envelope::before {
                    content: "\\f32f";
                }

                .bi-telephone::before {
                    content: "\\f4e3";
                }

                .bi-geo-alt::before {
                    content: "\\f3e8";
                }

                .bi-facebook::before {
                    content: "\\f344";
                }

                .bi-twitter::before {
                    content: "\\f5ef";
                }

                .bi-instagram::before {
                    content: "\\f437";
                }

                .bi-linkedin::before {
                    content: "\\f472";
                }

                .bi-whatsapp::before {
                    content: "\\f5b3";
                }

                .bi-clock::before {
                    content: "\\f337";
                }

                .bi-send::before {
                    content: "\\f47e";
                }

                .bi-arrow-right::before {
                    content: "\\f138";
                }
            </style>

            <footer class="footer-section">
                <div class="footer-content">
                    <div class="footer-grid">
                        <!-- Company Info -->
                        <div class="footer-col">
                            <h3 style="display:flex;align-items:center;gap:4px;">
                                <span class="brand-logo-badge">
                                    <img src="${rootPrefix}assets/Frame-splash.svg" alt="Careconnect Logo"/>
                                </span>
                                areconnect
                            </h3>
                            <p>We connect caregivers with patients, making healthcare accessible and compassionate for everyone. Our platform bridges the gap between those who need care and those who provide it, specially designed for seniors and their families.</p>
                            
                            <div class="social-links">
                                <a href="#" aria-label="Facebook">
                                    <i class="bi bi-facebook"></i>
                                </a>
                                <a href="#" aria-label="WhatsApp">
                                    <i class="bi bi-whatsapp"></i>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a href="#" aria-label="LinkedIn">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="footer-col">
                            <h3>Quick links</h3>
                            <ul class="footer-links">
                                <li><a href="${rootPrefix}index.html">Home</a></li>
                                <li><a href="${aboutLink}">About</a></li>
                                <li><a href="${articlesLink}">Articles</a></li>
                                <li><a href="${contactLink}">Contact</a></li>
                            </ul>
                        </div>

                        <!-- Services -->
                        <div class="footer-col">
                            <h3>Our services</h3>
                            <ul class="footer-services-list">
                                <li>Medicine Tracker</li>
                                <li>Secure Family Chat</li>
                                <li>Appointment Calendar</li>
                                <li>Caregiver Connect</li>
                            </ul>
                        </div>

                        <!-- Newsletter -->
                        <div class="footer-col footer-col-newsletter">
                            <h3>Newsletter</h3>
                            <p>Stay informed about our services and health tips for seniors.</p>
                            
                            <div class="newsletter-form">
                                <div class="newsletter-input-container">
                                    <input type="email" class="form-control newsletter-input" placeholder="Enter your email">
                                    <button class="newsletter-send-btn" type="submit">
                                        <i class="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="contact-info">
                                <div class="contact-item">
                                    <i class="bi bi-envelope"></i>
                                    <span>info@careconnect.com</span>
                                </div>
                                <div class="contact-item">
                                    <i class="bi bi-telephone"></i>
                                    <span>+507 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Copyright and Legal -->
                <div class="copyright-bar">
                    <div class="container">
                        <div class="copyright-content">
                            <div class="copyright-text">
                                <p>&copy; ${new Date().getFullYear()} <a href="${rootPrefix}index.html">Careconnect</a>. All rights reserved.</p>
                            </div>
                            <div class="legal-links">
                                <a href="${rootPrefix}privacy-policy.html">Privacy Policy</a>
                                <a href="#" id="terms-link">Terms and Conditions</a>
                                <a href="#" id="cookie-link">Cookie Policy</a>
                                <a href="${rootPrefix}accessibility.html">Accessibility</a>
                                <a href="${rootPrefix}security.html">Security</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <!-- Modal Terms of Service -->
            <div id="terms-modal" class="terms-modal">
              <div class="terms-modal-content">
                <span class="terms-close" id="terms-close">&times;</span>
                <h2>Terms and Conditions</h2>
                <form id="terms-form">
                  <div class="terms-checkbox-group">
                    <label class="terms-checkbox-label" style="margin-bottom: 18px;">
                      <input type="checkbox" class="terms-checkbox-input" id="accept-all-checkbox">
                      <span class="terms-custom-checkbox"></span>
                      Accept all terms and conditions
                    </label>
                  </div>
                  <div class="terms-all-text">
                    <p>
                      By using Careconnect, you agree to use the platform for lawful and respectful purposes only. You understand that your personal data will be handled according to the Privacy Policy. You acknowledge that Careconnect does not provide medical advice, diagnosis, or treatment. You agree not to share your account credentials with others and accept that violating these terms may result in account suspension. You will keep your contact information up to date for important notifications. You understand that Careconnect may update these terms and you will review them regularly. You agree not to use Careconnect to harass, abuse, or harm other users. You acknowledge that all content you share is your responsibility and must be accurate.
                    </p>
                  </div>
                  <div class="terms-buttons-row">
                    <button id="terms-cancel-btn" class="terms-cancel-btn" type="button">Cancel</button>
                    <button id="terms-accept-btn" class="terms-accept-btn" disabled>Accept</button>
                  </div>
                </form>
              </div>
            </div>
            <style>
            .terms-modal {
              display: none;
              position: fixed;
              z-index: 99999;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              overflow: auto;
              background: rgba(44, 62, 80, 0.7);
              font-family: 'Poppins', sans-serif;
            }
            .terms-modal-content {
              background: #fff;
              margin: 60px auto;
              padding: 32px 24px 24px 24px;
              border-radius: 16px;
              max-width: 420px;
              box-shadow: 0 8px 32px rgba(44,62,80,0.18);
              position: relative;
              color: #222;
            }
            .terms-modal-content h2 {
              margin-top: 0;
              color: royalblue;
              font-size: 2rem;
              margin-bottom: 18px;
            }
            .terms-close {
              color: #aaa;
              position: absolute;
              top: 18px;
              right: 24px;
              font-size: 2rem;
              font-weight: bold;
              cursor: pointer;
              transition: color 0.2s;
            }
            .terms-close:hover {
              color: royalblue;
            }
            .terms-checkbox-group {
              margin-bottom: 18px;
            }
            .terms-term-box {
              background: #f4f5f7;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(44,62,80,0.07);
              padding: 14px 12px;
              transition: box-shadow 0.2s, background 0.2s, transform 0.15s;
              margin-bottom: 0;
              display: flex;
              align-items: center;
            }
            .terms-term-box:hover {
              background: #e9ecf3;
              box-shadow: 0 4px 16px rgba(65,105,225,0.10);
              transform: translateY(-2px) scale(1.01);
            }
            .terms-checkbox-label {
              display: flex;
              align-items: center;
              font-size: 1.05rem;
              cursor: pointer;
              user-select: none;
            }
            .terms-checkbox-input {
              display: none;
            }
            .terms-custom-checkbox {
              width: 22px;
              height: 22px;
              border: 2px solid #bbb;
              border-radius: 6px;
              margin-right: 12px;
              background: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: border-color 0.2s, background 0.2s;
              position: relative;
            }
            .terms-checkbox-input:checked + .terms-custom-checkbox {
              background: royalblue;
              border-color: royalblue;
            }
            .terms-checkbox-input:checked + .terms-custom-checkbox::after {
              content: '\u2713';
              color: #fff;
              font-size: 1.2rem;
              position: absolute;
              left: 3px;
              top: 0px;
            }
            .terms-buttons-row {
              display: flex;
              justify-content: space-between;
              gap: 18px;
              margin-top: 18px;
            }
            .terms-cancel-btn {
              background: #ff4d4f;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 10px 0;
              font-size: 1.1rem;
              font-weight: 600;
              cursor: pointer;
              flex: 1 1 0;
              transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
              box-shadow: 0 2px 8px rgba(255,77,79,0.08);
            }
            .terms-cancel-btn:hover {
              background: #d9363e;
              transform: translateY(-2px) scale(1.03);
            }
            .terms-accept-btn {
              background: royalblue;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 10px 0;
              font-size: 1.1rem;
              font-weight: 600;
              cursor: pointer;
              flex: 1 1 0;
              transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
              box-shadow: 0 2px 8px rgba(65,105,225,0.08);
            }
            .terms-accept-btn:disabled {
              background: #b0b0b0;
              cursor: not-allowed;
            }
            .terms-accept-btn:not(:disabled):hover {
              background: #274b8e;
              transform: translateY(-2px) scale(1.03);
            }
            .terms-all-text {
              background: #f4f5f7;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(44,62,80,0.07);
              padding: 18px 16px;
              margin-bottom: 18px;
              font-size: 1.08rem;
              color: #222;
              line-height: 1.7;
              transition: box-shadow 0.2s, background 0.2s, transform 0.15s;
            }
            .terms-all-text:hover {
              background: #e9ecf3;
              box-shadow: 0 4px 16px rgba(65,105,225,0.10);
              transform: translateY(-2px) scale(1.01);
            }
            </style>
            <!-- Cookie Policy Modal -->
            <div id="cookie-modal" class="cookie-modal">
              <div class="cookie-modal-content">
                <span class="cookie-close" id="cookie-close">&times;</span>
                <h2>Cookie Policy</h2>
                <div class="cookie-text-box">
                  <p>
                    At Careconnect, we use cookies to enhance your experience, provide essential site functionality, analyze usage, and personalize content. Necessary cookies are always enabled to ensure the platform works securely and reliably. You can choose to accept all cookies, only the necessary ones, or reject all cookies. You can change your preferences at any time.
                  </p>
                </div>
                <form id="cookie-form">
                  <div class="cookie-radio-group">
                    <label class="cookie-radio-label">
                      <input type="radio" name="cookie-choice" class="cookie-radio-input" value="all">
                      <span class="cookie-custom-radio"></span>
                      Accept all cookies
                    </label>
                  </div>
                  <div class="cookie-radio-group">
                    <label class="cookie-radio-label">
                      <input type="radio" name="cookie-choice" class="cookie-radio-input" value="necessary">
                      <span class="cookie-custom-radio"></span>
                      Accept only necessary cookies
                    </label>
                  </div>
                  <div class="cookie-radio-group">
                    <label class="cookie-radio-label">
                      <input type="radio" name="cookie-choice" class="cookie-radio-input" value="reject">
                      <span class="cookie-custom-radio"></span>
                      Reject all cookies
                    </label>
                  </div>
                  <div class="cookie-buttons-row">
                    <button id="cookie-cancel-btn" class="cookie-cancel-btn" type="button">Cancel</button>
                    <button id="cookie-save-btn" class="cookie-save-btn" disabled>Save</button>
                  </div>
                </form>
              </div>
            </div>
            <style>
            .cookie-modal {
              display: none;
              position: fixed;
              z-index: 99999;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              overflow: auto;
              background: rgba(44, 62, 80, 0.7);
              font-family: 'Poppins', sans-serif;
            }
            .cookie-modal-content {
              background: #fff;
              margin: 60px auto;
              padding: 32px 24px 24px 24px;
              border-radius: 16px;
              max-width: 420px;
              box-shadow: 0 8px 32px rgba(44,62,80,0.18);
              position: relative;
              color: #222;
              animation: cookie-pop 0.25s cubic-bezier(.4,1.4,.6,1) both;
            }
            @keyframes cookie-pop {
              0% { transform: scale(0.85) translateY(40px); opacity: 0; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            .cookie-modal-content h2 {
              margin-top: 0;
              color: royalblue;
              font-size: 2rem;
              margin-bottom: 18px;
            }
            .cookie-close {
              color: #aaa;
              position: absolute;
              top: 18px;
              right: 24px;
              font-size: 2rem;
              font-weight: bold;
              cursor: pointer;
              transition: color 0.2s;
            }
            .cookie-close:hover {
              color: royalblue;
            }
            .cookie-text-box {
              background: #f4f5f7;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(44,62,80,0.07);
              padding: 16px 14px;
              margin-bottom: 18px;
              font-size: 1.08rem;
              color: #222;
              line-height: 1.7;
              transition: box-shadow 0.2s, background 0.2s, transform 0.15s;
            }
            .cookie-text-box:hover {
              background: #e9ecf3;
              box-shadow: 0 4px 16px rgba(65,105,225,0.10);
              transform: translateY(-2px) scale(1.01);
            }
            .cookie-radio-group {
              margin-bottom: 16px;
            }
            .cookie-radio-label {
              display: flex;
              align-items: center;
              font-size: 1.05rem;
              cursor: pointer;
              user-select: none;
              background: #f4f5f7;
              border-radius: 8px;
              padding: 12px 10px;
              transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
              box-shadow: 0 1px 4px rgba(44,62,80,0.06);
            }
            .cookie-radio-label:hover {
              background: #e9ecf3;
              box-shadow: 0 2px 8px rgba(65,105,225,0.08);
              transform: translateY(-1px) scale(1.01);
            }
            .cookie-radio-input {
              display: none;
            }
            .cookie-custom-radio {
              width: 22px;
              height: 22px;
              border: 2px solid #bbb;
              border-radius: 50%;
              margin-right: 12px;
              background: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: border-color 0.2s, background 0.2s;
              position: relative;
            }
            .cookie-radio-input:checked + .cookie-custom-radio {
              background: royalblue;
              border-color: royalblue;
            }
            .cookie-radio-input:checked + .cookie-custom-radio::after {
              content: '';
              display: block;
              width: 12px;
              height: 12px;
              background: #fff;
              border-radius: 50%;
              position: absolute;
              left: 3px;
              top: 3px;
            }
            .cookie-buttons-row {
              display: flex;
              justify-content: space-between;
              gap: 18px;
              margin-top: 18px;
            }
            .cookie-cancel-btn {
              background: #ff4d4f;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 10px 0;
              font-size: 1.1rem;
              font-weight: 600;
              cursor: pointer;
              flex: 1 1 0;
              transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
              box-shadow: 0 2px 8px rgba(255,77,79,0.08);
            }
            .cookie-cancel-btn:hover {
              background: #d9363e;
              transform: translateY(-2px) scale(1.03);
            }
            .cookie-save-btn {
              background: royalblue;
              color: #fff;
              border: none;
              border-radius: 8px;
              padding: 10px 0;
              font-size: 1.1rem;
              font-weight: 600;
              cursor: pointer;
              flex: 1 1 0;
              transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
              box-shadow: 0 2px 8px rgba(65,105,225,0.08);
            }
            .cookie-save-btn:disabled {
              background: #b0b0b0;
              cursor: not-allowed;
            }
            .cookie-save-btn:not(:disabled):hover {
              background: #274b8e;
              transform: translateY(-2px) scale(1.03);
            }
            @media (max-width: 480px) {
              .cookie-modal-content {
                padding: 18px 6px 18px 6px;
                max-width: 98vw;
              }
              .cookie-buttons-row {
                flex-direction: column;
                gap: 10px;
              }
              .cookie-cancel-btn, .cookie-save-btn {
                padding: 10px 0;
                font-size: 1rem;
              }
            }
            </style>
        `;
        this.attachModalEvents();
    }

    attachModalEvents() {
        const shadow = this.shadowRoot;
        const termsLink = shadow.getElementById('terms-link');
        const termsModal = shadow.getElementById('terms-modal');
        const termsClose = shadow.getElementById('terms-close');
        const acceptBtn = shadow.getElementById('terms-accept-btn');
        const cancelBtn = shadow.getElementById('terms-cancel-btn');
        const checkboxes = shadow.querySelectorAll('.terms-checkbox-input');
        function updateAcceptBtn() {
          let anyChecked = false;
          checkboxes.forEach(cb => { if (cb.checked) anyChecked = true; });
          acceptBtn.disabled = !anyChecked;
        }
        checkboxes.forEach(cb => {
          cb.addEventListener('change', updateAcceptBtn);
        });
        updateAcceptBtn();
        const acceptAllCheckbox = shadow.getElementById('accept-all-checkbox');
        acceptAllCheckbox.addEventListener('change', () => {
          acceptBtn.disabled = !acceptAllCheckbox.checked;
        });
        acceptBtn.disabled = !acceptAllCheckbox.checked;
        if (termsLink && termsModal && termsClose && acceptBtn) {
            termsLink.addEventListener('click', (e) => {
                e.preventDefault();
                termsModal.style.display = 'block';
            });
            termsClose.addEventListener('click', () => {
                termsModal.style.display = 'none';
            });
            // Cerrar al hacer click fuera del modal
            shadow.addEventListener('mousedown', (event) => {
                if (event.target === termsModal) {
                    termsModal.style.display = 'none';
                }
            });
            acceptBtn.addEventListener('click', () => {
                if (!acceptBtn.disabled) {
                    termsModal.style.display = 'none';
                }
            });
            cancelBtn.addEventListener('click', () => {
                termsModal.style.display = 'none';
            });
        }
        const cookieLink = shadow.getElementById('cookie-link');
        const cookieModal = shadow.getElementById('cookie-modal');
        const cookieClose = shadow.getElementById('cookie-close');
        const cookieSaveBtn = shadow.getElementById('cookie-save-btn');
        const cookieCancelBtn = shadow.getElementById('cookie-cancel-btn');
        const cookieRadios = shadow.querySelectorAll('.cookie-radio-input');
        function updateCookieSaveBtn() {
          let anyChecked = false;
          cookieRadios.forEach(r => { if (r.checked) anyChecked = true; });
          cookieSaveBtn.disabled = !anyChecked;
        }
        cookieRadios.forEach(r => {
          r.addEventListener('change', updateCookieSaveBtn);
        });
        updateCookieSaveBtn();
        cookieLink.addEventListener('click', (e) => {
          e.preventDefault();
          cookieModal.style.display = 'block';
        });
        cookieClose.addEventListener('click', () => {
          cookieModal.style.display = 'none';
        });
        cookieCancelBtn.addEventListener('click', () => {
          cookieModal.style.display = 'none';
        });
        shadow.addEventListener('mousedown', (event) => {
          if (event.target === cookieModal) {
            cookieModal.style.display = 'none';
          }
        });
        cookieSaveBtn.addEventListener('click', () => {
          if (!cookieSaveBtn.disabled) {
            const selected = Array.from(cookieRadios).find(r => r.checked);
            if (selected) {
              localStorage.setItem('careconnect_cookie_choice', selected.value);
              localStorage.setItem('careconnect_cookie_show_toast', '1');
              cookieModal.style.display = 'none';
              location.reload();
            }
          }
        });
        // Toast global para cookies
        if (!document.getElementById('global-cookie-toast')) {
          const toast = document.createElement('div');
          toast.id = 'global-cookie-toast';
          toast.className = 'cookie-toast';
          document.body.appendChild(toast);
          // Agrega el CSS global si no existe
          if (!document.getElementById('cookie-toast-style')) {
            const style = document.createElement('style');
            style.id = 'cookie-toast-style';
            style.textContent = `
              .cookie-toast {
                display: none;
                position: fixed;
                left: 50%;
                bottom: 40px;
                transform: translateX(-50%);
                background: linear-gradient(90deg, #1976d2 60%, #63a4ff 100%);
                color: white;
                padding: 28px 48px;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(25,118,210,0.18);
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                font-size: 1.35rem;
                z-index: 100000;
                opacity: 0;
                transition: opacity 0.4s;
                pointer-events: none;
              }
              .cookie-toast.show {
                display: block;
                opacity: 1;
              }
              .cookie-toast.center-toast {
                top: 50%;
                bottom: auto;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              @media (max-width: 480px) {
                .cookie-toast {
                  padding: 16px 8px;
                  font-size: 1.08rem;
                  bottom: 18px;
                }
                .cookie-toast.center-toast {
                  top: 50%;
                  bottom: auto;
                }
              }
            `;
            document.head.appendChild(style);
          }
        }
        function showCookieToast(type, center = false) {
          const toast = document.getElementById('global-cookie-toast');
          let msg = '';
          if (type === 'all') {
            msg = 'You will now enjoy the best experience on Careconnect.';
          } else if (type === 'necessary') {
            msg = 'Only essential cookies are enabled for your privacy.';
          } else if (type === 'reject') {
            msg = 'All cookies have been disabled. Some features may not work optimally.';
          }
          toast.textContent = msg;
          if (center) {
            toast.classList.add('center-toast');
          } else {
            toast.classList.remove('center-toast');
          }
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.remove('center-toast');
          }, center ? 4000 : 3500);
        }
        cookieRadios.forEach(r => {
          r.addEventListener('change', function() {
            updateCookieSaveBtn();
            // showCookieToast(r.value); // Elimina esta línea
          });
        });
        // Mostrar toast si corresponde tras recargar
        if (localStorage.getItem('careconnect_cookie_show_toast') === '1') {
          const val = localStorage.getItem('careconnect_cookie_choice');
          if (val) {
            const toastTimeout = setTimeout(() => {
              showCookieToast(val, true);
              localStorage.removeItem('careconnect_cookie_show_toast');
            }, 400);
          }
        }
    }
}

// Define the custom element
customElements.define('footer-component', FooterComponent); 