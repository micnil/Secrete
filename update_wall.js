
/*
  The structure of the wall:

  <div Post>
    
    <div Post content>
      Text
      Date
    </div>
    
    Load older comments button

    <div Comment section>
      <div Comment section text>
        <div Comment>
          Text
          Date
        </div>
        .
        .
        .
        <div Comment>
          Text
          Date
        </div>
      </div>
      <div Comment section input>
        input field here
      </div>
    </div>

  </div>
*/

function reWriteAllPosts() {
  var wallElement = document.getElementById('wall');
  wallElement.innerHTML = '';
  updateOldPosts();
}

/** 
* Sends a request for new posts with a post-id smaller than 'bottomPostID', and 
* radius smaller than specified.
* When return_data is received, it calls writeOldPostsHTML 
*/
function updateOldPosts(bottomPostID){
  bottomPostID = bottomPostID===undefined ? 100000000000000000000 : bottomPostID;
  //console.log(bottomPostID); 
  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          console.log(return_data);
          var posts = JSON.parse(return_data);
          writeOldPostsHTML(posts);
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
  	var radius = document.getElementById('radius_slider').value;

  	if (latitude && longitude) {
  	  	xhr.send("function=getPostsData" + "&latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius + "&post_id=" + bottomPostID + "&numberOfPosts=" + 5 + "&old_or_new=old");
  	}
  }
}

/** 
* Sends a request for new posts with a post-id larger than 'topPostID', and 
* radius smaller than specified.
* When return_data is received, it calls writeNewPostsHTML 
*/
function updateNewPosts(topPostID){
  topPostID = topPostID===undefined ? 0 : topPostID; 
  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
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

    if (latitude && longitude) {
        xhr.send("function=getPostsData" + "&latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius + "&post_id=" + topPostID + "&numberOfPosts=" + 5 + "&old_or_new=new");
    }
  }
}

/** 
* Sends a request for all comments belonging to the element specified.
* element is comment section text
* When return_data is received, it calls functionToWrite 
*/
function updateNewComments(element){
  var postID = element.parentNode.parentNode.getAttribute("post-id");
  
  var latestCommentID;
  var latestCommentNode = element.childNodes.item(element.childNodes.length - 1); // The latest comment element is the last one in the list.
  latestCommentID = latestCommentNode ? latestCommentNode.getAttribute("comment-id") : 0;

  latestCommentID = latestCommentID === null ? 0 : latestCommentID;
  console.log("latestCommentID = " + latestCommentID);
  //console.log("postID = " + postID);
  if (postID===undefined)
    return;

  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          console.log(return_data);
          var comments = JSON.parse(return_data);
          writeNewCommentsHTML(comments, element);
      }
  }
  //Geolocation.updatePosition(sendRequest);
  //function sendRequest(latitude,longitude) {
    //var radius = document.getElementById('radius_slider').value;  
  xhr.send("function=getCommentData" + "&post_id=" + postID + "&latest_comment_id=" + latestCommentID + "&numberOfComments=" + 10000000000000000000 + "&old_or_new=new");
}

/** 
* Sends a request for all comments belonging to the element specified.
* element is comment section text
* When return_data is received, it calls functionToWrite 
*/
function updateOldComments(element){
  var postID = element.parentNode.parentNode.getAttribute("post-id");
  
  var oldestCommentID;
  var oldestCommentNode = element.childNodes.item(0); // The oldest comment element is the first one in the list.
  oldestCommentID = oldestCommentNode ? oldestCommentNode.getAttribute("comment-id") : 100000000000000000000;
  oldestCommentID = oldestCommentID === null ? 100000000000000000000 : oldestCommentID;

  console.log("oldestCommentID = " + oldestCommentID);
  //console.log("postID = " + postID);
  if (postID===undefined)
    return;

  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var comments = JSON.parse(return_data);
          writeOldCommentsHTML(comments, element);
      }
  }
  //Geolocation.updatePosition(sendRequest);
  //function sendRequest(latitude,longitude) {
    //var radius = document.getElementById('radius_slider').value;  
  xhr.send("function=getCommentData" + "&post_id=" + postID + "&latest_comment_id=" + oldestCommentID + "&numberOfComments=" + 5 + "&old_or_new=old");
}

