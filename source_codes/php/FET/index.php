<?php
  //include 'php-scripts/is-valid-user.php';
  include 'php-scripts/db-connect.php';
  session_start();

  if(isset($_SESSION['user']['username'])){
    header("Location: panel.php");
    die();
  } 

  if(isset($_REQUEST['login'])){
    $id = $_POST['id'];
    $password = $_POST['password'];

    
    $sql = "SELECT * FROM `$users` WHERE `user_name`='$id' and `password` = '$password';";
    $result = $mysqli->query($sql);
    $count = $result->num_rows;

    if ($count==1) {
      session_start();
      $_SESSION['user']['username'] = $id; 

      header("Location: panel.php");
      exit;
    }
    else {
      echo "<script type=\"text/javascript\">
          window.alert(\"Your username or password is incorrect! Please try again!\")
          </script>";
    }
    $result->free();
    $mysqli->close();
  }
  
  if(isset($_REQUEST['signup'])){
    header("Location: signup.php");
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

    <title>Signin Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/homepage.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">

      <form class="form-signin" role="form" action="" method="post">
        <h2 class="form-signin-heading">FET Login</h2>
        <input type="text" class="form-control" placeholder="User ID" name="id" required autofocus>
        <input type="password" class="form-control" placeholder="Password" name="password" required>
        <label class="checkbox">
          <input type="checkbox" value="remember-me"> Remember me
        </label>
        <button class="btn btn-lg btn-primary btn-block" type="submit" name="login">Sign in</button>
        <a href="registration.php" class="btn btn-lg btn-primary btn-block">Register</a>
      </form>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>
