'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services').

factory('financeCategoryService', ['$location', 'httpRequest',
        function($location, httpRequest) {

	return {
		query: function(type, successCallback) {
			httpRequest.get('financeCategory/query/', {
					type: type
				}, successCallback);
		},

		delete: function(category, successCallback) {
			httpRequest.post('financeCategory/delete/', {
					id: category.id
				},
				successCallback
			);
		},

		create: function(data, successCallback) {
			httpRequest.post('financeCategory/create/', {
					title: data.title,
					type: data.type
				},
				successCallback
			);
		}
	}
}]);
