// import { Dispatch, FC, ReactNode, SetStateAction } from "react"
// import { Popover } from "../.."
// import { SubModalType } from "@/features/UnauthoredSettingsBtn/ui"

// import styles from './styles.module.scss'
// import { Svg } from "@/shared/ui/Svg"
// import { Text } from "@/shared/ui/Text"
// import Link from "next/link"
// import { BackgroundFon } from "@/shared/ui/BackgroundFon"


// interface IUnauthMenuPopover {
//     isOpen: boolean
//     onClose: () => void
//     subModal: SubModalType
//     setSubModal: Dispatch<SetStateAction<SubModalType>>
// }

// export const UnauthMenuPopover: FC<IUnauthMenuPopover> = ({
//     isOpen,
//     onClose,
//     subModal,
//     setSubModal
// }): ReactNode => {
//     return (
//         <Popover 
//             isOpen={isOpen} 
//             onClose={() => onClose()} 
//             className={styles.userModal}
//             offset={30}
//         >
//             {/* Основное меню (скрывается когда открыта вложенная модалка) */}
//             {!subModal && (<>
//                 <div className={styles.settings}>
//                     <div 
//                         className={styles.settings__item}
//                         onClick={() => setSubModal('theme')}
//                     >
//                         <Svg name="moon"/>
//                         <Text weight={400}>Тема: {Themes[currentTheme]}</Text>
//                         <Svg name="arrowLeft"/>
//                     </div>

//                     <div 
//                         className={styles.settings__item}
//                         onClick={() => setSubModal('language')}
//                     >
//                         <Svg name="lenguage"/>
//                         <Text weight={400}>Язык интерфейса: {languages.find((lang) => lang.id === activeLanguage)?.name}</Text>
//                         <Svg name="arrowLeft"/>
//                     </div>

//                     <Link href={'/account'} className={styles.settings__item}>
//                         <Svg name="settings"/>
//                         <Text weight={400}>Настройки</Text>
//                     </Link>
//                 </div>
//             </>)}

//             {/* Вложенное меню (показывается вместо основного) */}
//             {subModal === 'theme' && (
//                 <div className={styles.subMenu}>
//                     <div className={styles.subMenu__header} onClick={() => setSubModal(null)}>
//                         <Svg name="arrowLeftFull" />
//                         <Text weight={400}>Тема</Text>
//                     </div>
//                     <div className={styles.subMenu__list}>
//                         <Text size={14} color="gray" weight={400} className={styles.warningText}>Настройка будет применена только в этом браузере.</Text>
//                         {themes.map(theme => (
//                             <div 
//                                 key={theme.id}
//                                 className={`${styles.subMenu__item} ${currentTheme === theme.id ? styles.active : ''}`}
//                                 onClick={() => handleThemeChange(theme.id, setTheme, setCurrentTheme)}
//                             >
//                                     <div className={styles.svgColor}>{currentTheme === theme.id && <Svg name="check" />}</div>
//                                     <Text weight={400}>{theme.name}</Text>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {subModal === 'language' && (
//                 <div className={styles.subMenu}>
//                     <div className={styles.subMenu__header} onClick={() => setSubModal(null)}>
//                         <BackgroundFon bacgroundColor="">
//                             <Svg name="arrowLeftFull" />
//                         </BackgroundFon>
//                         <Text weight={400}>{t('Interface Language')}</Text>
//                     </div>
//                     <Text size={14} color="gray" weight={400} className={styles.warningText}>Кнопки и текст на экране в этом браузере</Text>
//                     <div className={styles.subMenu__list}>
//                         {languages.map(lang => (
//                             <div 
//                                 key={lang.id}
//                                 className={`${styles.subMenu__item} ${activeLanguage === lang.id ? styles.active : ''}`}
//                                 onClick={() => handleLanguageChange(lang.id)}
//                             >
//                                 <div>{activeLanguage === lang.id && <Svg name="check" />}</div>
//                                 <Text weight={400}>{lang.name}</Text>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </Popover>
//     )
// }