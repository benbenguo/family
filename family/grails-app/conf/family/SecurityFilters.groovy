package family

import family.constants.ErrorCodeConstants
import grails.converters.JSON

class SecurityFilters {

    def exceptActions = [
            "user:login"
    ]

    def filters = {
        all(controller:'*', action:'*') {
            before = {

                if (exceptActions.contains(controllerName + ":" + actionName)) {
                    return true
                }

                if (session.UserInfo == null) {
                    render([success: false, error: ErrorCodeConstants.USER_NOT_AUTHORIZED] as JSON)
                    return false
                }
                return true
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}
