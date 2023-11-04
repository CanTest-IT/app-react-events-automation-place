import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/accessor';
import { Event, EventWithId } from '../domain/event';

export default class EventService {

    getAllEvents(): EventWithId[] {
        db.reload()
        const events: EventWithId[] = db.getData("/events")
        return events
    }

    getEventById(id: string) {
        try {
            const index = db.getIndex('/events', id, 'id')
            if (index < 0 || index === undefined) return null
            return db.getData(`/events[${index}]`);
        } catch (error) {
            return null;
        }
    }

    addNewEvent(event: Event): string {
        const id = uuidv4()
        db.push("/events[]", {
            ...event, id
        }, true);

        return id
    }

    updateEvent(id: string, body: Event): void {
        const index = db.getIndex('/events', id)
        db.push(`/events[${index}]`, body, true);
    }

    deleteEvent(id: string): void {
        const index = db.getIndex('/events', id)
        db.delete(`/events[${index}]`)
    }
}