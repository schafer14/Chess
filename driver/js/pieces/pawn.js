function Pawn(square, player, scope) {
	Piece.apply(this, [square, player, 'Pawn', scope]);
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.isValidAction = function(square) {
	return true;
}

