<!doctype html>

<html>
	<head>
		<title>The Wall</title>
		<meta charset="utf-8" />

		<link rel="stylesheet" type="text/css" href="styles/styles.css">
		<!--Will get the position and send to update-wall.php -->
		<script type="text/javascript" src="eventHandler.js"></script>
		<script type="text/javascript" src="geolocation.js"></script>
		<script type="text/javascript" src="make_post.js"></script>
		<script type="text/javascript" src="update_wall.js"></script>
		
	</head>

	<body onload="updateOldPosts()">

		<div class="header">
			<h1>The Wall</h1>
		</div>

		<div class="content">
			<div class="edit-text">
				<input type="range" min="0" max="10000" value="5000" id="radius_slider" onchange="updatePosts()"/>
				<textarea rows="4" class="fill-width" placeholder="write your post here!" form="postform" name="post" id="post_text"></textarea>
				<input type="submit" value="post" name="post_btn" onclick="submitPost()">
			</div>
			<div id="wall"></div>
		</div> 
	</body>

</html>
