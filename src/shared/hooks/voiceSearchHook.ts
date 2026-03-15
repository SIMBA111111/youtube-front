import { useState } from "react";

export const voiceSearchHook = () => {
    const [voiceText, setVoiceText] = useState<string>('')
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    const handleRecognition = () => {
        recognition.start()
    }

    recognition.onresult = function(event: any) {
        const last = event.results.length - 1;
        const voiceText = event.results[last][0].transcript;
        setVoiceText(voiceText)
    };

    return {
        startRecording: handleRecognition,
        voiceText: voiceText
    }
}