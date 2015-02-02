function init(){

	document.getElementById("radius_slider").onchange = debounce(reWriteAllPosts);

	document.getElementById("post_submit_btn").onclick = submitPost;

	window.onscroll = debounce(EventHandler.scrollEvent,150);

	updateOldPosts();
}

/**
* adding isEmpy() function to the String class.
* checks whether a string is empty or contains only whitespace.
*/
String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

/**
* I barely know how this works.. but pass in a function
* (like the updateOldPosts function call when draging the radius_slider)
* and it will just be called after 'delay' milliseconds. If the function
* is called again before that, the timer resets.
* See its use above.
*/
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context);
    }, delay);
  };
}
