var EventHandler = {

	key_map: [],

	//when you scroll down to the bottom of the scroller,
	//this event calls uppdatePosts(arg), where arg
	//is the bottom post id
	scrollEvent: function (e) {
	    if (document.body.scrollHeight == 
	        document.body.scrollTop +        
	        window.innerHeight) {
	        	var posts = document.getElementsByClassName("post");
	  			//console.log(posts[posts.length-2].getAttribute("post-id"));
	  			var post_id = posts[0] ? posts[posts.length-1].getAttribute("post-id") : 0;
	  			post_id = post_id ? post_id : 0;
	  			updateNewPosts(post_id);

	  			updateOldPosts(post_id);
	    }
	    if (document.body.scrollTop == -1) {
	    	// This code does not really work. Sometimes too many posts are loaded...
	    	/*
	        	var posts = document.getElementsByClassName("post");
	  			//console.log(posts[posts.length-2].getAttribute("post-id"));
	  			var post_id = posts[0] ? posts[0].getAttribute("post-id") : 0;
	  			post_id = post_id ? post_id : 0;
	  			updateNewPosts(post_id);
	  		*/
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
			submitComment(e.target);
		}
    },


};

window.onscroll = EventHandler.scrollEvent;


