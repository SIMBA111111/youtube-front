import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
            credentials: "include",
            method: 'POST'
        })

        window.location.replace('/')
    } catch (error) {
        console.log('ERROR logout: ', error);
    }
}