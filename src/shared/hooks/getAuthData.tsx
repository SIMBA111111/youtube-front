// app/context.ts
import { cache } from 'react'
import { cookies } from 'next/headers'

export const getServerAuthData = cache(async () => {
    const cookieStore = await cookies() // cache() на верхнем уровне
    return {
        userData: cookieStore.get('channelData')?.value,
        jwt: cookieStore.get('jwt')?.value
    }
})

// Использование:
const authData = await getServerAuthData() // ✅ Работает!