/**
 * Created by Dean on 1/22/2016.
 */
angular.module('family.shared.filters', []).

filter('getFinanceCategoryType', ['financeCategoryType', function(financeCategoryTitle) {
    return function(items, props) {
        return financeCategoryTitle[items];
    }
}]);