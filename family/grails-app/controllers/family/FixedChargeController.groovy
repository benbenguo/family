package family

import grails.converters.JSON

class FixedChargeController extends BaseController {

    static allowedMethods = [
        create: "POST",
        delete: "POST"
    ]

    def create() {
        def data = request.JSON
        def title = data.title
        def memo = data.memo
        def amount = data.amount

        def event = new FixedCharge(title: title, memo: memo, amount: amount, createdBy: userInfo.proxyUser, lastUpdatedBy: userInfo.proxyUser, dateCreated: new Date(), lastUpdated: new Date())
        event.save(flush: true, failOnError: true)

        render([success: true] as JSON)
    }

    def query() {
        def list = FixedCharge.list(sort: "dateCreated", order: "desc").collect {[
                id: it.id,
                title: it.title,
                amount: it.amount,
                memo: it.memo
        ]}

        def sum = 0f
        if (list != null && list.size() != 0) {
            sum = list.amount.sum()
        }

        render([success: true, data: list, sum: sum] as JSON)
    }

    def delete() {
        def data = request.JSON
        def charge = FixedCharge.get(data.id)

        if (charge != null) {
            charge.delete(flush: true)
        }

        render([success: true] as JSON)
    }
}
