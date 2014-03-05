<?php
	session_start();
	/* here place the code to prevent invaildate user access the page*/
	if(!isset($_SESSION['user']['username'])){
		include "templates/401.php";
		die();
	} 