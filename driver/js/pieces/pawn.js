function Pawn(square, player) {
	Piece.apply(this, [square, player, 'Pawn']);
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.isValidAction = function() {
	return true;
}

