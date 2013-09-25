function King(square, player, scope) {
	Piece.apply(this, [square, player, 'King', scope]);
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;


King.prototype.isValidAction = function(square) {
	if((square.col == this.square.col + 1 || square.col == this.square.col - 1 || square.col == this.square.col) &&
		(square.row == this.square.row + 1 || square.row == this.square.row - 1 || square.row == this.square.row)) {
		this.hasMoved = true;
		return true;
	}

	//CASTLING
	if (square.col == this.square.col &&
		(square.row == this.square.row + 2 ||
		 square.row == this.square.row - 2)) {
		
		var operator = {
			'+': function(a,b) { return a + b },
			'-': function(a,b) { return a - b },
		};
		var direction = square.row > this.square.row ? '+' : '-';

		var throughCheck = this.scope.squares[square.col][this.square.row].isCheck() || 
						   this.scope.squares[square.col][operator[direction](this.square.row, 1)].isCheck();

		var rook = direction == '-' ? this.scope.squares[square.col][0].piece : this.scope.squares[square.col][7].piece;
		if (!rook) {
			return false;
		}
		var straight = this.straight(this.square, rook.square);
		var movement = rook.hasMoved || this.hasMoved ? true : false;
		if(straight && !movement && !throughCheck) {
			rook.expressMove(this.scope.squares[this.square.col][operator[direction](this.square.row, 1)]);
			return true;
		}

	}
	return false;
}

