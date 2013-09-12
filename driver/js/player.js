function Player(name, color, type) {
	this.name = name;
	this.color = color;
	this.type = type;
	this.pieces = [];
	this.king = {};
}


Player.prototype.addPiece = function(piece) {
	this.pieces.push(piece);
	if(piece instanceof King) {
		this.king = piece;
	}
}
