'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services').

factory('financeService', ['$location', '$filter', 'httpRequest', 'myConstants', 'clientLoginService', 'utilService',
        function($location, $filter, httpRequest, myConstants, clientLoginService, utilService) {

	return {
		query: function(data, successCallback) {
			httpRequest.get('finance/query/', {
				month: $filter('date')(data.month, myConstants.yearMonthFormat),
				type: data.type
			}, successCallback);
		},

		delete: function(finance, successCallback) {
			httpRequest.post('finance/delete/', {
					id: finance.id
				},
				successCallback
			);
		},

		create: function(data, successCallback) {
			httpRequest.post('finance/create/', {
					title: data.title,
					memo: data.memo,
					amount: data.amount,
					category: data.category,
					date: $filter('date')(data.date, myConstants.shortDateFormat)
				},
				successCallback
			);
		}
	}
}]);
