/**
 * Created by Dean on 1/20/2016.
 */
angular.module('family.life.finance', []).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/query-finance', {
        templateUrl: 'modules/finance/query-finance.html',
        controller: 'QueryFinanceController'
    }).

    when('/create-finance', {
        templateUrl: 'modules/finance/create-finance.html',
        controller: 'CreateFinanceController'
    });
}]).

controller('QueryFinanceController', ['$scope', '$filter', 'myConstants', 'utilService', 'financeService',
    function($scope, $filter, myConstants, utilService, financeService) {

        $scope.data = {
            month: $filter('date')(new Date(), myConstants.yearMonthFormat),
            type: 'expense'
        };

        $scope.cash = {
            expense: 0,
            income: 0
        };

        $scope.getBalance = function() {
            return $scope.cash.income - $scope.cash.expense;
        };

        $scope.opened = false;

        $scope.open = function(event){
            event.preventDefault();
            event.stopPropagation();
            $scope.opened = true;
        };

        $scope.clear = function () {
            $scope.ngModel = null;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'show-weeks' : false,
            'datepicker-mode':"'month'",
            'min-mode':"month"
        };

        $scope.query = function() {
            query();
        };

        var query = function() {
            financeService.query($scope.data, function(result){
                $scope.finances = result.data;
                var sum = result.sum;
                if (sum.length > 1) {
                    for (var i = 0; i < sum.length; i++) {
                        var type = sum[i][0];
                        if (type == 'expense') {
                            $scope.cash.expense = sum[i][1];
                        } else {
                            $scope.cash.income = sum[i][1];
                        }
                    }
                } else if (sum.length == 1) {
                    var type = sum[0][0];
                    if (type == 'expense') {
                        $scope.cash.expense = sum[0][1];
                        $scope.cash.income = 0;
                    } else {
                        $scope.cash.income = sum[0][1];
                        $scope.cash.expense = 0;
                    }
                } else {
                    $scope.cash.expense = 0;
                    $scope.cash.income = 0;
                };
            });
        };

        $scope.delete = function(finance) {
            var result = confirm("你确定要删除这笔支出吗?");

            if (true == result) {
                financeService.delete(finance, function() {
                    var index = $scope.finances.indexOf(finance);
                    $scope.finances.splice(index, 1);

                    if (finance.category.type == 'expense') {
                        $scope.cash.expense -= finance.amount;
                    } else {
                        $scope.cash.income -= finance.amount;
                    }
                    alert("删除成功");
                });
            };
        };

        $scope.detail = function(finance) {
            var title = finance.title;
            var amount = $filter('number')(finance.amount, 2);
            var type = $filter('getFinanceCategoryType')(finance.category.type);
            var category = finance.category.title;
            var date = $filter('date')(finance.date, myConstants.shortDateFormat)
            var memo = '';

            if (!utilService.isNullOrEmpty(finance.memo)) {
                memo = finance.memo;
            }
            var message = "详细信息:\n\n标题: " + title + "\n\n金额: " + amount + "\n\n类型: " + type + "\n\n类别: " + category + "\n\n日期: " + date + "\n\n备注: " + memo;
            alert(message);
        };

        query();
}]).

controller('CreateFinanceController', ['$scope', '$filter', 'myConstants', 'financeCategoryService', 'financeService',
    function($scope, $filter, myConstants, financeCategoryService, financeService) {

        /*** Initial Data Start ***/
        var init = function(){
            $scope.data = {
                date: $filter('date')(new Date(), myConstants.shortDateFormat),
                type: 'expense',
                category: null,
                title: '',
                memo: '',
                amount: null
            };
        };

        $scope.categories = [];

        $scope.error = {
            title: '亲，请输入标题 ...',
            category: '亲，请输入类别 ...',
            amount: {
                required: '亲，请输入金额 ...',
                number: '亲，请输入正确的金额 ...'
            }
        };
        /*** Initial Data End ***/

        /*** Date Component Setting Start ***/
        $scope.opened = false;

        $scope.open = function(event){
            event.preventDefault();
            event.stopPropagation();
            $scope.opened = true;
        };

        $scope.clear = function () {
            $scope.ngModel = null;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'show-weeks' : false
        };
        /*** Date Component Setting End ***/

        /*** Watch the data.type change and get the related categories Start ***/
        $scope.$watch(function() {
                return $scope.data.type;
            },
            function(newValue, oldValue) {
                if (newValue != undefined) {

                    if (oldValue != undefined && newValue != oldValue) {
                        $scope.data.category = null;
                    }

                    financeCategoryService.query(newValue, function(result) {
                        $scope.categories = result.data;
                    });
                }
            }
        );
        /*** Watch the data.type change and get the related categories End ***/

        $scope.create = function() {
            if (!$scope.form.$invalid) {
                financeService.create($scope.data, function() {
                    alert("成功的添加了一笔");
                    init();
                });
            }
        }

        init();
    }]);