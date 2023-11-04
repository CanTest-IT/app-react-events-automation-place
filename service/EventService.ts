import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/accessor';
import { Event, EventWithId } from '../domain/event';

export default class EventService {

    getAllEvents(): EventWithId[] {
        db.reload()
        const events: EventWithId[] = db.getData("/events")
        return events
    }
    
    addNewEvent(event: Event): void {
        db.push("/events[]", {
            ...event,
            id: uuidv4()            
        }, true);
    }

    updateEvent(id: string, body: Event): void {
        const index = db.getIndex('/events', id)
        db.push(`/events[${index}]`, body, true);
    }

    deleteEvent(id: string): void {
        const index = db.getIndex('/events', id)
        db.delete(`/events[${index}]`);
    }
}