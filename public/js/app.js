
var weatherApp = angular.module('weatherApp', ['ngRoute','ui.bootstrap','ngGeolocation']);	


	// configure our routes
	weatherApp.config(function($routeProvider) {
		$routeProvider
	
			.when('/', {
				templateUrl : 'pages/weather.html',
				controller  : 'weatherCtrl',
				requireLogin:true
				
			})
			.when('/login', {
	            templateUrl : 'pages/login.html',
	            controller  : 'loginCtrl',
	            requireLogin:false
        	})
        	.when('/not-available',{
	          templateUrl : 'pages/not-available.html',
	            controller  : '',
	            requireLogin:false
	        })

	    $routeProvider.otherwise({redirectTo: '/not-available'});
			
	});

	weatherApp.run(function ($rootScope, $http,$route, $location) {
        // keep user logged in after page refresh
        if (localStorage.session) {
            $http.defaults.headers.common.token = localStorage.session;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (next.requireLogin && !localStorage.session) 
              {
                  $location.path('/login');   
                  $route.reload();
              }
            else if(localStorage.session&&$location.path()=='/login')
             {
             	 $location.path('/');   
                  $route.reload();
             }
        });
    });

