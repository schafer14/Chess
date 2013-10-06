function HomeCtrl($scope, Auth, $http) {
	$scope.config= {
		api: 'http://api.purplechess.dev/'
	};

	Auth.check({}, function(data) {
		console.log(data);
	});



}