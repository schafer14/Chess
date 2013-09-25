function Piece(square, player, img, scope) {
	this.square = square;
	this.player = player;
	this.player.addPiece(this);	
	this.img = img;
	this.scope = scope;
}

Piece.prototype.isValidMove = function(square) {
	return this.isValidAction(square) && this.notOwnPiece(square);
}

Piece.prototype.notOwnPiece = function(square) {
	return square.piece.player != this.player;
}

Piece.prototype.move = function(square) {
	if(this.player.type != 'local') {
		return;
	}

	if(this.scope.turn == this.player) {
		if (this.isValidMove(square)) {
			console.log('here');
			this.square.piece = false;
			this.square = square;
			square.piece = this;
			if (square.piece) {
				square.piece.remove();
			}
			this.scope.turn = this.scope.turn == this.scope.player1 ? this.scope.player2 : this.scope.player1;
		}
	}
}

Piece.prototype.expressMove = function(square) {
	this.square.piece = false;
	this.square = square;
	square.piece = this;
}

Piece.prototype.remove = function() {
	this.scope.pieces.pop(this);
}

Piece.prototype.isValidAction = function(square) {
	return false;
}

Piece.prototype.straight = function(square1, square2) {
	var i, min, max;
	if (square1.col == square2.col) {
		max = square1.row > square2.row ? square1 : square2;
		min = square1.row < square2.row ? square1 : square2;
		for (i = min.row + 1; i < max.row; i += 1) {
			if(this.scope.squares[square1.col][i].piece) {
				return false;
			}
		};
		return true;
	} 
	else if (square1.row == square2.row) {
		max = square1.col > square2.col ? square1 : square2;
		min = square1.col < square2.col ? square1 : square2;
		for (i = min.col + 1; i < max.col; i += 1) {
			if(this.scope.squares[i][square1.row].piece) {
				return false;
			}
		};
		return true;
	} else {
		return false;
	}
}


Piece.prototype.diagonal = function(square1, square2) {
	var i, min, max;
	if (Math.abs(square1.col - square2.col) != Math.abs(square1.row - square2.row)) {
		return false;
	}

	var dist = Math.abs(square1.col - square2.col) - 1;
	var operator = {
		'+': function(a,b) { return a + b },
		'-': function(a,b) { return a - b },
	};
	var rowOp = square1.row > square2.row ? '+' : '-';
	var colOp = square1.col > square2.col ? '+' : '-';

	for (dist; dist > 0; dist -= 1) {
		var col = Math.abs(operator[colOp](dist, square2.col));
		var row = Math.abs(operator[rowOp](dist, square2.row));
		
		if(this.scope.squares[col][row].piece) {
			return false;
		}
	}
	dist = 0;

	return true;
}

	