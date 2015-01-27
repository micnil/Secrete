<?php

	//TODO
	//Validate data in POST.
	//Open connection to database
	//Make a MYSQL query
	//Update wall in a loop somehow?
	//close connection to database

	/*echo "latitude: " . $_POST["latitude"] . " longitude: " . $_POST["longitude"];*/


	class Post{
		public $text;
		public $dateTime;
		public $position_lat;
		public $position_long;

		public function __construct($thePositionLat, $thePositionLong, $theDateTime, $theText ) {
			$this->position_lat = $thePositionLat;
			$this->position_long = $thePositionLong;
			$this->dateTime = $theDateTime;
			$this->text = $theText;
		}
	}

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
	// This should be done onlu for the close ones later
	$sql =
		"SELECT post, pos_longitude, pos_latitude, date FROM posts;";
	$response = $conn->query($sql);

	if ($response) {
	    //echo "Fetched data successfully" . "<br/>";
	} else {
	    //echo "Error fetching data: " . $conn->error . "<br/>";
	}

	$posts_array = array();
	while ($row = mysqli_fetch_array($response)){
		array_push(
			$posts_array,
			new Post(
				$row['pos_latitude'],
				$row['pos_longitude'],
				$row['date'],
				$row['post']));
	}
	$conn->close();
	//$posts_json = json_encode($posts_array);
	echo json_encode($posts_array);

?>