/** 
* Creates posts and appends them to the bottom
* of the wall 
*/
function writeOldPostsHTML(postsArray){

  var wallElement = document.getElementById('wall');

  for(var i in postsArray){  

    var postDiv = document.createElement("div"); 
    createPost(postDiv,postsArray[i]);
    wallElement.appendChild(postDiv);
  }

};

/** 
* Creates posts and inserts them above the first post
* of the wall 
*/
function writeNewPostsHTML(postsArray){

  var wallElement = document.getElementById('wall');
  var topPost = document.getElementsByClassName("post")[0];
  
  for(var i in postsArray){  
    var postDiv = document.createElement("div"); 
    createPost(postDiv,postsArray[i]);
    wallElement.insertBefore(postDiv, topPost);
  }
};

/*
* element whould be comment section text div.
*/
function writeNewCommentsHTML(commentArray, element){
  appendCommentText(element, commentArray);
};

function writeOldCommentsHTML(commentArray, element){
  insertCommentTextOnTop(element, commentArray);
};

/** 
* takes a post div and post content (json) as input,
* and creates the post 
*/
function createPost(postDiv,postJson){
    postDiv.innerHTML = '';
    postDiv.className="post";
    postDiv.setAttribute("post-id",postJson.id);
    var postContentDiv = document.createElement("div"); 
      appendText(postContentDiv,postJson.text, "post-text");
      appendText(postContentDiv,postJson.dateTime, "post-footer-text");
    postDiv.appendChild(postContentDiv);
    var a = document.createElement('a');
    var linkText = document.createTextNode("Load older comments");
    var commentSectionDiv = document.createElement("div");
      var commentTextSectionDiv = document.createElement("div");
        appendCommentText(commentTextSectionDiv, postJson.comment_array);
      commentSectionDiv.appendChild(commentTextSectionDiv);
      createCommentInput(commentSectionDiv, postJson.id);
    
    a.appendChild(linkText);
    a.title = "Load older comments";
    a.href = "javascript:void(0);";
    a.onclick = function() {updateOldComments(commentTextSectionDiv);};
    postDiv.appendChild(a);

    postDiv.appendChild(commentSectionDiv);
};

/** 
* Appends a <p> tag wth 'text' content to the 'element'
* of your choice
*/
function appendText(element, text, pClass){

  var p_text = document.createElement("p"); 
  p_text.className=pClass;

  var content = document.createTextNode(text); 

  element.appendChild(p_text);
  p_text.appendChild(content);

};

/** 
* Appends a comment textfield and comments to the 'element' 
* (the comment section text div).
*/
function appendCommentText(element, comment_array){
  for(var i in comment_array){
    var commentElement = document.createElement("div");
    commentElement.setAttribute("comment-id", comment_array[i].commentId);
    appendText(commentElement,comment_array[i].text,"comment_text");
    appendText(commentElement,comment_array[i].dateTime,"comment_footer_text");
    element.appendChild(commentElement);
  }
};

/** 
* Appends a comment textfield and comments to the 'element' 
* (the comment section text div).
*/
function insertCommentTextOnTop(element, comment_array){
  //loop through backwards since we put the older comments on top.
  for (var i = comment_array.length - 1; i >= 0; --i) {
    var commentElement = document.createElement("div");
    commentElement.setAttribute("comment-id", comment_array[i].commentId);
    appendText(commentElement,comment_array[i].text,"comment_text");
    appendText(commentElement,comment_array[i].dateTime,"comment_footer_text");
    element.insertBefore(commentElement, element.firstChild);
  }
};

/** 
* Appends a comment textfield to the 'element' (the comment section div).
*/
function createCommentInput(element, post_id){

  var commentInputDiv = document.createElement("div");
  //commentTextSection.className = "comment-text-section";

  var commentTextField = document.createElement("textarea");
  //these attributes can maybe be specified in css instead.
  commentTextField.setAttribute("rows","1");
  commentTextField.setAttribute("placeholder","write a comment!");
  commentTextField.className = "comment-textfield";
  commentTextField.onkeydown = 
    commentTextField.onkeyup = 
    EventHandler.commentKeyEvent;

  commentInputDiv.appendChild(commentTextField);
  element.appendChild(commentInputDiv);
};