import EventService from "../../../service/EventService";

export default function handler(req, res) {
    const eventService = new EventService()
    switch (req.method) {
        case 'PUT':
            eventService.updateEvent(req.query['id'], req.body)
            res.status(200)
            res.send()
            break;
        case 'DELETE':
            eventService.deleteEvent(req.query['id'])
            res.status(200)
            res.send()
            break;
    }
}