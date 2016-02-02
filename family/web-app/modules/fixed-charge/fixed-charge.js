/**
 * Created by Dean on 1/21/2016.
 */
/**
 * Created by Dean on 1/20/2016.
 */
angular.module('family.fixed.charge', []).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/query-fixed-charge', {
        templateUrl: 'modules/fixed-charge/query-fixed-charge.html',
        controller: 'QueryFixedChargeController'
    }).

    when('/create-fixed-charge', {
        templateUrl: 'modules/fixed-charge/create-fixed-charge.html',
        controller: 'CreateFixedChargeController'
    });
}]).

controller('QueryFixedChargeController', ['$scope', '$filter', 'myConstants', 'utilService', 'fixedChargeService',
    function($scope, $filter, myConstants, utilService, fixedChargeService) {

        $scope.sum = 0;
        $scope.charges = [];

        fixedChargeService.query(function(result){
            $scope.charges = result.data;
            $scope.sum = result.sum;
        });

        $scope.delete = function(event, charge) {
            utilService.confirm(event, "你确定要删除这笔支出吗?", function(){
                fixedChargeService.delete(charge, function(rst){
                    $scope.sum -= charge.amount;
                    var index = $scope.charges.indexOf(charge);
                    $scope.charges.splice(index, 1);
                    utilService.alert(null, "删除成功");
                });
            });
        };

        $scope.detail = function(charge) {
            var title = charge.title;
            var amount = $filter('number')(charge.amount, 2);
            var memo = '';

            if (!utilService.isNullOrEmpty(charge.memo)) {
                memo = charge.memo;
            }
            var message = "支出详细信息:\n\n标题: " + title + "\n\n金额: " + amount + "\n\n备注: " + memo;
            utilService.alert(null, message);
        };
    }]).

controller('CreateFixedChargeController', ['$scope', '$filter', 'myConstants', 'dateConfig', 'fixedChargeService', 'utilService',
    function($scope, $filter, myConstants, dateConfig, fixedChargeService, utilService) {

    $scope.error = {
        title: '亲，请输入标题 ...',
        amount: {
            required: '亲，请输入金额 ...',
            number: '亲，请输入正确的金额 ...'
        }
    };

    var init = function(){
        $scope.data = {
            amount: null,
            title: '',
            memo: ''
        };
    };

    $scope.create = function() {
        if (!$scope.form.$invalid) {
            fixedChargeService.create($scope.data, function(result){
                utilService.alert(null, "成功的添加了一笔每月固定支出");
                init();
            });
        };
    };

    init();
}]);