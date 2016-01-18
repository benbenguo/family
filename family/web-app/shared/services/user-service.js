'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services').

factory('userService', ['$location', 'httpRequest', 'clientLoginService', 'utilService',
        function($location, httpRequest, clientLoginService, utilService) {

	return {
		get: function(id, successCallback) {
			httpRequest.get('user/get/', {
					id: id
				},
				successCallback
			);
		},
		getCurrentUser: function(successCallback) {
			httpRequest.get('user/getCurrentUser/', null, successCallback);
		},
		login: function(username, password, successCallback) {
			httpRequest.post('user/login/', {
					username: username,
					password: password
				},
				successCallback
			);
		},
		logout: function() {
			if (clientLoginService.isAuthorized()) {
				httpRequest.post('user/logout/', null, function() {
					// Logged out successfully
					clientLoginService.logout();
					location.href = 'login.html';
				});
			};
		}
	}
}]);
