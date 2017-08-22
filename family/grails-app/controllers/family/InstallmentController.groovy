package family

import family.constants.SharedConstants
import grails.converters.JSON
import groovy.time.TimeCategory

class InstallmentController extends BaseController{

    def installmentService

    static allowedMethods = [
            create: "POST",
            delete: "POST"
    ]

    def query() {
        def list = installmentService.query()

        def sum = 0f
        if (list != null && list.size() != 0) {
            sum = list.amount.sum()
        }

        render([success: true, data: list, sum: sum] as JSON)
    }

    def create() {
        def data = request.JSON
        def title = data.title
        def memo = data.memo
        def amount = data.amount
        def total = data.total - 1
        def date = Date.parse(SharedConstants.SHORT_DATE_FORMAT, data.date)
        def start = date.format("yyyy-MM")
        def endDate

        use (TimeCategory) {
            endDate = date + total.month
        }

        def end = endDate.format("yyyy-MM")

        def installment = new Installment(title: title, memo: memo, amount: amount, date: date, start: start, end: end, createdBy: userInfo.proxyUser, lastUpdatedBy: userInfo.proxyUser)
        installment.save(flush: true, failOnError: true)

        render([success: true] as JSON)
    }

    def delete() {
        def data = request.JSON
        def installment = Installment.get(data.id)

        if (installment != null) {
            installment.delete(flush: true)
        }

        render([success: true] as JSON)
    }
}
