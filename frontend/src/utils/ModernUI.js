/**
 * Modern CMS UI Enhancement JavaScript
 * Comprehensive interactive features for all panels
 * 
 * Features:
 * - Dark mode toggle with persistence
 * - Scroll reveal animations
 * - Parallax effects
 * - Table sorting
 * - Tooltips
 * - Smooth scrolling
 * - Ripple effects on buttons
 * - Auto-hide notifications
 */

class ModernCMS_UI {
  constructor() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.init();
  }

  init() {
    this.setupDarkMode();
    this.setupScrollReveal();
    this.setupParallax();
    this.setupSmoothScroll();
    this.setupTableSorting();
    this.setupRippleEffect();
    this.setupNotifications();
    this.setupAnimationDelays();
    this.setupAccessibility();
  }

  /* ========================================
     DARK MODE FUNCTIONALITY
     ======================================== */
  setupDarkMode() {
    // Apply saved theme
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    }

    // Create toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Toggle dark mode');
      toggle.innerHTML = this.darkMode ? '🌞' : '🌙';
      toggle.addEventListener('click', () => this.toggleDarkMode());
      document.body.appendChild(toggle);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.darkMode);
    
    // Update toggle icon with animation
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.style.transform = 'scale(0) rotate(180deg)';
      setTimeout(() => {
        toggle.innerHTML = this.darkMode ? '🌞' : '🌙';
        toggle.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    }

    // Show notification
    this.showNotification(
      `${this.darkMode ? 'Dark' : 'Light'} mode activated`,
      'info',
      2000
    );
  }

  /* ========================================
     SCROLL REVEAL ANIMATIONS
     ======================================== */
  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    // Auto-add scroll-reveal to panel cards
    document.querySelectorAll('.panel-card, .stat-card, .ui-card').forEach(el => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
        observer.observe(el);
      }
    });
  }

  /* ========================================
     PARALLAX SCROLLING EFFECT
     ======================================== */
  setupParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      
      parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  /* ========================================
     SMOOTH SCROLLING
     ======================================== */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  /* ========================================
     TABLE SORTING
     ======================================== */
  setupTableSorting() {
    document.querySelectorAll('.data-table th.sortable').forEach(header => {
      header.addEventListener('click', () => {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const columnIndex = Array.from(header.parentNode.children).indexOf(header);
        const currentOrder = header.dataset.order || 'asc';
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

        // Remove sort indicators from other headers
        table.querySelectorAll('th.sortable').forEach(th => {
          delete th.dataset.order;
          th.innerHTML = th.textContent.replace(/[↑↓]/g, '').trim();
        });

        // Sort rows
        rows.sort((a, b) => {
          const aValue = a.children[columnIndex].textContent.trim();
          const bValue = b.children[columnIndex].textContent.trim();
          
          // Try to parse as number
          const aNum = parseFloat(aValue);
          const bNum = parseFloat(bValue);
          
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return newOrder === 'asc' ? aNum - bNum : bNum - aNum;
          }
          
          // String comparison
          return newOrder === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        });

        // Reorder rows in DOM
        rows.forEach(row => tbody.appendChild(row));

        // Update header indicator
        header.dataset.order = newOrder;
        header.innerHTML = `${header.textContent.trim()} ${newOrder === 'asc' ? '↑' : '↓'}`;

        // Animate rows
        rows.forEach((row, index) => {
          row.style.animation = 'none';
          setTimeout(() => {
            row.style.animation = `fadeInUp 0.3s ease ${index * 0.03}s both`;
          }, 10);
        });
      });
    });
  }

  /* ========================================
     RIPPLE EFFECT ON BUTTONS
     ======================================== */
  setupRippleEffect() {
    document.querySelectorAll('.btn, .icon-btn, .table-action-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          top: ${y}px;
          left: ${x}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation to stylesheet if not exists
    if (!document.querySelector('#ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ========================================
     NOTIFICATION SYSTEM
     ======================================== */
  showNotification(message, type = 'info', duration = 3000) {
    const container = this.getNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
      position: relative;
      animation: slideInRight 0.4s ease;
      margin-bottom: 12px;
    `;
    
    const icons = {
      success: '✓',
      warning: '⚠',
      danger: '✕',
      info: 'ℹ'
    };

    notification.innerHTML = `
      <div class="alert-icon">${icons[type] || icons.info}</div>
      <div class="alert-content">
        <div class="alert-message">${message}</div>
      </div>
    `;

    container.appendChild(notification);

    // Auto-remove after duration
    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.4s ease reverse';
      setTimeout(() => notification.remove(), 400);
    }, duration);
  }

  getNotificationContainer() {
    let container = document.querySelector('#notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        z-index: 10000;
        max-width: 400px;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  setupNotifications() {
    // Auto-hide alerts after 5 seconds
    document.querySelectorAll('.alert').forEach((alert, index) => {
      setTimeout(() => {
        alert.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => alert.remove(), 400);
      }, 5000 + (index * 500));
    });
  }

  /* ========================================
     ANIMATION DELAYS (STAGGER EFFECT)
     ======================================== */
  setupAnimationDelays() {
    // Add stagger effect to stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to table rows
    document.querySelectorAll('.data-table tbody tr').forEach((row, index) => {
      row.style.animationDelay = `${index * 0.03}s`;
    });

    // Add stagger effect to menu items (if they have fade-in class)
    document.querySelectorAll('.menu-item.fade-in').forEach((item, index) => {
      item.style.animationDelay = `${index * 0.05}s`;
    });
  }

  /* ========================================
     ACCESSIBILITY ENHANCEMENTS
     ======================================== */
  setupAccessibility() {
    // Add keyboard navigation for custom dropdowns
    document.querySelectorAll('[role="button"]').forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Add skip to main content link
    if (!document.querySelector('#skip-to-main')) {
      const skipLink = document.createElement('a');
      skipLink.id = 'skip-to-main';
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10001;
      `;
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
      });
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Announce page changes to screen readers
    const announcer = this.getAriaAnnouncer();
    
    // Observe DOM changes for dynamic content
    const observer = new MutationObserver(() => {
      announcer.textContent = 'Content updated';
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  getAriaAnnouncer() {
    let announcer = document.querySelector('#aria-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'aria-announcer';
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    return announcer;
  }

  /* ========================================
     UTILITY METHODS
     ======================================== */

  // Initialize charts with animation
  animateChart(chartElement) {
    const paths = chartElement.querySelectorAll('path, circle, rect, line');
    paths.forEach((path, index) => {
      path.style.opacity = '0';
      path.style.transform = 'scale(0)';
      setTimeout(() => {
        path.style.transition = 'all 0.6s ease';
        path.style.opacity = '1';
        path.style.transform = 'scale(1)';
      }, index * 100);
    });
  }

  // Animate counter numbers
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.round(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current);
      }
    }, 16);
  }

  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Format currency
  formatCurrency(amount, currency = 'PKR') {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Format date
  formatDate(date, format = 'long') {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: format
    }).format(new Date(date));
  }

  // Debounce function for performance
  debounce(func, wait = 300) {
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

  // Show loading overlay
  showLoading(message = 'Loading...') {
    let overlay = document.querySelector('#loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'loading-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 16px;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;
      overlay.innerHTML = `
        <div class="spinner lg"></div>
        <div style="color: white; font-size: 16px; font-weight: 500;">${message}</div>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  hideLoading() {
    const overlay = document.querySelector('#loading-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => overlay.remove(), 300);
    }
  }

  // Confirm dialog
  confirm(message, onConfirm, onCancel) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content" style="max-width: 400px;">
        <div class="modal-header">
          <h3 class="modal-title">Confirm Action</h3>
        </div>
        <p style="margin-bottom: 24px; color: var(--text-muted);">${message}</p>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button class="btn btn-ghost" data-action="cancel">Cancel</button>
          <button class="btn btn-primary" data-action="confirm">Confirm</button>
        </div>
      </div>
    `;

    overlay.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      overlay.remove();
      if (onConfirm) onConfirm();
    });

    overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      overlay.remove();
      if (onCancel) onCancel();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        if (onCancel) onCancel();
      }
    });

    document.body.appendChild(overlay);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.modernCMS = new ModernCMS_UI();
  });
} else {
  window.modernCMS = new ModernCMS_UI();
}

// Export for use in React components
export default ModernCMS_UI;
