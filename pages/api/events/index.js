import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import EventService from "../../../service/EventService";

export default async function handler(req, res) {
    const { token } = req.headers;
    try {
        jwt.verify(token, JWT_SECRET);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    const eventService = new EventService();
    switch (req.method) {
        case 'GET':
            const events = await eventService.getAllEvents();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(events);
            break;
        case 'POST':
            eventService.addNewEvent(req.body);
            res.status(200);
            res.send();
            break;
    }
}