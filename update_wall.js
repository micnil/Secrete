

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

  var wallElement = document.getElementById('wall');

  //removes everything from the wall
  while (wallElement.firstChild) {
    wallElement.removeChild(wallElement.firstChild);
  }

  for(var i in postsArray){  

    var postDiv = document.createElement("div"); 
    postDiv.className="post";

    appendText(postDiv,postsArray[i].text)
    appendDate(postDiv,postsArray[i].dateTime);

    wallElement.appendChild(postDiv);
  }

};


function appendText(element, text){

  var p_text = document.createElement("p"); 
  p_text.className="post-text";

  var postContent = document.createTextNode(text); 

  element.appendChild(p_text);
  p_text.appendChild(postContent);

};

function appendDate(element, text){

  var p_date = document.createElement("p"); 
  p_date.className="post-date";

  var postDate = document.createTextNode(text); 

  element.appendChild(p_date);
  p_date.appendChild(postDate);

};

