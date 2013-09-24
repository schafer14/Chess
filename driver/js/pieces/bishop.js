function Bishop(square, player, scope) {
	Piece.apply(this, [square, player, 'Bishop', scope]);
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.isValidAction = function(square) {
	// if (Math.abs(this.square.col - square.col) != Math.abs(this.square.row - square.row)) {
	// 	return false;
	// }

	// var dist = Math.abs(this.square.col - square.col) - 1;
	// var operator = {
	// 	'+': function(a,b) { return a + b },
	// 	'-': function(a,b) { return a - b },
	// };
	// var rowOp = this.square.row > square.row ? '+' : '-';
	// var colOp = this.square.col > square.col ? '+' : '-';

	// for (dist; dist > 0; dist -= 1) {
	// 	var col = Math.abs(operator[colOp](dist, square.col));
	// 	var row = Math.abs(operator[rowOp](dist, square.row));
		
	// 	if(this.scope.squares[col][row].piece) {
	// 		return false;
	// 	}
	// }
	// dist = 0;

	// return true;

	return this.diagonal(square, this.square);
}

