'use client'

import React, { useState } from "react"
import { handleRegisterFormData } from "../lib/handlers"
import { register } from "@/shared/api/auth/register"
import styles from './styles.module.scss'
import { useToast } from "@/app/providers/toastProvider"

export const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    
    const {openToast} = useToast()
    
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(registerData, openToast)
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
                            placeholder="Имя канала" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'name', setRegisterData)
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
                    
                    {/* <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="tel" 
                            placeholder="Номер телефона" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleRegisterFormData(e, 'phoneNumber', setRegisterData)
                            }
                        />
                    </div> */}
                    
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