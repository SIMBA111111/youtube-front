interface IFormData {
    fullname: string
    email: string
    phoneNumber: string
    username: string
    password: string
}

export const register = async (formData: IFormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
            body: JSON.stringify(formData),
            credentials: "include",
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await res.json()
        console.log('result = ', result);
        

    } catch (error) {
        
    }
}