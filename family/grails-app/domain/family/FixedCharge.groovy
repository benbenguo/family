package family

class FixedCharge {
    String title
    Float amount
    String memo
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        title(nullable: false, blank: false, maxSize: 1000)
        memo(maxSize: 1000)
        amount(nullable: false)
    }
}
