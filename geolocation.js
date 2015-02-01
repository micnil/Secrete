
var Geolocation = {
  
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },

  error: function(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  },
  updatePosition: function(callbackFunction) {
    sendRequestFunction = callbackFunction;
     navigator.geolocation.getCurrentPosition(function(pos) {
            if (typeof callbackFunction == "function") {
                callbackFunction(pos.coords.latitude, pos.coords.longitude);
            }
        }, Geolocation.error, Geolocation.options);
  },
};

