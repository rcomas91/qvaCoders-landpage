// Tipos básicos
interface ContactForm {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
}

// Clase principal
class QvaCodersApp {
    private contactForm: HTMLFormElement | null;
    private hamburger: HTMLElement | null;
    private navMenu: HTMLElement | null;

    constructor() {
        this.contactForm = document.getElementById('contactForm') as HTMLFormElement;
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.setupScrollEffects();
    }

    private setupEventListeners(): void {
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

    private toggleMobileMenu(): void {
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
            this.hamburger?.classList.toggle('active');
        }
    }

    private handleSmoothScroll(e: Event): void {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const targetId = target.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = (targetElement as HTMLElement).offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    private handleScroll(): void {
        const header = document.querySelector('.header') as HTMLElement;
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    private setupScrollEffects(): void {
        // Efecto sutil para hero (sin parallax que solape)
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero') as HTMLElement;
            if (hero && scrolled < window.innerHeight) {
                hero.style.opacity = Math.max(1 - scrolled / 600, 0.6);
            }
        });
    }

    private async handleFormSubmit(e: Event): Promise<void> {
        e.preventDefault();
        
        if (!this.contactForm) return;

        const formData = new FormData(this.contactForm);
        const contactData: ContactForm = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            company: formData.get('company') as string,
            service: formData.get('service') as string,
            message: formData.get('message') as string
        };

        const validation = this.validateForm(contactData);
        
        if (validation.isValid) {
            await this.submitForm(contactData);
        } else {
            this.showErrors(validation.errors);
        }
    }

    private validateForm(data: ContactForm): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!data.name.trim()) {
            errors.push('El nombre es requerido');
        }

        if (!data.email.trim()) {
            errors.push('El email es requerido');
        } else if (!this.isValidEmail(data.email)) {
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

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private async submitForm(data: ContactForm): Promise<void> {
        const submitButton = this.contactForm?.querySelector('button[type="submit"]') as HTMLButtonElement;
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
            
        } catch (error) {
            this.showError('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
            console.error('Error submitting form:', error);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    private async sendEmail(data: ContactForm): Promise<void> {
        // Reemplaza 'TU_FORM_ID_AQUI' con el ID real de tu Google Form
        const formId = 'TU_FORM_ID_AQUI';
        const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

        // Reemplaza estos entry IDs con los reales de tu Google Form
        // Para obtenerlos: inspecciona el HTML del form o usa la URL de pre-filled
        const formData = new FormData();
        formData.append('entry.123456789', data.name);  // Reemplaza con entry ID real para nombre
        formData.append('entry.987654321', data.email); // Reemplaza con entry ID real para email
        formData.append('entry.111111111', data.company); // Empresa
        formData.append('entry.222222222', data.service); // Servicio
        formData.append('entry.333333333', data.message); // Mensaje

        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'  // Necesario para Google Forms
            });
            console.log('Formulario enviado a Google Forms');
        } catch (error) {
            console.error('Error enviando formulario:', error);
            throw error;
        }
    }

    private showSuccess(message: string): void {
        this.showNotification(message, 'success');
    }

    private showError(message: string): void {
        this.showNotification(message, 'error');
    }

    private showErrors(errors: string[]): void {
        errors.forEach(error => this.showNotification(error, 'error'));
    }

    private showNotification(message: string, type: 'success' | 'error'): void {
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