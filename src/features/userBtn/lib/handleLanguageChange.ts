import { i18n } from 'i18next'
import Cookies from 'js-cookie'

export const handleLanguageChange = async (lang: string, i18n: i18n) => {
    Cookies.set('lang', lang)
    await i18n.changeLanguage(lang)
}