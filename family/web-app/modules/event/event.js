/**
 * Created by Dean on 1/13/2016.
 */
'use strict';

angular.module('family.life.event', []).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/query-event', {
        templateUrl: 'modules/event/query-event.html',
        controller: 'QueryEventController'
    }).

    when('/create-event', {
        templateUrl: 'modules/event/create-event.html',
        controller: 'CreateEventController'
    });
}]).

controller('QueryEventController', ['$scope', '$filter', 'myConstants', 'dateConfig', 'eventService', 'utilService',
    function($scope, $filter, myConstants, dateConfig, eventService, utilService) {

    $scope.dateConfig = dateConfig;

    var getPreMonth = function() {
        var date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    };

    $scope.data = {
        start: $filter('date')(getPreMonth(), myConstants.shortDateFormat),
        end: $filter('date')(new Date(), myConstants.shortDateFormat),
        title: null
    };

    $scope.events = [];

    $scope.detail = function(event) {
        var title = event.title;
        var date = $filter('date')(event.eventDate, myConstants.shortDateFormat);
        var memo = '';

        if (!utilService.isNullOrEmpty()) {
            memo = event.memo;
        }
        var message = "事件详细信息:\n\n标题: " + title + "\n\n日期: " + date + "\n\n备注: " + memo;
        alert(message);
    };

    $scope.query = function() {
        eventService.query($scope.data, function(result){
            $scope.events = result.data;
        });
    };

    $scope.delete = function(event) {
        var result = confirm("你确定要删除事件: '" + event.title + "' 吗?");

        if (true == result) {
            eventService.delete(event, function(rst){
                var index = $scope.events.indexOf(event);
                $scope.events.splice(index, 1);
                alert("删除成功");
            });
        }
    };
}]).

controller('CreateEventController', ['$scope', '$filter', 'myConstants', 'dateConfig', 'eventService',
    function($scope, $filter, myConstants, dateConfig, eventService) {

    $scope.dateConfig = dateConfig;

    $scope.error = {
        title: '亲，请输入标题 ...'
    };

    var init = function(){
        $scope.data = {
            date: $filter('date')(new Date(), myConstants.shortDateFormat),
            title: '',
            memo: ''
        };
    };

    $scope.create = function() {
        if (!$scope.form.$invalid) {
            eventService.create($scope.data, function(result){
                alert("事件添加成功");
                init();
            });
        };
    };

    init();
}]);
