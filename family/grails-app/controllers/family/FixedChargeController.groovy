package family

import grails.converters.JSON

class FixedChargeController extends BaseController {

    static allowedMethods = [
        create: "POST",
        delete: "POST"
    ]

    def fixedChargeService
    def installmentService

    def create() {
        def data = request.JSON
        def title = data.title
        def memo = data.memo
        def amount = data.amount

        def fixedCharge = new FixedCharge(title: title, memo: memo, amount: amount, createdBy: userInfo.proxyUser, lastUpdatedBy: userInfo.proxyUser, dateCreated: new Date(), lastUpdated: new Date())
        fixedCharge.save(flush: true, failOnError: true)

        render([success: true] as JSON)
    }

    def query() {
        def charges = fixedChargeService.query()
        def installments = installmentService.queryForFixedCharge()
        charges.addAll(installments)

        def sum = 0f
        if (charges != null && charges.size() != 0) {
            sum = charges.amount.sum()
        }

        render([success: true, data: charges, sum: sum] as JSON)
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
