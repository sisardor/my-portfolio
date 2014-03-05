<?php 
if (App::environment('local') == "local") {
    $base_link = "";
} else {
    $base_link = "/source_codes/php/Angular-PHP-CRUD/public/"; 
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laravel Authentication Demo</title>

     <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

     <link href="<?php echo $base_link; ?>css/media/normal-screen.css"   rel="stylesheet" />
     <link href="<?php echo $base_link; ?>css/media/small-screen.css"    rel="stylesheet" media="screen and (max-width: 600px)" />
     <link href="<?php echo $base_link; ?>css/media/medium-screen.css"   rel="stylesheet" media="screen and (min-width: 600px) and (max-width: 900px)" />
     <link href="<?php echo $base_link; ?>css/media/big-screen.css"      rel="stylesheet" media="screen and (min-width: 900px)" />
     <link href="<?php echo $base_link; ?>css/pure/base.css"             rel="stylesheet">
     <link href="<?php echo $base_link; ?>css/pure/pure-style.css"       rel="stylesheet">

     <link href="http://yui.yahooapis.com/pure/0.4.2/buttons-min.css" rel="stylesheet" >
     <link href="http://yui.yahooapis.com/pure/0.4.2/tables-min.css" rel="stylesheet">
     <link href="http://yui.yahooapis.com/pure/0.4.2/forms-min.css" rel="stylesheet">
</head>


<body>
        
        
<div id="container" >
        <div id="nav">
            <ul>
                <li><% HTML::link('/', 'Home') %></li>
               
                @if(Auth::check())
                    <li><% HTML::link('account#/profile', 'Profile' ) %></li>
                    <li><% HTML::link('account#', 'My Account') %></li>
                    <li><% HTML::link('account#/contacts', 'My Contacts') %></li>
                    <li><% HTML::link('account#/upload', 'Upload' ) %></li>

                    <li><% HTML::link('logout', 'Logout') %></li>

                @else
                    <li><% HTML::link('login', 'Login') %></li>
                    <li><% HTML::link('register', 'Register') %></li>
                @endif
            </ul>
        </div><!-- end nav -->

        <!-- check for flash notification message -->
  		@if(Session::has('flash_notice'))
            <div class="alert alert-success"><i class="fa fa-check"></i> <% Session::get('flash_notice') %></div>
        @endif

        @yield('content')
    </div><!-- end container -->
    </body>

    <!--  Frameworks -->
    <script src="https://cdn.firebase.com/js/client/1.0.6/firebase.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.js"></script>
    <script src="https://cdn.firebase.com/libs/angularfire/0.7.0/angularfire.min.js"></script>

    <!-- My Script -->
    <script src="<?php echo $base_link; ?>js/src/app.js"></script>
</html>