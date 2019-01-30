(function() {
	angular.module('portfolio', ['ngRoute', 'templates'])
		.config([
			'$routeProvider',
			function($routeProvider) {
				$routeProvider
					.when('/', {
						controller: 'HomeController',
						templateUrl: 'home.html'
					})
					.when('/project', {
						controller: 'ProjectController',
						templateUrl: 'details.html'
					})
					.when('/project/:projectId', {
						controller: 'ProjectController',
						templateUrl: 'details.html'
					})
					.otherwise({ redirectTo: '/' });
			}
		]);
}());