class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Root Variables */
                :root {
                    --pal-primary: royalblue;
                }

                /* Footer styles - Optimized for seniors */
                .footer-section {
                    background: linear-gradient(135deg, #2c3e50, #34495e);
                    color: white;
                    padding: 80px 0 0;
                    position: relative;
                    font-family: 'Arial', sans-serif;
                }

                .footer-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 6px;
                    background: linear-gradient(90deg, var(--pal-primary), #3498db);
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
                    font-family: 'Arial', sans-serif;
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

                .footer-section .footer-links a:hover::before {
                    width: 100%;
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
                    }

                    .copyright-bar .container {
                        padding: 0 20px;
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
                    }

                    .footer-section p {
                        font-size: 1.05rem;
                        line-height: 1.8;
                    }

                    .footer-section .footer-links a {
                        font-size: 1.05rem;
                        padding: 10px 0;
                    }

                    .footer-section .social-links {
                        justify-content: center;
                        gap: 25px;
                    }

                    .footer-section .social-links a {
                        width: 60px;
                        height: 60px;
                        font-size: 1.6rem;
                    }

                    .footer-section .contact-info .contact-item {
                        font-size: 1.05rem;
                        margin-bottom: 18px;
                    }

                    .footer-section .contact-info .contact-item i {
                        font-size: 1.4rem;
                        width: 30px;
                    }

                    .footer-section .newsletter-form .newsletter-input {
                        padding: 14px 50px 14px 18px;
                        font-size: 1rem;
                        height: 48px;
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
                    }

                    .legal-links a {
                        font-size: 1rem;
                        padding: 8px 0;
                    }
                }

                @media (max-width: 576px) {
                    .footer-section {
                        padding: 40px 0 0;
                    }

                    .footer-grid {
                        gap: 35px;
                    }

                    .footer-section h3 {
                        font-size: 1.5rem;
                        margin-bottom: 18px;
                    }

                    .footer-section p {
                        font-size: 1rem;
                        line-height: 1.7;
                    }

                    .footer-section .footer-links a {
                        font-size: 1rem;
                        padding: 12px 0;
                    }

                    .footer-section .newsletter-form .newsletter-input {
                        padding: 12px 50px 12px 16px;
                        font-size: 0.95rem;
                        height: 44px;
                    }

                    .newsletter-send-btn {
                        width: 32px;
                        height: 32px;
                        font-size: 0.9rem;
                    }

                    .footer-section .social-links a {
                        width: 50px;
                        height: 50px;
                        font-size: 1.3rem;
                    }

                    .footer-section .contact-info .contact-item {
                        font-size: 1rem;
                        margin-bottom: 16px;
                    }

                    .footer-section .contact-info .contact-item i {
                        font-size: 1.2rem;
                        width: 25px;
                    }

                    .copyright-bar {
                        padding: 25px 0;
                    }

                    .copyright-bar p {
                        font-size: 0.95rem;
                    }

                    .legal-links {
                        gap: 15px;
                    }

                    .legal-links a {
                        font-size: 0.9rem;
                        padding: 6px 0;
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
                            <h3>Careconnect</h3>
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
                            <h3>Quick Links</h3>
                            <ul class="footer-links">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="departments.html">Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>

                        <!-- Services -->
                        <div class="footer-col">
                            <h3>Our Services</h3>
                            <ul class="footer-links">
                                <li><a href="#">Medicine Tracker</a></li>
                                <li><a href="#">Secure Family Chat</a></li>
                                <li><a href="#">Appointment Calendar</a></li>
                                <li><a href="#">Caregiver Connect</a></li>
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
                                <p>&copy; 2024 <a href="index.html">Careconnect</a>. All rights reserved.</p>
                            </div>
                            <div class="legal-links">
                                <a href="privacy-policy.html">Privacy Policy</a>
                                <a href="terms-of-service.html">Terms of Service</a>
                                <a href="cookie-policy.html">Cookie Policy</a>
                                <a href="accessibility.html">Accessibility</a>
                                <a href="security.html">Security</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Define the custom element
customElements.define('footer-component', FooterComponent); 