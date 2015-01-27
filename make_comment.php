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

function make_comment($comment_text, $id)
{
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
	    echo "Using the database" . "<br/>";
	} else {
	    echo "Error using database: " . $conn->error . "<br/>";
	}
	// Insert comment into table
	$sql = "INSERT INTO comments VALUE('" . $comment_text . "', NOW(), " . $id . ");";
	if ($conn->query($sql) === TRUE) {
	    echo "Inserted post successfully" . "<br/>";
	} else {
	    echo "Error inserting post: " . $conn->error . "<br/>";
	}
	$conn->close();
}
	// Get this via post from make_comment.js
	$comment_text = $_POST["comment_text"];
	$id = $_POST["id"];
	make_comment($comment_text, $id);
?>