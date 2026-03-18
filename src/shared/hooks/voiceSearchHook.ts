import { useState } from "react";

export const voiceSearchHook = () => {
    const [voiceText, setVoiceText] = useState<string>('')
    
    const handleRecognition = () => {
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
        
        const recognition = new SpeechRecognition();
        
        recognition.lang = "ru-RU";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onresult = function(event: any) {
            const last = event.results.length - 1;
            const voiceText = event.results[last][0].transcript;
            setVoiceText(voiceText)
        };
        
        recognition.start();
    }
    
    return {
        startRecording: handleRecognition,
        voiceText: voiceText
    }
}