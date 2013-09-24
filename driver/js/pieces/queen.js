function Queen(square, player, scope) {
	Piece.apply(this, [square, player, 'Queen', scope]);
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.isValidAction = function(square) {
	return this.straight(square, this.square) || this.diagonal(square, this.square);
}

