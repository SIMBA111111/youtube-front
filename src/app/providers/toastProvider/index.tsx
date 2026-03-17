'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

import styles from './styles.module.scss'


interface IToast {
  text: string
  id: number
}

interface IToastContext {
  toasts: IToast[]
  openToast: (text: string) => void
}

const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const openToast = useCallback((text: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { text, id }])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, openToast }}>
      {children}
      <NotificationContainer />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

// Компонент для отображения всех уведомлений
const NotificationContainer: React.FC = () => {
  const { toasts } = useToast()
  
  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastsList}>
        {toasts.map(toast => (
          <div key={toast.id} className={styles.toast}>
              {toast.text}
          </div>
        ))}
      </div>
    </div>
  )
}