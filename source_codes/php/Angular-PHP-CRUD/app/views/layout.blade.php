<html>
<head >
    <title>Laravel Authentication Demo</title>
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.4.2/base-min.css">
     {{ HTML::style('/css/style.css') }} 
     {{ HTML::style('/css/test.css') }} 
     <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    
</head>


    <body>
        
        
<div id="container" ng-app="profileApp">
        <div id="nav">
            <ul>
                <li>{{ HTML::link('', 'Home') }}</li>
               
                @if(Auth::check())
                    <li>{{ HTML::link('account#/profile', 'Profile' ) }}</li>
                    <li>{{ HTML::link('account#', 'My Account') }}</li>
                    <li>{{ HTML::link('account#/contacts', 'My Contacts') }}</li>
                    <li>{{ HTML::link('account#/upload', 'Upload' ) }}</li>

                    <li>{{ HTML::link('logout', 'Logout') }}</li>

                @else
                    <li>{{ HTML::link('login', 'Login') }}</li>
                    <li>{{ HTML::link('register', 'Register') }}</li>
                @endif
            </ul>
        </div><!-- end nav -->

        <!-- check for flash notification message -->
  		@if(Session::has('flash_notice'))
            <div id="flash_notice">{{ Session::get('flash_notice') }}</div>
        @endif

        @yield('content')
    </div><!-- end container -->
    </body>
</html>