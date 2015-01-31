function submitPost()
{
  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
  xhr.open("POST", url, true);

  var post_text = document.getElementById('post_text').value;
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          var post_list=document.getElementsByClassName("post");
          if(post_list.item(0)){
            updateNewPosts(post_list.item(0).getAttribute("post-id"));
          }else{
            updateOldPosts();
          }
          document.getElementById('post_text').value = "";
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
    if (latitude && longitude) {
        xhr.send("function=makePost" + "&post_text=" + post_text + "&latitude=" + latitude + "&longitude=" + longitude);
    }
  }
}

function submitComment(comment_textfield)
{
  var xhr = new XMLHttpRequest();
  var url = "request_handler.php";
  xhr.open("POST", url, true);

  var comment_text = comment_textfield.value;
  //console.log(comment_text + "\n");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          comment_textfield.value = "";
          updateCommentSection(comment_textfield.parentNode.parentNode.childNodes.item(0));
      }
  }
  xhr.send("function=makeComment" + "&comment_text=" + comment_text + "&id=" + comment_textfield.getAttribute("comment_id"));
}
