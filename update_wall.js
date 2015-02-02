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

/** 
* Clears comment section and rewrites all comment for a certain post.
*/

/*
  The structure of the wall:

  <div Post>
    
    <div Post content>
      Text
      Date
    </div>

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

/*
* element whould be comment section text div.
*/
function reWriteCommentsHTML(commentArray, element){
  //element.innerHTML = '';
  appendCommentText(element, commentArray);
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
    var commentSectionDiv = document.createElement("div");
      var commentTextSectionDiv = document.createElement("div");
        appendCommentText(commentTextSectionDiv, postJson.comment_array);
      commentSectionDiv.appendChild(commentTextSectionDiv);
      createCommentInput(commentSectionDiv, postJson.id);
    
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
* Appends a comment textfield to the 'element' (the comment section div).
*/
function createCommentInput(element, post_id){

  var commentInputDiv = document.createElement("div");
  //commentTextSection.className = "comment-text-section";

  var commentTextField = document.createElement("textarea");
  //these attributes can maybe be specified in css instead.
  commentTextField.setAttribute("rows","1");
  commentTextField.setAttribute("placeholder","write a comment!");
  //commentTextField.setAttribute("comment_id",post_id);
  commentTextField.className = "comment-textfield";
  commentTextField.onkeydown = 
    commentTextField.onkeyup = 
    EventHandler.commentKeyEvent;

  commentInputDiv.appendChild(commentTextField);
  element.appendChild(commentInputDiv);
};