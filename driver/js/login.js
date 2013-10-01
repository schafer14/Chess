function LoginCtrl($scope, User, Auth) {


	Auth.check({}, function(data) {
		console.log(data);
	});

	$scope.registerModal = function() {
		$('#registerModal').modal('show');
	}	
	$scope.loginModal = function() {
		$('#loginModal').modal('show');
	}	

	$scope.guest = function() {
		User.post({
			'type': 'guest'
		}, function(data){
			$('#registerModal').modal('hide');
		});
	}

	$scope.register = function() {
		User.post({
			'name': $scope.user.name,
			'email': $scope.user.email,
			'password': $scope.user.password,
		}, function(data){
			$('#registerModal').modal('hide');
		});
	}
	
	$scope.login = function() {
		Auth.login({
			'email': $scope.login.email,
			'password': $scope.login.password
		}, function(data) {
			console.log(data);
			$('#loginModal').modal('hide');
		});
	}
}