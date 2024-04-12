function navigateTo(page) {
    if (page === 'CameraPage') {
        window.location.href = '/camera.html'; 
    } else if (page === 'VideoPage') {
        window.location.href = '/video.html';  
    }
}

function speakInstructions() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = "Click on left half of screen to trigger camera mode, right half to trigger video mode";
    msg.lang = 'en-US'; // Set language
    window.speechSynthesis.speak(msg);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const voiceCommand = document.getElementById('voice-command');
voiceCommand.addEventListener('click', () => {
    recognition.start();
    voiceCommand.classList.replace('fa-microphone', 'fa-record-vinyl')
    voiceCommand.classList.toggle('listening')
});

recognition.onresult = (event) => {
    voiceCommand.classList.remove('listening');
    voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
}
recognition.onspeechend = () => {
    recognition.stop();
    voiceCommand.classList.remove('listening');
    voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
};

recognition.onerror = (event) => {
    console.error('Recognition error: ', event.error);
    voiceCommand.classList.remove('listening');
    voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
};