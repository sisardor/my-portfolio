'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
.value('version', '0.1')
.factory('$templateCache', ['$cacheFactory', '$http', '$injector', function($cacheFactory, $http, $injector) {
	var cache = $cacheFactory('templates');
	var allTplPromise;

	return {
		get: function(url) {
			var fromCache = cache.get(url);

	      // already have required template in the cache
	      if (fromCache) {
	      	return fromCache;
	      }

	      // first template request ever - get the all tpl file
	      if (!allTplPromise) {
	      	allTplPromise = $http.get('assets/all-templates.html').then(function(response) {
	          // compile the response, which will put stuff into the cache
	          $injector.get('$compile')(response.data);
	          return response;
	      });
	      }

	      // return the all-tpl promise to all template requests
	      return allTplPromise.then(function(response) {
	      	return {
	      		status: response.status,
	      		data: cache.get(url)
	      	};
	      });
	  },

	  put: function(key, value) {
	  	cache.put(key, value);
	  }
	};
}])



.factory('Content', ['$resource', 'myCache', function($resource, myCache) {
	return $resource('account/ads/:id', 
		{id: '@_id'}, 
		{cache:myCache},
		{ 'save':{method:'PUT' }, 'add' :{method:'POST'},'get' :{method: 'GET'} }
		);
}])

.factory('calendarHelper', [function() {
	var monthName = ["January","February", "March", "April",  "May","June","July","August", "September", "October", "November", "December"];

	return {
		getCalendarDays: function(year, month) {
			var monthStartDate = new Date(year, month, 1);

			var days = [];
			for (var i = 0; i < monthStartDate.getDay(); i++) {
				days.push('');
			};

			for (var i = 0; i <= new Date(year, month+1, 0).length; i++) {
				days.push(i);
			};

			return days;
		},
		getMonthName: function(monthNumber) {
			return monthName[monthNumber];
		}
	}
}])



.factory('myCache', ['$cacheFactory',  function($cacheFactory) {
	return $cacheFactory('myCache', { capacity: 3 });
}])



.factory('Phone', ['$http', '$resource', 'myCache', function($http, $resource, myCache){

	var Phone = $resource('account/ads/:id', {id: '@_id'});

	Phone.prototype.get = function (starshipQuery, successCb, failCb) {
		return Phone.get({ id: starshipQuery}, successCb, failCb);
	};
	Phone.prototype.query = function ( successCb, failCb) {
		return Phone.get( successCb, failCb);
	};

	return new Phone;
}])

.factory('myHttpInterceptor', ['$q', '$window', function ($q, $window) {
	return function (promise) {
		return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('#loading').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('#loading').hide();
                return $q.reject(response);
            });
	};
}]);
