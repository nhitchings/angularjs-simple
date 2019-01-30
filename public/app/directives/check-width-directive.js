// .directive('fixHeight',['$timeout', function($timeout){
//   return {
//     restrict: 'E',
//     templateUrl: 'row-items.html',
//     scope: {
//         category: '=',
//         globalItemId: '=',
//         showRows: '@'
//     },
//     link: function(scope,elem,attr){
//       var rowWrapper = $(elem).find('.rows-wrapper');
//       var heightElement = $(elem).find('.set-height');
//       function changeHeight() {
//         if(scope.showRows === 'true'){
//           var setHeight = $(heightElement).height();
//           $(rowWrapper).css('height', setHeight);
//         } else {
//           $(rowWrapper).css('height', 0);
//         }
//       }

//       scope.$watch('showRows', function(){
//           $timeout(function(){
//               changeHeight()
//           }, 1);
//       });

//       scope.$watchCollection('category.items', function(){
//           $timeout(function(){
//               changeHeight()
//           }, 1);
//       });
//     }
//   }
// }])

(function() {
	var loadedImg = function() {
		return {
		    restrict: 'A',
		    scope: {
		        loaded: '='
		    },
		    link: function(scope, ele, attr){
		        ele.on('load', function(){
		            loaded = true;
		        });           
		    }
		};
	}

	angular.module('portfolio').directive('loadedImg', loadedImg);
}());
