<?php require(dirname(__FILE__) . '/templates/header.php'); ?>

		<div class="grid grid-pad">
			<div class="col-3-12 hide-on-mobile">
				<div class="side-area">
				</div>
			</div>

			<div class="col-6-12">

	
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
						<textarea rows="4" class="fill-width" placeholder="write your post here!" form="postform"></textarea>
						<form action="" id="postform">
		
							<input type="submit" value="Post">
						</form>
					</div>

				</div> 

			</div>
			<div class="col-3-12 hide-on-mobile">
				<div class="side_area">
				</div>
			</div>
		</div>

<?php require(dirname(__FILE__) . '/templates/footer.php'); ?>