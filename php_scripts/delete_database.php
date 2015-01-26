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

// Delete database
$sql = "DROP DATABASE thewall;";
if ($conn->query($sql) === TRUE) {
    echo "Database deleted successfully" . "<br/>";
} else {
    echo "Error deleting database: " . $conn->error . "<br/>";
}

$conn->close();
?>