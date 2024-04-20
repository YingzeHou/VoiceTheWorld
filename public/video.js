function navigateTo(page, text) {
   if(page === 'HomePage') {
        window.location.href = '/index.html';  
    }
    speakInstructions(text);
}
function speakInstructions(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text
    msg.lang = 'en-US'; // Set language
    window.speechSynthesis.speak(msg);
}