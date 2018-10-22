(function (angular, undefined) {
  'use strict';
  angular.module('resumeApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.bootstrap.buttons'])
  .config(['$routeProvider',
    function ($routeProvider) {
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
      otherwise({
        redirectTo: '/'
      });
      $("area[rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'fast',
        theme: 'light_square',
        slideshow: 1000,
        autoplay_slideshow: false,
        deeplinking: false
      });

    }])
  .controller('GlobalCTRL', ['$scope','$http', 'mainInfo', function( $scope, $http,mainInfo ) {

  }])
  .factory('mainInfo', function($http) {
    return $http.get('projects/projects.json');
  })
  .controller('MainCTRL', ['$scope', '$route', '$http', 'Projects', '$timeout','mainInfo',
      function ($scope, $route, $http, Projects, $timeout,mainInfo) {

      var jsonData;
      $scope.projects = [];
      $scope.pagination = [];
      var api_gallery = [],api_titles = [],api_descriptions = [];
      var itemPerPage = 10;
      var currentPage = $route.current.params.num || 1;


      //

      mainInfo.success(function(data) {
        jsonData = data;
        var div = ~~ (data.length / itemPerPage);
        var rem = data.length % itemPerPage;
        var totalPages = div + (rem ? 1 : 0);


        for (var i = 1; i < totalPages + 1; i++) {
          $scope.pagination.push({
            page: i
          });
        };


        var ii = currentPage * itemPerPage;
        for (var i = ii - itemPerPage; i < ii; i++) {
          if (i > data.length - 1) {
            break;
          }
          $scope.projects.push(data[i])
        };

      });

      $scope.currentPage = function (num) {
        return (num == currentPage);
      };
      //################################
      // Filter
      //
      //################################
      $scope.checkModel = {
        js: false,
        php: false,
        angular: false,
        cplus: false,
        java: false,
        nodejs: false,
        api: false,
        ror: false,
        mysql: false,
        reactjs: false,
        android: false,
        ios: false,
        bash: false
      };
      $scope.selectedTitle = Projects.getOptions();

      function filter(value) {
        if ($scope.selectedTitle == '') {
          $scope.projects = [];
          for (var i = 0; i < jsonData.length; i++) {
            $scope.projects.push(jsonData[i]);
          };
          console.log($scope.projects)
          return;
        }
        for (var i = 0; i < jsonData.length; i++) {
          if (jsonData[i].tech.indexOf(value) >= 0) {
            if (ifContain(jsonData[i].id)) {
              $scope.projects.push(jsonData[i])
            }
          }
        };
        removeUnseletedItem();
        console.log($scope.projects)
      }
      $scope.showImageDialog = function (id) {
        api_gallery = [], api_titles = [], api_descriptions = [];
        var index = 0;
        for (var i = 0; i < $scope.projects.length; i++) {
          if (id == $scope.projects[i].id)
            index = i;
          api_gallery.push($scope.projects[i].image_big);
          api_titles.push($scope.projects[i].title);
          api_descriptions.push($scope.projects[i].description);
        };
        $.prettyPhoto.open(api_gallery, api_titles, api_descriptions, index);
      }
      $scope.displayItem = {};
      $scope.displayDetail = false;
      $scope.toggleThis = function (id) {
        flipCard();
        for (var i = $scope.projects.length - 1; i >= 0; i--) {
          if ($scope.projects[i].id == id) {
            $scope.projects[i].viewing = true;
            break;
          }
        };
      };
      $scope.closeDisplay = function () {
        console.log('closeDisplay()');
        flipCard();
      };

      function flipCard() {
        for (var i = $scope.projects.length - 1; i >= 0; i--) {
          if ($scope.projects[i].viewing) {
            $scope.projects[i].viewing = false;
            $scope.displayDetail = false;
            break;
          }
        };
      }

      function removeUnseletedItem() {
        for (var i = $scope.projects.length - 1; i >= 0; i--) {
          var tmp = 0;
          $scope.selectedTitle.forEach(function (entry) {
            if ($scope.projects[i].tech.indexOf(entry) >= 0) tmp = 1;
          })
          if (!tmp)
            $scope.projects.splice(i, 1);
        };
        $scope.projects.sort(function (a, b) {
          return a.id - b.id;
        })
      }

      function ifContain(id) {
        for (var i = $scope.projects.length - 1; i >= 0; i--) {
          if ($scope.projects[i].id == id) {
            return false;
          }
        };
        return true;
      }
      $scope.setSelectedTitle = function (value) {
        var index = $scope.selectedTitle.indexOf(value)
        if (index >= 0) {
          $scope.selectedTitle.splice(index, 1)
        } else {
          $scope.selectedTitle.push(value)
        }
        //console.log($scope.selectedTitle)
        filter(value);
        Projects.optionSelected($scope.selectedTitle)
        //console.log($scope.projects)
      };
      if ($scope.selectedTitle != '') {
        removeUnseletedItem()
        $scope.selectedTitle.forEach(function (entry) {
          $scope.checkModel[entry] = true;
        });
      }

      for (var i = 0; i < $scope.projects.length; i++) {
        api_gallery.push(jsonData[i].image_big);
        api_titles.push(jsonData[i].title);
        api_descriptions.push(jsonData[i].description);
      };
      $scope.order = 'false';
      // $scope.myList = [
      //   {
      //     id: 0,
      //     text: 'HTML5 Boilerplate'
      //   },
      //   {
      //     id: 1,
      //     text: 'AngularJS'
      //   },
      //   {
      //     id: 2,
      //     text: 'Karma'
      //   },
      //   {
      //     id: 3,
      //     text: 'Hello'
      //   },
      //   {
      //     id: 4,
      //     text: 'World'
      //   },
      //   {
      //     id: 5,
      //     text: 'How'
      //   },
      //   {
      //     id: 6,
      //     text: 'Are'
      //   },
      //   {
      //     id: 7,
      //     text: 'You'
      //   },
      //   {
      //     id: 8,
      //     text: '?'
      //   },
      //   {
      //     id: 9,
      //     text: 'I'
      //   },
      //   {
      //     id: 10,
      //     text: 'write'
      //   },
      //   {
      //     id: 11,
      //     text: 'more'
      //   },
      //   {
      //     id: 12,
      //     text: 'to'
      //   },
      //   {
      //     id: 13,
      //     text: 'make'
      //   },
      //   {
      //     id: 14,
      //     text: 'the'
      //   },
      //   {
      //     id: 15,
      //     text: 'list'
      //   },
      //   {
      //     id: 16,
      //     text: 'longer'
      //   }
      // ];
      $scope.buttonC = function () {
        $scope.setOrder();
      }
      // $scope.setOrder = function () {
      //   var i;
      //   if ($scope.order === 'random') {
      //     var t = [];
      //     for (i = 0; i < $scope.myList.length; i++) {
      //       var r = Math.floor(Math.random() * $scope.myList.length);
      //       while (inArray(t, r)) {
      //         r = Math.floor(Math.random() * $scope.myList.length);
      //       }
      //       t.push(r);
      //       $scope.myList[i].order = r;
      //     }
      //   } else if ($scope.order === 'false') {
      //     for (i = 0; i < $scope.myList.length; i++) {
      //       $scope.myList[i].order = i;
      //     }
      //   } else {
      //     for (i = 0; i < $scope.myList.length; i++) {
      //       $scope.myList[i].order = ($scope.myList.length - 1 - i);
      //     }
      //   }
      //   calcGridPosition();
      // };

      function inArray(a, value) {
        for (var i = 0; i < a.length; i++) {
          if (a[i] === value) {
            return true;
          }
        }
        return false;
      }
  }])
  .controller('ViewProjectCTRL', ['$scope', '$timeout','Projects','$location','$sce','$http',
    function ($scope, $timeout,Projects,$location,$sce,$http) {
      var id = $location.path().split("/")[2];
      $http.get('projects/project-' + id + '.json').success(function(data) {
        console.log(data);
        $scope.project = data;
        $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.project.projectUrl);
      });

      $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        console.log("ngRepeatFinished ------------ ");
        $("#slide2").easySlider({
          auto: true,
          continuous: false,
          speed: 1000,
          controlsShow: true,
          numeric: true,
          numericId: 'controls'
        });
      });


      // Set of Photos
      $scope.photos = [
        {
          src: 'portfolio-images/single/01.jpg',
          desc: 'Image 01'
        },
        {
          src: 'portfolio-images/single/02.jpg',
          desc: 'Image 02'
        },
        {
          src: 'portfolio-images/single/03.jpg',
          desc: 'Image 03'
        },
        {
          src: 'portfolio-images/single/04.jpg',
          desc: 'Image 04'
        },
        {
          src: 'portfolio-images/single/05.jpg',
          desc: 'Image 05'
        }
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
  }])
  .factory('Projects', function () {
      var options = [];

      return {
        optionSelected: function (val) {
          options = val;
          return;
        },
        getOptions: function () {
          return options;
        }
      }
    })
