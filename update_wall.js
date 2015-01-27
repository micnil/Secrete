

/**
* Deletes the posts visible on the Wall
* and replaces it with the new posts
*/

function updatePosts(){
  var xhr = new XMLHttpRequest();
  var url = "update-wall.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var posts = JSON.parse(return_data);
          writePostsHTML(posts);
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
  	console.log("latitude = " + latitude);
  	console.log("longitude = " + longitude);
	if (latitude && longitude) {
	  	xhr.send("latitude=" + latitude + "&longitude=" + longitude);
	}
  }
}

function writePostsHTML(postsArray){
	document.getElementById('wall').innerHTML = "";
	for(var i in postsArray){

		var html_content = "\
			<div class='post'> \
				<p class='post-text'> " + postsArray[i].text + "</p> \
				<p class='post-footer-text'>" + postsArray[i].dateTime + "</p> \
			</div>";
		document.getElementById('wall').innerHTML += html_content;
	}
};