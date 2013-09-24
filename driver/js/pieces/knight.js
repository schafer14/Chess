function Knight(square, player, scope) {
	Piece.apply(this, [square, player, 'Knight', scope]);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.isValidAction = function(square) {
	var s = this.square;

	if(
		((s.col == square.col + 1 || s.col == square.col - 1) &&
		(s.row == square.row + 2 || s.row == square.row - 2)) ||
		((s.col == square.col + 2 || s.col == square.col - 2) &&
		(s.row == square.row + 1 || s.row == square.row - 1)) 
	) {
		return true;
	} else {
		return false;
	}
}