.directive('onFinishRender', ['$timeout',function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
    }])



  angular.module('ui.bootstrap.buttons', [])
    .constant('buttonConfig', {
      activeClass: 'button-active',
      toggleEvent: 'click'
    })
    .controller('ButtonsController', ['buttonConfig',
      function (buttonConfig) {
        this.activeClass = buttonConfig.activeClass || 'active';
        this.toggleEvent = buttonConfig.toggleEvent || 'click';
  }])
    .directive('btnRadio', function () {
      return {
        require: ['btnRadio', 'ngModel'],
        controller: 'ButtonsController',
        link: function (scope, element, attrs, ctrls) {
          var buttonsCtrl = ctrls[0],
            ngModelCtrl = ctrls[1];
          //model -> UI
          ngModelCtrl.$render = function () {
            element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
          };
          //ui->model
          element.bind(buttonsCtrl.toggleEvent, function () {
            if (!element.hasClass(buttonsCtrl.activeClass)) {
              scope.$apply(function () {
                ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                ngModelCtrl.$render();
              });
            }
          });
        }
      };
    })
    .directive('btnCheckbox', function () {
      return {
        require: ['btnCheckbox', 'ngModel'],
        controller: 'ButtonsController',
        link: function (scope, element, attrs, ctrls) {
          var buttonsCtrl = ctrls[0],
            ngModelCtrl = ctrls[1];

          function getTrueValue() {
            return getCheckboxValue(attrs.btnCheckboxTrue, true);
          }

          function getFalseValue() {
            return getCheckboxValue(attrs.btnCheckboxFalse, false);
          }

          function getCheckboxValue(attributeValue, defaultValue) {
            var val = scope.$eval(attributeValue);
            return angular.isDefined(val) ? val : defaultValue;
          }
          //model -> UI
          ngModelCtrl.$render = function () {
            element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
          };
          //ui->model
          element.bind(buttonsCtrl.toggleEvent, function () {
            //console.log("***")
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
              ngModelCtrl.$render();
            });
            scope.$emit('filter', ngModelCtrl.$modelValue);
          });
        }
      };
    });
})(window.angular);
