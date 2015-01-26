<?php
function display()
{
    echo $_POST["latitude"];
}
if(isset($_POST['submit']))
{
   display();
} 
?>
