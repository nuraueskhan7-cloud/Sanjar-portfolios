/**
 * SANJAR.DEV - Core Navigation Logic
 * Исправленная версия для работы всех кнопок переключения.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Инициализация элементов
    // Ищем все элементы, у которых есть класс nav-link и атрибут data-target
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const tabContents = document.querySelectorAll('.tab-content');

    /**
     * Функция переключения вкладок (SPA)
     */
    const switchTab = (targetId) => {
        console.log('Switching to:', targetId); // Для отладки в консоли (F12)

        // Убираем активный класс у всех навигационных ссылок
        navLinks.forEach(link => link.classList.remove('active'));

        // Скрываем все секции контента
        tabContents.forEach(section => section.classList.remove('active'));

        // Активируем ВСЕ кнопки, которые ведут на эту секцию (и в меню, и в тексте)
        const targetLinks = document.querySelectorAll(`[data-target="${targetId}"]`);
        targetLinks.forEach(link => link.classList.add('active'));

        // Показываем нужную секцию
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Скроллим в начало страницы при переключении
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Запускаем анимацию цифр, если перешли в раздел "Experience" (about)
            if (targetId === 'about') {
                animateStats();
            }
        }
    };

    // Вешаем обработчик клика на каждую кнопку/ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем перезагрузку страницы
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
            }
        });
    });

    /**
     * Анимация счетчиков статистики
     */
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const originalText = stat.innerText;
            const target = parseInt(originalText.replace(/[^0-9]/g, ''));

            if (isNaN(target)) return;

            let count = 0;
            const duration = 1500; // 1.5 секунды
            const increment = target / (duration / 16); // Примерно 60 кадров в сек

            const update = () => {
                if (count < target) {
                    count += increment;
                    let displayValue = Math.ceil(count);

                    // Сохраняем префиксы типа # или %
                    if (originalText.includes('#')) displayValue = '#' + displayValue;
                    if (originalText.includes('%')) displayValue = displayValue + '%';

                    stat.innerText = displayValue;
                    requestAnimationFrame(update);
                } else {
                    stat.innerText = originalText;
                }
            };
            update();
        });
    };

    /**
     * Обработка формы контактов
     */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            // Имитация отправки
            setTimeout(() => {
                submitBtn.innerText = 'SENT!';
                submitBtn.style.background = '#00ffaa';
                alert('Success! Your message has been simulated as sent.');

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1000);
        });
    }

    console.log("System Check: Navigation Ready.");
});