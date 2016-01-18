package family

import family.constants.ErrorCodeConstants
import family.utils.SharedUtils
import grails.converters.JSON

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.OK

class UserController extends BaseController{

    static allowedMethods = [
            login: "POST",
            logout: "POST"
    ]

    def login() {
        def jsonData = request.JSON
        def username = jsonData.username
        def password = jsonData.password.encodeAsPassword()

        def user = User.findByUsername(username)
        def code = ""

        if (user == null) {
            code = ErrorCodeConstants.USER_NOT_FOUND
        } else if (user.password != password) {
            code = ErrorCodeConstants.USER_INCORRECT_PASSWORD
        }

        if (true == SharedUtils.isNullOrEmpty(code)) {
            setUserInfo(user)
            render([success: true, data: getUserInfo()] as JSON)
        } else {
            render([success: true, data: user, error: code] as JSON)
        }
    }

    def logout() {
        clearUserInfo()

        // 200 OK
        render(status: OK)
    }

    def getCurrentUser() {
        if (getUserInfo() == null || getUserInfo().user == null) {
            render([success: true] as JSON)
        } else {
            render([success: true, data: getUserInfo()] as JSON)
        }
    }

    def get() {
        def id = params.id
        def user = User.get(id)

        if (user != null) {
            render([success: true, data: user] as JSON)
        } else {
            // 404 NOT_FOUND
            render(status: NOT_FOUND)
        }
    }
}
