package family

import family.constants.FinanceTypeConstants
import family.constants.SharedConstants
import grails.converters.JSON

class FinanceController extends BaseController {

    static allowedMethods = [
            create: "POST",
            delete: "POST"
    ]

    def create() {
        def data = request.JSON
        def date = Date.parse(SharedConstants.SHORT_DATE_FORMAT, data.date)

        def finance = new Finance()
        finance.with {
            title = data.title
            recordDate = date
            category = FinanceCategory.proxy(data.category.id)
            amount = data.amount
            memo = data.memo
            month = date.format(SharedConstants.YEAR_MONTH_FORMAT)
            createdBy = userInfo.proxyUser
            lastUpdatedBy = userInfo.proxyUser
        }
        finance.save(flush: true)

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

        def criteria = Finance.createCriteria()
        def list = criteria.list(sort: "dateCreated", order: "desc") {
            and {
                eq("month", month)
                category {
                    eq("type", type)
                }
                eq("createdBy", userInfo.proxyUser)
            }
        }.collect {[
                id: it.id,
                title: it.title,
                amount: it.amount,
                date: it.recordDate,
                category: it.category,
                memo: it.memo
        ]}

        def otherCriteria = Finance.createCriteria()
        def sum = otherCriteria.list() {

            createAlias('category','categoryAlias')

            and {
                eq("month", month)
                eq("createdBy", userInfo.proxyUser)
                or {
                    eq("categoryAlias.type", FinanceTypeConstants.EXPENSE)
                    eq("categoryAlias.type", FinanceTypeConstants.INCOME)
                }
            }
            projections {
                groupProperty('categoryAlias.type')
                sum('amount')
            }
        }

        render([success: true, data: list, sum: sum] as JSON)
    }
}
