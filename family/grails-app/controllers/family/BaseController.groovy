package family

import family.dto.SessionUser
import family.dto.UserInfo

abstract class BaseController {

    protected UserInfo getUserInfo() {
        return session.UserInfo
    }

    protected setUserInfo(User user) {
        def sessionUser = new SessionUser(id: user.id, username: user.username, name: user.name)
        session.UserInfo = new UserInfo(user: sessionUser)
    }

    protected def clearUserInfo() {
        session.UserInfo = null
    }
}
