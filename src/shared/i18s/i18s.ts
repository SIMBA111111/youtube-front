import i18n from "i18next";
import Cookies from "js-cookie";
import { initReactI18next } from "react-i18next";


// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: {
      "account": "account",
      "adventure": "adventure",
      "all": "all",
      "anything not found": "anything not found",
      "Buttons and on-screen text in this browser": "buttons and on-screen text in this browser",
      "dark": "dark",
      "device based": "device based",
      "downloads": "downloads",
      "english": "english",
      "enter a query": "enter a query",
      "fresh": "fresh",
      "games": "games",
      "interface Language": "interface Language",
      "let`s registration": "register",
      "light": "light",
      "liked videos": "liked videos",
      "login": "login",
      "login account": "login to account",
      "logout": "logout",
      "history": "history",
      "main": "main",
      "movies": "movies",
      "music": "music",
      "navigator": "navigator",
      "newForMe": "new for me",
      "no": "no",
      "password": "password",
      "podcast": "podcast",
      "playlists": "playlists",
      "rap": "rap",
      "russian": "russian",
      "settings": "settings",
      "shorts": "shorts",
      "sport": "sport",
      "subscriptions": "subscriptions",
      "theme": "theme",
      "the setting will be applied only in this browser": "the setting will be applied only in this browser",
      "username": "username",
      "videogames": "video games",
      "videos": "videos",
      "viewed": "viewed",
      "view channel": "view channel",
      "view later": "view later",
      "you": "you",
      "you will be able to like, comment, and subscribe to channels": "you will be able to like, comment, and subscribe to channels",
      "your videos": "your videos"
    }
  },
  ru: {
    translation: {
      "account": "аккаунт",
      "adventure": "приключение",
      "all": "все",
      "anything not found": "ничего не найдено",
      "buttons and on-screen text in this browser": "кнопки и текст на экране в этом браузере",
      "dark": "тёмная",
      "device based": "как на устройстве",
      "downloads": "скачанное",
      "english": "английский",
      "enter a query": "введите запрос",
      "fresh": "свежее",
      "games": "игры",
      "Interface Language": "язык интерфейса",
      "let`s registration": "зарегистрируйся",
      "light": "светлая",
      "liked videos": "понравившиеся",
      "login": "войти",
      "login account": "войти в аккаунт",
      "logout": "выйти",
      "history": "история",
      "main": "главная",
      "movies": "фильмы",
      "music": "музыка",
      "navigator": "навигатор",
      "newForMe": "новинки",
      "no": "нет",
      "password": "пароль",
      "podcast": "подкаст",
      "playlists": "плейлисты",
      "rap": "рэп",
      "russian": "русский",
      "settings": "настройки",
      "shorts": "короткие видео",
      "sport": "спорт",
      "subscriptions": "подписки",
      "theme": "тема",
      "The setting will be applied only in this browser": "настройка будет применена только в этом браузере.",
      "username": "имя пользователя",
      "videogames": "видеоигры",
      "videos": "видео",
      "viewed": "просмотренно",
      "view channel": "посмотреть канал",
      "view later": "посмотреть позже",
      "you": "вы",
      "you will be able to like, comment, and subscribe to channels": 'вы сможете ставить отметки "Нравится", писать комментарии и подписываться на каналы',
      "your videos": "ваши видео"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Cookies.get('lang') || navigator.language.slice(0, 2), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;