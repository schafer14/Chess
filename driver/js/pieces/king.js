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

King.prototype.run = function() {
	var squares = [];
	var curr = this.square;
	var safe = false;
	var col, row;
	var scope = this.scope;
	var player = this.player;

	if(curr.col + 1 > 7) {
		col = [0, -1];
	} else if(curr.col - 1 < 0) {
		col = [1, 0];
	} else {
		col = [1, 0, -1];
	}

	if(curr.row + 1 > 7) {
		row = [0, -1];
	} else if(curr.row - 1 < 0) {
		row = [1, 0];
	} else {
		row = [1, 0, -1];
	}

	angular.forEach(col, function(c) {
		angular.forEach(row, function(r) {
			squares.push(scope.squares[curr.col + c][curr.row + r]);
		});
	});

	angular.forEach(squares, function(o) {
		var safeSquare = true;
		if(o.col > 7 || o.row > 7 || o.col < 0 || o.row < 0) {
			squares.pop(o);
			return;
		}
		if (o.piece.player == player) {
			squares.pop(o);
			return;
		}

		angular.forEach(scope.pieces, function(piece) {
			if(piece.isValidAction(o) &&  (piece.player != player)) {
				safeSquare = false;
				return;
			}
		})
		
		if(safeSquare) {
			console.log(o);
			safe = true;
		}
	});

	return safe;
}
