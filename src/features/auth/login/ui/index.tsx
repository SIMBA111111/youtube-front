'use client'

import React, { useState } from "react"
import { login } from "@/shared/api/auth/login"
import { handleLoginFormData } from "../lib/handlers"
import styles from './styles.module.scss'

export const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(loginData)
    }
    
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Войти в аккаунт</h2>
                
                <div className={styles.inputGroup}>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="Имя пользователя" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleLoginFormData(e, 'username', setLoginData)
                        }
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <input 
                        className={styles.input}
                        type="password" 
                        placeholder="Пароль" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleLoginFormData(e, 'password', setLoginData)
                        }
                    />
                </div>
                
                <button className={styles.button} type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}