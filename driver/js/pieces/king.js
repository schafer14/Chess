function King(square, player) {
	Piece.apply(this, [square, player, 'King']);
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;


King.prototype.isValidAction = function() {
	return true;
}

