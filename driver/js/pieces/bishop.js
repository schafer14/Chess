function Bishop(square, player, scope) {
	Piece.apply(this, [square, player, 'Bishop', scope]);
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.isValidAction = function(square) {
	return this.diagonal(square, this.square);
}

