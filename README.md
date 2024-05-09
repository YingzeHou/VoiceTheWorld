# VoiceTheWorld
App that help visually impaired group of people learn about their surrounding world

## Page Instruction
Camera Page: 
- **Single Image Mode**: User can take a photo and the AI facilitated app will describe the surrounding that this photo shows.
- **Panoramic Mode**: User is prompted to take one photo in each direction (front, right, back, left), so that the app can combine these four images together to generate an overall sense of the 360 degree of surrounding environment from the user's perspective.

Video Page:
- This page is intended to function as a live mode: The user simply hold up the phone and the phone camera will be continuously streaming. The app will analyze and generate surrounding environment description based on the real-time streaming video. The ideal state of this function is to be a real-time "eye" for visually-impaired users.


## Build Instruction
Make sure you have recent versions of node and npm installed (definitely at least version 12 of Node). Installation instructions for most operating systems are available on the Node.js website. You can check your node and npm versions using the following commands:
```
node --version
npm --version
```

This repository contains a package.json file, which is the standard way to tell Node.js some information about the program, including what libraries are needed to run the server code. The server software requires an external library called Express, which makes it easy to develop Web servers.

Run the ```install``` command in ```npm```, Node's default package manager:
```
npm install
```

Run the server script on your development computer:
```
node app.js
```

This will start a long-running process (though you should be able to stop it with ```Ctrl+C``` or by closing your terminal window). The server binds to ```localhost:3000```, by default, meaning you should be able to access the web server by visiting http://localhost:3000 in your Web browser.