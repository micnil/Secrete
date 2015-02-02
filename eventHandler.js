var EventHandler = {

	key_map: [],

	//when you scroll down to the bottom of the scroller,
	//this event calls uppdatePosts(arg), where arg
	//is the bottom post id
	scrollEvent: function (e) {
		console.log("scroll");
	    if (document.body.scrollHeight == 
	        document.body.scrollTop +        
	        window.innerHeight) {
	        	var posts = document.getElementsByClassName("post");
	  			var post_id = posts[0] ? posts[posts.length-1].getAttribute("post-id") : 0;
	  			post_id = post_id ? post_id : 0;
	  			updateOldPosts(post_id);
	    }
	    console.log(document.body.scrollTop);
	    if (document.body.scrollTop == 0) {	    	
	        	var posts = document.getElementsByClassName("post");
	  			var post_id = posts[0] ? posts[0].getAttribute("post-id") : 0;
	  			post_id = post_id ? post_id : 0;
	  			console.log("post_id = " + post_id);
	  			updateNewPosts(post_id);
	    }
	},

	//allows you to press enter to submit a comment.
	//but if shift is pressed at the same time, 
	//only a new line is made
	commentKeyEvent: function (e){
		e = e || event; // to deal with IE
    	EventHandler.key_map[e.keyCode] = e.type == 'keydown';
		if(EventHandler.key_map[16] && EventHandler.key_map[13]){ // SHIFT + ENTER
			//do nothing, just regular enter
		}else if(EventHandler.key_map[13]){ // ENTER
			e.preventDefault();
			//if string is not enpty or doesnt only contain white space
			if(e.target.value.isEmpty()){
				console.log("You can not post empty string");
			}else{
				submitComment(e.target);
			}
		}
    },


};




