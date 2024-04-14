function navigateTo(page, text) {
    if (page === 'SinglePage') {
        window.location.href = '/single.html'; 
    } else if (page === 'PanoramaPage') {
        window.location.href = '/panoramic.html';  
    }
    speakInstructions(text);
}

function speakInstructions(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text
    msg.lang = 'en-US'; // Set language
    window.speechSynthesis.speak(msg);
}

function setUpWebcam(width, height) {
    let streaming = false;
    let video = document.getElementById("singleWebcam");
    let canvas = document.getElementById("canvas");
    let snapButton = document.getElementById("snap");
    let takeWebcam = document.getElementById('takeWebcam');
    let viewWebcam = document.getElementById('viewWebcam');

    takeWebcam.style.display='block';

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });

    video.addEventListener(
        "canplay",
        (ev) => {
            if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
    
            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.
    
            if (isNaN(height)) {
                height = width / (4 / 3);
            }
    
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
            }
        },
        false,
    );

    function clearphoto() {
        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    }

    function takepicture() {
        const context = canvas.getContext("2d");
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
    
            const data = canvas.toDataURL("image/png");
            localStorage.setItem("singleImg", data);
        } else {
            clearphoto();
        }
    }

    snapButton.addEventListener(
        "click",
        (ev) => {
            takeWebcam.style.display = 'none';
            viewWebcam.style.display = 'block'
            console.log("Take")
            takepicture();
            ev.preventDefault();
        },
        false,
    );
}

document.getElementById('startCamera').addEventListener('click', function() {

    const width = 420; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    this.style.display = 'none';
    setUpWebcam(width, height);
});

document.getElementById('redo').addEventListener('click', function() {

    const width = 420; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    let viewWebcam = document.getElementById('viewWebcam');
    viewWebcam.style.display = "none";
    setUpWebcam(width, height);
});
