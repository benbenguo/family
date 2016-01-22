/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('login', [
	'ngRoute',
	'ngAnimate',
	'ngCookies',
	'family.shared.services',
	'family.shared.constants'
]).

controller('LoginController', ['$scope', '$location', 'utilService', 'clientLoginService', 'customizedError', 'customizedErrorFactory', 'userService',
	function($scope, $location, utilService, clientLoginService, customizedError, customizedErrorFactory, userService) {

	$scope.user = {};

	$scope.error = {
		username: 'Please enter user name...',
		password: 'Please enter password...'
	};

	$scope.login = function() {
		if (!$scope.form.$invalid) {
			userService.login($scope.user.username, $scope.user.password, function(result){
				if (utilService.isNullOrEmpty(result.error)) {
					// Set the login data
					clientLoginService.login(result.data);
					location.href = 'index.html';
				} else {
					// Something bad happened
					var errorText = customizedErrorFactory.getErrorText(result.error);
					alert(errorText);
				}
			});
		};
	};

}]);