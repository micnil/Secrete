
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


//More information about geolocation
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation.getCurrentPosition
function success(pos) {

  var crd = pos.coords;

  var latitude = crd.latitude;
  var longitude = crd.longitude;
  //there is also position accuracy in meters
  //var accuracry = crd.accuracy;  


  //Send data to php using POST 
  //this could would look neater in jquery.
  //Could also be done with a invisible form. Although that would 
  //update the page when submit is pressed.
  var xhr = new XMLHttpRequest();
  var url = "update-wall.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var posts = JSON.parse(return_data);
          updatePostsOnWall(posts);
      }
  }
  xhr.send("latitude=" + latitude + "&longitude=" + longitude);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

//Uses geolocation to get the position of the client. Success and error
//are callback functions that will be called whether the position can be retreived (or not).
navigator.geolocation.getCurrentPosition(success, error, options);


/**
* Deletes the posts visible on the Wall
* and replaces it with the new posts
*/
function updatePostsOnWall(postsArray){

	document.getElementById('wall').innerHTML = "";

	for(var i in postsArray){

		var html_content = "\
			<div class='post'> \
				<p class='post-text'> " + postsArray[i].text + "</p> \
				<p class='post-footer-text'>" + postsArray[i].dateTime.date + "</p> \
			</div>";
		document.getElementById('wall').innerHTML += html_content;
	}

};

