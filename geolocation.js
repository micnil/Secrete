var Geolocation = {
  sendRequestFunction: null,
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  success: function(pos) {
    if (sendRequestFunction) {
      sendRequestFunction(pos.coords.latitude, pos.coords.longitude);
    };
  },
  error: function(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  },
  updatePosition: function(callbackFunction) {
    sendRequestFunction = callbackFunction;
    navigator.geolocation.getCurrentPosition(Geolocation.success, Geolocation.error, Geolocation.options);
  },
};