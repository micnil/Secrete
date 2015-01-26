<!doctype html>

<?php 
include 'make_post.php';
?>

<html>
	<head>
		<title>The Wall</title>
		<meta charset="utf-8" />

		<!--Will get the position and send to update-wall.php -->
		<script type="text/javascript" src="geolocation.js"></script>
		
	</head>

	<body>
		<div class="header">
			<h1>The Wall</h1>
		</div>

		<div class="content">

			<div id="wall">

				<div class="post">
					<p> here is a post </p>
				</div>

				<div class="post">
					<p> here is another post </p>
				</div>
			</div>

			<div class="edit-text">
				<form action="" id="postform" method="post">
				<textarea rows="4" class="fill-width" placeholder="write your post here!" form="postform" name="post"></textarea>

					<input type="submit" value="Post" name="post_btn">
					<input type="invisible" name="latitude" id="latitude">
					<input type="invisible" name="longitude" id="longitude">

				</form>
				<?php
				if($_POST['post_btn'] and $_SERVER['REQUEST_METHOD'] == "POST"){
				    make_post($_POST['post'], $_POST['latitude'], $_POST['longitude']);
				}
				?>
			</div>

		</div> 
	</body>

</html>
