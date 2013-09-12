function Knight(square, player) {
	Piece.apply(this, [square, player, 'Knight']);
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.isValidAction = function() {
	return true;
}

