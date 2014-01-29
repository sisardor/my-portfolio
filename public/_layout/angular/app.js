(function (angular, undefined) { 'use strict';
  
  angular.module('resumeApp', ['ngRoute','ngAnimate', 'ngTouch'])
  .config(function ($routeProvider) {
     $routeProvider.
        when('/', { 
          templateUrl: '_layout/angular/templates/item-list.html', 
          controller: 'MainCTRL'
        }).
        when('/project/:id', { 
          templateUrl: '_layout/angular/templates/item-detail.html', 
          controller: 'ViewProjectCTRL'
        }).
        otherwise({redirectTo: '/'});

  })
  .controller('MainCTRL', function($scope){
    console.log("MainCTRL")
    var tmp = [
      {
        id:'item1',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg'
      },
      {
        id:'item2',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg'
      },
      {
        id:'item3',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg'
      },
      {
        id:'item4',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg'
      },
      {
        id:'item5',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg'
      }
    ];

    $scope.projects = tmp;

  })
  .controller('ViewProjectCTRL', function($scope,$timeout){
// Set of Photos
    $scope.photos = [
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 01'},
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 02'},
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 03'},
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 04'},
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 05'},
        {src: '_content/438x202-placeholder.jpg', desc: 'Image 06'}
    ];

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
      

  })
 

})(window.angular);
