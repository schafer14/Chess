function Player(name, color, type, scope) {
	this.name = name;
	this.color = color;
	this.type = type;
	this.pieces = [];
	this.king = {};
	this.scope = scope;
}


Player.prototype.addPiece = function(piece) {
	this.pieces.push(piece);
	if(piece instanceof King) {
		this.king = piece;
	}
}


Player.prototype.inCheck = function() {
	var s = this.king.square;
	var p = this;
	var check = false;
	angular.forEach(this.scope.pieces, function(o, i) {
		if(o.isValidAction(s) &&  (o.player != p)) {
			check = true;
		}
	});
	return check;
}