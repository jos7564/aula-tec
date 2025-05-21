class GlobalViewCounter {
    constructor() {
        this.storageKey = 'globalPageViews';
        this.initializeCounter();
    }

    initializeCounter() {
        // Obtener las vistas globales almacenadas
        let views = localStorage.getItem(this.storageKey);
        
        if (!views) {
            views = 0;
        } else {
            views = parseInt(views);
        }

        // Incrementar el contador global
        views++;
        
        // Guardar el nuevo valor
        localStorage.setItem(this.storageKey, views);
        
        // Actualizar el display
        this.updateDisplay(views);
    }

    updateDisplay(count) {
        const viewCountElement = document.getElementById('viewCount');
        if (viewCountElement) {
            // Formatear el número para mejor lectura
            viewCountElement.textContent = new Intl.NumberFormat('es-MX').format(count);
        }
    }
}

// Inicializar el contador cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new GlobalViewCounter();
    
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    let isMenuVisible = true;

    document.addEventListener('click', (e) => {
        // Lista de selectores a ignorar
        const ignoreElements = [
            '.component-card',
            '.info-btn',
            '.modal-overlay',
            '.modal-content',
            '.comments-section',
            '.comment-form',
            'button',
            'input',
            'textarea'
        ];

        // Verificar si el clic fue en un elemento que debemos ignorar
        const shouldIgnore = ignoreElements.some(selector => 
            e.target.closest(selector) !== null
        );

        // Si no debemos ignorar el clic y no fue dentro del sidebar
        if (!shouldIgnore && !sidebar.contains(e.target)) {
            toggleMenu();
        }
    });

    // Evitar que los clics dentro del sidebar cierren el menú
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    function toggleMenu() {
        isMenuVisible = !isMenuVisible;
        sidebar.classList.toggle('hidden', !isMenuVisible);
        content.classList.toggle('expanded', !isMenuVisible);
    }
});