function LoginCtrl($scope, User, Auth, Logout, Prop, $http) {

	$scope.config = {
		game: 'game.html'
	};
	$scope.pusher = {};
	$scope.channels = {};
	Pusher.channel_auth_endpoint = 'http://api.purplechess.dev/pusher';
	var pusher = new Pusher('82495e54704164d896ff');

	$scope.pusher.subscribe = function() {
		var PresenceChannel = pusher.subscribe('presence-user_channel');

		PresenceChannel.bind('pusher:subscription_succeeded', function(members) {
			$scope.$apply($scope.me = members.me);
			$scope.$apply($scope.members = members.members);
			$scope.$apply($scope.highlight = members.me.info);
			$scope.setupChannel();
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
			$scope.pusher.subscribe();
		});
	}

	$scope.register = function() {
		User.post({
			'name': $scope.user.name,
			'email': $scope.user.email,
			'password': $scope.user.password,
		}, function(data){
			$scope.pusher.subscribe();
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

	$scope.logout = function() {
		Logout.logout({}, function(data) {
			pusher.unsubscribe('presence-user_channel');
			delete $scope.me;
		});
	}

	$scope.setupChannel = function(time) {
		$scope.channels.propChannel = pusher.subscribe('private-' + $scope.me.id);
		$scope.channels.propChannel.bind('pusher:subscription_succeeded', function() {
		});
		$scope.channels.propChannel.bind('prop', function(data) {
			if (!$scope.challenge) {
				$scope.$apply($scope.challenge = data);
			}
		});
		$scope.channels.propChannel.bind('game', function(data) {
			console.log(data);
			location.replace($scope.config.game + '?game_id=' + data.id);
		});
	}

	$scope.propose = function(time) {
		Prop.prop({
			opp: $scope.highlight.rating.user_id,
			time: time
		}, function(data) {
			
		});
	}

	$scope.decline = function() {
		delete $scope.challenge;
	}

	$scope.accept = function() {
		Prop.accept({
			opp: $scope.challenge.opp_id,
			time: $scope.challenge.time
		}, function(data) {
			console.log(data.id);
			delete $scope.challenge;
			location.replace($scope.config.game + '?game_id=' + data.id);
		});
	}

	

}