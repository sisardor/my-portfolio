(function (angular, undefined) { 'use strict';
  
  angular.module('resumeApp', ['ngRoute','ngAnimate', 'ngTouch','ngSanitize'])
  .config(function ($routeProvider) {
     $routeProvider.
        when('/', { 
          templateUrl: '_layout/angular/templates/item-list.html', 
          controller: 'MainCTRL'
        }).
        when('/page/:num', { 
          templateUrl: '_layout/angular/templates/item-list.html', 
          controller: 'MainCTRL'
        }).
        when('/project/:id', { 
          templateUrl: '_layout/angular/templates/item-detail.html', 
          controller: 'ViewProjectCTRL'
        }).
        otherwise({redirectTo: '/'});

  })
  
  .controller('MainCTRL', function($scope,$route){
    //console.log("MainCTRL")
    var tmp = [
      {
        id:'item1',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg',
        link:'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>'
      },
      {
        id:'item2',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg',
        link:'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>'
      },
      {
        id:'item3',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg',
        link:'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>'
      },
      {
        id:'item4',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg',
        link:'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>'
      },
      {
        id:'item5',
        title:'Lorem ipsum dolor',
        description:'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.', 
        image:'_content/216x141-placeholder.jpg',
        link:'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>'
      }
    ];

    var page = $route.current.params.num || 1;
    $scope.currentPage = function(num){
      return (num == page);
    };

    $scope.projects = [];
    var itemPerPage = 3;
    var ii = page * itemPerPage;
    for (var i = ii-itemPerPage; i < ii; i++) {
      if(i > tmp.length - 1 ) {
        break;
      }
      $scope.projects.push(tmp[i])
    };

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

    $scope.projectDetails = '<br /><p><strong>Project Details:</strong></p><ul><li>Donec imperdiet nunc</li><li>Id felis faucibus eu tempor</li><li>Sem tincidunt fusce a orci in</li><li>Risus ultrices pharetra</li></ul><p><strong>Live preview:</strong><br /><a href="#">www.sitelink.com</a></p>';
      

  })
 

})(window.angular);
