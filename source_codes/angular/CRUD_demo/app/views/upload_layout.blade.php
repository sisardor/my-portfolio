<html>
<head>
    <title>Laravel Authentication Demo</title>
    {{ HTML::script('js/vendor/dropzone.js') }}
    {{ HTML::style('css/basic.css');}}
</head>


    <body>
        
        
<div id="container">


        <!-- check for flash notification message -->
  		@if(Session::has('flash_notice'))
            <div id="flash_notice">{{ Session::get('flash_notice') }}</div>
        @endif

        @yield('content')

        <form action="{{ url('api/upload')}}" class="dropzone" id="my-awesome-dropzone"></form>
    </div><!-- end container -->
    </body>
</html>
