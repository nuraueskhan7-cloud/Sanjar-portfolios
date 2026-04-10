/**
 * SANJAR.DEV - Ultimate Engine
 * Вкладки + Мобильное меню + Анимация цифр + Форма
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (SPA) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navMenu = document.querySelector('.nav-menu');

    const switchTab = (targetId) => {
        navLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(section => section.classList.remove('active'));

        const targetLinks = document.querySelectorAll(`[data-target="${targetId}"]`);
        targetLinks.forEach(link => link.classList.add('active'));

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Если переключились на About или Home, запускаем счетчики заново
            if (targetId === 'about' || targetId === 'home') {
                initStatsAnimation();
            }
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
                
                // Закрываем мобильное меню после клика
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                }
            }
        });
    });


    // --- 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
    }


    // --- 3. АНИМАЦИЯ ЦИФР (Твой оригинал) ---
    const initStatsAnimation = () => {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const target = parseInt(stat.innerText);
            if (isNaN(target)) return; 
            
            let count = 0;
            const duration = 1500; 
            const increment = target / (duration / 16);

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.innerText = Math.ceil(count) + (stat.innerText.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + (stat.innerText.includes('+') ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Запускаем при первой загрузке
    initStatsAnimation();


    // --- 4. ОБРАБОТКА ФОРМЫ ---
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
                alert('Сообщение "отправлено" (симуляция)!');
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    console.log("System Status: All systems nominal. Mobile support active.");
});
