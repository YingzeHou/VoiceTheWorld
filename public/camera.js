function navigateTo(page, text) {
    if (page === 'SinglePage') {
        window.location.href = '/single.html'; 
    } else if (page === 'PanoramaPage') {
        window.location.href = '/panoramic.html';  
    } else if(page === 'HomePage') {
        window.location.href = '/index.html';  
    } else if( page == 'rightPhoto') {
        window.location.href = '/rightPhoto.html';
    } else if( page == 'backPhoto') {
        window.location.href = '/backPhoto.html';
    } else if (page == 'leftPhoto') {
        window.location.href = '/leftPhoto.html';
    }
    speakInstructions(text);
}

let video = document.getElementById("singleWebcam");
let canvas = document.getElementById("canvas");
let takeWebcam = document.getElementById('takeWebcam');
let viewWebcam = document.getElementById('viewWebcam');
let snapButton = document.getElementById("snap");
let width = 420;
let height = 315;

function speakInstructions(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text
    msg.lang = 'en-US'; // Set language
    window.speechSynthesis.speak(msg);
}

function clearphoto(canvas) {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    // photo.setAttribute("src", data);
}

function takepicture(canvas, video) {
    let currDir = "";
    try{
        currDir = document.getElementById('panoramicHeader').innerHTML.split(' ')[0];
    }
    catch(error) {
        
    }
    const context = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL("image/png");
        speakInstructions("Photo Taken");
        if(currDir == "") {
            localStorage.setItem("singleImg", data);
        }
        else{
            console.log(currDir);
            localStorage.setItem(currDir, data);
        }
    } else {
        clearphoto(canvas);
    }
}

function setUpWebcam() {
    let streaming = false;
    takeWebcam.style.display='block';
    viewWebcam.style.display = "none";

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
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                streaming = true;
            }
        },
        false,
    );
}

snapButton.addEventListener(
    "click",
    (ev) => {
        takeWebcam.style.display = 'none';
        viewWebcam.style.display = 'block'
        console.log("Take")
        takepicture(canvas, video);
        ev.preventDefault();
    },
    false,
);

function takeNextPanoramic() {
    const dirs = ['Front', 'Right', 'Back', 'Left'];
    const currDir = document.getElementById('panoramicHeader').innerHTML.split(' ')[0];
    const currInd = dirs.indexOf(currDir);
    let nextDir = dirs[(currInd+1)%4];
    speakInstructions("Take photo for "+nextDir+" direction");
    
    const width = 420;
    let height = 0;
    // let viewWebcam = document.getElementById('viewWebcam');
    // viewWebcam.style.display = "none";
    setUpWebcam(width, height);

    document.getElementById('panoramicHeader').innerHTML = nextDir+' Photo';

    if(nextDir === 'Left') {
        let nextBtn = document.getElementById('next');
        nextBtn.innerHTML = 'Done';
        nextBtn.id = 'panoramicDone';
        nextBtn.onclick = null;
        nextBtn.addEventListener('click', function(e) {
            console.log('Panoramic Done');
            let front = localStorage.getItem('Front');
            let right = localStorage.getItem('Right');
            let back = localStorage.getItem('Back');
            let left = localStorage.getItem('Left');
            speakInstructions("Done, generating response");
            generateRespPanoramic(front, right, back, left);
        })
    }  
}

async function generateRespPanoramic(front, right, back, left) {
    document.getElementById('loadingIndicator').style.display = 'flex';
    // setTimeout(() => {
    //     document.getElementById('loadingIndicator').style.display = 'none';
    //     const response = 'This is just a mock response. On your front, there is a wall; on your left, there is a chair; On your back, there is a table; On your left, there is a bed';
    //     // console.log(data);
    //     document.getElementById("myModal").style.display = 'block';
    //     document.getElementById("modalText").innerHTML=response;
    //     speakInstructions(response);
    // }, "1000");

    /**
     * Uncomment the below section to use True AI response
     */
    try{
        // import fetch from 'node-fetch'; // for node.js

        const response = await fetch(
            'https://noggin.rea.gent/accurate-mule-3691',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer rg_v1_9vj4tndulp3kpiuvob53h7ibby1rjhpg4j0s_ngk',
            },
            body: JSON.stringify({
                // fill variables here.
                // You can use an external URL or a data URL here.
                "frontimage": front,
                // You can use an external URL or a data URL here.
                "rightimage": right,
                // You can use an external URL or a data URL here.
                "backimage": back,
                // You can use an external URL or a data URL here.
                "leftimage": left,
            }),
            }
        ).then(response => response.text());
        document.getElementById("myModal").style.display = 'block';
        document.getElementById("modalText").innerHTML=response;
        speakInstructions(response);
    }
    catch(error) {
        console.error('An error occurred:', error);
    }
    finally {
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}
async function generateResp(data) {
    document.getElementById('loadingIndicator').style.display = 'flex';
    /**
     * Mock Response to make sure we don't waste a lot of money
     */
    // setTimeout(() => {
    //     document.getElementById('loadingIndicator').style.display = 'none';
    //     const response = 'This is just a mock response, since I do not want to waste real money to create AI generated responses everytime I test this interface';
    //     // console.log(data);
    //     document.getElementById("myModal").style.display = 'block';
    //     document.getElementById("modalText").innerHTML=response;
    //     speakInstructions(response);
    // }, "1000");

    /**
     * Uncomment the below section to use True AI response
     */
    try{
        const response = await fetch(
            'https://noggin.rea.gent/hurt-sturgeon-7680',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer rg_v1_sgqulc8yhsdsgl25wfglsutz2wfpfjr9kgpx_ngk',
            },
            body: JSON.stringify({
                // fill variables here.
                // You can use an external URL or a data URL here.
                "image": data,
            }),
            }
        ).then(response => response.text());
        document.getElementById("myModal").style.display = 'block';
        document.getElementById("modalText").innerHTML=response;
    }
    catch(error) {
        console.error('An error occurred:', error);
    }
    finally {
        document.getElementById('loadingIndicator').style.display = 'none';
    }

}
document.getElementById('startCamera').addEventListener('click', function() {

    const width = 420; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    this.style.display = 'none';
    setUpWebcam();
    speakInstructions("Camera started. Take a photo of your front");
});

document.getElementById('redo').addEventListener('click', function() {

    const width = 420; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    let viewWebcam = document.getElementById('viewWebcam');
    viewWebcam.style.display = "none";
    setUpWebcam();
    speakInstructions("Redo photo taking");
});

function singleDone() {
    singleImg = localStorage.getItem('singleImg');
    speakInstructions("Done, generating response");
    generateResp(singleImg);
}

var modal = document.getElementById("myModal");
// var modalPanoramic = document.getElementById("myModalPanoramic");
// Get the <span> element that closes the modal
console.log(document.getElementsByClassName("close"));
var span = document.getElementsByClassName("close")[0];
// var spanPanoramic = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  speakInstructions("Response modal closed");
}

// spanPanoramic.onclick = function() {
//     console.log("click")
//     modalPanoramic.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    speakInstructions("Response modal closed");
  }

}
