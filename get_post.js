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
