'use strict';

// Declare app level module which depends on views, and components
angular.module('family.shared.services', []).

factory('utilService', ['$filter', '$location', '$mdDialog', 'myConstants',
        function($filter, $location, $mdDialog, myConstants) {

	return {
		/**
		 * Convert the input string. If the input string is null then empty string will be returned.
		 * Otherwise the input string will be returned.
		 * @param input: The input string.
		 * @return: The returned string.
		 */
		convertInputString: function(input) {
			if (input == undefined || input == null) {
				return '';
			} else {
				return input;
			}
		},
		/**
		 * Check if the itemId string is undefined or null .
		 * @param input: The input instance.
		 * @return: True means the input is undefined or null. False means NOT.
		 */
		isNull: function(input) {
			if (input == undefined || input == null) {
				return true;
			} else {
				return false;
			}
		},
		/**
		* Check if the input is undefined, null, empty with l.
		* @param input: The input instance.
		* @return: True means the input is undefined, null or empty string. False means NOT.
		*/
		isNullOrEmpty: function(input) {
			if (this.isNull(input) || input.length == 0) {
	            return true;
	        } else {
	            return false;
	        }
		},
		/**
		 * Gets the first day of current month
		 * @return: The string likes 2016-01-01 will be returned. The format is yyyy-MM-dd.
		 */
		getMonthFirstDayString: function(date) {
			return $filter('date')(date, myConstants.yearMonthFormat + '-01');
		},
		/**
		 * Gets the first day of current month
		 * @return: The string likes 2016-01-01 will be returned. The format is yyyy-MM-dd.
		 */
		getCurrentMonthFirstDayString: function() {
			return this.getMonthFirstDayString(new Date());
		},
		/**
		 * Convert the input string to date.
		 * @param input: The input date string.
		 * @return: The date will be returned if the string is not empty. Otherwise the null be returned.
		 */
		stringToDate: function(input) {
			if (!this.isNullOrEmpty(input)) {
				return new Date(Date.parse(input.replace(/-/g, '/')));
			} else {
				return null;
			}
		},
		/**
		* Convert to input date string, specially comes from datepicker control on UI, to the 
		* pre-defined short date format.
		* @param input: The date string.
		* @return: The formatted pre-defined short date format string.
		*/
		convertToShortDateFormat: function(date) {
			return $filter('date')(date, myConstants.shortDateFormat);
		},
		/**
		* Convert to input date string, specially comes from datepicker control on UI, to the 
		* pre-defined long time format.
		* @param input: The date string.
		* @return: The formatted pre-defined long time format string.
		*/
		convertToShortTimeFormat: function(date) {
			return $filter('date')(date, myConstants.shortTimeFormat);
		},
        /**
         * Remove the specific item from the array.
         * @param array: The data array contains the item.
         * @param item: The item will be removed from the array.
         * @param totalItemCount: The total item count of all the data.
         * @param refreshData: The callback function to refresh the data.
         * @return: The total item count after caculation.
         */
        removeItemFromArray: function(array, item, totalItemCount, refreshData) {
            // Remove the item from data source
            var index = array.indexOf(item);

            if (index != -1) {
                array.splice(index, 1);

                // Refresh the pagination, this will trigger the page
                // change evernt to reload the last page data.
                totalItemCount -= 1;

                // If NOT the first page, NOT the last page and the callback function is NOT null
                // we need to refresh the data
                if (array.length > 0 && array.length < totalItemCount && !this.isNull(refreshData)) {
                    refreshData();
                }
            }

            return totalItemCount;
        },
        /**
         * Get the ending item count of current page for grid footer display.
         * @param currentPage: The current page.
         * @param pageSize: The page size.
         * @param totalItemCount: The total item count of the grid.
         * @return: The calcuated ending item count of current page.
         */
		/**
		* Get the starting item count of current page for grid footer display.
		* @param currentPage: The current page.
		* @param pageSize: The page size.
		* @param totalItemCount: The total item count of the grid.
		* @return: The calcuated starting item count of current page.
		*/
		getStartingItemCount: function(currentPage, pageSize, totalItemCount) {
			return totalItemCount == 0 ? 0 : currentPage * pageSize - pageSize + 1;
		},
		/**
		* Get the ending item count of current page for grid footer display.
		* @param currentPage: The current page.
		* @param pageSize: The page size.
		* @param totalItemCount: The total item count of the grid.
		* @return: The calcuated ending item count of current page.
		*/
		getEndingItemCount: function(currentPage, pageSize, totalItemCount) {
			var endingItemCount = currentPage * pageSize;

			if (endingItemCount > totalItemCount) {
				endingItemCount = totalItemCount;
			}

			return endingItemCount;
		},
		/**
		 * Get the matched item from the array based on the key and value.
		 * @param key: The string of the key.
		 * @param value: The object of the value.
		 * @param array: The array will be searched.
		 * @return: The matched item instance if founded. Otherwise the null will be returned.
		 */
		getArrayItem: function(key, value, array) {
			var item = null;

			for (var i = 0; i < array.length; i++) {
				if (array[i][key] == value) {
					item = array[i];
					break;
				}
			}

			return item;
		},
		/**
		 * Get the matched items from the array based on the key and value.
		 * @param key: The string of the key, suports nested properties.
		 * @param value: The object of the value.
		 * @param array: The array will be searched.
		 * @return: The matched item array if founded. Otherwise the null will be returned.
		 */
		getArrayItems: function(key, value, array) {
			var items = [];
			var keys = [];
			var tempItem = undefined;

			array.forEach(function(item) {
				keys = key.split('.');

				keys.forEach(function(key) {
					if (tempItem === undefined) {
						tempItem = item[key];
					} else if (tempItem != null) {
						tempItem = tempItem[key];
					}
				});

				if (tempItem == value) {
					items.push(item);
				}

				tempItem = undefined;
			});

			return items;
		},
        /**
         * Compares two object all property values but NOT the reference.
         * @param obj1: The first object instance
         * @param obj2: The second object instance
         * @return: True means the two objects have exactly same property values. False means NOT.
         */
        compareObjectAllPropertyValues: function(obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        },
        /**
         * Appends the text to the orginial content and seperated with Chinese comma
         * @param originalContent: The orginial content will be appended
         * @param addedText: The text will be added to the orginial content
         * @param maxlength: The max length of the original content. The limit will be ignored if the value is -1.
         * @return: The new content string
         */
        appendText: function(originalContent, addedText, maxlength) {
            if (maxlength == -1 || this.isNullOrEmpty(originalContent) || originalContent.length < maxlength) {
                if (this.isNullOrEmpty(originalContent)) {
                    originalContent = '';
                }

                if (!this.isNullOrEmpty(originalContent) && !originalContent.trim().endsWith('，')) {
                    originalContent += '，';
                }

                originalContent += addedText + '，';

                return (maxlength != -1 && originalContent.length > maxlength) ? originalContent.substring(0, maxlength) : originalContent;
            } else {
                return originalContent;
            }
        },
		/**
		 * Removes the input array each item's day part, returns a new Array with the time part ONLY.
		 * @param timestamps: The input Array with each item contains a string value of Date
		 * @returns {Array}: A new Array with the time part ONLY
		 */
		removeDayPart: function(timestamps) {
			var result = [];

			for (var i = 0; i < timestamps.length; i++) {
				result.push($filter('date')(this.stringToDate(timestamps[i]), myConstants.shortTimeFormat));
			}

			return result;
		},
		financeTypes: function() {
			var types = [];
			types.push({title: '支出', value: 'expense'});
			types.push({title: '收入', value: 'income'});
			types.push({title: '预支付', value: 'advance'});
			types.push({title: '预计', value: 'predict'});
			return types;
		},
		alert: function(event, message) {
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#pop-modal')))
					.clickOutsideToClose(true)
					.title('提示信息')
					.textContent(message)
					.ariaLabel('Alert Dialog')
					.ok('Got it!')
					.targetEvent(event)
			);
		},
		confirm: function(event, message, callback) {
			var confirm = $mdDialog.confirm()
				.title('确认信息')
				.content(message)
				.ariaLabel('Confirm Dialog')
				.targetEvent(event)
				.ok('OK')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(callback);
		}

	}
}]).

