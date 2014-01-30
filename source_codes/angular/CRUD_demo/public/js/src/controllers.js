'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
	.controller('EventListen',  function($scope, $location, eventData) {
		$scope.events = eventData.getAllEvents();

		$scope.navigateToDetails = function(event) {
			$location.url('/event/'+event.id);
		}

	})
	.controller('MainCtrl',  ['$scope', '$http', 'myCache', function($scope, $http,myCache) {
		var stat = "pulled from Cache";
		$scope.ads = myCache.get("ads");
		if(!$scope.ads) {
			stat = "pulled from Server";

			$http.get('account/ads')
			  .success(function (data) {
			    $scope.ads = data; // { foo: 'bar' }
			    myCache.put("ads",data);
			})
			  .error(function (data, status, headers, config) {
			    // handle error
			});
		}
		var info = "[Cache info capacity: " + myCache.info().capacity +  " size: " + myCache.info().size + "]"
		console.log(stat + "     " + document.URL + "    " + info);
	}])
	.controller('UploadCtrl',  function($scope,$http) {
		$scope.products = [];
		$scope.product = {};
		$scope.save = function (data) {
		    $scope.product = angular.copy(data);
		    $http.post('/api/upload', $scope.product)
		        .success(function () {
		            window.uploadClicked(); 
		            console.log("from here");
		        })
		        .error(function (data) {
		           // alert(data);
		        });
		    }
	})

	.controller('AddCtrl',  ['$scope', '$http', function($scope, $http) {
		$scope.options = [
		    {category:'коммерческая', group:'недвижимость', value:'nko'},
		    {category:'гаражи и стоянки', group:'недвижимость',value:'nga'},
		    {category:'автомобили - частные', group:'транспорт',value:'aup'},
		    {category:'автомобили - дилерские', group:'транспорт',value:'aud'},
		    {category:'события', group:'разное',value:'rso'}
	  	];
	  	$scope.templates = [ 
	  		{ name: 'form_nko.html', url: 'form_nko.html'},
			{ name: 'form_aup.html', url: 'form_aup.html'} 
		];
	  	$scope.option = $scope.options; // red
	  	$scope.category = "ngo";
	  	$scope.$watch("option", function( selected ) {
			if ( selected.value === "nko" || selected.value === "nga" ) {
				$scope.template = $scope.templates[0];
				$scope.category = selected.value;
				$scope.partial_clear();
				console.log('nko');

			}
			if ( selected.value === "aup" || selected.value === "aud" ) {
				$scope.template = $scope.templates[1];
				$scope.category = selected.value;
				$scope.partial_clear();
				console.log('aup');
			}
			if ( selected.value === "rso" ) {
				$scope.template = null;
				$scope.category = selected.value;
				$scope.partial_clear();
			}
		});
		$scope.master = {};
		$scope.update = function(ad) {
			$scope.master= angular.copy(ad);
			console.log($scope.master);
			$scope.master.cat = $scope.category;

			$http({
				url 	: '/account/ads',
				method	: 'POST',
				data	: $scope.master
			}).error(function(data,status, headers,config){
				  		console.log("Error!!");
			});
		};
	 
		$scope.reset = function() {
			$scope.ad = angular.copy($scope.master); 
		};
		$scope.numberOfRooms = function(num) {
			$scope.ad.rooms = num;
		};

		$scope.partial_clear = function() {
			$scope.master = {};
			var tmp   = new Object();
			tmp.title = $scope.ad.title;
			tmp.price = $scope.ad.price;
			tmp.text  = $scope.ad.text;
			$scope.ad = angular.copy(tmp);
		};
			 
		$scope.reset();
	}])

	.controller('EditCtrl',  ['$scope', '$routeParams', '$location', '$http', 'Content', 'myCache', function($scope, $routeParams, $location, $http, Content, myCache) {
		$scope.options = [
		    {category:'коммерческая', group:'недвижимость', value:'nko',isinuse: true},
		    {category:'гаражи и стоянки', group:'недвижимость',value:'nga',isinuse: true},
		    {category:'автомобили - частные', group:'транспорт',value:'aup',isinuse: true},
		    {category:'автомобили - дилерские', group:'транспорт',value:'aud',isinuse: true},
		    {category:'события', group:'разное',value:'rso', isinuse: true}
	  	];

	  	$scope.templates = [ 
	  		{ name: 'form_nko.html', url: 'form_nko.html'},
			{ name: 'form_aup.html', url: 'form_aup.html'} 
		];
	  	$scope.option = $scope.options; // red


		var temp = myCache.get('ads');
		if(!temp) {
			$scope.ad = Content.get({id:$routeParams.id}, function(){
				if($scope.ad.cat === "nko") {
					$scope.template = $scope.templates[0];
					$scope.category = $scope.ad.cat;
					$scope.options[0].isinuse = false;
					$scope.option = $scope.options[1]
				}
				if($scope.ad.cat === "aup") {
					$scope.template = $scope.templates[1];
					$scope.category = $scope.ad.cat;
					$scope.options[2].isinuse = false;
					$scope.option = $scope.options[2]
				}
			});
		}
		else {
			for(var i in temp) {
				if(temp[i]._id.$id === $routeParams.id) {
					$scope.ad = temp[i];
					
					if($scope.ad.cat === "nko") {
						$scope.template = { name: 'form_nko.html', url: 'form_nko.html'};
						$scope.category = $scope.ad.cat;
						$scope.options[0].isinuse = false;
						$scope.option = $scope.options[0];
					}
					if($scope.ad.cat === "aup") {
						$scope.template = { name: 'form_aup.html', url: 'form_aup.html'};
						$scope.category = $scope.ad.cat;
						$scope.options[2].isinuse = false;
						$scope.option = $scope.options[2]
					}

					continue;
				}
			}
		} 

		$scope.master = {};
		$scope.update = function(ad) {
			$scope.master = angular.copy(ad);
			$scope.master.cat = $scope.category;

			$http({
				url 	: '/account/ads/' + $scope.ad._id.$id,
				method	: 'PUT',
				data	: $scope.master
			}).error(function(data,status, headers,config){
				console.log("Error!!");
			}).success(function(data,status,headers,config) {
				$scope.updateCache('ads', $scope.master, $scope.ad._id.$id);
				//$location.path('/'); //Redirect to /
			});
		};
	 
		$scope.reset = function() {
			$scope.ad = angular.copy($scope.master); 
		};

		$scope.updateCache = function(key, value, id) {
			var info = "[Cache info capacity: " + myCache.info().capacity +  " size: " + myCache.info().size + "]"
			console.log('updateing Cache' + "    " + info);

			var tmp = myCache.get(key);
			if(tmp) {
				for(var i in tmp) {
					if(tmp[i]._id.$id === id) {
						tmp[i] = value;
					}
				}
				myCache.remove(key);
				myCache.put(key, tmp);
			}
			else 
				myCache.remove('ads');
		}
		$scope.numberOfRooms = function(num) {
			$scope.ad.rooms = num;
		};

		//$scope.reset();
	}]);



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