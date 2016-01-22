package family

class Event {
    String title
    Date eventDate
    String memo
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        title(nullable: false, blank: false, maxSize: 1000)
        memo(maxSize: 1000)
        eventDate(nullable: false, blank: false)
    }
}
