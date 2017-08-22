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
            category = FinanceCategory.proxy(data.category)
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
        def list = criteria.list(sort: "recordDate", order: "asc") {
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
                category: it.category.title,
                type: it.category.type,
                memo: it.memo,
                canDelete: true
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
        }.collect {[
            type: it[0],
            amount: it[1]
        ]}

        if (sum.size() == 0 || sum.type.contains(FinanceTypeConstants.EXPENSE) == false) {
            sum.add([type: FinanceTypeConstants.EXPENSE, amount: 0f])
        }

        if (sum.type.contains(FinanceTypeConstants.INCOME) == false) {
            sum.add([type: FinanceTypeConstants.INCOME, amount: 0f])
        }

        if (sum.type.contains(FinanceTypeConstants.ADVANCE) == false) {
            sum.add([type: FinanceTypeConstants.ADVANCE, amount: 0f])
        }

        if (sum.type.contains(FinanceTypeConstants.PREDICT) == false) {
            sum.add([type: FinanceTypeConstants.PREDICT, amount: 0f])
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
