package family

import family.constants.ErrorCodeConstants
import family.dto.SessionUser
import family.dto.UserInfo
import family.utils.SharedUtils
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
                    def identifier = null
                    if (request.method.toUpperCase() == "GET") {
                        identifier = params.identifier
                    }  else if (request.method.toUpperCase() == "POST") {
                        def postedData = SharedUtils.convertRequestParameterToMap(request.parameterMap)
                        identifier = postedData.identifier
                    }

                    if (SharedUtils.isNullOrEmpty(identifier)) {
                        render([success: false, error: ErrorCodeConstants.USER_NOT_AUTHORIZED] as JSON)
                        return false
                    } else {
                        session.UserInfo = new UserInfo(user: new SessionUser(id: identifier as Long))
                        return true
                    }
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
