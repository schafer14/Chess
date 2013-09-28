function Pawn(square, player, scope, hasMoved, enPassent) {
	Piece.apply(this, [square, player, 'Pawn', scope, enPassent]);
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.isValidAction = function(square, move) {
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
			this.promotion(square, end);
			return true;
		} else {
			var p = this.scope.squares[this.square.col][square.row].piece;
			if (p.enPassent == true) {
				p.remove(move);
				this.promotion(square, end);
				return true;
			}
		}
	} 

	//moving forward 
	if (this.square.row == square.row && !square.piece) {
		if(this.square.col == operator[direction](square.col, 1)) {
			this.promotion(square, end);			
			return true;
		}
		if(this.square.col == operator[direction](square.col, 2) && this.square.col == start) {
			this.enPassent = true;
			this.promotion(square, end);
			return true;
		}
	}

	return false;
}

Pawn.prototype.promotion = function(square, end) {
	if(square.col == end) {
		this.square.piece = false;
		this.scope.pieces.pop(this);
		q = new Queen(square, this.player, this.scope);
		this.scope.pieces.push(q);
		q.square.piece = q;
		this.scope.turn = this.scope.turn == this.scope.player1 ? this.scope.player2 : this.scope.player1;
	}
}