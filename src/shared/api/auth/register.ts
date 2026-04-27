interface IFormData {
    name: string
    email: string
    username: string
    password: string
}

export const register = async (formData: IFormData, openToast: (text: string) => void) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
            body: JSON.stringify(formData),
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await res.json()
        console.log('result = ', result);

        if(res.status === 201) {
            openToast('Успешная регистрация!')
            window.location.replace('/')
        }
        
    } catch (error) {
        
    }
}