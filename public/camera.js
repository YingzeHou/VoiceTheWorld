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
async function generateResp(data) {
    document.getElementById('loadingIndicator').style.display = 'flex';

    /**
     * Mock Response to make sure we don't waste a lot of money
     */
    setTimeout(() => {
        document.getElementById('loadingIndicator').style.display = 'none';
        const response = 'This is just a mock response, since I do not want to waste real money to create AI generated responses everytime I test this interface';
        console.log(data);
        document.getElementById("myModal").style.display = 'block';
        document.getElementById("modalText").innerHTML=response;
        speakInstructions(response);
    }, "1000");

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
    //             "image": data,
    //         }),
    //         }
    //     ).then(response => response.text());
    //     document.getElementById("myModal").style.display = 'block';
    //     document.getElementById("modalText").innerHTML=response;
    // }
    // catch(error) {
    //     console.error('An error occurred:', error);
    // }
    // finally {
    //     document.getElementById('loadingIndicator').style.display = 'none';
    // }

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

document.getElementById('done').addEventListener('click', function() {
    singleImg = localStorage.getItem('singleImg');
    generateResp(singleImg);
});

var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// function initiateCameraSetup() {
//     document.getElementById('startCamera').click();
// }