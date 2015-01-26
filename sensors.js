// Detect the API before using it 
 
if (navigator.geolocation) {
 
	// Get a reference to a <div id="map"> tag on the page to insert the map into
 
	var mapElem = document.getElementById("map"),
 
	// Define a function to execute once the user’s location has been established,
	// plotting their latitude and longitude as a map tile image
 
	    successCallback = function(position) {
		    var lat = position.coords.latitude,
		        long = position.coords.longitude;
 
		    mapElem.innerHTML = '<img src="http://maps.googleapis.com/maps/api/staticmap?markers=' + lat + ',' + long + '&zoom=15&size=300x300&sensor=false" />';
	    },
 
	// Define a function to execute if the user’s location couldn’t be established
 
	    errorCallback = function() {
	          alert("Sorry! I couldn’t get your location.");
	    };
 
	// Start watching the user’s location, updating once per second (1s = 1000ms)
	// and execute the appropriate callback function based on whether the user
	// was successfully located or not
 
	navigator.geolocation.watchPosition(successCallback, errorCallback, {
		maximumAge: 1000
	});

}

// Define an event handler to execute when a touch event occurs on the screen
 
var handleTouchEvent = function(e) {
 
	// Get the list of all touches currently on the screen
 
	var allTouches = e.touches,
	    allTouchesLength = allTouches.length,
 
	// Get a reference to an element on the page to write the total number of touches 
	// currently on the screen into
 
	    touchCountElem = document.getElementById("touch-count"); 
 
	// Prevent the default browser action from occurring when the user touches and
	// holds their finger to the screen
 
	if (e.type === 'touchstart') {
		e.preventDefault();
	}
 
	// Write the number of current touches onto the page
 
	touchCount.innerHTML = 'There are currently ' + allTouchesLength + ' touches on the screen.';
}
 
// Assign the event handler to execute when a finger touches ('touchstart') or is removed from ('touchend') the screen
 
window.addEventListener('touchstart', handleTouchEvent, false);
window.addEventListener('touchend', handleTouchEvent, false);

// Define an event handler function to execute when the device orientation changes
 
var onOrientationChange = function() {
 
	// The device is in portrait orientation if the device is held at 0 or 180 degrees
	// The device is in landscape orientation if the device is at 90 or -90 degrees
 
	var isPortrait = window.orientation % 180 === 0;
 
	// Set the class of the <body> tag according to the orientation of the device
 
	document.body.className = isPortrait ? 'portrait' : 'landscape';
}
 
// Execute the event handler function when the browser tells us the device has 
// changed orientation
 
window.addEventListener('orientationchange', onOrientationChange, false);
 
// Execute the same function on page load to set the initial <body> class
 
onOrientationChange();


// Get a reference to the first <img> element on the page
 
var imageElem = document.getElementsByTagName('img')[0],
 
// Create an event handler function for processing the device orientation event
 
    handleOrientationEvent = function(e) {
 
        // Get the orientation of the device in 3 axes, known as alpha, beta, and gamma, 
        // represented in degrees from the initial orientation of the device on load
 
        var alpha = e.alpha,
            beta = e.beta,
            gamma = e.gamma;
 
        // Rotate the <img> element in 3 axes according to the device’s orientation
 
        imageElem.style.webkitTransform = 'rotateZ(' + alpha + 'deg) rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg)';
    };
 
// Listen for changes to the device orientation using the gyroscope and fire the event 
// handler accordingly
 
window.addEventListener('deviceorientation', handleOrientationEvent, false);

// Get a reference to the first <img> element on the page 
 
var imageElem2 = document.getElementsByTagName('img')[1],
 
// Create a function to execute when the compass heading of the device changes
 
    handleCompassEvent = function(e) {
 
        // Get the current compass heading of the device, in degrees from due north
 
        var compassHeading = e.webkitCompassHeading;
 
        // Rotate an image according to the compass heading value. The arrow pointing
        // to due north in the image will continue to point north as the device moves
 
        imageElem2.style.webkitTransform = 'rotate(' + (-compassHeading) + 'deg)';
    };
 
// Observe the orientation of the device and call the event handler when it changes
 
window.addEventListener('deviceorientation', handleCompassEvent, false);

