function King(square, player, scope) {
	Piece.apply(this, [square, player, 'King', scope]);
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;


King.prototype.isValidAction = function(square) {
	if((square.col == this.square.col + 1 || square.col == this.square.col - 1 || square.col == this.square.col) &&
		(square.row == this.square.row + 1 || square.row == this.square.row - 1 || square.row == this.square.row)) {
		return true;
	}

	//CASTLING
	return false;
}

