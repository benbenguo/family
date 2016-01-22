'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services').

factory('eventService', ['$location', '$filter', 'myConstants', 'httpRequest', 'clientLoginService', 'utilService',
        function($location, $filter, myConstants, httpRequest, clientLoginService, utilService) {

	return {
		create: function(data, successCallback) {
			httpRequest.post('event/create/', {
					title: data.title,
					memo: data.memo,
					date: $filter('date')(data.date, myConstants.shortDateFormat)
				},
				successCallback
			);
		},

		query: function(data, successCallback) {
			httpRequest.get('event/query/', {
				start: $filter('date')(data.start, myConstants.shortDateFormat),
				end: $filter('date')(data.end, myConstants.shortDateFormat),
				title: data.title
			}, successCallback);
		},

		delete: function(event, successCallback) {
			httpRequest.post('event/delete/', {
					id: event.id
				},
				successCallback
			);
		}
	}
}]);
