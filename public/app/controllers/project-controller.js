(function(){

	var ProjectController = function($scope, $routeParams, $location, projectsService) {

		$scope.projects = projectsService.getProjects();

		var projectName = $routeParams.projectId;
		$scope.activeProject = 0;

		function findActiveProjectPosition(projectID) {
			var i = 0;
			for(i; i < $scope.projects.length; i++) {
				if($scope.projects[i].id == projectID) {
					return i;
				}
			}
		} 

		function initPage() {
			if( findActiveProjectPosition(projectName)) {
				$scope.activeProject = findActiveProjectPosition(projectName);
				$location.path('project/' + $scope.projects[$scope.activeProject].id);
				window.scrollTo( 0, 0 );
			}
		}

		$scope.nextProject = function() {
			// $scope.activeProject += 1;
			var lastProject = $scope.projects.length - 1;
			if ($scope.activeProject < lastProject) {
				$location.path('/project/' + $scope.projects[$scope.activeProject + 1].id);
			} else  {
				$location.path('/project/' + $scope.projects[0].id);
			}
		}

		$scope.prevProject = function() {
			if ($scope.activeProject > 0) {
				$location.path('/project/' + $scope.projects[$scope.activeProject - 1].id);
			} else {
				var lastProject = $scope.projects.length - 1;
				$location.path('/project/' + $scope.projects[lastProject].id);
			}
		}

		initPage();

		

	};

	ProjectController.$inject = ['$scope', '$routeParams', '$location', 'projectsService'];
	angular.module('portfolio').controller('ProjectController', ProjectController);

}());