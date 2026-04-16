// Theme Toggle Logic
const themeStorageKey = 'portfolio-theme';

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// Immediately check for saved theme
try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }
} catch (e) {
    console.warn('LocalStorage not accessible during initial theme check:', e);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded. Checking for theme toggle...');
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        console.log('Theme toggle button found.');
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.documentElement.classList.toggle('dark');
            const theme = isDarkMode ? 'dark' : 'light';
            
            try {
                localStorage.setItem(themeStorageKey, theme);
                console.log('Theme changed to:', theme);
            } catch (e) {
                console.error('Could not save theme preference:', e);
            }
        });
    } else {
        console.warn('Theme toggle button NOT found on this page.');
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
