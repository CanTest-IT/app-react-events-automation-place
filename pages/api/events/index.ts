import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import EventService from "../../../service/EventService";
import { EventWithId } from '../../../domain/event';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const eventService = new EventService()

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).end();
    }

    try {
        jwt.verify(token, JWT_SECRET);

        switch (req.method) {
            case 'GET':
                const events: EventWithId[] = eventService.getAllEvents()
                return res.status(200)
                    .setHeader('Content-Type', 'application/json')
                    .json(events)
            case 'POST':
                const newEvent = req.body;
                const id = eventService.addNewEvent(newEvent)
                return res.status(200)
                    .setHeader('Content-Type', 'application/json')
                    .json({ id })
        }
    } catch (err) {
        return res.status(401).end()
    }
}