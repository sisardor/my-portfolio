<?php
  include 'php-scripts/is-valid-user.php';
  include 'php-scripts/db-connect.php';
  $query = "SELECT semester FROM user_tables WHERE user_name = '".$_SESSION['user']['username']."'";
  $result = $mysqli->query($query);
  $semester = "";
  while($tuple = $result->fetch_assoc()){
    $semester .= "<option  value=\"".$tuple['semester']."\">".$tuple['semester']."</option>";
  }
  $result->free();

  $userID = $_SESSION['user']['username'];
  
  $current_dir = getcwd();
  $upload_dir = '/uploads';
  $pathToMyDir = $current_dir.$upload_dir."/$userID/";
  
  

    #creates a new user table
  if(isset($_REQUEST['create']) && $_REQUEST['name_semester'] !== NULL){  
    $semester = $_REQUEST['name_semester'];
    $institutionName = $_REQUEST['name_institution'];
    $comments = $_REQUEST['comments'];
    
    /*Code to check if semester already exists and if they want to continue...*/
    
    
    if(mkdir($pathToMyDir.$semester)){

      $insert = $mysqli->prepare("INSERT INTO user_tables (semester, institution_name, comments, user_name) VALUES (?, ?, ?, ?)");
      $insert->bind_param("ssss", $semester, $institutionName, $comments, $userID);
      $insert->execute();
      
      $_SESSION['user']['semester'] = $semester;
      $_SESSION['user']['institution'] = $institutionName;
      
      $select = "SELECT user_table_id FROM user_tables WHERE semester = '".$semester."' AND user_name = '".$userID."'";
      $selectResult = $mysqli->query($select);
      $tableID = $selectResult->fetch_assoc();
      $_SESSION['user']['user_table_id'] = $tableID['user_table_id'];
      
      $selectResult->free();
      
      $mysqli->close();
     
      header('Location: create-timetable.php');
      die();
    }
  }

  #works on exisiting table
  if(isset($_REQUEST['view']) && $_REQUEST['existSem']){
    $semester = $_REQUEST['existSem'];
    $_SESSION['user']['semester'] = $semester;
    
    $select = "SELECT user_table_id, institution_name FROM user_tables WHERE semester = '".$semester."' AND user_name = '".$userID."'";
    $selectResult = $mysqli->query($select);
    $tableID = $selectResult->fetch_assoc();
    
    $_SESSION['user']['user_table_id'] = $tableID['user_table_id'];
	$_SESSION['user']['institution'] = $tableID['institution_name'];
    
    $selectResult->free();
    
    $mysqli->close();
    
    header("Location: create-timetable.php");
    exit;
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>Carousel Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Custom styles for this template -->
    <link href="carousel.css" rel="stylesheet">
    <style>
      .col-lg-4 {
        padding: 0 30px;
      }
    </style>
  </head>
<!-- NAVBAR
================================================== -->
  <body>
    <div class="navbar-wrapper">
      <div class="container">

        <div class="navbar navbar-inverse navbar-static-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">FET</a>
            </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active"><a href="">Home</a></li>
				<li><a href="create-timetable.php">Panel</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
				<li><a href="logout.php">Logout</a></li>
               
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>


    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">
      <div class="row"><div class="center-block" style="width:300px"><h2 class="text-primary">Create a New Table</h2></div></div>
      <hr class="featurette-divider">
      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-xs-4">
          <h3>Create a New Table</h3>
          <form role="form">
            <div class="form-group">
              <label for="exampleInputEmail1">Semester:</label>
              <input name="name_semester" type="text" class="form-control" id="exampleInputEmail1">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Institution Name:</label>
              <input name="name_institution" type="text" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group">
              <label for="exampleInputFile">Comments:</label>
              <textarea name="comments" class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-default" name="create">Create</button>
          </form>
        </div><!-- /.col-lg-4 -->
        <div class="col-xs-4">
          <h3>Work on Existing Tables</h3>
          <form role="form">
            <div class="form-group">
              <label for="exampleInputEmail1">Semester:</label>
              <select class="form-control" name="existSem">
                <!-- <option value="" selected=""></option> -->
                <?php echo $semester?>  
              </select>
            </div>
            
            
            <button type="submit" class="btn btn-default" name="view">View/Edit</button>
          </form>
        </div><!-- /.col-lg-4 -->
        <div class="col-xs-4">
          <h3>Upload a .fet XML File</h3>
          <form role="form">
            <div class="form-group">
              <label for="exampleInputEmail1">Semester:</label>
              <input class="form-control"  type="file" name="user-file" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Institution Name:</label>
              <input type="text" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-default">Upload file</button>
          </form>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->


      <!-- START THE FEATURETTES -->

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
          <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
        </div>
        <div class="col-md-5">
          <!-- <img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="Generic placeholder image"> -->
        </div>
      </div>
    <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->


      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>

    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
  </body>
</html>