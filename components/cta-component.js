class CTAComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Ready to Get Started?';
        const description = this.getAttribute('description') || 'Join thousands of users who are already using our services. Create your free account today and start your journey.';
        const primaryBtnText = this.getAttribute('primary-btn-text') || 'Create Free Account';
        const secondaryBtnText = this.getAttribute('secondary-btn-text') || 'Sign In';
        const primaryBtnLink = this.getAttribute('primary-btn-link') || '#';
        const secondaryBtnLink = this.getAttribute('secondary-btn-link') || '#';

        this.innerHTML = `
            <style>
                .cta-section {
                    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                                url(../assets/BlueLogoBlueBackgroundTilted.png);
                    background-size: cover;
                    background-position: center;
                    padding: 100px 0;
                    text-align: center;
                    color: white;
                    position: relative;
                }

                .cta-container {
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .cta-title {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 800;
                    margin-bottom: 2rem;
                    line-height: 1.2;
                    color: white;
                }

                .cta-description {
                    font-size: 1.3rem;
                    margin-bottom: 3.5rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.7;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 25px;
                    flex-wrap: wrap;
                }

                .cta-btn {
                    padding: 18px 45px;
                    border-radius: 35px;
                    font-weight: 700;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .cta-btn-primary {
                    background: white;
                    color: #2d4b6e;
                    box-shadow: var(--shadow-md);
                }

                .cta-btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-lg);
                    color: #2d4b6e;
                    text-decoration: none;
                }

                .cta-btn-secondary {
                    background: transparent;
                    color: white;
                    border: 3px solid white;
                }

                .cta-btn-secondary:hover {
                    background: white;
                    color: #2d4b6e;
                    transform: translateY(-3px);
                    text-decoration: none;
                }

                @media (max-width: 768px) {
                    .cta-title {
                        font-size: 2.4rem;
                    }

                    .cta-description {
                        font-size: 1.1rem;
                    }

                    .cta-buttons {
                        flex-direction: column;
                        align-items: center;
                    }

                    .cta-btn {
                        width: 100%;
                        max-width: 350px;
                        padding: 16px 40px;
                        font-size: 1.1rem;
                    }
                }
            </style>

            <section class="cta-section">
                <div class="container">
                    <div class="cta-container">
                        <h2 class="cta-title">${title}</h2>
                        <p class="cta-description">${description}</p>
                        <div class="cta-buttons">
                            <a href="${primaryBtnLink}" class="cta-btn cta-btn-primary">${primaryBtnText}</a>
                            <a href="${secondaryBtnLink}" class="cta-btn cta-btn-secondary">${secondaryBtnText}</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('cta-component', CTAComponent); 