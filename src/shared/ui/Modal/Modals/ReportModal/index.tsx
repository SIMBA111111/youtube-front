// "use client"

// import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
// import { createPortal } from "react-dom"
// import clsx from "clsx"

// import { Svg } from "../Svg"
// import { Text } from "../Text"

// import styles from './styles.module.scss'
// import { Modal } from "../.."

// interface IReportModal {
//     isOpenedModal: true
//     handleCloseModal: () => void
//     modalStep: number
//     setModalStep: (newValue: number) => void
// }

// export const ReportModal: React.FC<IReportModal> = ({
//     isOpenedModal,
//     handleCloseModal,
//     modalStep,
//     setModalStep
// }) => {
//     return (
//         <Modal 
//             isVisible={isOpenedModal} 
//             setIsVisible={handleCloseModal} 
//             isOverlay 
//             className={styles.customModal2} 
//             isCloseButton={true} 
//             title={
//                     <div className={styles.customModal2_title}>
//                     <button className={styles.customModal2_title_btn} onClick={() => setModalStep(1)}>
//                         <Svg name="arrowLeftFull" color="black"/>
//                     </button>
//                     <Text color="var(--blackText)" size={22}>Пожаловаться</Text>
//                 </div> 
//             }
//         >
//             <div className={styles.customModal2_content}>
//                 <div className={styles.customModal2_content_text}>
//                     <Text size={18}>Хотите что-то добавить?</Text>
//                     <Text lineHeight={20} size={14}>Добавьте информацию, которая поможет нам разобраться в проблеме. Не включайте в жалобу личную информацию и вопросы.</Text>

//                     <form  
//                         action={(formData: FormData) => handleSendReport(formData)} 
//                         className={styles.customModal2_content_form}
//                     >
//                         <textarea 
//                             className={styles.customModal2_content_areaText}
//                             placeholder="Добавьте сюда дополнительную информацию…"
//                             name="reportText"   
//                         />
//                         <button 
//                             className={styles.customModal2_content_btn} 
//                             disabled={selectedReportId ? false : true} 
//                             type="submit"
//                         >
//                             Пожаловаться
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </Modal>
//     )
// }