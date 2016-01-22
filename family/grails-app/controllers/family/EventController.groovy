package family

import family.constants.SharedConstants
import family.utils.SharedUtils
import grails.converters.JSON

class EventController extends BaseController {

    static allowedMethods = [
            create: "POST",
            delete: "POST"
    ]

    def eventService

    def create() {
        def data = request.JSON
        eventService.create(data, userInfo)
        render([success: true] as JSON)
    }

    def query() {
        def start = params.date("start", SharedConstants.SHORT_DATE_FORMAT)
        def end = params.date("end", SharedConstants.SHORT_DATE_FORMAT)
        def title = params.title

        def criteria = Event.createCriteria()
        def list = criteria.list(sort: "dateCreated", order: "desc") {

            if (!SharedUtils.isNullOrEmpty(title)) {
                like("title", "%" + title + "%")
            }

            and {
                ge("eventDate", start)
                le("eventDate", end)
                eq("createdBy", userInfo.proxyUser)
            }
        }.collect {[
                id: it.id,
                title: it.title,
                eventDate: it.eventDate,
                memo: it.memo
        ]}

        render([success: true, data: list] as JSON)
    }

    def delete() {
        def data = request.JSON
        def event = Event.get(data.id)
        event.delete(flush: true)
        render([success: true] as JSON)
    }
}
