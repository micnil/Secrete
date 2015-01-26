<?php
/*
The wall_poster user:

CREATE USER 'wall_poster'@'localhost' IDENTIFIED BY 'v4l5g6s9';
GRANT INSERT ON thewall.* TO 'wall_poster'@'localhost';
GRANT SELECT ON thewall.* TO 'wall_poster'@'localhost';
FLUSH PRIVILEGES;

Maybe have another user that does the select later so that the post user can
only insert?
*/

function make_post($post, $latitude, $longitude)
{
   $servername = "127.0.0.1"; // localhost
	$username = "wall_poster";
	$password = "v4l5g6s9";

	//$post = $_POST['post'];

	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error . "<br/>");
	} 

	// Use the database
	$sql = "USE thewall;";
	if ($conn->query($sql) === TRUE) {
	    echo "Using the database" . "<br/>";
	} else {
	    echo "Error using database: " . $conn->error . "<br/>";
	}

	// Create table
	$sql =
		"INSERT INTO posts VALUE(
		'" . $post . "',
		" . $latitude . ",
		" . $longitude . ",
		NOW()
		);";
	if ($conn->query($sql) === TRUE) {
	    echo "Inserted post successfully" . "<br/>";
	} else {
	    echo "Error inserting post: " . $conn->error . "<br/>";
	}
	$conn->close();
}
?>