factory('urlFactory', function() {
	return {
		/**
		* Get the resource url of remote web service or local json data.
		* @param url: The relative url of the requested resource.
		* @return: The full url of the requested resource.
		*/			
		getUrl: function(url) {
			var rstUrl = '';

			if (url.indexOf('?') == -1) {
				rstUrl = url +'?random=' + new Date().getMilliseconds();
			} else {
				rstUrl = url +'&random=' + new Date().getMilliseconds();
			}
			return rstUrl;
		}
	};	
}).

factory('runtime', ['$location', 'userService', 'utilService', 'directAccess', 'roleType', 'customizedError',
	function($location, userService, utilService, directAccess, roleType, customizedError) {

	return {
		getCurrentUserInfoFromRemote: function(successCallback) {
			userService.getCurrentUser(function(result) {
				successCallback(result);
			});
		}
	};
}]).

factory('clientLoginService', ['$window', '$cookies', 'utilService',
        function($window, $cookies, utilService) {

	var localStorageUserKey = 'OPENNEWS_LOGIN_NAME',
		sessionStorageUserInfoKey = 'OPENNEWS_CURRENT_USER_INFO';

	return {
		getLoginName: function() {
			// IE caused Access Denied error when accessing local storage
			//return $window.localStorage.getItem(localStorageUserKey);
			return $cookies[localStorageUserKey];
		},
		setLoginName: function(loginName) {
			//$window.localStorage.setItem(localStorageUserKey, loginName);
			$cookies[localStorageUserKey] = loginName;
		},
		removeLoginName: function() {
			//$window.localStorage.removeItem(localStorageUserKey);
			$cookies[localStorageUserKey] = '';
		},
		isAuthorized: function() {
			return !utilService.isNullOrEmpty($window.sessionStorage.getItem(sessionStorageUserInfoKey));
		},
		login: function(userInfo) {
			$window.sessionStorage.setItem(sessionStorageUserInfoKey, JSON.stringify(userInfo));
		},
		logout: function() {
			$window.sessionStorage.removeItem(sessionStorageUserInfoKey);
		},
		getCurrentUserInfo: function() {
			// return currentUserInfo;
			return angular.fromJson($window.sessionStorage.getItem(sessionStorageUserInfoKey));
		}
	};
}]).

