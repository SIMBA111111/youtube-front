import { Themes, type Theme } from '@/app/providers/themeProvider';
import { Dispatch, SetStateAction } from 'react';

export const handleThemeChange = (theme: string, setTheme: (theme: Theme) => void, setCurrentTheme: Dispatch<SetStateAction<Theme>>) => {
    if (Object.keys(Themes).includes(theme as Themes)) {
        setTheme(theme as Theme);
        setCurrentTheme(theme as Theme)
    }
}