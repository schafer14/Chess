function Square($scope, col, row) {
	this.col = col;
	this.row = row;
	this.piece = false;
	this.color = (col + row) % 2 == 0 ? $scope.white: $scope.black;

	
}

