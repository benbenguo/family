/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('family.life.event', []).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/life-event', {
        templateUrl: 'modules/life-event/life-event.html',
        controller: 'LifeEventController'
    })
}]).

controller('LifeEventController', ['$scope', function($scope) {

}]);
