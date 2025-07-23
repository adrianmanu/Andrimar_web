// Configuración global
const CONFIG = {
  modalAnimationDuration: 300,
  lazyLoadingThreshold: 0.1,
  scrollOffset: 100,
  countdownDuration: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  urgencyPopupDelay: 30000, // 30 segundos
  exitIntentDelay: 5000 // 5 segundos
};

// Clase principal de la aplicación
class AndrimarApp {
  constructor() {
    this.modal = null;
    this.modalImg = null;
    this.modalTitle = null;
    this.closeBtn = null;
    this.isModalOpen = false;
    this.observer = null;
    this.countdownTimer = null;
    this.urgencyPopup = null;
    this.exitIntentShown = false;
    this.userInteracted = false;
    
    this.init();
  }

  init() {
    this.setupModal();
    this.setupLazyLoading();
    this.setupSmoothScrolling();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    this.setupAnalytics();
    this.setupConversionFeatures();
    this.setupCountdownTimer();
    this.setupUrgencyFeatures();
  }

  // Configuración del modal
  setupModal() {
    this.modal = document.getElementById('imageModal');
    this.modalImg = document.getElementById('modalImage');
    this.modalTitle = document.getElementById('modalTitle');
    this.closeBtn = document.querySelector('.close-modal');

    if (!this.modal || !this.modalImg || !this.closeBtn) {
      console.warn('Modal elements not found');
      return;
    }

    // Event listeners para abrir modal
    document.querySelectorAll('.product img').forEach(img => {
      img.addEventListener('click', (e) => this.openModal(e));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(e);
        }
      });
    });

    // Event listeners para cerrar modal
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });

    // Prevenir scroll del body cuando modal está abierto
    this.modal.addEventListener('wheel', (e) => {
      if (this.isModalOpen) {
        e.preventDefault();
      }
    });
  }

  openModal(event) {
    const img = event.target;
    const product = img.closest('.product');
    
    if (!product) return;

    this.modalImg.src = img.src;
    this.modalImg.alt = img.alt;
    
    // Obtener título del producto
    const productTitle = product.querySelector('h3')?.textContent || '';
    this.modalTitle.textContent = productTitle;
    
    // Mostrar modal con animación
    this.modal.style.display = 'block';
    this.isModalOpen = true;
    
    // Forzar reflow para que la animación funcione
    this.modal.offsetHeight;
    this.modal.classList.add('show');
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Focus en el botón de cerrar para accesibilidad
    setTimeout(() => {
      this.closeBtn.focus();
    }, 100);

    // Analytics
    this.trackEvent('modal_opened', {
      product: productTitle,
      image: img.src
    });
  }

  closeModal() {
    if (!this.isModalOpen) return;

    this.modal.classList.remove('show');
    
    setTimeout(() => {
      this.modal.style.display = 'none';
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    }, CONFIG.modalAnimationDuration);

    // Analytics
    this.trackEvent('modal_closed');
  }

  // Lazy loading para imágenes
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            this.observer.unobserve(img);
          }
        });
      }, {
        rootMargin: `${CONFIG.lazyLoadingThreshold * 100}%`
      });

      // Observar imágenes con lazy loading
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.observer.observe(img);
      });
    }
  }

  // Scroll suave para navegación
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Analytics
          this.trackEvent('navigation_clicked', {
            target: targetId
          });
        }
      });
    });
  }

  // Mejoras de accesibilidad
  setupAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Mejorar navegación por teclado
    document.addEventListener('keydown', (e) => {
      // Navegación con Tab en el modal
      if (this.isModalOpen && e.key === 'Tab') {
        const focusableElements = this.modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    // Mejorar anuncios de screen readers
    document.querySelectorAll('.product img').forEach(img => {
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-label', `Ver imagen ampliada de ${img.alt}`);
    });
  }

  // Optimizaciones de rendimiento
  setupPerformanceOptimizations() {
    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 100);
    });

    // Preload de imágenes críticas
    this.preloadCriticalImages();
  }

  handleScroll() {
    // Lógica para efectos de scroll si es necesaria
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  preloadCriticalImages() {
    const criticalImages = [
      'logo.png',
      'img/pulpa_cangrejo.png',
      'img/langostino.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Funcionalidades de conversión
  setupConversionFeatures() {
    // Tracking de CTAs
    this.setupCTATracking();
    
    // Popup de urgencia
    this.setupUrgencyPopup();
    
    // Exit intent
    this.setupExitIntent();
    
    // Scroll tracking
    this.setupScrollTracking();
    
    // Time on page tracking
    this.setupTimeTracking();
  }

  setupCTATracking() {
    // Track todos los botones de CTA
    document.querySelectorAll('.cta-button, .product-button, .urgency-cta, .urgency-button, .guarantee-cta').forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonType = this.getButtonType(button);
        
        this.trackEvent('cta_clicked', {
          button_text: buttonText,
          button_type: buttonType,
          href: button.href,
          location: this.getButtonLocation(button)
        });
        
        // Marcar que el usuario interactuó
        this.userInteracted = true;
      });
    });
  }

  getButtonType(button) {
    if (button.classList.contains('cta-button')) return 'primary_cta';
    if (button.classList.contains('product-button')) return 'product_cta';
    if (button.classList.contains('urgency-cta') || button.classList.contains('urgency-button')) return 'urgency_cta';
    if (button.classList.contains('guarantee-cta')) return 'guarantee_cta';
    return 'general_cta';
  }

  getButtonLocation(button) {
    const section = button.closest('section');
    if (section) {
      return section.id || section.className;
    }
    return 'unknown';
  }

  setupUrgencyPopup() {
    // Crear popup de urgencia
    this.createUrgencyPopup();
    
    // Mostrar después de un delay
    setTimeout(() => {
      if (!this.userInteracted && !this.exitIntentShown) {
        this.showUrgencyPopup();
      }
    }, CONFIG.urgencyPopupDelay);
  }

  createUrgencyPopup() {
    this.urgencyPopup = document.createElement('div');
    this.urgencyPopup.className = 'urgency-popup';
    this.urgencyPopup.innerHTML = `
      <div class="urgency-popup-content">
        <button class="urgency-popup-close">&times;</button>
        <h3>🔥 ¡OFERTA ESPECIAL!</h3>
        <p>¡Descuento del 15% en tu primer pedido!</p>
        <p>Válido solo por hoy</p>
        <a href="https://wa.me/593994999468?text=Hola! Quiero aprovechar el descuento del 15%" class="cta-button primary" target="_blank" rel="noopener">
          🎯 ¡Aprovechar Ahora!
        </a>
      </div>
    `;
    
    // Event listeners
    this.urgencyPopup.querySelector('.urgency-popup-close').addEventListener('click', () => {
      this.hideUrgencyPopup();
    });
    
    this.urgencyPopup.addEventListener('click', (e) => {
      if (e.target === this.urgencyPopup) {
        this.hideUrgencyPopup();
      }
    });
    
    document.body.appendChild(this.urgencyPopup);
  }

  showUrgencyPopup() {
    if (this.urgencyPopup) {
      this.urgencyPopup.style.display = 'flex';
      setTimeout(() => {
        this.urgencyPopup.classList.add('show');
      }, 100);
      
      this.trackEvent('urgency_popup_shown');
    }
  }

  hideUrgencyPopup() {
    if (this.urgencyPopup) {
      this.urgencyPopup.classList.remove('show');
      setTimeout(() => {
        this.urgencyPopup.style.display = 'none';
      }, 300);
      
      this.trackEvent('urgency_popup_closed');
    }
  }

  setupExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentShown && !this.userInteracted) {
        exitIntentShown = true;
        this.exitIntentShown = true;
        
        setTimeout(() => {
          this.showExitIntentPopup();
        }, CONFIG.exitIntentDelay);
      }
    });
  }

  showExitIntentPopup() {
    // Crear popup de exit intent
    const exitPopup = document.createElement('div');
    exitPopup.className = 'exit-popup';
    exitPopup.innerHTML = `
      <div class="exit-popup-content">
        <button class="exit-popup-close">&times;</button>
        <h3>⏰ ¡Espera!</h3>
        <p>¿Te vas sin consultar nuestros precios especiales?</p>
        <p>¡Obtén un <strong>descuento del 20%</strong> en tu primer pedido!</p>
        <a href="https://wa.me/593994999468?text=Hola! Quiero el descuento del 20% en mi primer pedido" class="cta-button primary" target="_blank" rel="noopener">
          💰 ¡Quiero el Descuento!
        </a>
      </div>
    `;
    
    // Event listeners
    exitPopup.querySelector('.exit-popup-close').addEventListener('click', () => {
      exitPopup.remove();
    });
    
    exitPopup.addEventListener('click', (e) => {
      if (e.target === exitPopup) {
        exitPopup.remove();
      }
    });
    
    document.body.appendChild(exitPopup);
    
    // Mostrar con animación
    setTimeout(() => {
      exitPopup.classList.add('show');
    }, 100);
    
    this.trackEvent('exit_intent_popup_shown');
  }

  setupScrollTracking() {
    let scrollPercentages = [25, 50, 75, 90];
    let trackedPercentages = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      scrollPercentages.forEach(percentage => {
        if (scrollPercent >= percentage && !trackedPercentages.has(percentage)) {
          trackedPercentages.add(percentage);
          this.trackEvent('scroll_percentage', {
            percentage: percentage
          });
        }
      });
    });
  }

  setupTimeTracking() {
    let timeIntervals = [30, 60, 120, 300]; // segundos
    let trackedIntervals = new Set();
    let startTime = Date.now();
    
    setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      timeIntervals.forEach(interval => {
        if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval);
          this.trackEvent('time_on_page', {
            seconds: interval
          });
        }
      });
    }, 1000);
  }

  // Countdown timer
  setupCountdownTimer() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Obtener tiempo restante del localStorage o establecer 24 horas
    let timeLeft = localStorage.getItem('countdownTime');
    if (!timeLeft) {
      timeLeft = Date.now() + CONFIG.countdownDuration;
      localStorage.setItem('countdownTime', timeLeft);
    }
    
    this.countdownTimer = setInterval(() => {
      const now = Date.now();
      const difference = timeLeft - now;
      
      if (difference <= 0) {
        // Reset countdown
        timeLeft = Date.now() + CONFIG.countdownDuration;
        localStorage.setItem('countdownTime', timeLeft);
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
      
      // Efecto de parpadeo cuando quedan menos de 10 minutos
      if (difference < 10 * 60 * 1000) {
        hoursElement.style.animation = 'pulse 1s infinite';
        minutesElement.style.animation = 'pulse 1s infinite';
        secondsElement.style.animation = 'pulse 1s infinite';
      }
    }, 1000);
  }

  // Urgency features
  setupUrgencyFeatures() {
    // Actualizar banner de urgencia cada hora
    setInterval(() => {
      this.updateUrgencyBanner();
    }, 60 * 60 * 1000);
    
    // Mostrar indicadores de stock limitado
    this.showStockIndicators();
  }

  updateUrgencyBanner() {
    const urgencyText = document.querySelector('.urgency-text');
    if (urgencyText) {
      const messages = [
        '🔥 ¡OFERTA ESPECIAL! Pedidos antes de las 2:00 PM = Entrega el mismo día',
        '⚡ ¡ÚLTIMAS HORAS! Descuento del 15% en tu primer pedido',
        '🎯 ¡STOCK LIMITADO! Asegura tu pedido antes de que se agote',
        '🚚 ¡ENTREGA GRATIS! En pedidos superiores a $100'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      urgencyText.textContent = randomMessage;
    }
  }

  showStockIndicators() {
    // Agregar indicadores de stock limitado a productos aleatorios
    const products = document.querySelectorAll('.product');
    const randomProducts = this.getRandomElements(products, 3);
    
    randomProducts.forEach(product => {
      const stockIndicator = document.createElement('div');
      stockIndicator.className = 'stock-indicator';
      stockIndicator.innerHTML = '⚠️ Stock limitado';
      product.appendChild(stockIndicator);
    });
  }

  getRandomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Analytics básico
  setupAnalytics() {
    // Track page views
    this.trackEvent('page_view', {
      page: window.location.pathname,
      title: document.title
    });

    // Track CTA clicks
    document.querySelectorAll('.cta-button, .whatsapp-button').forEach(button => {
      button.addEventListener('click', () => {
        this.trackEvent('cta_clicked', {
          button: button.textContent.trim(),
          href: button.href
        });
      });
    });

    // Track product interactions
    document.querySelectorAll('.product').forEach(product => {
      product.addEventListener('mouseenter', () => {
        const productName = product.querySelector('h3')?.textContent;
        this.trackEvent('product_hovered', {
          product: productName
        });
      });
    });
  }

  trackEvent(eventName, data = {}) {
    // Implementación básica de analytics
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...data
    };

    // En producción, enviar a Google Analytics o similar
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }

    // Log para desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Analytics Event:', eventData);
    }
  }

  // Métodos públicos para extensibilidad
  refreshLazyLoading() {
    if (this.observer) {
      this.observer.disconnect();
      this.setupLazyLoading();
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
    // Limpiar event listeners si es necesario
  }
}

// Utilidades adicionales
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar la aplicación
  window.andrimarApp = new AndrimarApp();

  // Configurar service worker para PWA (opcional)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }

  // Mejorar experiencia de carga
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remover loading spinner si existe
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
  });
});

// Manejo de errores global
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  
  // En producción, enviar a servicio de monitoreo
  if (window.location.hostname !== 'localhost') {
    // Implementar envío a servicio de errores
  }
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AndrimarApp, Utils };
} 