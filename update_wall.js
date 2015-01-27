

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
          console.log(return_data);
          var posts = JSON.parse(return_data);
          writePostsHTML(posts);
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
  	var radius = document.getElementById('radius_slider').value;
  	console.log("latitude = " + latitude);
  	console.log("longitude = " + longitude);
  	console.log("radius = " + radius);
	if (latitude && longitude) {
	  	xhr.send("latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius);
	}
  }
}

function writePostsHTML(postsArray){
	document.getElementById('wall').innerHTML = "";
	for(var i in postsArray){
		var comment_html_content = "";
		for(var j in postsArray[i].comment_array){
			comment_html_content +=
			"<div class='comment'><small><i> \
				<p>" + postsArray[i].comment_array[j].text + "</p> \
				<p>" + postsArray[i].comment_array[j].dateTime + "</p> \
			</i></small></div>"
		}

		var html_content = "\
			<div class='post'> \
				<p class='post-text'> " + postsArray[i].text + "</p> \
				<p class='post-footer-text'>" + postsArray[i].dateTime + "</p> \
				<textarea rows='1' class='fill-width' placeholder='Leave a comment!' id='commentSection" + postsArray[i].id + "'></textarea> \
				<input type='submit' value='post' name='post_btn' onclick='submitComment(" + postsArray[i].id + ")'> \
			</div> \
			<div>" +
				comment_html_content +
			"</div>";
		document.getElementById('wall').innerHTML += html_content;
	}
};