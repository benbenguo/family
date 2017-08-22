/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('family', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ui.bootstrap',
    'ngMaterial',
    'materialDatePicker',
    'family.shared.config',
    'family.shared.constants',
    'family.shared.services',
    'family.shared.filters',
    'family.shared.directives',
    'family.life.event',
    'family.life.finance',
    'family.fixed.charge',
    'family.finance.category'
]).

config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/error', {
        templateUrl: 'error.html'
    });

}]).

controller('MainController', ['$scope', '$location', 'clientLoginService', 'httpRequestTracker', 'userService',
        function($scope, $location, clientLoginService, httpRequestTracker, userService) {

    $scope.isAuthorized = clientLoginService.isAuthorized;
    $scope.getCurrentUserInfo = clientLoginService.getCurrentUserInfo;
    $scope.hasPendingRequests = httpRequestTracker.hasPendingRequests;
    $scope.isShow = false;

    $scope.showFeature = function() {
        return $scope.isShow;
    }

    if (!$scope.isAuthorized()) {
        location.href = 'login.html';
    };

    $scope.load = function(path) {
        $scope.isShow = true;
        $location.url(path);
    };

    $scope.closeModal = function() {
        $scope.isShow = false;
        $location.url('/');
    };

    $scope.logout = function() {
        userService.logout();
    };
}]);