factory('httpRequestTracker', ['$http', function($http) {
	return {
		/**
		* Check if there's any active http request ongoing.
		* @return: True means there is active http request ongoing. False means NO.
		*/			
		hasPendingRequests: function() {
			return $http.pendingRequests.length > 0;
		}
	};	
}]).

factory('httpRequest', ['$http', 'httpCallback', 'urlFactory', 'utilService', function($http, httpCallback, urlFactory, utilService) {
	return {
		/**
		 * Make a http get request and execute the success callback.
		 * @param url: The relative url.
		 * @param params: The object used as params.
		 * @param successCallback: The success callback function. Will be executed if the server returns successfully.
		 * @param finallyCallback: The finally callback function. Will be executed whatever the server returns successfully or with error.
		 */
		get: function(url, params, successCallback, finallyCallback) {
			$http.get(urlFactory.getUrl(url), {
				params: params
			}).
			success(function(data, status, headers, config) {
				httpCallback.success(data, status, headers, config);

				if (utilService.isNullOrEmpty(data) ||
					(!utilService.isNullOrEmpty(data) && data.success)) {
					if (!utilService.isNull(successCallback)) {
						successCallback(data);
					}
				}
			}).
			error(httpCallback.error).
			finally(function(data) {
				if (!utilService.isNull(finallyCallback)) {
					finallyCallback(data);
				}
			});
		},
		/**
		 * Make a http post request and execute the success callback.
		 * @param url: The relative url.
		 * @param data: The object used as post data.
		 * @param successCallback: The success callback function. Will be executed if the server returns successfully.
		 * @param finallyCallback: The finally callback function. Will be executed whatever the server returns successfully or with error.
		 */
		post: function(url, data, successCallback, finallyCallback) {
			$http.post(urlFactory.getUrl(url), data).
			success(function(data, status, headers, config) {
				httpCallback.success(data, status, headers, config);

				if (utilService.isNullOrEmpty(data) ||
					(!utilService.isNullOrEmpty(data) && data.success)) {
					if (!utilService.isNull(successCallback)) {
						successCallback(data);
					}
				}
			}).
			error(httpCallback.error).
			finally(function(data) {
				if (!utilService.isNull(finallyCallback)) {
					finallyCallback(data);
				}
			});
		}
	};
}]).

