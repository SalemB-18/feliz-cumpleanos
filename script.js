document.addEventListener('DOMContentLoaded', () => {
    const backgroundList = document.querySelector('.slider-container .background-list');
    const backgroundItems = document.querySelectorAll('.slider-container .background-list .item');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const thumbnailCards = document.querySelectorAll('.thumbnail-card');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const dots = document.querySelectorAll('.dots .dot');

    let currentIndex = 0;
    const countItems = backgroundItems.length;

    // Función para actualizar la vista activa (sincroniza fondo, tarjetas y puntos)
    function updateActiveState(index) {
        // Remover clase activa de fondo, tarjeta y punto actual
        document.querySelector('.background-list .item.active').classList.remove('active');
        document.querySelector('.thumbnail-container .thumbnail-card.active').classList.remove('active');
        document.querySelector('.dots .dot.active').classList.remove('active');

        // Asignar clase activa al nuevo índice
        backgroundItems[index].classList.add('active');
        thumbnailCards[index].classList.add('active');
        dots[index].classList.add('active');

        // Efecto de deslizamiento de tarjetas: reordenamos el DOM para que la activa sea la primera
        if(thumbnailContainer.contains(thumbnailCards[index])) {
            thumbnailContainer.appendChild(thumbnailCards[index]); // Mover al final para que sea la primera visualmente al deslizar
        }
    }

    // Función de reordenamiento DOM para mantener la lógica de tarjetas siguientes
    function moveThumbnails() {
        // Obtenemos todas las tarjetas de nuevo para el orden actual
        const currentThumbs = document.querySelectorAll('.thumbnail-card');
        thumbnailContainer.prepend(currentThumbs[currentThumbs.length - 1]); // Movemos la última al principio
    }

    // Botón Siguiente
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % countItems;
        updateActiveState(currentIndex);
    });

    // Botón Anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + countItems) % countItems;
        updateActiveState(currentIndex);
    });

    // CLIC EN TARJETAS PEQUEÑAS - Al hacer clic, se vuelven el fondo principal
    thumbnailCards.forEach((card) => {
        card.addEventListener('click', () => {
            const indexAttribute = card.getAttribute('data-index');
            if (indexAttribute !== null) {
                currentIndex = parseInt(indexAttribute);
                updateActiveState(currentIndex);
            }
        });
    });

    // Permitir clic en los puntos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateActiveState(currentIndex);
        });
    });

    // Cambio automático cada 8 segundos (opcional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % countItems;
        updateActiveState(currentIndex);
    }, 8000);
});
document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMACIÓN DE ENTRADA AL HACER SCROLL (Scroll Reveal)
    const observerOptions = {
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Seleccionar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.mini-card, .msg-card, .final-text, .final-media');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-item');
        revealOnScroll.observe(el);
    });

    // 2. EFECTO PARALLAX 3D TILT EN LAS TARJETAS (MOVIMIENTO SEGÚN EL MOUSE)
    const cards = document.querySelectorAll('.msg-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 3. AMPLIA LA FOTO FINAL AL HACER CLIC
    const finalPhoto = document.querySelector('.final-media img');
    if (finalPhoto) {
        finalPhoto.style.cursor = 'pointer';
        finalPhoto.addEventListener('click', () => {
            finalPhoto.classList.toggle('enlarged');
        });
    }
});