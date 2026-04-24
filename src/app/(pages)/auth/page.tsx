import { redirect } from 'next/navigation'

import { AUTH_STAGES } from "@/shared/constants/authStages";
import { LoginForm } from "@/features/auth/login/ui";
import { RegisterForm } from "@/features/auth/register/ui";
import { Text } from "@/shared/ui";

import styles from "./styles.module.scss";
import { ROUTES } from '@/shared/constants/routes';


export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const {stage} = await searchParams

    return (
        <div className={styles.page}>
            {stage === AUTH_STAGES.LOGIN && 
                <div className={styles.form}>
                    <LoginForm/>
                    <div className={styles.text}>
                        <Text >Нет аккаунта?</Text>
                        <a className={styles.link} href={ROUTES.register}>Зарегистрируйся!</a>
                    </div>
                </div>
            }
            {stage === AUTH_STAGES.REGISTER && 
                <div className={styles.form}>
                    <RegisterForm/>
                    <div className={styles.text}>
                        <Text>Уже есть аккаунт?</Text>
                        <a className={styles.link} href={ROUTES.login}>Войди!</a>
                    </div>
                </div>
            }
        </div>
    );
}
