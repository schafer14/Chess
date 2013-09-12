function Queen(square, player) {
	Piece.apply(this, [square, player, 'Queen']);
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.isValidAction = function() {
	return true;
}

