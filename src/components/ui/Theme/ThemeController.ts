export type ThemeValue = 'auto' | 'dark' | 'light';

export function setTheme(theme: ThemeValue) {
    if (theme === 'auto') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        document.documentElement.dataset.theme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.dataset.themeValue = 'auto';
        window.localStorage.removeItem('theme');
    } else {
        document.documentElement.dataset.theme = theme;
        document.documentElement.dataset.themeValue = theme;
        window.localStorage.setItem('theme', theme);
    }
}

export function getTheme() {
    return (window.localStorage.getItem('theme') as ThemeValue) ?? 'auto';
}
