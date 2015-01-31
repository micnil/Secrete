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
	  			updateOldPosts(posts[posts.length-1].getAttribute("post-id"));
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


