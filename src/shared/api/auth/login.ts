export const login = async (loginData: { username: string; password: string; }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            body: JSON.stringify(loginData),
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })

        const result = await res.json() 
        console.log('result = ', result);
        

    } catch (error) {
        
    }
}