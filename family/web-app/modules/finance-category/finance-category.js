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

controller('CreateFinanceCategoryController', ['$scope', 'myConstants', 'financeCategoryService', 'utilService',
    function($scope, myConstants, financeCategoryService, utilService) {

    $scope.error = {
        title: '亲，请输入标题 ...'
    };

    $scope.data = {
        type: 'expense',
        title: ''
    };

    $scope.categories = [];

    $scope.types = utilService.financeTypes();

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
            financeCategoryService.create($scope.data, function(result) {
                //utilService.alert(null, "类别添加成功");
                alert("类别添加成功");
                $scope.categories.push(result.category);
                $scope.data.title = '';
            });
        }
    };

    $scope.delete = function(event, category) {
        utilService.confirm(event, "你确定要删除该类型吗?", function(){
            financeCategoryService.delete(category, function(result) {
                if (result.inUse == true) {
                    utilService.alert(null, "该类型已被使用，无法删除");
                } else {
                    var index = $scope.categories.indexOf(category);
                    $scope.categories.splice(index, 1);
                    utilService.alert(null, "删除成功");
                }
            });
        });
    }
}]);