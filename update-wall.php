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
	// This should be done only for the close ones later
	// x = r * cos(lat) * sin(long)
	// y = r * sin(lat)
	// z = r * cos(lat) * cos(long)

	$sql =
		"SELECT id, post, pos_longitude, pos_latitude, date FROM posts where
		pow(6378137,2) * (pow(cos(pos_latitude) * sin(pos_longitude) - cos(" . $this_latitude . ") * sin(" . $this_longitude . "),2) + 
		pow(sin(pos_latitude) - sin(" . $this_latitude . "),2) + 
		pow(cos(pos_latitude) * cos(pos_longitude) - cos(" . $this_latitude . ") * cos(" . $this_longitude . "),2)) < pow(" . $radius . ",2)
		ORDER BY date DESC;";
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
				ORDER BY date DESC;";
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
