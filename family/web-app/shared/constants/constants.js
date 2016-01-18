'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.constants', []).

constant('myConstants', {
	uiShortDateFormat: 'yy-mm-dd',
	shortDateFormat: 'yyyy-MM-dd',
	monthDateFormat: 'dd',
    monthFormat: 'MM',
	yearMonthFormat: 'yyyy-MM',
	longDateFormat: 'yyyy-MM-dd HH:mm:ss',
	longDateShortTimeFormat: 'yyyy-MM-dd HH:mm',
	shortTimeFormat: 'HH:mm',
	longTimeFormat: 'HH:mm:ss',
	viewAllId: '0',
	viewAll: 'ALL',
	viewAllText: '全部',
	viewNullId: null,
	viewNullText: '无',
	noneSelectionId: '-1',
	noneSelection: 'NONE',
	noneSelectionText: '无'
}).

constant('httpStatusCode', {
	unauthorized: '401',
	forbidden: '403',
	notAcceptable: '406',
	conflict: '409',
    unprocessableEntity: '422',
    failedDependency: '424',
    gatewayTimeout: '504'
}).

constant('customizedError', {
	accountNotActivated: 'ERROR_ACCOUNT_NOT_ACTIVATED',
	accountSuspended: 'ERROR_ACCOUNT_SUSPENDED',
	userNotFound: 'ERROR_USER_NOT_FOUND',
	userIncorrectPassword: 'ERROR_USER_INCORRECT_PASSWORD',
	userSuspended: 'ERROR_USER_SUSPENDED',
	userLocked: 'ERROR_USER_LOCKED',
	userNotAuthorized: 'ERROR_USER_NOT_AUTHORIZED',
	userNoPermission: 'ERROR_USER_NO_PERMISSION',
    noAdRevenueFound: 'ERROR_NO_AD_REVENUE_FOUND',
    accountIncorrectStatus: 'ERROR_ACCOUNT_INCORRECT_STATUS',
    incorrectVerficationCode: 'ERROR_ACCOUNT_INCORRECT_VERIFICATION_CODE'
});
