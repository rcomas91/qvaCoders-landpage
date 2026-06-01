// Configuración de Formspree
// Reemplazar con tu ID de formulario de Formspree: https://formspree.io
const FORMPREE_FORM_ID = 'xaqkgazn';

// Clase principal
class QvaCodersApp {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupScrollReveal();
    }
    setupEventListeners() {
        // Menú móvil
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }
        // Formulario de contacto
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        // Scroll para header
        window.addEventListener('scroll', () => this.handleScroll());
    }
    toggleMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
            this.hamburger?.classList.toggle('active');
        }
    }
    handleSmoothScroll(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            }
            else {
                header.classList.remove('scrolled');
            }
        }
    }
    setupScrollEffects() {
        // Efecto sutil para hero (sin parallax que solape)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.opacity = Math.max(1 - scrolled / 600, 0.6);
            }
        });
    }
    setupScrollReveal() {
        const targets = [
            { selector: '.hero-content', delay: 0 },
            { selector: '.hero-image', delay: 1 },
            { selector: '.service-card', delay: null, stagger: true },
            { selector: '.tech-category', delay: null, stagger: true },
            { selector: '.testimonial-card', delay: null, stagger: true },
            { selector: '.contact-content > *', delay: null, stagger: true },
            { selector: '.footer-content > *', delay: null, stagger: true },
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(({ selector, delay, stagger }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, i) => {
                el.classList.add('reveal');
                if (stagger) {
                    const d = Math.min(i, 5);
                    el.classList.add(`reveal-delay-${d}`);
                } else if (delay !== null) {
                    el.classList.add(`reveal-delay-${delay}`);
                }
                observer.observe(el);
            });
        });
    }
    async handleFormSubmit(e) {
        e.preventDefault();
        if (!this.contactForm)
            return;

        console.log('🚀 Iniciando envío del formulario...');

        const formData = new FormData(this.contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        console.log('📋 Datos del formulario:', contactData);

        const validation = this.validateForm(contactData);
        if (validation.isValid) {
            console.log('✅ Validación exitosa, enviando email...');
            await this.submitForm(contactData);
        }
        else {
            console.log('❌ Errores de validación:', validation.errors);
            this.showErrors(validation.errors);
        }
    }
    validateForm(data) {
        const errors = [];
        if (!data.name.trim()) {
            errors.push('El nombre es requerido');
        }
        if (!data.email.trim()) {
            errors.push('El email es requerido');
        }
        else if (!this.isValidEmail(data.email)) {
            errors.push('El email no es válido');
        }
        if (!data.service) {
            errors.push('Por favor selecciona un servicio');
        }
        if (!data.message.trim()) {
            errors.push('El mensaje es requerido');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    async submitForm(data) {
        const submitButton = this.contactForm?.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        try {
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Enviar email
            await this.sendEmail(data);
            this.showSuccess('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
            this.contactForm?.reset();
        }
        catch (error) {
            this.showError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
            console.error('Error submitting form:', error);
        }
        finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    async sendEmail(data) {
        console.log('Enviando mensaje a Formspree...', data);

        const response = await fetch(`https://formspree.io/f/${FORMPREE_FORM_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                company: data.company || 'No especificada',
                service: data.service,
                message: data.message
            })
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
            console.error('Error de Formspree:', result);
            throw new Error(result.error || 'Error al enviar el mensaje');
        }

        console.log('Mensaje enviado exitosamente:', result);
        return result;
    }
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    showError(message) {
        this.showNotification(message, 'error');
    }
    showErrors(errors) {
        errors.forEach(error => this.showNotification(error, 'error'));
    }
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
        });
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new QvaCodersApp();
});
