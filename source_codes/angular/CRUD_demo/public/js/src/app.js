'use strict';


angular.module('myApp', ['myApp.filters', 'myApp.services', 'ngResource', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/view/:id', { templateUrl:'single_view.html',controller:Single, resolve: Single.resolve});
    $routeProvider.when('/edit/:id', {templateUrl: 'single.html', controller: 'EditCtrl'});
    $routeProvider.when('/new', { controller: 'AddCtrl', templateUrl: 'add.html'});
    $routeProvider.when('/', { controller:'MainCtrl', templateUrl:'table.html'});
    $routeProvider.when('/upload', { controller:'UploadCtrl', templateUrl:'image-upload.html'});
    $routeProvider.otherwise({redirectTo: '/'});

    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    	var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('#loading').show();
            return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
  }]);