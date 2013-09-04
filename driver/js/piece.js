angular.module('piece', [])
.controller('Piece', function($scope) {
	$scope.move = function() {
		alert('Move');
	}
})