function BoardCtrl($scope) {
	
	$scope.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	$scope.rows = [8, 7, 6, 5, 4, 3, 2, 1];

	$scope.black="green";
	$scope.white="white";
	$scope.whitePi="grayPi";
	$scope.blackPi="blackPi";

	$scope.selected = false;

	$scope.squares = [];

	angular.forEach($scope.columns, function(parent, pk) {
		$scope.squares[pk] = [];

		angular.forEach($scope.rows, function(child, ck) {
			$scope.squares[pk][ck] = {
				color: (pk + ck) % 2 == 0 ? $scope.white: $scope.black,
			};
		});
	});

	$scope.action = function(col, row) {
		$scope.selected = $scope.selected == $scope.squares[col][row] ? false : $scope.squares[col][row];
		piece.move();
	}

}