package family

class User {

    String username
    String password
    String name
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        username(nullable: false, blank: false, unique: true, maxSize: 50)
        password(nullable: false, blank: false, maxSize: 1000)
        name(nullable: false, blank: false, maxSize: 50)
    }
}
