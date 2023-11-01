import EventService from "../../../service/EventService";

export default function handler(req, res) {
    const eventService = new EventService()
    switch (req.method) {
        case 'GET':
            const events = eventService.getAllEvents()
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(events)
            break;
        case 'POST':
            eventService.addNewEvent(req.body)
            res.status(200)
            res.send()
            break;
    }
}