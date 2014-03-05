<?php
	include 'php-scripts/db-connect.php';

	$current_dir = getcwd();
	$upload_dir = '/uploads';
	if (!is_dir($current_dir.$upload_dir)) {
		mkdir($current_dir.$upload_dir,0775);
	}


	if(isset($_REQUEST['signup'])){
		$id = $_POST['id'];
		$pwd = $_POST['password'];
		$pwd2 = $_POST['password2'];
		if($pwd !== $pwd2) {
			$login_error =  '<div class="alert alert-danger">Your passwords do not match! Please try again!</div>';
			//exit;
		}
		else{
			//echo "OKKKK";die();
			if (isset ($_POST['id'])&& isset ($_POST['password'])){
				$id = $_POST['id'];
				$pwd = $_POST['password'];
					
				$query = $mysqli->prepare("INSERT INTO `users` (`user_name`, `password`) VALUES (?, ?)");
				$query->bind_param("ss", $id, $pwd);
				$query->execute();
				
				if ($query->error == "Duplicate entry '$id' for key 'PRIMARY'"){
					$login_error = '<div class="alert alert-danger">User ID has been used. Please choose another one.</div>';

				}
				else{
					if(mkdir($current_dir.$upload_dir."/$id")) {

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
					}

					header("Location: index.php");
				}
				
				$mysqli->close();
			}
		}
	}
	if(isset($_REQUEST['login'])){
		header("Location: index.php");
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
    	<?php if (isset($login_error)) echo $login_error;   ?>

      <form class="form-signin" role="form" action="" method="post">
        <h2 class="form-signin-heading">FET Registration</h2>
        <input type="text" class="form-control" placeholder="Enter user ID" name="id" required autofocus>
        <input type="password" class="form-control" placeholder="Enter password" name="password" required>
        <input type="password" class="form-control" placeholder="Enter password again" name="password2" required>
        <label class="checkbox">
          <!-- <input type="checkbox" value="remember-me"> Remember me -->
        </label>
        <button href="singup.php" class="btn btn-lg btn-primary btn-block" type="submit" name="signup">Register</button>
      </form>

    </div> <!-- /container -->

  </body>
</html>

