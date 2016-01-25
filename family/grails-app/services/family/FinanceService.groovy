package family

import family.constants.FinanceTypeConstants
import family.constants.SharedConstants
import grails.transaction.Transactional

@Transactional
class FinanceService {

    def create(data, userInfo) {
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
        finance.save()
        return finance
    }

    def query(month, type, userInfo) {
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

        return list
    }

    def sumByMonth(month, userInfo) {
        def criteria = Finance.createCriteria()
        def sum = criteria.list() {

            createAlias('category','categoryAlias')

            and {
                eq("month", month)
                eq("createdBy", userInfo.proxyUser)
                ne("categoryAlias.type", FinanceTypeConstants.PREDICT)
            }
            projections {
                groupProperty('categoryAlias.type')
                sum('amount')
            }
        }

        return sum
    }

    def statistics(month, type, userInfo) {
        def criteria = Finance.createCriteria()
        def statistics = criteria.list(max: 5) {
            createAlias('category','categoryAlias')
            and {
                eq("month", month)
                eq("createdBy", userInfo.proxyUser)
                eq("categoryAlias.type", type)
            }
            projections {
                groupProperty('categoryAlias.title')
                sum('amount')
            }
        }

        return statistics
    }
}
