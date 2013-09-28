function LoginCtrl($scope, User) {

	$scope.var = {};

	$scope.registerModal = function() {
		$('#registerModal').modal('show');
	}	
	$scope.loginModal = function() {
		$('#loginModal').modal('show');
	}	

	$scope.guest = function() {
		// User.post({

		// }, function(data) {
		// 	console.log(data);
		// });
	}

	$scope.register = function() {

	}
}