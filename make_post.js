
var options_getpos_makepost = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//More information about geolocation
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation.getCurrentPosition
function success_getpos_makepost(pos) {

  var crd = pos.coords;

  var latitude = crd.latitude;
  var longitude = crd.longitude;
  var post_text = document.getElementById('post_text').value;

  console.log("latitude = " + latitude);
  console.log("longitude = " + longitude);
  console.log("post_text = " + post_text);

  //there is also position accuracy in meters
  //var accuracry = crd.accuracy;  


  //Send data to php using POST 
  //this could would look neater in jquery.
  //Could also be done with a invisible form. Although that would 
  //update the page when submit is pressed.
  var xhr = new XMLHttpRequest();
  var url = "make_post.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("latitude=" + latitude + "&longitude=" + longitude + "&post_text=" + post_text);
};

function error_getpos_makepost(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function submitPost()
{
  //Uses geolocation to get the position of the client. Success and error
  //are callback functions that will be called if the position can be retreived.
  navigator.geolocation.getCurrentPosition(success_getpos_makepost, error_getpos_makepost, options_getpos_makepost);
}
