function Bishop(square, player) {
	Piece.apply(this, [square, player, 'Bishop']);
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.isValidAction = function() {
	return true;
}

