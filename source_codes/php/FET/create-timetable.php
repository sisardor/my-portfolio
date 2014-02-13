<?php
	include 'php-scripts/is-valid-user.php';
	$semester = $_SESSION['user']['semester'];
	$institutionName = $_SESSION['user']['institution'];
?>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
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
      .tab-pane {
      	padding: 20px 10px;
      }
      .one-edge-shadow {
		-webkit-box-shadow: 0px 6px 15px -6px black;
		-moz-box-shadow:    0px 6px 15px -6px black;
		box-shadow:         0px 6px 15px -6px black;
	}
	.items:hover .edit-link {
		display: block;
	}
	.edit-link {
		cursor: pointer;
	}
	.edit-link {
		display: none;
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
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
               
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>


    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->
	<div class="container">
		<div class="row"><div class="center-block" style="width:400px"><h2 class="text-primary">Enter Timetable Information</h2></div></div>

	
		<div class="col-md-3">
			<div class="btn-group-vertical">
				<a href="panel.php"class="btn btn-primary" style="width:200px">Panel</a>
		        <button class="btn btn-primary" style="width:200px">Data</button>
		        <button class="btn btn-primary" style="width:200px">Constraints</button>
		        <button class="btn btn-primary" style="width:200px">Generate Table</button>
		        <button class="btn btn-primary" style="width:200px">Logout</button>
		      </div>
		</div>
		<div class="col-md-9">
			<legend>
				<span class="text-muted">Institution:</span> 
				<span class="text-danger"><?php echo ucfirst($institutionName);?></span>
				<br> 
				<span class="text-muted">Semester:</span> 
				<span class="text-danger"><?php echo ucfirst($semester);?></span></legend>

				<article id="box">
					<ul class="nav nav-tabs">
					   <li><a href="#tab1" data-toggle="tab">Teachers</a></li>
					   <li><a href="#tab2" data-toggle="tab">Subjects</a></li>
					   <li><a href="#tab3" data-toggle="tab">Students</a></li>
					   <li><a href="#tab4" data-toggle="tab">Space</a></li>
					   <li><a href="#tab5" data-toggle="tab">Activities</a></li>
					</ul>
					<div class="tab-content" ng-controller="AppController">
							<!-- ================= TAB 1 ========================= -->
							<div id="tab1" class="tab-pane active" ng-controller="TeachersCtrl">
								<div class="col-md-5">
									<form role="form" name="myForm">
									  <div class="form-group">
									    <label for="teacherName">Teacher name:</label>
									    <input ng-model="teacherName" type="text" class="form-control" id="teacherName">
									  </div>
									  <button class="btn btn-default" ng-click="addItem()">Add</button>
									</form>
									<br>
									<table class="table table-condensed">
										<thead>
								        <tr>
								          <th>Teachers</th>
								          <th></th>
								        </tr>
								      	</thead>
								      	<tbody>
											<tr ng-repeat="teacher in teachers" class="items" >
												<td> {{teacher.name}}</td>
												<td><span ng-click="editTeacher(teacher.id)" class="pull-right edit-link glyphicon glyphicon-pencil"></span> </td>
											</tr>
										</tbody>
									</table>
									
									<!-- <ul class="unstyled">
										<li ng-repeat="teacher in teachers">{{teacher.name}}<a href ng-click="editTeacher(teacher.id)">edit</a>
										</li>
									</ul> -->
									<div ng-include src="template.url"></div>
								</div>	
							</div>
							<!-- =================== TAB 2 ======================= -->
							<div id="tab2" class="tab-pane" ng-controller="SubjectsCtrl">
								<div class="col-md-5">
									<form role="form" name="myForm">
									  <div class="form-group">
									    <label for="subjectName">Subject name:</label>
									    <input ng-model="subjectName" type="text" class="form-control" id="subjectName">
									  </div>
									  <button class="btn btn-default" ng-click="addItem()">Add</button>
									</form>
									<br>
									<table class="table table-condensed">
										<thead>
									        <tr>
									          <th>Subjects</th>
									          <th></th>
									        </tr>
								      	</thead>
								      	<tbody>
											<tr ng-repeat="subject in subjects" class="items">
												<td> {{subject.name}} </td>
												<td><span ng-click="editThis(subject.id)" class="pull-right edit-link glyphicon glyphicon-pencil"></span> </td>
											</tr>
										</tbody>
									</table>

									<div ng-include src="template.url"></div>
								</div>
							</div>
							<!-- =================== TAB 3 ======================= -->
							<div id="tab3" class="tab-pane" ng-controller="StudentsCtrl">
								<div class="col-md-5">
									<form role="form" name="myForm">
									  <div class="form-group">
									    <label for="studentName">Student name:</label>
									    <input ng-model="studentName" type="text" class="form-control" id="studentName">
									  </div>
									   <div class="form-group">
									    <label for="subjectName">Student amount:</label>
									    <input ng-model="studentAmount" type="text" class="form-control" id="studentAmount">
									  </div>
									  <button class="btn btn-default" ng-click="addItem()">Add</button>
									</form>
									<br>
									<table class="table table-condensed">
										<thead>
									        <tr>
									          <th>Name</th>
									          <th>Amount</th>
									          <th></th>
									        </tr>
								      	</thead>
								      	<tbody>
											<tr ng-repeat="student in students" class="items">
												<td> {{student.year_name}} </td>
												<td> {{student.num_students}} </td>
												<td><span ng-click="editThis(student.id)" class="pull-right edit-link glyphicon glyphicon-pencil"></span> </td>
											</tr>
										</tbody>
									</table>



									<div ng-include src="template.url"></div>
								</div>
							</div>
							<!-- =================== TAB 4 ======================= -->
							<div id="tab4" class="tab-pane" ng-controller="SpaceCtrl">
									
								<div class="col-md-4">
										<h3>Add buildings</h3>
										<form role="form" name="myForm">
										  <div class="form-group">
										    <label for="buildingInput">Building:</label>
										    <input ng-model="buildingInput" type="text" class="form-control" id="buildingInput">
										  </div>
										   <div class="form-group">
										    <label for="studentAmount">Student amount:</label>
										    <input ng-model="studentAmount" type="text" class="form-control" id="studentAmount">
										  </div>
										 <div class="form-group">
											<button class="btn btn-default" ng-click="addItem()">Add</button> 
											<button class="btn btn-default" ng-click="editItem()" ng-disabled="showB()">Edit</button>
											<button class="btn btn-default" ng-click="deleteItem()" ng-disabled="showB()">Delete</button>
										</div>
										 <select class="form-control" ng-model="building" 
											ng-options="c.name for c in buildings" size="10" style="min-width: 150px;" 
											ng-change="update()">
										</select>
										</form>
								</div>



								<div class="col-md-4">
									<h3>Add rooms</h3>
										<form role="form" name="myForm">
										  <div class="form-group">
										    <label for="buildingSelect">Select building:</label>
										    <select class="form-control" id="buildingSelect" ng-model="building" 
												ng-options="c.name for c in buildings" 
												ng-change="update()">
											</select>
										  </div>
											<div class="form-group">
												<label for="roomName">Room name:</label>
											    <input ng-model="roomName" type="text" class="form-control" id="roomName">
											</div>
											<div class="form-group">
												<label for="roomCapacity">Capacity:</label>
											    <input ng-model="roomCapacity" type="text" class="form-control" id="roomCapacity">
											</div>
											<div class="form-group">
												<button class="btn btn-default" ng-click="addRoom()">Add</button> 
												<button class="btn btn-default" ng-click="editRoom()" ng-disabled="showB()">Edit</button>
												<button class="btn btn-default" ng-click="deleteRoom(room.id)" ng-disabled="showB()">Delete</button>
											</div>
										 <select 
										 	class="form-control"
											ng-model="room" 
											ng-options="(r.name + ' - ' + r.capacity) for r in rooms" size="10" 
											style="min-width: 150px;">
										</select>
									</form>
								</div>
							</div>
							<!-- =================== TAB 5 ======================= -->
							<div id="tab5" class="tab-pane" ng-controller="ActivitiesCtrl">
								<div class="col-md-4">
									<h3>Activities</h3>
									<ul class="unstyled">
										<li ng-repeat="act in activities">
											{{act.teach_name}} - {{act.subj_name}} - {{act.year_name}}
											<a href ng-click="editThis(act.id)">edit</a>
										</li>
									</ul>
								</div>
								<div style="clear: both">
									<div class="col-md-4">

										<div class="form-group"><label>Teachers</label>
										<select class="form-control" size="10" 
											ng-model="act_teacher" 
											ng-options="t.name for t in teachers" style="min-width: 150px;" 
											ng-dblclick="updateT()" autofocus>
										</select>
										</div>
									</div>

									<div class="col-md-4">

										<div class="form-group" style="padding-top: 25px;">
										<select class="form-control" size="10" 
											ng-model="chosenT"
											ng-options="ct.name for ct in chosenTeachers" style="min-width: 150px;" 
											ng-dblclick="removeT()">
										</select>
										</div>
									</div>
								</div>

								<div style="clear: both">
									<div class="col-md-4">
										
										<div class="form-group"><label>Students</label>
										<select class="form-control" size="10" style="min-width: 150px;" 
											ng-model="act_student" 
											ng-options="st.year_name for st in students" 
											ng-dblclick="updateS()">
										</select>
										</div>
									</div>
									<div class="col-md-4">
										
										<div class="form-group" style="padding-top: 25px;">
										<select class="form-control" size="10" 
											ng-model="chosenS" 
											ng-options="st.year_name for st in chosenStudents" style="min-width: 150px;" 
											ng-dblclick="removeS()">
										</select>
										</div>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<select class="form-control" ng-model="subject" ng-options="sb.name for sb in subjects" >
											<option value="">- select -</option>
										</select>
									</dic>

									
									<div class="form-group" style="margin-top: 10px;">
										<button class="btn btn-default" ng-click="saveAct()" ng-disabled="isOK()">{{button_value}}</button>
										<span ng-show="checked">
										<button class="btn btn-default" ng-click="cancel()" ng-disabled="isOK()">Cancel</button>
										<button class="btn btn-default" ng-click="deleteAct()" ng-disabled="isOK()">Delete</button>
										</span>
									</div>
								</div>
								

								<div ng-include src="template.url"></div>
							</div>
							<!-- ================== END ======================== -->

						</div><!--END tab-->
					<br>				
				</article>
		</div>
	

	</div>




    <div class="container" style="padding-top: 200px;">
    	<hr class="featurette-divider">
	  <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
  	</div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="http://code.angularjs.org/1.1.5/angular-resource.js"></script>
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="js/myApp.js"></script>
</head>
  </body>
</html>