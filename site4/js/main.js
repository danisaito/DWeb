// MenuLateral Class
class MenuLateral {
    constructor() {
        this.botaoMenu = document.querySelector('.botao-menu-toggle');
        this.menuLateral = document.querySelector('.menu-lateral');
        this.links = document.querySelectorAll('.menu-lateral .link-menu');
        this.isMenuOpen = false;
        
        this.initializeEvents();
    }

    initializeEvents() {
        // Toggle menu on button click
        this.botaoMenu.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking a link
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuLateral.contains(e.target) && 
                !this.botaoMenu.contains(e.target) && 
                this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.menuLateral.classList.toggle('ativo');
        this.botaoMenu.classList.toggle('ativo');
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.menuLateral.classList.remove('ativo');
        this.botaoMenu.classList.remove('ativo');
    }
}

class Navigation {
    constructor() {
        this.menu = document.querySelector('.menu-secundario');
        this.links = document.querySelectorAll('.menu-secundario .link-menu');
        this.subsecoes = document.querySelectorAll('.subsecao');
        this.currentSubsection = null;
        this.initializeMenu();
        this.showInitialSubsection();
    }

    initializeMenu() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });
    }

    handleNavigation(clickedLink) {
        // Remove active class from all links
        this.links.forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        clickedLink.classList.add('active');

        const targetId = clickedLink.getAttribute('data-bs-target');
        this.showSubsection(targetId);
    }

    showSubsection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
    
        // Primeiro, esconda todas as subseções
        this.subsecoes.forEach(section => {
            section.style.opacity = '0';
            setTimeout(() => {
                section.style.display = 'none';
                section.classList.remove('active');
            }, 300);
        });
    
        // Depois, mostre a subseção alvo
        setTimeout(() => {
            targetSection.style.display = 'block';
            // Force reflow
            targetSection.offsetHeight;
            targetSection.style.opacity = '1';
            targetSection.classList.add('active');
            
            // Inicialize o carousel se existir
            this.initializeCarousel(targetSection);
        }, 350);
    }

    showInitialSubsection() {
        const firstLink = this.links[0];
        if (firstLink) {
            firstLink.classList.add('active');
            const targetId = firstLink.getAttribute('data-bs-target');
            if (targetId) {
                const initialSection = document.querySelector(targetId);
                if (initialSection) {
                    initialSection.style.display = 'block';
                    initialSection.style.opacity = '1';
                    initialSection.classList.add('active');
                    
                    // Initialize carousel for the first section
                    const carousel = initialSection.querySelector('.carousel');
                    if (carousel) {
                        new bootstrap.Carousel(carousel, {
                            interval: false,
                            keyboard: true,
                            touch: true
                        });
                    }
                }
            }
        }
    }
}



// Classe Carousel atualizada
class Carousel {
    constructor() {
        this.carousels = document.querySelectorAll('.carousel');
        this.initializeCarousels();
    }

    initializeCarousels() {
        this.carousels.forEach(carousel => {
            // Configuração base do carrossel
            new bootstrap.Carousel(carousel, {
                interval: false, // Desativa rotação automática
                keyboard: true,  // Permite navegação por teclado
                touch: true     // Permite navegação por toque
            });

            // Configura navegação
            this.setupNavigation(carousel);
        });
    }

    setupNavigation(carousel) {
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');

        if (prevButton && nextButton) {
            // Garante que os botões estejam visíveis
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
        }

        // Tratamento de imagens
        const images = carousel.querySelectorAll('.carousel-image');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
}

// Main App Class
class App {
    constructor() {
        this.initializeModules();
    }

    initializeModules() {
        try {
            // Initialize all modules
            this.menuLateral = new MenuLateral();
            this.navigation = new Navigation();
            this.carousel = new Carousel();

            console.log('All modules initialized successfully');
        } catch (error) {
            console.error('Error initializing modules:', error);
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});