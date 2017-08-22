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
    }).

    when('/statistics-finance', {
        templateUrl: 'modules/finance/statistics-finance.html',
        controller: 'StatisticsFinanceController'
    });
}]).

controller('QueryFinanceController', ['$scope', '$filter', '$mdDialog', 'myConstants', 'utilService', 'financeService',
    function($scope, $filter, $mdDialog, myConstants, utilService, financeService) {

        $scope.data = {
            month: $filter('date')(new Date(), myConstants.yearMonthFormat),
            type: 'expense'
        };

        $scope.cash = {
            expense: 0,
            income: 0,
            advance: 0
        };

        $scope.types = utilService.financeTypes();

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

                $scope.cash.expense = 0;
                $scope.cash.income = 0;
                $scope.cash.advance = 0;

                for (var i = 0; i < sum.length; i++) {
                    var item = sum[i];
                    if (item.type == 'expense') {
                        $scope.cash.expense = item.amount;
                    } else if (item.type == 'income') {
                        $scope.cash.income = item.amount;
                    } else {
                        $scope.cash.advance = item.amount;
                    }
                };
            });
        };

        $scope.delete = function(finance, event) {
            utilService.confirm(event, "你确定要删除这笔账单吗?", function(){
                financeService.delete(finance, function() {
                    var index = $scope.finances.indexOf(finance);
                    $scope.finances.splice(index, 1);

                    if (finance.category.type == 'expense') {
                        $scope.cash.expense -= finance.amount;
                    } else if (finance.category.type == 'income') {
                        $scope.cash.income -= finance.amount;
                    } else {
                        $scope.cash.advance -= finance.amount;
                    }

                    utilService.alert(null, "删除成功");
                });
            });
        };

        $scope.detail = function(finance) {
            var title = finance.title;
            var amount = $filter('number')(finance.amount, 2);
            var type = $filter('getFinanceCategoryType')(finance.type);
            var category = finance.category;
            var date = $filter('date')(finance.date, myConstants.shortDateFormat)
            var memo = '';

            if (!utilService.isNullOrEmpty(finance.memo)) {
                memo = finance.memo;
            }
            var message = "详细信息:\n\n标题: " + title + "\n\n金额: " + amount + "\n\n类型: " + type + "\n\n类别: " + category + "\n\n日期: " + date + "\n\n备注: " + memo;

            utilService.alert(null, message);
        };

        query();
}]).

controller('StatisticsFinanceController', ['$scope', '$filter', 'myConstants', 'utilService', 'financeService',
    function($scope, $filter, myConstants, utilService, financeService) {

    $scope.data = {
        month: $filter('date')(new Date(), myConstants.yearMonthFormat),
        type: 'expense'
    };

    $scope.cash = {
        expense: 0,
        income: 0,
        advance: 0
    };

    $scope.types = utilService.financeTypes();

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
        financeService.statistics($scope.data, function(result){
            $scope.statistics = result.data;
            drawChart(result.data);
            var sum = result.sum;

            $scope.cash.expense = 0;
            $scope.cash.income = 0;
            $scope.cash.advance = 0;

            for (var i = 0; i < sum.length; i++) {
                var type = sum[i][0];
                if (type == 'expense') {
                    $scope.cash.expense = sum[i][1];
                } else if (type == 'income'){
                    $scope.cash.income = sum[i][1];
                } else {
                    $scope.cash.advance = sum[i][1];
                }
            };
        });
    };

    var drawChart = function(data) {
        var list = [];
        for (var i = 0; i < data.length; i++) {
            list.push({value:data[i][1], name:data[i][0]})
        }

        var chartOption = {
            series : [
                {
                    name: '类别统计',
                    type: 'pie',
                    radius: '55%',
                    roseType: 'angle',
                    data: list
                }
            ]
        };
        var chartDom = document.getElementById("chart");
        var myChart = echarts.init(chartDom);

        if (chartOption && typeof chartOption === "object") {
            myChart.setOption(chartOption, true);
        };
    };

    query();
}]).

controller('CreateFinanceController', ['$scope', '$filter', 'myConstants', 'utilService', 'financeCategoryService', 'financeService', 'dateConfig',
    function($scope, $filter, myConstants, utilService, financeCategoryService, financeService, dateConfig) {

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

        $scope.types = utilService.financeTypes();

        $scope.dateConfig = dateConfig;

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
                    //utilService.alert(null, "成功的添加了一笔");
                    alert("成功的添加了一笔");
                    init();
                });
            }
        }

        init();
    }]);