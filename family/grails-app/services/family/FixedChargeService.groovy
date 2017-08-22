package family

import family.constants.FinanceTypeConstants
import grails.transaction.Transactional

@Transactional
class FixedChargeService {

    def query() {
        def list = FixedCharge.list(sort: "dateCreated", order: "desc").collect {[
                id: it.id,
                title: it.title,
                amount: it.amount,
                memo: it.memo,
                canDelete: true
        ]}

        return list
    }

    def queryForFinance(month) {
        def date = Date.parse('yyyy-MM', month)
        def list = FixedCharge.list(sort: "dateCreated", order: "desc").collect {[
                id: it.id,
                title: it.title,
                amount: it.amount,
                date: date,
                type: FinanceTypeConstants.ADVANCE,
                category: "固定支出",
                memo: it.memo,
                canDelete: false
        ]}

        return list
    }
}
