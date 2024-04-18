function navigateTo(page, text) {
    if (page === 'CameraPage') {
        window.location.href = '/camera.html'; 
    } else if (page === 'VideoPage') {
        window.location.href = '/video.html';  
    }
    else if (page==='HomePage') {
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


// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();
// recognition.continuous = false;
// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

// const voiceCommand = document.getElementById('voice-command');
// voiceCommand.addEventListener('click', () => {
//     speakInstructions('Listening to command');
//     recognition.start();
//     voiceCommand.classList.replace('fa-microphone', 'fa-record-vinyl')
//     voiceCommand.classList.toggle('listening')
// });

// recognition.onresult = (event) => {
//     voiceCommand.classList.remove('listening');
//     voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
//     const last = event.results.length - 1;
//     const command = event.results[last][0].transcript.toLowerCase();
//     console.log(command)
// }
// recognition.onspeechend = () => {
//     recognition.stop();
//     voiceCommand.classList.remove('listening');
//     voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
// };

// recognition.onerror = (event) => {
//     console.error('Recognition error: ', event.error);
//     voiceCommand.classList.remove('listening');
//     voiceCommand.classList.replace('fa-record-vinyl', 'fa-microphone')
// };