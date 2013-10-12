function BoardCtrl($scope, Config) {
	$scope.pusher = {};
	$scope.channels = {};
	Pusher.channel_auth_endpoint = 'http://api.purplechess.dev/game_auth/' + getUrlVars()['game_id'];
	$scope.pusher = new Pusher('82495e54704164d896ff');

	Config.get({
		'id': getUrlVars()['game_id']
	}, function(data) {
		$scope.me = {
			name: data.my_name,
			id: data.my_id,
			color: data.white == 1 ? 'white' : 'black'
		};
		$scope.opp = {
			color: data.white == 1 ? 'black' : 'white'
		}
		init();
	});
	

	$scope.channels.gameChannel = $scope.pusher.subscribe('private-game-' + getUrlVars()['game_id']);
	$scope.channels.gameChannel.bind('pusher:subscription_succeeded', function(data) {
		
	});
	$scope.channels.gameChannel.bind('client-move', function(data) {
		var square = $scope.squares[data.toCol][data.toRow];
		$scope.squares[data.fromCol][data.fromRow].piece.move(square, 'remote');
	});
	
	function init () {

		if ($scope.me.color == 'white') {
			$scope.columns = [7, 6, 5, 4, 3, 2, 1, 0];
			$scope.rows = [7, 6, 5, 4, 3, 2, 1, 0];
		} else {
			$scope.columns = [0, 1, 2, 3, 4, 5, 6, 7];
			$scope.rows = [0, 1, 2, 3, 4, 5, 6, 7];
		}

		$scope.black="green";
		$scope.white="gray";

		var whiteType = $scope.me.color == 'white' ? 'remote' : 'local';
		var blackType = $scope.me.color != 'white' ? 'remote' : 'local';

		$scope.player1 = new Player('w', 'white', whiteType, $scope);
		$scope.player2 = new Player('b', 'black', blackType, $scope);

		$scope.turn = $scope.player1.color == 'white' ? $scope.player1 : $scope.player2


		$scope.selected = false;

		$scope.squares = [];
		$scope.pieces = [];

		angular.forEach($scope.columns, function(parent, pk) {
			$scope.squares[pk] = [];

			angular.forEach($scope.rows, function(child, ck) {
				$scope.squares[pk][ck] = new Square ($scope, pk, ck);
			});
		});


		$scope.pieces.push(new King($scope.squares[0][4], $scope.player2, $scope, false));
		$scope.pieces.push(new King($scope.squares[7][4], $scope.player1, $scope, false)); 
		$scope.pieces.push(new Queen($scope.squares[0][3], $scope.player2, $scope));
		$scope.pieces.push(new Queen($scope.squares[7][3], $scope.player1, $scope));
		$scope.pieces.push(new Rook($scope.squares[7][0], $scope.player1, $scope, false));
		$scope.pieces.push(new Rook($scope.squares[7][7], $scope.player1, $scope, false));
		$scope.pieces.push(new Rook($scope.squares[0][7], $scope.player2, $scope, false));
		$scope.pieces.push(new Rook($scope.squares[0][0], $scope.player2, $scope, false));
		$scope.pieces.push(new Bishop($scope.squares[7][2], $scope.player1, $scope));
		$scope.pieces.push(new Bishop($scope.squares[7][5], $scope.player1, $scope));
		$scope.pieces.push(new Bishop($scope.squares[0][2], $scope.player2, $scope));
		$scope.pieces.push(new Bishop($scope.squares[0][5], $scope.player2, $scope));
		$scope.pieces.push(new Knight($scope.squares[0][1], $scope.player2, $scope));
		$scope.pieces.push(new Knight($scope.squares[0][6], $scope.player2, $scope));
		$scope.pieces.push(new Knight($scope.squares[7][1], $scope.player1, $scope));
		$scope.pieces.push(new Knight($scope.squares[7][6], $scope.player1, $scope));
		
		for (var tColumn = 0; tColumn <= 7; tColumn += 1) {
			$scope.pieces.push(new Pawn($scope.squares[6][tColumn], $scope.player1, $scope, false));
			$scope.pieces.push(new Pawn($scope.squares[1][tColumn], $scope.player2, $scope, false));
		};

		angular.forEach($scope.pieces, function(piece)
		{
			piece.square.piece = piece;
		});
	}

	$scope.action = function(col, row) {
		if ($scope.selected) {
			if ($scope.selected == $scope.squares[col][row]) {
				$scope.selected = false;
			} else {
				$scope.selected.piece.move($scope.squares[col][row], 'local');
				$scope.selected = false;
			}
		} else {
			if ($scope.squares[col][row].piece) {
				$scope.selected = $scope.squares[col][row];
			}
		}
	}

	$scope.checkSquares = function(squares) {
		var result = true;
		angular.forEach(squares, function(square) {
			if ($scope.squares[square.col][square.row].piece) {
				result = false;
				return false;
			}
		});

		return result;
	}

	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
    	return vars;
	}	
	
	
}