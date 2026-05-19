'use client'

import { Svg } from "@/shared/ui";
import { useRouter } from "next/navigation";


export const MainLogoBtn = () => {
    const router = useRouter()    

    return (
        <div onClick={() => router.push('/')} style={{cursor: 'pointer'}}>
            <Svg name="mainLogo" />
        </div>
    )
}