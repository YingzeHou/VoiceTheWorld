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

let video = document.getElementById("singleWebcam");
let takeWebcam = document.getElementById('takeWebcam');
let width = 420;
let height = 315;
let responseText = document.getElementById("responseText");
let streaming = false;

function setUpWebcam() {
    takeWebcam.style.display='block';
    // viewWebcam.style.display = "none";

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
        "play",
        (ev) => {
            if (!streaming) {
                // height = video.videoHeight / (video.videoWidth / width);
        
                // // Firefox currently has a bug where the height can't be read from
                // // the video, so we will make assumptions if this happens.
        
                // if (isNaN(height)) {
                //     height = width / (4 / 3);
                // }
                video.setAttribute("width", width);
                video.setAttribute("height", height);
                // canvas.setAttribute("width", width);
                // canvas.setAttribute("height", height);
                streaming = true;
                captureAndProcessImage();
                startPeriodicCapture();
            }
        },
        false,
    );
}

function startPeriodicCapture() {
    setInterval(() => {
        captureAndProcessImage();
    }, 5000); // Capture every 5 seconds
}

function captureAndProcessImage() {
    const canvas = document.createElement('canvas'); // Create a new canvas element dynamically
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height); // Draw image from video onto the canvas
    const imageDataURL = canvas.toDataURL('image/jpeg'); // Convert canvas to JPEG format

    // Assume an async function sendImageToAI that sends the imageDataURL and returns a description
    sendImageToAI(imageDataURL).then(description => {
        responseText.value = description; // Display AI response in the textarea
    }).catch(error => {
        console.error("Error processing image with AI:", error);
        responseText.value = "Failed to get a response.";
    });
}

let count = 0;
async function sendImageToAI(imageData) {
    // let count = 0;
    // setInterval(() => {
    //     count+=1;
    //     return "Mock Response "+count +" for the first "+(count*5)+" seconds";
    // }, 5000); // Capture every 5 seconds
    count+=1;
    return  "Mock Response "+count +" for the first "+(count*5)+" seconds";
    /**
    * Uncomment the below section to use True AI response
    */
    // try{
    //     const response = await fetch(
    //         'https://noggin.rea.gent/hurt-sturgeon-7680',
    //         {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer rg_v1_sgqulc8yhsdsgl25wfglsutz2wfpfjr9kgpx_ngk',
    //         },
    //         body: JSON.stringify({
    //             // fill variables here.
    //             // You can use an external URL or a data URL here.
    //             "image": imageData,
    //         }),
    //         }
    //     ).then(response => response.text());
    //    return response;
    // }
    // catch(error) {
    //     console.error('An error occurred:', error);
    // }
}

document.getElementById('startCamera').addEventListener('click', function() {

    const width = 420; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    this.style.display = 'none';
    setUpWebcam();
    speakInstructions("Live Mode start");
});