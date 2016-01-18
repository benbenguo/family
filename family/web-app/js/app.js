/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('family', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'family.life.event',
    'family.shared.services',
    'family.shared.constants'
]).

config(['$provide', '$routeProvider', '$httpProvider', '$animateProvider',
        function($provide, $routeProvider, $httpProvider, $animateProvider) {

    $routeProvider.when('/error', {
        templateUrl: 'error.html'
    })

    //$routeProvider.otherwise({redirectTo: '/error'});

}]).

controller('MainController', ['$scope', '$location', 'utilService', 'clientLoginService', 'customizedError', 'customizedErrorFactory', 'httpRequestTracker',
        function($scope, $location, utilService, clientLoginService, customizedError, customizedErrorFactory, httpRequestTracker) {

    $scope.isAuthorized = clientLoginService.isAuthorized;
    $scope.getCurrentUserInfo = clientLoginService.getCurrentUserInfo;
    $scope.hasPendingRequests = httpRequestTracker.hasPendingRequests;

    if (!$scope.isAuthorized()) {
        location.href = 'login.html';
    }
}]);