var chess = angular.module('chess', ['ngResource', 'ui.bootstrap']);
var Config = {
	api: 'http://api.purplechess.dev/',
};

chess.config(function($httpProvider) {
	$httpProvider.defaults.withCredentials = true; 
});

chess.factory('User', function($resource) {
	return $resource(Config.api + 'user/:id', { id: '@id' },
		{
			get: { method: 'GET', isArray:true },
			post: { method: 'POST' }
		}
	);
});

chess.factory('Auth', function($resource) {
	return $resource(Config.api + 'auth/:id', { id: '@id' },
		{
			check: { method: 'GET' },
			login: { method: 'POST' }
		}
	);
});

