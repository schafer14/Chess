function LoginCtrl($scope, User, Auth, $http) {

	$scope.pusher = {};


	$scope.pusher.subscribe = function() {
		Pusher.channel_auth_endpoint = 'http://api.purplechess.dev/pusher';
		var pusher = new Pusher('82495e54704164d896ff');
		var PresenceChannel = pusher.subscribe('presence-user_channel');

		PresenceChannel.bind('pusher:subscription_succeeded', function(members) {
			console.log('Members:', members);
		});
		PresenceChannel.bind('pusher:member_added', function(member) {
			console.log('Member added:', member);
		});
		PresenceChannel.bind('pusher:member_removed', function(member) {
			console.log('Member removed:', member);
		});
		PresenceChannel.bind('pusher:subscription_error', function(err) {
			console.log('Err:', err);
		});
	}

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
		// Auth.login({
		// 	'email': $scope.login.email,
		// 	'password': $scope.login.password
		// }, function(data, h) {
		// 	console.log(h());
		// 	Auth.check({}, function(data) {
		// 		console.log(data);
		// 	});
		// 	$scope.pusher.subscribe();
		// 	$('#loginModal').modal('hide');
		// });
		$http.post('http://api.purplechess.dev/auth', {
			'email': 'a@example.com',
			'password': 'a'
		}).
		success(function(data, status, headers, config) {
			console.log(data, status, headers(), config)
			console.log(headers());
		})
	}
}