export type TLangShort = 'ru' | 'en'
export type TLangFull = 'russian' | 'english'

interface ILanguage {
    id: TLangShort
    name: TLangFull
}

export const languages = [
    { id: 'ru', name: 'russian' },
    { id: 'en', name: 'english' },
] as ILanguage[]
