/**
 * SANJAR.DEV - Core Engine v3.0
 * Полная поддержка ПК + Мобильная адаптация (Burger Menu)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПЕРЕМЕННЫЕ ИНИЦИАЛИЗАЦИИ ---
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuToggle = document.getElementById('menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');

    /**
     * Функция переключения вкладок (SPA)
     */
    const switchTab = (targetId) => {
        // Убираем активные классы у всех ссылок и секций
        navLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(section => section.classList.remove('active'));

        // Активируем нужные ссылки (и в меню, и в кнопках на странице)
        const targetLinks = document.querySelectorAll(`[data-target="${targetId}"]`);
        targetLinks.forEach(link => link.classList.add('active'));

        // Показываем нужную секцию
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Скроллим вверх при переключении
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Перезапуск анимации цифр, если зашли в Experience
            if (targetId === 'about') {
                animateStatistics();
            }
        }
    };

    // Слушатель кликов по ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            if (targetId) {
                switchTab(targetId);

                // ЕСЛИ МЫ НА МОБИЛКЕ - ЗАКРЫВАЕМ МЕНЮ ПОСЛЕ ВЫБОРА
                if (navWrapper.classList.contains('open')) {
                    navWrapper.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // --- 2. ЛОГИКА МОБИЛЬНОГО МЕНЮ (БУРГЕР) ---
    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            // Открываем/закрываем шторку меню
            navWrapper.classList.toggle('open');
            // Превращаем полоски в крестик (анимация в CSS)
            menuToggle.classList.toggle('active');
        });
    }

    /**
     * 3. АНИМАЦИЯ ЦИФР (Твой оригинальный код)
     */
    const animateStatistics = () => {
        const stats = document.querySelectorAll('.stat-num');
        
        stats.forEach(stat => {
            const originalText = stat.innerText;
            const target = parseInt(originalText.replace(/[^0-9]/g, ''));
            
            if (isNaN(target)) return;

            let count = 0;
            const duration = 2000; // 2 секунды
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Плавное замедление (Ease Out)
                const currentCount = Math.floor(progress * target);
                
                let displayValue = currentCount;
                if (originalText.includes('#')) displayValue = '#' + displayValue;
                if (originalText.includes('%')) displayValue = displayValue + '%';

                stat.innerText = displayValue;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.innerText = originalText;
                }
            };
            requestAnimationFrame(update);
        });
    };

    // Запуск анимации при первой загрузке
    animateStatistics();

    /**
     * 4. ОБРАБОТКА ФОРМЫ (Имитация отправки)
     */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'SENT!';
                submitBtn.style.background = '#00ffaa';
                submitBtn.style.color = '#000';
                
                alert('Success! Your message has been sent (simulation).');

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 2000);
            }, 1200);
        });
    }

    console.log("System Status: All modules active. Responsive UI ready.");
});
