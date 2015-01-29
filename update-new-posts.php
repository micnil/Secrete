<?php

	//TODO
	//Validate data in POST.
	//Open connection to database
	//Make a MYSQL query
	//Update wall in a loop somehow?
	//close connection to database

	/*echo "latitude: " . $_POST["latitude"] . " longitude: " . $_POST["longitude"];*/

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

		public function __construct($theId, $thePositionLat, $thePositionLong, $theDateTime, $theText, $TheComment_array ) {
			$this->id = $theId;
			$this->position_lat = $thePositionLat;
			$this->position_long = $thePositionLong;
			$this->dateTime = $theDateTime;
			$this->text = $theText;
			$this->comment_array = $TheComment_array;
		}
	}

	$this_latitude = $_POST["latitude"];
	$this_longitude = $_POST["longitude"];
	$radius = $_POST["radius"];
	$top_post_id = $_POST["top_post_id"];

	$servername = "127.0.0.1"; // localhost
	$username = "wall_poster";
	$password = "v4l5g6s9";

	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error . "<br/>");
	} 
	// Use the database
	$sql = "USE thewall;";
	if ($conn->query($sql) === TRUE) {
	    //echo "Using the database" . "<br/>";
	} else {
	    //echo "Error using database: " . $conn->error . "<br/>";
	}

	    // This is some ugly shit. Better to save the x,y,z coordinates in the DB and compare those instead.
		$sql =
			"SELECT id, post, pos_longitude, pos_latitude, date FROM posts where
			sqrt(pow(sqrt(pow(6378137*cos(" . $this_latitude . "*3.14159265359/180)-6378137*cos(pos_latitude*3.14159265359/180),2)+pow(6378137*sin(" . $this_latitude . "*3.14159265359/180)-6378137*sin(pos_latitude*3.14159265359/180),2)),2) + pow(2*3.14159265359*((((6378137*cos(" . $this_latitude . "*3.14159265359/180)+6378137*cos(pos_latitude*3.14159265359/180))/2))/360)*(" . $this_longitude . "-pos_longitude),2))
			< " . $radius . "
			AND id > " . $top_post_id . "
			ORDER BY date DESC LIMIT 5;";

	$response = $conn->query($sql);
	if ($response) {
	    //echo "Fetched data successfully" . "<br/>";
	} else {
	    //echo "Error fetching data: " . $conn->error . "<br/>";
	}
	$posts_array = array();
	while ($row = mysqli_fetch_array($response)){
			$sql =
				"SELECT comment_text, date, id FROM comments where
				id = " . $row['id'] . " 
				ORDER BY date;";
			$comments_response = $conn->query($sql);
			if ($comments_response) {
			    //echo "Fetched data successfully" . "<br/>";
			} else {
			    //echo "Error fetching data: " . $conn->error . "<br/>";
			}
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
?>
