package family

class FinanceCategory {

    String title
    String type
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        title(nullable: false, blank: false, maxSize: 100)
        type(nullable: false, blank: false, maxSize: 100)
    }
}
