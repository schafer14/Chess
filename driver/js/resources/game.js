var game = angular.module('game', ['ngResource']);
var Config = {
	api: 'http://api.purplechess.dev/',
};


game.factory('Config', function($resource) {
	return $resource(Config.api + 'game_config/:id', { id:'@id'},
		{
			get: { method: 'GET' }
		}
	);
});