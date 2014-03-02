'use strict';


angular.module('myApp', ['ngRoute','myApp.filters', 'myApp.services', 'ngResource', 'myApp.directives', 'myApp.controllers', 'angularFileUpload']).
  config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/view/:id',{ controller: Single,       templateUrl: 'accountView.html', resolve: Single.resolve});
    $routeProvider.when('/edit/:id',{ controller: 'EditCtrl',   templateUrl: 'accountEdit.html' }    );
    $routeProvider.when('/new',     { controller: 'AddCtrl',    templateUrl: 'accountNew.html'}        );
    $routeProvider.when('/',        { controller: 'MainCtrl',   templateUrl: 'accountHome.html'}    );
    $routeProvider.when('/upload',  { controller: 'UploadCtrl', templateUrl: 'image-upload.html'});

    $routeProvider.when('/contacts/view/:name', { controller:'ContactsSingleCTRL', templateUrl:'contactsAddPage.html'});
    $routeProvider.when('/contacts/add', { controller: 'ContactsAddCTRL', templateUrl: 'contactsAddPage.html'});
    $routeProvider.when('/contacts', { controller:'ContactsCTRL', templateUrl:'contactsHomePage.html'});
    $routeProvider.when('/profile', { controller:'ProfileImageCTRL', templateUrl:'profilPage.html'});


    $routeProvider.otherwise({redirectTo: '/'});

    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    	var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('#loading').show();
            return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
  }])
.controller('ProfileImageCTRL',  function($scope,$http,$timeout, $upload) {

    $http.get('profile')
        .success(function (data) {
            $scope.user = data; 
        })
    console.log('ProfileImageCTRL')
        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = true;
        $scope.changeAngularVersion = function() {
            window.location.hash = $scope.angularVersion;
            window.location.reload(true);
        }
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        function setPreview(fileReader, index) {
            fileReader.onload = function(e) {
                $timeout(function() {
                    $scope.dataUrls[index] = e.target.result;
                });
            }
        }

        $scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';
        $scope.onFileSelect = function($files) {
                //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                url: 'api/upload', //upload.php script, node.js route, or servlet url
                // method: POST or PUT,
                // headers: {'headerKey': 'headerValue'},
                // withCredentials: true,
                data: {myObj: $scope.myModel},
                file: file,
                fileFormDataName: 'image'
                // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
              }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
              }).success(function(data, status, headers, config) {
                $scope.user.avatar = data.avatar;
               
                // file is uploaded successfully
                console.log(data);
              });
              //.error(...)
              //.then(success, error, progress);
            }
        }

    })
 