<?php

	//TODO
	//Validate data in POST.
	//Open connection to database
	//Make a MYSQL query
	//Update wall in a loop somehow?
	//close connection to database

	/*echo "latitude: " . $_POST["latitude"] . " longitude: " . $_POST["longitude"];*/


	class Post{
		public $text = "";
		public $dateTime = "";
		public $position = "";

		public function __construct($thePosition, $theDateTime, $theText ) {
			$this->position = $thePosition;
			$this->dateTime = $theDateTime;
			$this->text = $theText;
		}
	}

	$post1 = new Post("103 12","Idag","jag gillar äpplen ganska mycket");
	$post2 = new Post("52 24","Imorgon","Snubben ovanför gillar äpplen faktiskt");
	$post3 = new Post("89 31","Imorgon","vad är det här för ett spännande hemsida och koncept??");

 
	$posts=[$post1,$post2,$post3];
	$posts_json = json_encode($posts);
	echo $posts_json;

?>
