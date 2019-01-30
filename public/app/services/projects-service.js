(function() {

	var projectsService = function() {
		var projects = [
			{
				name: 'Galactic Bounty',
				description: 'Board game created and designed by me.',
				imgs: ['img/projects/gb-1.jpg', 'img/projects/gb-2.jpg', 'img/projects/gb-3.jpg', 'img/projects/gb-4.jpg'],
				main: 'img/projects/gb-1.jpg',
				id: 'galactic-bounty'
			},
			{
				name: 'Gem in the Ocean Poster',
				description: 'Poster designed for play.',
				imgs: ['img/projects/gem1.jpg'],
				main: 'img/projects/gem1.jpg',
				id: 'gem-in-the-ocean'
			},
			{
				name: 'Dungeons and Dragon Character Sheets',
				description: 'Layouts for D &amp; D characters ',
				imgs: ['img/projects/dd1.jpg', 'img/projects/dd2.jpg'],
				main: 'img/projects/dd1.jpg',
				id: 'd-and-d-sheets'
			},
			{
				name: 'Celeb Paintings',
				description: 'Like TMZ.',
				imgs: ['img/projects/hunter.jpg', 'img/projects/piano1.jpg'],
				main: 'img/projects/hunter.jpg',
				id: 'celeb-paintings'
			}
		];

		var factory = {};
		factory.getProjects = function() {
			return projects;
		};
		return factory;
	};

	angular.module('portfolio').factory('projectsService', projectsService);

}());