function takePicture() {
    navigator.camera.getPicture(cameraCallback, cameraError);
}

function doNothing() {

}

function cameraCallback(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg; base64," + imageData;
}

function cameraError(message) {
    // Show a helpful message
}

