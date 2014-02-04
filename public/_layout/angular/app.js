(function (angular, undefined) {
  'use strict';
  angular.module('resumeApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.bootstrap.buttons'])
    .config(['$routeProvider',function ($routeProvider) {
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
    }])
    .controller('MainCTRL', ['$scope', '$route', '$http', 'Projects',
      function ($scope, $route, $http, Projects) {
        console.log(Projects.getOptions());
        $scope.projects = [];
        $scope.pagination = [];
        var itemPerPage = 10;
        var div = ~~ (Projects.projects.length / itemPerPage);
        var rem = Projects.projects.length % itemPerPage;
        var totalPages = div + (rem ? 1 : 0);
        for (var i = 1; i < totalPages + 1; i++) {
          $scope.pagination.push({
            page: i
          });
        };
        var page = $route.current.params.num || 1;
        $scope.currentPage = function (num) {
          return (num == page);
        };
        var ii = page * itemPerPage;
        for (var i = ii - itemPerPage; i < ii; i++) {
          if (i > Projects.projects.length - 1) {
            break;
          }
          $scope.projects.push(Projects.projects[i])
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
          android: false,
          ios: false
        };
        $scope.selectedTitle = Projects.getOptions();

        function filter(value) {
          if ($scope.selectedTitle == '') {
            $scope.projects = [];
            for (var i = 0; i < Projects.projects.length; i++) {
              $scope.projects.push(Projects.projects[i]);
            };
            console.log($scope.projects)
            return;
          }
          for (var i = 0; i < Projects.projects.length; i++) {
            if (Projects.projects[i].tech.indexOf(value) >= 0) {
              if (ifContain(Projects.projects[i].id)) {
                $scope.projects.push(Projects.projects[i])
              }
            }
          };
          removeUnseletedItem();
          console.log($scope.projects)
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
    }])
    .controller('ViewProjectCTRL', ['$scope', '$timeout', function ($scope, $timeout) {
      // Set of Photos
      $scope.photos = [
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 01'
        },
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 02'
        },
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 03'
        },
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 04'
        },
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 05'
        },
        {
          src: '_content/438x202-placeholder.jpg',
          desc: 'Image 06'
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
      var tmp = [
        {
          id: 1,
          title: ' JS Angular Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['js', 'angular']
      },
        {
          id: 2,
          title: ' PHP API Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['php', 'api']
      },
        {
          id: 3,
          title: 'JAVA ANDRPIOD Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['java', 'android']
      },
        {
          id: 4,
          title: 'JAVA PHP Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['java', 'php']
      },
        {
          id: 5,
          title: 'IOS JS Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['ios', 'js']
      },
        {
          id: 6,
          title: 'IOS C++ Lorem ipsum dolor',
          description: 'Etiam vitae justo ut felis ultrices placerat. Mauris dictum tellus ac dui bibendum at viverra augue iaculis. Praesent accumsan purus id ante.',
          image: '_content/216x141-placeholder.jpg',
          link: 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>',
          tech: ['ios', 'cplus']
      }
      ];
      return {
        projects: tmp,
        optionSelected: function (val) {
          options = val;
          return;
        },
        getOptions: function () {
          return options;
        }
      }
    });




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