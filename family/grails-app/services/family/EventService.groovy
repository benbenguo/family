package family

import family.constants.SharedConstants
import grails.transaction.Transactional

@Transactional
class EventService {

    def create(data, userInfo) {
        def title = data.title
        def memo = data.demo
        def date = Date.parse(SharedConstants.SHORT_DATE_FORMAT, data.date)

        def event = new Event(title: title, memo: memo, eventDate: date, createdBy: userInfo.proxyUser, lastUpdatedBy: userInfo.proxyUser, dateCreated: new Date(), lastUpdated: new Date())
        event.save(failOnError: true)
    }
}
