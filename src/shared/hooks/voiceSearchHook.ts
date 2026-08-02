import { useRef, useState } from "react";

export const voiceSearchHook = () => {
    const [voiceText, setVoiceText] = useState<string>('')
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const recognitionRef = useRef(null)
    
    const handleRecognition = () => {
        try {
            // Проверяем наличие window только в момент вызова функции
            if (typeof window === 'undefined') {
                console.log("Speech Recognition недоступен на сервере");
                return;
            }
            
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            
            if (!SpeechRecognition) {
                console.log("Браузер не поддерживает Speech Recognition");
                return;
            }
            
            setIsRecording(true)
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition

            recognition.lang = "ru-RU";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            recognition.onresult = (event: any) => {
                const last = event.results.length - 1;
                const voiceText = event.results[last][0].transcript;
                setVoiceText(voiceText)
                setIsRecording(false)
            };
            
            recognition.start();     
        } catch (error) {
           setIsRecording(false) 
        }

    }

    const handleStopRecognition = () => {
        try {
            if (!recognitionRef.current) 
                return

            recognitionRef.current.stop()
            setIsRecording(false)
        } catch (error) {
            setIsRecording(false)
        }
    }

    return {
        startRecording: handleRecognition,
        stopRecording: handleStopRecognition,
        voiceText: voiceText,
        isRecording: isRecording
    }

}