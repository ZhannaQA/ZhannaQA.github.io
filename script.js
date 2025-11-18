// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем сохраненную тему в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeButton();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Сохраняем выбор темы в localStorage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
        themeToggle.textContent = '☀️ Светлая тема';
    } else {
        localStorage.setItem('theme', '');
        themeToggle.textContent = '🌙 Тёмная тема';
    }
});

function updateThemeButton() {
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Светлая тема';
    } else {
        themeToggle.textContent = '🌙 Тёмная тема';
    }
}

// Копирование контактов в буфер обмена
const copyButtons = document.querySelectorAll('.copy-btn');
const notification = document.getElementById('notification');
const emailText = document.querySelector('.contact-text');

// Обработчик для кнопок копирования
copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        const contact = button.getAttribute('data-contact');
        copyToClipboard(contact);
        showNotification();
        
        // Визуальная обратная связь для кнопки
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Обработчик для клика по тексту почты (альтернативный способ копирования)
emailText.addEventListener('click', () => {
    const email = 'zhannahannasolo@yandex.ru';
    copyToClipboard(email);
    showNotification();
    
    // Визуальная обратная связь
    emailText.style.color = '#667eea';
    setTimeout(() => {
        // Возвращаем правильный цвет в зависимости от темы
        if (body.classList.contains('dark-theme')) {
            emailText.style.color = '#e2e8f0';
        } else {
            emailText.style.color = '#333';
        }
    }, 300);
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Контакт скопирован: ' + text);
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const businessCard = document.querySelector('.business-card');
    
    setTimeout(() => {
        businessCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        businessCard.style.opacity = '1';
        businessCard.style.transform = 'translateY(0)';
    }, 100);
    
    // Проверка загрузки изображения
    checkAvatarImage();
});

// Проверка загрузки аватара
function checkAvatarImage() {
    const avatarImage = document.getElementById('avatar-image');
    const avatarFallback = document.getElementById('avatar-fallback');
    
    avatarImage.onerror = function() {
        // Если изображение не загрузилось, показываем fallback
        avatarImage.style.display = 'none';
        avatarFallback.style.display = 'flex';
    };
    
    // Проверяем, загрузилось ли изображение
    if (avatarImage.complete) {
        if (avatarImage.naturalHeight === 0) {
            // Изображение не загружено
            avatarImage.style.display = 'none';
            avatarFallback.style.display = 'flex';
        }
    }
}

// Добавляем эффект "пульсации" для контактных элементов при наведении
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'pulse 0.5s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.animation = '';
    });
});