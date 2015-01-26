var latitude, longitude;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


//More information about geolocation
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation.getCurrentPosition
function success(pos) {
  var crd = pos.coords;

/* 
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');*/
  latitude = crd.latitude;
  longitude = crd.longitude;
/*  document.getElementById("latitude").value =  latitude;
  document.getElementById("longitude").value =  longitude;*/
/*  document.getElementById("position-form").submit();*/


//Send data to php using POST 
var xhr = new XMLHttpRequest();
var url = "update-wall.php";
xhr.open("POST", url, true);

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        var return_data = xhr.responseText;
        //console.log();
    }
}
//var message = sprintf("latitude=%slongitude")
xhr.send("latitude=" + latitude + "&longitude=" + longitude);


};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);