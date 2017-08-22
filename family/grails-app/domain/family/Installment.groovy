package family

class Installment {
    String title
    Float amount
    String memo
    Date date
    String start    // Format yyyy-MM
    String end      // Format yyyy-MM

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        title(nullable: false, blank: false, maxSize: 1000)
        memo(maxSize: 1000)
        amount(nullable: false)
        date(nullable: false)
        start(nullable: false)
        end(nullable: false)
    }
}
