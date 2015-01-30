<?php
	class Comment{
		public $id;
		public $text;
		public $dateTime;

		public function __construct($theId, $theDateTime, $theText ) {
			$this->id = $theId;
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

		// Create connection
		$conn = new mysqli($servername, $username, $password);
		// Check connection
		if ($conn->connect_error)
		    die("Connection failed: " . $conn->connect_error . "<br/>");
		// Use the database
		if(!$conn->select_db("thewall"))
			echo "Error using database: " . $conn->error . "<br/>";

		$sign = $old_or_new == "old" ? "<" : ">";
	    // This is some ugly shit. Better to save the x,y,z coordinates in the DB and compare those instead?
		$sql =
			"SELECT id, post, pos_longitude, pos_latitude, date FROM posts where
			sqrt(pow(sqrt(pow(6378137*cos(" . $this_latitude . "*3.14159265359/180)-6378137*cos(pos_latitude*3.14159265359/180),2)+pow(6378137*sin(" . $this_latitude . "*3.14159265359/180)-6378137*sin(pos_latitude*3.14159265359/180),2)),2) + pow(2*3.14159265359*((((6378137*cos(" . $this_latitude . "*3.14159265359/180)+6378137*cos(pos_latitude*3.14159265359/180))/2))/360)*(" . $this_longitude . "-pos_longitude),2))
			< " . $radius . "
			AND id " . $sign . $post_id . "
			ORDER BY id DESC LIMIT " . $number_of_posts . ";";

		$response = $conn->query($sql);
		if (!$response)
		    echo "Error fetching data: " . $conn->error . "<br/>";
		
		$posts_array = array();
		while ($row = mysqli_fetch_array($response)){
				$sql =
					"SELECT comment_text, date, id FROM comments where
					id = " . $row['id'] . " 
					ORDER BY date;";
				$comments_response = $conn->query($sql);
				if (!$comments_response) 
				    echo "Error fetching data: " . $conn->error . "<br/>";
				
				$comment_array = array();
				while ($comment_row = mysqli_fetch_array($comments_response)){
					array_push(
						$comment_array,
						new Comment(
							$comment_row['id'],
							$comment_row['date'],
							$comment_row['comment_text']));
				}
				array_push(
					$posts_array,
					new Post(
						$row['id'],
						$row['pos_latitude'],
						$row['pos_longitude'],
						$row['date'],
						$row['post'],
						$comment_array));
		}
		$conn->close();
		echo json_encode($posts_array);
	}

	function getCommentData($postID)
	{
		$servername = "127.0.0.1"; // localhost
		$username = "wall_poster";
		$password = "v4l5g6s9";

		// Create connection
		$conn = new mysqli($servername, $username, $password);
		// Check connection
		if ($conn->connect_error)
		    die("Connection failed: " . $conn->connect_error . "<br/>");
		// Use the database
		if(!$conn->select_db("thewall"))
			echo "Error using database: " . $conn->error . "<br/>";

		$sql =
				"SELECT comment_text, date, id FROM comments where
				id = " . $postID . " 
				ORDER BY date;";

		$comments_response = $conn->query($sql);
		if (!$comments_response) 
		    echo "Error fetching data: " . $conn->error . "<br/>";
		
		$comment_array = array();
		while ($comment_row = mysqli_fetch_array($comments_response)){
			array_push(
				$comment_array,
				new Comment(
					$comment_row['id'],
					$comment_row['date'],
					$comment_row['comment_text']));
		}
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

		// Create connection
		$conn = new mysqli($servername, $username, $password);
		// Check connection
		if ($conn->connect_error)
		    die("Connection failed: " . $conn->connect_error . "<br/>");
		// Use the database
		if(!$conn->select_db("thewall"))
			echo "Error using database: " . $conn->error . "<br/>";
		// Insert post into table
		$sql = "INSERT INTO posts VALUE(0,'" . $post_text . "', " . $latitude . ", " . $longitude . ", NOW());";
		if (!$conn->query($sql))
		    echo "Error inserting post: " . $conn->error . "<br/>";

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

		// Create connection
		$conn = new mysqli($servername, $username, $password);

		// Check connection
		if ($conn->connect_error)
		    die("Connection failed: " . $conn->connect_error . "<br/>");

		// Use the database
		if(!$conn->select_db("thewall"))
			echo "Error using database: " . $conn->error . "<br/>";

		// Insert comment into table
		$sql = "INSERT INTO comments VALUE('" . $comment_text . "', NOW(), " . $id . ");";
		if (!$conn->query($sql))
		    echo "Error inserting post: " . $conn->error . "<br/>";
		$conn->close();
	}
?>
