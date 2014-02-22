<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
    <title>Laravel Demo</title>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.9.1.min.js"> </script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"> </script>
	<script src="js/vendor/angular-resource.min.js"></script>
    <script src="js/vendor/dropzone.js"></script>

	<style type="text/css">
	#loading {
	left: 45%;
	top: 82px;
	background: gold;
	padding: 0.3em;
	font-weight: bold;
	position: absolute;
	 }

	</style>
    <link media="all" type="text/css" rel="stylesheet" href="css/style.css">
    <link media="all" type="text/css" rel="stylesheet" href="css/basic.css">
    <link media="all" type="text/css" rel="stylesheet" href="css/dropzone.css">
</head>


    <body>
    <div id="container">
    	<div id="nav">
            <ul>
                <li><a href="/account">My Account</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/logout">Logout</a></li>
                <li><a href="#/upload">UPLOAD</a></li>
            </ul>
        </div><!-- end nav -->


        <div ng-app="myApp">
        	  <div id="loading">Loading...</div>
		  <h1 style="padding-top: 50px;">My Ads</h1>
		  <a href="#/new"><button>Add new</button></a><br>
		  <div ng-view></div>


		  
  <!-- <div>Angular seed app: v<span app-version></span></div> -->


    </div><!-- end container -->

    </body>
    
  <script src="js/src/app.js"></script>
  <script src="js/src/services.js"></script>
  <script src="js/src/controllers.js"></script>
  <script src="js/src/filters.js"></script>
  <script src="js/src/directives.js"></script>
 
</html>