package family

import family.constants.FinanceTypeConstants
import grails.transaction.Transactional

@Transactional
class InstallmentService {

    def query() {
        def now = new Date().format("yyyy-MM")
        def list = Installment.findAllByEndGreaterThanEquals(now).collect {[
                id: it.id,
                title: getTitle(it, now),
                amount: it.amount,
                memo: it.memo,
                canDelete: true
        ]}
        return list
    }

    def queryForFixedCharge() {
        def now = new Date().format("yyyy-MM")
        def list = Installment.findAllByEndGreaterThanEquals(now).collect {[
                id: it.id,
                title: getTitle(it, now),
                amount: it.amount,
                memo: it.memo,
                canDelete: false
        ]}
        return list
    }

    def queryForFinance(month) {
        def date = Date.parse('yyyy-MM', month)
        def list = Installment.findAllByEndGreaterThanEqualsAndStartLessThanEquals(month, month).collect {[
                id: it.id,
                title: getTitle(it, month),
                amount: it.amount,
                date: date,
                category: "固定支出",
                type: FinanceTypeConstants.ADVANCE,
                memo: it.memo,
                canDelete: false
        ]}
        return list
    }

    def getTitle(installment, now) {
        Date start = Date.parse('yyyy-MM', installment.start)
        Date end = Date.parse('yyyy-MM', installment.end)
        Date current = Date.parse('yyyy-MM', now)
        def startYear = start[Calendar.YEAR]
        def endYear = end[Calendar.YEAR]
        def currentYear = current[Calendar.YEAR]
        def startMonth = start[Calendar.MONTH]
        def endMonth = end[Calendar.MONTH]
        def currentMonth = current[Calendar.MONTH]

        def currentNumber = (currentYear - startYear) * 12 + (currentMonth - startMonth) + 1
        def totalNumber = (endYear - startYear) * 12 + (endMonth - startMonth) + 1

        return "${installment.title} （${currentNumber < 1 ? 1: currentNumber}/${totalNumber}）"
    }
}
