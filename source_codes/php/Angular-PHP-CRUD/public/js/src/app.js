/**
 * app.js v1.0.0 by Sardor Isakov
 * Copyright 2013 uzlist.com
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * @name app
 *
 * @description
 * AngularJS module, app which are used in account page
 */
(function (document, angular, undifined) { 
    'use strict';

    angular.module('myApp', ['ngRoute','myApp.filters', 'myApp.services', 'ngResource', 'myApp.directives', 'myApp.controllers', 'angularFileUpload']).
    config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/view/:id',{ controller: Single,       templateUrl: 'assets/account/accountView.html', resolve: Single.resolve});
        $routeProvider.when('/edit/:id',{ controller: 'EditCtrl',   templateUrl: 'assets/account/accountEdit.html' }    );
        $routeProvider.when('/new',     { controller: 'AddCtrl',    templateUrl: 'assets/account/accountNew.html'}        );
        $routeProvider.when('/',        { controller: 'MainCtrl',   templateUrl: 'assets/account/accountHome.html'}    );
        $routeProvider.when('/upload',  { controller: 'UploadCtrl', templateUrl: 'assets/image-upload.html'});
        $routeProvider.when('/contacts/view/:name', { controller:'ContactsSingleCTRL', templateUrl:'assets/contacts/contactsAddPage.html'});
        $routeProvider.when('/contacts/add', { controller: 'ContactsAddCTRL', templateUrl: 'assets/contacts/contactsAddPage.html'});
        $routeProvider.when('/contacts', { controller:'ContactsCTRL', templateUrl:'assets/contacts/contactsHomePage.html'});
        $routeProvider.when('/profile', { controller:'ProfileImageCTRL', templateUrl:'assets/profilePage.html'});


        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.responseInterceptors.push('myHttpInterceptor');
            var spinnerFunction = function (data, headersGetter) {
                // todo start the spinner here
                $('#loading').show();
                return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }])


    function Single($scope, $routeParams, datasets, myCache) {
        $scope.ad = datasets;
    };

    Single.resolve = {
        datasets : function($q, $route, $timeout, Phone) {
        var deferred = $q.defer();
        var name = $route.current.params.id;

        var successCb = function(result) {
            if(angular.equals(result, [])) {
                console.log("No starship found by that id");
                deferred.reject("Not found");
            } else {
                console.log("found");
                deferred.resolve(result);
                }
            };

            $timeout(function() {
                Phone.get($route.current.params.id, successCb);
                    //Phone.query(successCb);
            }, 200)

            return deferred.promise;
        }
    };

    angular.module('homeApp', ['firebase'])
    .controller('CommnetBoxCTRL', function ($scope, $http, $location, $firebase) {
        var itemID = document.getElementById("post").getAttribute('data-item-id');
        var pushedItemId;
        console.log('CommnetBoxCTRL');
        $scope.comments = [];
        $http.get($location.absUrl() + "/comments").success(function (data) {
            for (var i = 0; i < data.data.length; i++) {
                //data.data[i].comment = data.data[i].comment.replace(/\r?\n/g, '<br />');
                $scope.comments.push(data.data[i]);
                //console.log($scope.comments);
            };
        });
        $scope.showCheckMark = true;
        $scope.timeX = '1393991888000';
        var commentsRef = new Firebase("https://sardor.firebaseio.com/" + itemID);
        $scope.people = $firebase(commentsRef);
        var last10Comments = commentsRef.limit(10);
        //Render Comments
        last10Comments.on('child_added', function (snapshot) {
            var comment = snapshot.val();
            //console.log(comment)
            if (comment._id != pushedItemId) {
                $scope.comments.push(comment);
            }
        });
        $scope.submitComment = function () {
            $scope.showCheckMark = false;
            var data = {
                'comment': $scope.comment,
                'item_id': document.getElementById("post").getAttribute('data-item-id'),
            };
            $http.post('/api/comments', data).success(function (data) {
                //data.data.comment = data.data.comment.replace(/\r?\n/g, '<br>');
                $scope.comments.push(data.data);
                pushedItemId = data.data._id.$id;
                data.data._id = data.data._id.$id;
                $scope.comment = '';
                commentsRef.push(data.data);
            });
        }
        $scope.keydown = function () {
            $scope.showCheckMark = true;
        };
    })


})(document, window.angular); // END (function () {}

 