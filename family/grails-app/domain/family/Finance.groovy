package family

class Finance {
    String title
    FinanceCategory category
    Float amount
    String memo
    String month
    Date recordDate
    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy

    static constraints = {
        title(nullable: false, blank: false, maxSize: 1000)
        month(nullable: false, blank: false)
        memo(maxSize: 1000)
        category(nullable: false, blank: false)
        amount(nullable: false)
        recordDate(nullable: false)
    }
}
