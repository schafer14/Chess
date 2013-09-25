function Pawn(square, player, scope, hasMoved, enPassent) {
	Piece.apply(this, [square, player, 'Pawn', scope, enPassent]);
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.isValidAction = function(square) {
	var operator = {
		'+': function(a,b) { return a + b },
		'-': function(a,b) { return a - b },
	};

	var start = this.player.color == 'white' ? 6 : 1;
	var end = this.player.color == 'white' ? 0 : 7;
	var direction = this.player.color == 'white' ? '+' : '-';

	//Taking diagonally (Requires check for en passent)
	if((
		this.square.row == square.row + 1 ||
		this.square.row == square.row - 1) &&
		this.square.col == operator[direction](square.col, 1)
		) {
		if (square.piece) {
			return true;
		} else {
			var p = this.scope.squares[this.square.col][square.row].piece;
			if (p.enPassent == true) {
				p.square.piece = false;
				return true;
			}
		}
	} 

	//moving forward 
	if (this.square.row == square.row && !square.piece) {
		if(this.square.col == operator[direction](square.col, 1)) {
			return true;
		}
		if(this.square.col == operator[direction](square.col, 2) && this.square.col == start) {
			this.enPassent = true;
			return true;
		}
	}

	return false;
}

