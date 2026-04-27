export const login = async (loginData: { username: string; password: string; }, openToast: (text: string) => void) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            body: JSON.stringify(loginData),
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })

        const result = await res.json() 
        console.log('result = ', result);
        
        if (res.status === 201) {
            openToast('Успешная авторизация!')
            window.location.replace('/')
        }

    } catch (error) {
        
    }
}