(function(){

	var MainController = function(projectsService) {
		this.projects = projectsService.getProjects();
		this.year = new Date().getFullYear();
	};

	MainController.$inject = ['projectsService'];
	angular.module('portfolio').controller('MainController', MainController);

}());