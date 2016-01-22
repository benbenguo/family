/**
 * Created by Dean on 1/21/2016.
 */
/**
 * Created by Dean on 1/20/2016.
 */
angular.module('family.finance.category', []).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create-finance-category', {
        templateUrl: 'modules/finance-category/create-finance-category.html',
        controller: 'CreateFinanceCategoryController'
    });
}]).

controller('CreateFinanceCategoryController', ['$scope', 'myConstants', 'financeCategoryService',
    function($scope, myConstants, financeCategoryService) {

    $scope.error = {
        title: '亲，请输入标题 ...'
    };

    $scope.data = {
        type: 'expense',
        title: ''
    };

    $scope.categories = [];

    /*** Watch the data.type change and get the related categories Start ***/
    $scope.$watch(function() {
            return $scope.data.type;
        },
        function(newValue, oldValue) {
            if (newValue != undefined) {
                financeCategoryService.query(newValue, function(result) {
                    $scope.categories = result.data;
                });
            }
        }
    );
    /*** Watch the data.type change and get the related categories End ***/

    $scope.create = function() {
        if (!$scope.form.$invalid) {
            financeCategoryService.create($scope.data, function() {
                alert("类别添加成功");
                $scope.categories.push($scope.data);
            });
        }
    };

    $scope.delete = function(category) {
        var result = confirm("你确定要删除该类型吗?");

        if (true == result) {
            financeCategoryService.delete(category, function(result) {
                if (result.inUse == true) {
                    alert("该类型已被使用，无法删除");
                } else {
                    var index = $scope.categories.indexOf(category);
                    $scope.categories.splice(index, 1);
                    alert("删除成功");
                }
            });
        }
    }
}]);