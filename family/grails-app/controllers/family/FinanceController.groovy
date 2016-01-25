package family

import family.constants.FinanceTypeConstants
import family.constants.SharedConstants
import grails.converters.JSON

class FinanceController extends BaseController {

    static allowedMethods = [
            create: "POST",
            delete: "POST"
    ]

    def financeService

    def create() {
        def data = request.JSON
        financeService.create(data, userInfo)

        render([success: true] as JSON)
    }

    def delete() {
        def data = request.JSON
        def finance = Finance.get(data.id)

        if (finance != null) {
            finance.delete(flush: true)
        }

        render([success: true] as JSON)
    }

    def query() {
        def month = params.month
        def type = params.type

        def list = financeService.query(month, type, userInfo)
        def sum = financeService.sumByMonth(month, userInfo)

        render([success: true, data: list, sum: sum] as JSON)
    }

    def statistics() {
        def month = params.month
        def type = params.type

        def statistics = financeService.statistics(month, type, userInfo)
        def sum = financeService.sumByMonth(month, userInfo)

        render([success: true, data: statistics, sum: sum] as JSON)
    }
}
