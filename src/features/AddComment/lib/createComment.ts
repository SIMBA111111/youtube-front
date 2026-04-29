import { createComment } from "@/shared/api/comments/createComment"
import { RefObject } from "react"

export const handleCreateComment = async (
    value: string | undefined, 
    videoId: string, 
    userId: string, 
    setInputHidden: (v: boolean) => void,
    inputRef: RefObject<HTMLInputElement | null>,
    openToast: (text: string) => void
) => {
    if(value) {
        const res = await createComment(value, videoId, userId)
        setInputHidden(true)
        if(inputRef.current) 
            inputRef.current.value = ''
        }
        openToast('Комментарий добавлен!')
}