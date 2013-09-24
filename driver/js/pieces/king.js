function King(square, player, scope) {
	Piece.apply(this, [square, player, 'King', scope]);
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;


King.prototype.isValidAction = function(square) {
	return true;
}

