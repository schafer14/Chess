function LoginCtrl($scope, User, Auth, $http) {

	$scope.pusher = {};

	$scope.pusher.subscribe = function() {
		Pusher.channel_auth_endpoint = 'http://api.purplechess.dev/pusher';
		var pusher = new Pusher('82495e54704164d896ff');
		var PresenceChannel = pusher.subscribe('presence-user_channel');

		PresenceChannel.bind('pusher:subscription_succeeded', function(members) {
			$scope.$apply($scope.me = members.me);
			$scope.$apply($scope.members = members.members);
			$scope.$apply($scope.highlight = members.me.info);
		});
		PresenceChannel.bind('pusher:member_added', function(member) {
			$scope.$apply($scope.members[member.id] = member.info);
		});
		PresenceChannel.bind('pusher:member_removed', function(member) {
			$scope.$apply(delete $scope.members[member.id]);
		});
		PresenceChannel.bind('pusher:subscription_error', function(err) {
			console.log('Err:', err);
		});
	}

	$scope.pusher.subscribe();

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
		}, function(data, h) {
			Auth.check({}, function(data) {
				console.log(data);
			});
			$scope.pusher.subscribe();
			$('#loginModal').modal('hide');
		});
	}

	$scope.addHighlight = function(member) {
		$scope.highlight = member;
	}


}