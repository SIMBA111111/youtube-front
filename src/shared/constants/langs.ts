export type TLangShort = 'ru' | 'en'
export type TLangFull = 'Русский' | 'English'

interface ILanguage {
    id: TLangShort
    name: TLangFull
}

export const languages = [
    { id: 'ru', name: 'Русский' },
    { id: 'en', name: 'English' },
] as ILanguage[]
