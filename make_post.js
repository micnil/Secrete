function submitPost()
{
  var xhr = new XMLHttpRequest();
  var url = "make_post.php";
  xhr.open("POST", url, true);

  var post_text = document.getElementById('post_text').value;
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          //console.log(return_data);
          updatePosts();
          document.getElementById('post_text').value = "";
      }
  }
  Geolocation.updatePosition(sendRequest);
  function sendRequest(latitude,longitude) {
    if (latitude && longitude) {
        xhr.send("latitude=" + latitude + "&longitude=" + longitude + "&post_text=" + post_text);
    }
  }
}

function submitComment(comment_textfield)
{
  var xhr = new XMLHttpRequest();
  var url = "make_comment.php";
  xhr.open("POST", url, true);

  var comment_text = comment_textfield.value;
  //console.log(comment_text + "\n");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
          var return_data = xhr.responseText;
          console.log(return_data);
          updatePosts();
          comment_textfield.value = "";
      }
  }
  xhr.send("comment_text=" + comment_text + "&id=" + comment_textfield.getAttribute("comment_id"));
}
