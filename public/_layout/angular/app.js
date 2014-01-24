(function (angular, undefined) { 'use strict';
  
  angular.module('resumeApp', [])
  .config(function () {

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

})(window.angular);
