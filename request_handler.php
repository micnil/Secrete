<?php
	class Comment{
		public $postId;
		public $commentId;
		public $text;
		public $dateTime;

		public function __construct($thePostId, $theCommentId, $theDateTime, $theText ) {
			$this->postId = $thePostId;
			$this->commentId = $theCommentId;
			$this->dateTime = $theDateTime;
			$this->text = $theText;
		}
	}

	class Post{
		public $id;
		public $text;
		public $dateTime;
		public $position_lat;
		public $position_long;
		public $comment_array;

		public function __construct(
				$theId, $thePositionLat,
				$thePositionLong,
				$theDateTime, 
				$theText, 
				$TheComment_array ) {
			$this->id = $theId;
			$this->position_lat = $thePositionLat;
			$this->position_long = $thePositionLong;
			$this->dateTime = $theDateTime;
			$this->text = $theText;
			$this->comment_array = $TheComment_array;
		}
	}

	$parameters = $_POST;
	$function_name = $_POST["function"];
	array_shift($parameters);
	call_user_func_array($function_name, $parameters); 

	/** 
	* This function gets posts from the database, puts them in to Post instances
	* in an array and json encoded. This string then gets echoed.
	* From latitude, longitude and radius. It is calculated wether or not
	* the posts are close enough. Only the close enough posts gets returned.
	* post_id tells which post is the last or first post already loaded.
	* if old_or_new is set to old, post with lower id than post_id will be
	* loaded. Otherwise posts with higher id will be loaded. number_of_posts
	* specifies how many post should be loaded at maximum.
	*/
	function getPostsData(
		$this_latitude,
		$this_longitude,
		$radius,
		$post_id,
		$number_of_posts,
		$old_or_new)
	{
		$servername = "127.0.0.1"; // localhost
		$username = "wall_poster";
		$password = "v4l5g6s9";
		$db = "theWall";

		// Create connection
		$conn = new mysqli($servername, $username, $password,$db);

		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}

		//is this dangerous?
		$sign = $old_or_new == "old" ? "<" : ">";
	    // Prepare a statement to get either new or old post
		if (!($post_stmt = $conn->prepare("SELECT id, post, pos_longitude, pos_latitude, date FROM posts where
			sqrt(pow(sqrt(pow(6378137*cos(?*3.14159265359/180)-6378137*cos(pos_latitude*3.14159265359/180),2)+pow(6378137*sin(?*3.14159265359/180)-6378137*sin(pos_latitude*3.14159265359/180),2)),2) + pow(2*3.14159265359*((((6378137*cos(?*3.14159265359/180)+6378137*cos(pos_latitude*3.14159265359/180))/2))/360)*(?-pos_longitude),2))
			< ? AND id " . $sign . " ?
			ORDER BY id DESC LIMIT ?"))) 
		{
			echo "Prepare failed: (" . $conn->errno . ") " . htmlspecialchars($conn->error);
		}
		
		// binding the parameters that the client sent to the server. 
		// d=double
		// i=integer
	    if (!$post_stmt->bind_param("dddddii", $this_latitude, 
			$this_latitude, $this_latitude, $this_longitude, 
			$radius, $post_id, $number_of_posts)) {
			echo "Binding parameters failed: (" . $post_stmt->errno . ") " . $post_stmt->error;
		}

		// Executes the statement (sends the query)
		if (!$post_stmt->execute()) {
		    echo "Execute failed: (" . $post_stmt->errno . ") " . $post_stmt->error;
		}

		// this has to be here if we want to be able to prepare another statement simultaneously
		$post_stmt->store_result();

		//binding the result to these variables. They will be updated when post_stmt->fetch() is called
		if (!$post_stmt->bind_result($id, $post, $pos_longitude, $pos_latitude, $post_date)) {
			echo "Binding output parameters failed: (" . $post_stmt->errno . ") " . $post_stmt->error;
		}

		// Preparing second statement, for the comments
		if (!($comment_stmt = $conn->prepare("SELECT comment_text, date, postId, commentId FROM comments where
					postId = ? 
					ORDER BY commentId"))) 
		{
			echo "Prepare failed: (" . $conn->errno . ") " . htmlspecialchars($conn->error);
		}

		$posts_array = array();
		while ($post_stmt->fetch()){
				
			// binding the post id to the comment_stmt
			if (!$comment_stmt->bind_param("i", $id)) {
				echo "Binding parameters failed: (" . $comment_stmt->errno . ") " . $comment_stmt->error;
			}

			// executes comment_stmt
			if (!$comment_stmt->execute()) {
		    	echo "Execute failed: (" . $comment_stmt->errno . ") " . $comment_stmt->error;
			}

			// binding the result variables. updated on fetch().
			if (!$comment_stmt->bind_result($comment_text, $comment_date, $postId, $commentId)) {
				echo "Binding output parameters failed: (" . $comment_stmt->errno . ") " . $comment_stmt->error;
			}
			$comment_array = array();
			while ($comment_stmt->fetch()){
				array_push(
					$comment_array,
					new Comment(
						$postId,
						$commentId,
						$comment_date,
						$comment_text));
			}
			array_push(
				$posts_array,
				new Post(
					$id,
					$pos_latitude,
					$pos_longitude,
					$post_date,
					$post,
					$comment_array));
		}
			//stmt:s need to be closed.
			$comment_stmt->free_result();
			$post_stmt->free_result();
			$comment_stmt ->close();
			$post_stmt -> close();
			$conn->close();
			echo json_encode($posts_array);
	}

	function getCommentData($postID, $latestCommentID)
	{
		$servername = "127.0.0.1"; // localhost
		$username = "wall_poster";
		$password = "v4l5g6s9";
		$db = "theWall";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $db);

		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}

		if (!($stmt = $conn->prepare("SELECT comment_text, date, postId, commentId FROM comments where
				postId = ? AND commentId > ?
				ORDER BY commentId"))) 
		{
			echo "Prepare failed: (" . $conn->errno . ") " . htmlspecialchars($conn->error);
		}

		if (!$stmt->bind_param("ii", $postID, $latestCommentID)) {
			echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		// Executes the statement (sends the query)
		if (!$stmt->execute()) {
		    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		}
		
		//binding the result to these variables. They will be updated when post_stmt->fetch() is called
		if (!$stmt->bind_result($comment_text, $date, $postId, $commentId)) {
			echo "Binding output parameters failed: (" . $post_stmt->errno . ") " . $post_stmt->error;
		}


		$comment_array = array();
		while ($stmt->fetch()){
			array_push(
				$comment_array,
				new Comment(
					$postId,
					$commentId,
					$date,
					$comment_text));
		}
		$stmt->free_result();
		$stmt -> close();
		$conn->close();
		echo json_encode($comment_array);
	}

	/** 
	* This function puts a new post in the database, based on the arguments
	* provided. A new post will get a new id incremented since last post.
	*/

	function makePost($post_text, $latitude, $longitude)
	{
		$servername = "127.0.0.1"; // localhost
		$username = "wall_poster";
		$password = "v4l5g6s9";
		$db = "theWall";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $db);

		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}

		if (!($stmt = $conn->prepare("INSERT INTO posts VALUE(0, ?, ?, ?, NOW())"))) 
		{
			echo "Prepare failed: (" . $conn->errno . ") " . htmlspecialchars($conn->error);
		}

		if (!$stmt->bind_param("sdd", $post_text, $latitude, $longitude)) {
			echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		// Executes the statement (sends the query)
		if (!$stmt->execute()) {
		    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		//$stmt->free_result();
		$stmt -> close();
		$conn->close();
	}

	/** 
	* This function puts a new comment in the database. the id specifies which
	* post this comment belongs to.
	*/

	function makeComment($comment_text, $id)
	{
		$servername = "127.0.0.1"; // localhost
		$username = "wall_poster";
		$password = "v4l5g6s9";
		$db = "theWall";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $db);

		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}

		if (!($stmt = $conn->prepare("INSERT INTO comments VALUE(0, ?, NOW(), ?)"))) 
		{
			echo "Prepare failed: (" . $conn->errno . ") " . htmlspecialchars($conn->error);
		}

		if (!$stmt->bind_param("si", $comment_text, $id)) {
			echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		// Executes the statement (sends the query)
		if (!$stmt->execute()) {
		    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		//$stmt->free_result();
		$stmt -> close();
		$conn->close();
	}
?>
