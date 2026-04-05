export const formatElipsisText = (text: string, symbolCount: number) => {
    const slicedText = text.slice(0, symbolCount)
    
    return (
        <div>
            {slicedText}...ещё
        </div>
    )

}