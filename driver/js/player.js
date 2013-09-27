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

Player.prototype.checkmate = function() {
	var attackingPieces = [];
	var square = this.king.square;
	var player = this; 
	var safe = false;
	angular.forEach(this.scope.pieces, function(o, i) {
		if(o.isValidAction(square) &&  (o.player != player)) {
			attackingPieces.push(o);
		}
	});

	//discovered attack king must run.
	if(attackingPieces.length > 1) {
		if(!player.king.run()) {
			this.gameOver();
		}
	} 
	//Run block or take. 
	else if (attackingPieces.length == 1) {
		var run = player.king.run();
		var block = player.block(attackingPieces[0].square);
		var capture = player.capture(attackingPieces[0].square);

		console.log('run', run, 'block', block, 'capture', capture);

		if(!run && !block && !capture) {
			this.gameOver();
		}
	}
	else {
		return;
	}
}

Player.prototype.block = function(aSquare) {
	var dSquare = this.king.square;
	var player = this
	var scope = this.scope;
	if((dSquare.col == aSquare.col) || (dSquare.row == aSquare.row)) {
		//Attacking straight
		var i, min, max;
		var safe = false;
		if (dSquare.col == aSquare.col) {
			max = dSquare.row > aSquare.row ? dSquare : aSquare;
			min = dSquare.row < aSquare.row ? dSquare : aSquare;
			for (i = min.row + 1; i < max.row; i += 1) {
				angular.forEach(scope.pieces, function(piece) {
					if(piece.isValidAction(scope.squares[dSquare.col][i]) && !(piece instanceof King) && piece.player == player) {
						safe = true;
					}
				});
			};
			return safe;
		} 
		else if (dSquare.row == aSquare.row) {
			max = dSquare.col > aSquare.col ? dSquare : aSquare;
			min = dSquare.col < aSquare.col ? dSquare : aSquare;
			for (i = min.col + 1; i < max.col; i += 1) {
				angular.forEach(scope.pieces, function(piece) {
					if(piece.isValidAction(scope.squares[i][dSquare.row]) && !(piece instanceof King) && piece.player == player) {
						console.log(piece)
						safe = true;
					}
				});
			};
			return safe;
		} else {
			return false;
		}
	} else if (Math.abs(dSquare.col - aSquare.col) == Math.abs(dSquare.row - aSquare.row)) {
		//Attacking Diagonal
		var dist = Math.abs(aSquare.col - dSquare.col) - 1;
		var operator = {
			'+': function(a,b) { return a + b },
			'-': function(a,b) { return a - b },
		};
		var rowOp = aSquare.row > dSquare.row ? '+' : '-';
		var colOp = aSquare.col > dSquare.col ? '+' : '-';
		var safe = false;

		for (dist; dist > 0; dist -= 1) {
			angular.forEach(scope.pieces, function(piece) {
				var col = Math.abs(operator[colOp](dist, dSquare.col));
				var row = Math.abs(operator[rowOp](dist, dSquare.row));

				if(piece.isValidAction(scope.squares[col][row]) && !(piece instanceof King) && piece.player == player) {
					console.log(piece)
					safe = true;
				}
			});
		}
		dist = 0;
		return safe;
	} else {
		//Attacking Knight cannot be blocked
		return false;
	}
}

Player.prototype.capture = function(square) {
	var player = this;
	var safe = false;
	angular.forEach(this.scope.pieces, function(piece) {
		if(piece.isValidAction(square) && (piece.player == player)) {
			if(piece instanceof King) {
				var protectedPiece = false;
				angular.forEach(player.scope.pieces, function(p) {
					if(p.isValidAction(square)) {
						protectedPiece = true;
					}
				});
				if(!protectedPiece) {
					safe = true;
				}
			} else {
				safe = true;
			}
		}
	});

	return safe;
}

Player.prototype.gameOver = function() {
	console.log('Checkmate');
	return;
}