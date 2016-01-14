/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('family', [
    'ngRoute',
    'ngAnimate',
    'family.life.event'
]).

config(['$provide', '$routeProvider', '$httpProvider', '$animateProvider',
        function($provide, $routeProvider, $httpProvider, $animateProvider) {

    $routeProvider.when('/error', {
        templateUrl: 'error.html'
    })

    //$routeProvider.otherwise({redirectTo: '/error'});

}])