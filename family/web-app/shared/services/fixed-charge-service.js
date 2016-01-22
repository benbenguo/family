'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services').

factory('fixedChargeService', ['$location', 'httpRequest',
        function($location, httpRequest) {

	return {
		query: function(successCallback) {
			httpRequest.get('fixedCharge/query/', null, successCallback);
		},

		delete: function(charge, successCallback) {
			httpRequest.post('fixedCharge/delete/', {
					id: charge.id
				},
				successCallback
			);
		},

		create: function(data, successCallback) {
			httpRequest.post('fixedCharge/create/', {
					title: data.title,
					memo: data.memo,
					amount: data.amount
				},
				successCallback
			);
		}
	}
}]);
