// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    // Retrieve image file location from the mobile device photo library 
    function getPhotoURI() {
        navigator.camera.getPhoto(onPhotoSuccess, onPhotoFail, {
            quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: pictureSource.PHOTOLIBRARY
        });
    }
    // Callback from successful Photo Library event 
    function onPhotoSuccess(imageURI) {
        // Add img to div#album 
        var img = document.createElement('img');
        img.setAttribute('src', imageURL);
        document.getElementById('album').appendChild(img);
    };

    
} )();