<!doctype html>

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


			</div>

			<div class="edit-text">
				<textarea rows="4" class="fill-width" placeholder="write your post here!" form="postform"></textarea>
				<form action="" id="postform">

					<input type="submit" value="Post">
				</form>
			</div>

		</div> 
	</body>

</html>
