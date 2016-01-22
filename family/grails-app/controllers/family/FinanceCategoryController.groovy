package family

import grails.converters.JSON

class FinanceCategoryController extends BaseController {

    static allowedMethods = [
            create: "POST",
            delete: "POST"
    ]

    def query() {
        def type = params.type
        def list = FinanceCategory.findAllByType(type)
        render([success: true, data: list] as JSON)
    }

    def create() {
        def data = request.JSON
        new FinanceCategory(title: data.title, type: data.type, createdBy: userInfo.proxyUser, lastUpdatedBy: userInfo.proxyUser, dateCreated: new Date(), lastUpdated: new Date()).save(flush: true, failOnError: true)
        render([success: true] as JSON)
    }

    def delete() {
        def data = request.JSON
        def category = FinanceCategory.proxy(data.id)
        def finance = Finance.findByCategory(category)

        if (finance != null) {
            render([success: true, inUse: true] as JSON)
        } else {
            if (category != null) {
                category.delete(flush: true)
            }
            render([success: true, inUse: false] as JSON)
        }
    }
}
