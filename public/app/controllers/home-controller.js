(function(){

	var HomeController = function($scope, $location, $timeout, $interval, projectsService) {
		$scope.projects = projectsService.getProjects();
		$scope.animationStart = false;
		$scope.delay = true;
		$scope.bgPosition = 0;
		$scope.bgPositionCss = {'background-position': '0 0'};
		$scope.logoOpacity = {opacity: 0};
		$scope.logoHeight = 0;
		$scope.scrollTo = function(toHere) {
			$location.hash('');

			$timeout(function () {
				$location.hash(toHere);
			}, 0.5);
		}




		var initAnimation = function () {
			$scope.logoHeight = document.querySelectorAll(".logo-intro")[0].getBoundingClientRect().height || 0;
			var animateFace = $interval(function() {
				if($scope.logoHeight > 0 && $scope.bgPosition >= ($scope.logoHeight * -24) ) {
					if($scope.bgPosition <= ($scope.logoHeight * -24 + $scope.logoHeight) ) {
						$scope.logoOpacity = {opacity: 1};
					}
					$scope.bgPosition -= $scope.logoHeight;
					$scope.bgPositionCss = {'background-position':  0 + ' ' + $scope.bgPosition + 'px'};
				} else {
			 		$scope.animationStart = true;
					$scope.logoOpacity = {opacity: 1};
			 		$interval.cancel(animateFace);
			 		$scope.bgPositionCss = {'background-image': 'none'};
			 		$timeout(function () {
			 			$scope.delay = false;
			 		}, 1000);
				}
			}, 33);
		};

		$timeout(function () {
			initAnimation();
		}, 100);
	};

	HomeController.$inject = ['$scope', '$location', '$timeout', '$interval',  'projectsService'];
	angular.module('portfolio').controller('HomeController', HomeController);
}());