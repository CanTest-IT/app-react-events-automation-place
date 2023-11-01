import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { v4 as uuidv4 } from 'uuid';

const db = new JsonDB(new Config('data.json', true, false, '/'));

export default class EventService {

    async getAllEvents() { // Add the async keyword
        db.reload()
        const events = await db.getData("/events") // Add the await keyword
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
        db.delete(`/events[${index}]`, true);
    }
}