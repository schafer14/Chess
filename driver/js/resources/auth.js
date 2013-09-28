var chess = angular.module('chess', ['ngResource', 'ui.bootstrap']);
var Config = {
	api: 'http://api.purplechess.dev/',
};

chess.factory('User', function($resource) {
	return $resource(Config.api + 'user/:id', { id: '@id' },
		{
			get: { method: 'GET', isArray: true	},
			post: { method: 'POST', isArray: true	}
		}
	);
});