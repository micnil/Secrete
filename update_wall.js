
function updateOldPosts(bottomPostID){
  bottomPostID = bottomPostID===undefined ? 0 : bottomPostID;
  console.log(bottomPostID); 
  var xhr = new XMLHttpRequest();
  var url = "update-wall.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var posts = JSON.parse(return_data);
          writeOldPostsHTML(posts);
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
  	var radius = document.getElementById('radius_slider').value;
/*  	console.log("latitude = " + latitude);
  	console.log("longitude = " + longitude);
  	console.log("radius = " + radius);*/
  	if (latitude && longitude) {
  	  	xhr.send("latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius + "&bottom_post_id=" + bottomPostID);
  	}
  }
}

function updateNewPosts(topPostID){
  topPostID = topPostID===undefined ? 0 : topPostID; 
  var xhr = new XMLHttpRequest();
  var url = "update-new-posts.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var posts = JSON.parse(return_data);
          writeNewPostsHTML(posts);
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
    var radius = document.getElementById('radius_slider').value;
/*    console.log("latitude = " + latitude);
    console.log("longitude = " + longitude);
    console.log("radius = " + radius);*/
    if (latitude && longitude) {
        xhr.send("latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius + "&top_post_id=" + topPostID);
    }
  }
}

function writeOldPostsHTML(postsArray){

  var wallElement = document.getElementById('wall');

  for(var i in postsArray){  

    var postDiv = document.createElement("div"); 
    createPost(postDiv,postsArray[i]);
    wallElement.appendChild(postDiv);
  }

};

function writeNewPostsHTML(postsArray){

  var wallElement = document.getElementById('wall');
  var topPost = document.getElementsByClassName("post")[0];
  
  for(var i in postsArray){  
    var postDiv = document.createElement("div"); 
    createPost(postDiv,postsArray[i]);
    wallElement.insertBefore(postDiv, topPost);
  }

};

function createPost(postDiv,postJson){
    
    postDiv.className="post";
    postDiv.setAttribute("post-id",postJson.id);
    appendText(postDiv,postJson.text, "post-text");
    appendText(postDiv,postJson.dateTime, "post-footer-text");
    appendCommentField(postDiv, postJson.comment_array, postJson.id);
};

/** Appends a <p> tag wth 'text' content to the 'element'
*   of your choice
*/
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
  commentTextField.onkeydown = 
    commentTextField.onkeyup = 
    EventHandler.commentKeyEvent;

  for(var i in comment_array){
    console.log()
    appendText(commentSection,comment_array[i].text,"comment_text");
    appendText(commentSection,comment_array[i].dateTime,"comment_footer_text");
  }
  commentSection.appendChild(commentTextField);
  element.appendChild(commentSection);

};