factory('httpCallback', ['$location', '$routeParams', 'clientLoginService', 'utilService', 'httpStatusFactory', 'httpStatusCode', 'customizedError',
		function($location, $routeParams, clientLoginService, utilService, httpStatusFactory, httpStatusCode, customizedError) {

	return {
		/**
		* The http success callback function.
		* @param data: The response body transformed with the transform functions.
		* @param status: HTTP status code of the response.
		* @param headers: Header getter function.
		* @param config: The configuration object that was used to generate the request.
		*/
		success: function(data, status, headers, config) {
			if (data.success == false) {
				if (data.error == customizedError.userNotAuthorized) {
					clientLoginService.logout();

					if (location.href.indexOf('login.html') != -1) {
						// If user refreshs current page this function will be called again with login as the path.
						// Then just need to go to the url directly.
						$location.url($location.$$url);
					} else {
						location.href = 'login.html';
					}
				} else if (data.error == customizedError.userNoPermission) {
					utilService.alert(null, "您没有权限执行该操作");
				}
			}
		}, 
		/**
		* The http error callback function.
		* @param data: The response body transformed with the transform functions.
		* @param status: HTTP status code of the response.
		* @param headers: Header getter function.
		* @param config: The configuration object that was used to generate the request.
		*/			
		error: function(data, status, headers, config) {
			if (status == httpStatusCode.notAcceptable ||
				status == httpStatusCode.conflict ||
                status == httpStatusCode.failedDependency ||
                status == httpStatusCode.gatewayTimeout ||
                status == httpStatusCode.unprocessableEntity) {
				utilService.alert(null, httpStatusFactory.getStatusName(status));
            } else {
				// Once error occurs, add it to the system level errors for display.
				utilService.alert(null, httpStatusFactory.getStatusName(status));
			}
		}
	};
}]).

factory('booleanStatusFactory', function() {
	return {
		/**
		 * Get the boolean status list.
		 * @return: The array list contains object with status and name properties.
		 */
		getList: function() {
			var me = this,
				list = [];

			list.push({
				status: true,
				name: '是'
			});

			list.push({
				status: false,
				name: '否'
			});

			return list;
		}
	};
}).

factory('httpStatusFactory', function() {
	return {
		/**
		* Get the http status name.
		* @param status: The http status code.
		* @return: The name string of the corresponding code.
		*/			
		getStatusName: function(status) {
			switch(status) {
				case 400:
					return '错误请求'; 	        // BAD_REQUEST
					break;
				case 401:
					return '此操作未授权'; 	    // UNAUTHORIZED
					break;
				case 403:
					return '禁止该操作'; 		// FORBIDDEN
					break;
				case 404:
					return '所请求资源未找到'; 	// NOT_FOUND
					break;
				case 406:
					return '输入数据不合法，包含有非法值或该数据重复。';		                 // NOT_ACCEPTABLE
					break;
				case 409:
					return '发生数据冲突，有重复主键或当前数据已被修改，请重新操作。';          // CONFLICT
					break;
                case 413:
                    return '上传文件过大，请重新操作。';                                      // REQUEST_ENTITY_TOO_LARGE
                    break;
                case 422:
                    return '数据发生错误，比如格式不正确、长度超过限制等，无法被处理。';		 // UNPROCESSABLE_ENTITY
                    break;
                case 423:
                    return '所访问的数据暂时被锁，请稍后重试。';		 // LOCKED
                    break;
				case 500:
					return '服务器错误';		                        // INTERNAL_SERVER_ERROR
					break;
                case 504:
                    return '服务器连接超时，请稍后重试。';		    // GATEWAY_TIMEOUT
                    break;
				default:
					return '未知异常';
					break;
			}
		}
	};
}).

factory('customizedErrorFactory', ['customizedError', function(customizedError) {
	return {
		/**
		* Get the error code.
		* @param error: The customized error code.
		* @return: The text string of the corresponding code.
		*/			
		getErrorText: function(error) {
			switch(error) {
				case customizedError.accountNotActivated:
					return '媒体账号未激活';
					break;
				case customizedError.accountSuspended:
					return '媒体账号已被停用';
					break;
				case customizedError.userNotFound:
					return '用户名不存在';
					break;
				case customizedError.userIncorrectPassword:
					return '输入密码错误';
					break;
				case customizedError.userSuspended:
					return '用户已被停用';
					break;
				case customizedError.userLocked:
					return '因登录尝试失败多次，用户已被锁定，无法正常登录系统。';
					break;
				case customizedError.noAdRevenueFound:
					return '缺少收入数据';
					break;
				default:
					return '未知错误';
					break;
			}
		}
	};
}]);
