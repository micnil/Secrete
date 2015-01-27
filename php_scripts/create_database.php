<?php
/*
Before running this script, create an admin user:

CREATE USER 'wall_admin'@'localhost' IDENTIFIED BY 'w1h2k4l8';
GRANT CREATE ON thewall.* TO 'wall_admin'@'localhost';
GRANT DROP ON thewall.* TO 'wall_admin'@'localhost';
FLUSH PRIVILEGES;

The wall_poster user:

CREATE USER 'wall_poster'@'localhost' IDENTIFIED BY 'v4l5g6s9';
GRANT INSERT ON thewall.* TO 'wall_poster'@'localhost';
GRANT SELECT ON thewall.* TO 'wall_poster'@'localhost';
FLUSH PRIVILEGES;

Maybe have another user that does the select later so that the post user can
only insert?
*/

$servername = "127.0.0.1"; // localhost
$username = "wall_admin";
$password = "w1h2k4l8";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "<br/>");
} 

// Create database
$sql = "CREATE DATABASE thewall;";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully" . "<br/>";
} else {
    echo "Error creating database: " . $conn->error . "<br/>";
}

// Use the database
$sql = "USE thewall;";
if ($conn->query($sql) === TRUE) {
    echo "Using the database" . "<br/>";
} else {
    echo "Error using database: " . $conn->error . "<br/>";
}

// Create table for posts
$sql =
	"CREATE TABLE posts(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
	post VARCHAR(300) NOT NULL,
	pos_latitude DOUBLE NOT NULL,
    pos_longitude DOUBLE NOT NULL,
	date DATETIME NOT NULL,
    PRIMARY KEY (id)
	);";
if ($conn->query($sql) === TRUE) {
    echo "Created the table successfully" . "<br/>";
} else {
    echo "Error creating table: " . $conn->error . "<br/>";
}

// Create table for comments
$sql =
    "CREATE TABLE comments(
    comment_text VARCHAR(300) NOT NULL,
    date DATETIME NOT NULL,
    id MEDIUMINT NOT NULL
    );";
if ($conn->query($sql) === TRUE) {
    echo "Created the table successfully" . "<br/>";
} else {
    echo "Error creating table: " . $conn->error . "<br/>";
}

$conn->close();
?>