import { Theme } from "@/app/providers/themeProvider"

// export type Theme = 'light' | 'dark' | 'device';
export const getCurrentTheme = (): Theme => {
    const currentTheme = window.localStorage.getItem('theme') ? 
        window.localStorage.getItem('theme')
        :
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    return currentTheme
} 