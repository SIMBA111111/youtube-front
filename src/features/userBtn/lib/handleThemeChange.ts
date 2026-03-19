import Cookies from 'js-cookie'

export const handleThemeChange = (theme: string) => {
    console.log(theme);
    
    Cookies.set('theme', theme)
}