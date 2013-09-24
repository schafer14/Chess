function Rook(square, player, scope) {
	Piece.apply(this, [square, player, 'Rook', scope]);
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.isValidAction = function(square) {
	return this.straight(square, this.square);
}
