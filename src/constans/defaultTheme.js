export const DefaultTheme = () => {
    let currentHour = new Date().getHours();
    let defaultTheme = 'light'
    if (currentHour >= 7 && currentHour < 19) {
        defaultTheme = 'light';
    } else {
        defaultTheme = 'dark'
    }
    return defaultTheme
}