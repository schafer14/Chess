function Rook(square, player) {
	Piece.apply(this, [square, player, 'Rook']);
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.isValidAction = function() {
	return true;
}

