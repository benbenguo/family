package family.dto

import family.User

/**
 * Created by Dean on 1/14/2016.
 */
class UserInfo {

    SessionUser user

    def getProxyUser() {
        return User.proxy(user?.id)
    }
}

class SessionUser {
    Long id
    String username
    String name
}