export const logout = async () => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
            credentials: "include",
            method: 'POST'
        })
    } catch (error) {
        
    }
}