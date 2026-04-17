// Theme Toggle Logic
const themeStorageKey = 'portfolio-theme';
const langStorageKey = 'portfolio-lang';

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

const applyLanguage = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    const translatableElements = document.querySelectorAll('[data-en][data-th]');
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Update document title
    const titleEl = document.querySelector('title[data-en][data-th]');
    if (titleEl) {
        document.title = titleEl.getAttribute(`data-${lang}`);
    }
};

// Immediately check for saved theme and language
try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }

    const savedLang = localStorage.getItem(langStorageKey) || 'en';
    applyLanguage(savedLang);
} catch (e) {
    console.warn('LocalStorage not accessible during initial check:', e);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded.');
    
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.documentElement.classList.toggle('dark');
            const theme = isDarkMode ? 'dark' : 'light';
            
            try {
                localStorage.setItem(themeStorageKey, theme);
            } catch (e) {
                console.error('Could not save theme preference:', e);
            }
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            const newLang = currentLang === 'en' ? 'th' : 'en';
            
            applyLanguage(newLang);
            
            try {
                localStorage.setItem(langStorageKey, newLang);
            } catch (e) {
                console.error('Could not save language preference:', e);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
