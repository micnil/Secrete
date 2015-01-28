

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

  var wallElement = document.getElementById('wall');

  //removes everything from the wall
  while (wallElement.firstChild) {
    wallElement.removeChild(wallElement.firstChild);
  }

  for(var i in postsArray){  
    var postDiv = document.createElement("div"); 
    postDiv.className="post";
    appendText(postDiv,postsArray[i].text, "post-text")
    appendText(postDiv,postsArray[i].dateTime, "post-footer-text");
    appendCommentField(postDiv, postsArray[i].comment_array, postsArray[i].id);

    wallElement.appendChild(postDiv);
  }

  //Goes through all commentTextfields and adds a onkeyup eventlistener
  // that checks if the enter key was pressed. If it was, it calls the makeComment
  // function and passes the commenttextfield element with it.
  var allCommentTextfields = document.getElementsByClassName('comment-textfield');

  for(var i=0;i<allCommentTextfields.length;i++){
    allCommentTextfields.item(i).onkeyup = function (event){
      if(event.keyCode==13){
        submitComment(event.target);
      }
    };
  }

};


function appendText(element, text, pClass){

  var p_text = document.createElement("p"); 
  p_text.className=pClass;

  var content = document.createTextNode(text); 

  element.appendChild(p_text);
  p_text.appendChild(content);

};

function appendCommentField(element, comment_array, post_id){

  var commentSection = document.createElement("div");
  commentSection.className = "comment-section";

  var commentTextField = document.createElement("textarea");
  //these attributes can maybe be specified in css instead.
  commentTextField.setAttribute("rows","1");
  commentTextField.setAttribute("placeholder","write a comment!");
  commentTextField.setAttribute("comment_id",post_id);
  commentTextField.className = "comment-textfield";

  for(var i in comment_array){
    console.log()
    appendText(commentSection,comment_array[i].text,"comment_text");
    appendText(commentSection,comment_array[i].dateTime,"comment_footer_text");
  }
  commentSection.appendChild(commentTextField);
  element.appendChild(commentSection);

};