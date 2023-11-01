import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/accessor';

export default class EventService {

    getAllEvents() {
        db.reload()
        const events = db.getData("/events")
        return events
    }
    
    addNewEvent(event) {
        db.push("/events[]", {
            ...event,
            id: uuidv4()            
        }, true);
    }

    updateEvent(id, body) {
        const index = db.getIndex('/events', id)
        db.push(`/events[${index}]`, body, true);
    }

    deleteEvent(id) {
        const index = db.getIndex('/events', id)
        db.delete(`/events[${index}]`);
    }
}