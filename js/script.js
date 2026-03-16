// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    
    /* ======== УСТАНОВКА ТЕКУЩЕЙ ДАТЫ ======== */
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = today.toLocaleDateString('ru-RU', options);
    
    const footerDate = document.getElementById('current-date');
    if (footerDate) {
        footerDate.textContent = `Сегодня: ${currentDate}`;
    }
    
    /* ======== ПОДСВЕТКА АКТИВНОЙ СТРАНИЦЫ ======== */
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Для главной страницы (если это index.html или просто /)
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
    
    /* ======== ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ ======== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = document.getElementById('name')?.value || 'Не указано';
            const email = document.getElementById('email')?.value || 'Не указан';
            const message = document.getElementById('message')?.value || 'Пусто';
            
            // Показываем уведомление
            alert(`Спасибо, ${name}! Ваше сообщение отправлено.\n\nМы свяжемся с вами в ближайшее время.`);
            
            // Очищаем форму
            contactForm.reset();
        });
    }
    
    /* ======== ПОИСК ПО КАТАЛОГУ (ДЛЯ НОВИНОК) ======== */
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchButton && searchResults) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm.length < 3) {
                alert('Введите минимум 3 символа для поиска');
                return;
            }
            
            // Имитация поиска (база данных книг)
            const books = [
                { title: 'Java для начинающих', author: 'П. Ноутон', year: '2026', section: 'Программирование' },
                { title: 'Искусственный интеллект в библиотечном деле', author: 'А.Н. Смирнов', year: '2026', section: 'IT' },
                { title: 'История Карачаево-Черкесии в XXI веке', author: 'Коллектив авторов', year: '2026', section: 'Краеведение' },
                { title: 'Базы данных: проектирование и оптимизация', author: 'Т. Коннолли', year: '2025', section: 'IT' },
                { title: 'Цифровая трансформация библиотек', author: 'Е.В. Кузнецова', year: '2026', section: 'Библиотечное дело' },
                { title: 'Веб-разработка с нуля', author: 'Д. Макфарланд', year: '2025', section: 'IT' },
                { title: 'Spring в действии', author: 'Крейг Уоллс', year: '2026', section: 'Программирование' },
                { title: 'Народные сказки КЧР', author: 'Сборник', year: '2026', section: 'Детская литература' },
                { title: 'Формула-1: Техника и стратегия', author: 'Л. Хэмилтон', year: '2025', section: 'Спорт' }
            ];
            
            // Фильтруем книги по поисковому запросу
            const results = books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm)
            );
            
            // Отображаем результаты
            if (results.length > 0) {
                let resultsHTML = `<h3>Результаты поиска для "${searchTerm}":</h3>`;
                resultsHTML += '<div class="card-container">';
                
                results.forEach(book => {
                    resultsHTML += `
                        <div class="card">
                            <h4>${book.title}</h4>
                            <p><strong>Автор:</strong> ${book.author}</p>
                            <p><strong>Год:</strong> ${book.year}</p>
                            <p><strong>Раздел:</strong> ${book.section}</p>
                            <p class="date">В наличии</p>
                        </div>
                    `;
                });
                
                resultsHTML += '</div>';
                searchResults.innerHTML = resultsHTML;
            } else {
                searchResults.innerHTML = `
                    <div class="card" style="text-align: center;">
                        <p>По запросу "${searchTerm}" ничего не найдено.</p>
                        <p>Попробуйте изменить поисковый запрос или обратитесь к библиотекарю.</p>
                    </div>
                `;
            }
        });
        
        // Поиск по нажатию Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    /* ======== ПОДПИСКА НА НОВИНКИ ======== */
    const subscribeForms = document.querySelectorAll('form:not(#contactForm)');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Спасибо за подписку! Новости будут приходить на ${emailInput.value}`);
                emailInput.value = '';
            } else {
                alert('Пожалуйста, введите email');
            }
        });
    });
    
    /* ======== АНИМАЦИЯ КАРТОЧЕК ПРИ НАВЕДЕНИИ ======== */
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s';
        });
    });
    
    /* ======== ОТОБРАЖЕНИЕ ТЕКУЩЕГО ГОДА В КОПИРАЙТЕ ======== */
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = today.getFullYear();
    });
    
    /* ======== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ======== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    /* ======== СООБЩЕНИЕ ДЛЯ АУДИО ======== */
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            console.log('Аудио воспроизводится (демонстрационный режим)');
        });
    });
    
    console.log('Сайт библиотеки загружен. Дата: ' + currentDate);
});