<?php
/*
Before running this script, create an admin user:

The wall_admin is appearently used for the trigger aswell which makes it need
the privileges TRIGGER, SELECT, UPDATE when inserting a comment.

CREATE USER 'wall_admin'@'localhost' IDENTIFIED BY 'w1h2k4l8';
GRANT CREATE ON thewall.* TO 'wall_admin'@'localhost';
GRANT DROP ON thewall.* TO 'wall_admin'@'localhost';
GRANT REFERENCES ON thewall.* TO 'wall_admin'@'localhost';
GRANT TRIGGER ON thewall.* TO 'wall_admin'@'localhost';
GRANT SELECT ON thewall.* TO 'wall_admin'@'localhost';
GRANT UPDATE ON thewall.* TO 'wall_admin'@'localhost';
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
    PRIMARY KEY (id),
    UNIQUE KEY postIdUnique (id)
	);";
if ($conn->query($sql) === TRUE) {
    echo "Created the table successfully <br/>";
} else {
    echo "Error creating table: $conn->error <br/>";
}

// Create table for comments
$sql =
    "CREATE TABLE comments(
    postId MEDIUMINT NOT NULL,
    commentId MEDIUMINT NOT NULL AUTO_INCREMENT,
    comment_text VARCHAR(300) NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (commentId, postId),
    KEY fk_comments_post_id_idx (postId),
    CONSTRAINT fk_comments_post_id FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
    );";

if ($conn->query($sql) === TRUE) {
    echo "Created the table successfully <br/>";
} else {
    echo "Error creating table: $conn->error <br/>";
}

// Create trigger for comments
$sql =
    "CREATE
    TRIGGER thewall.insert_comment_auto_inc
    BEFORE INSERT ON thewall.comments
    FOR EACH ROW
    -- Edit trigger body code below this line. Do not edit lines above this one
    BEGIN
      SELECT COALESCE(MAX(commentId) + 1, 1) INTO @commentId FROM comments WHERE postId = NEW.postId;
      SET NEW.commentId = @commentId;
    END";

if ($conn->query($sql) === TRUE) {
    echo "Created the trigger successfully <br/>";
} else {
    echo "Error creating trigger: $conn->error <br/>";
}

$conn->close();
?>