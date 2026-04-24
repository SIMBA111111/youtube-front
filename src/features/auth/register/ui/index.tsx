'use client'

import React, { useState } from "react"
import { handleRegisterFormData } from "../lib/handlers"
import { register } from "@/shared/api/auth/register"
import styles from './styles.module.scss'

export const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(registerData)
    }
    
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Регистрация</h2>
                
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="text" 
                            placeholder="Полное имя" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'fullname', setRegisterData)
                            }
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="email" 
                            placeholder="Email" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'email', setRegisterData)
                            }
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="tel" 
                            placeholder="Номер телефона" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'phoneNumber', setRegisterData)
                            }
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="text" 
                            placeholder="Имя пользователя" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'username', setRegisterData)
                            }
                        />
                    </div>
                    
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <input 
                            className={styles.input}
                            type="password" 
                            placeholder="Пароль" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'password', setRegisterData)
                            }
                        />
                    </div>
                </div>
                
                <button className={styles.button} type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}