import Cookies from 'js-cookie'

export const handleLanguageChange = (lang: string) => {
    Cookies.set('lang', lang)
}