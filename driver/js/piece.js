function Piece(square, player, img) {
	this.square = square;
	this.player = player;
	this.player.addPiece(this);	
	this.img = img;
}

Piece.prototype.isValidMove = function(square) {
	return this.isValidAction() && this.notOwnPiece(square);
}

Piece.prototype.notOwnPiece = function(square) {
	return square.piece.player != this.player;
}

Piece.prototype.move = function(square) {

	if (this.isValidMove(square)) {
		this.square.piece = false;
		this.square = square;
		square.piece = this;
	}
}

Piece.prototype.remove = function() {
	this = null;
}

Piece.prototype.isValidAction = function(square) {
	return false;
}