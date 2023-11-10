import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import EventService from "../../../service/EventService";
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
        const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

        switch (req.method) {
            case 'PUT':
                console.log(`attempting to edit eventId ${id}`)
                eventService.updateEvent(id, req.body)
                if (!eventService.getEventById(id)) {
                    return res.status(404).end()
                }
                return res.status(200)
                    .setHeader('Content-Type', 'application/json')
                    .json(req.body)
            case 'DELETE':
                console.log(`attempting to delete eventId ${id}`)
                if (!eventService.getEventById(id)) {
                    return res.status(404).end()
                }
                eventService.deleteEvent(id)
                return res.status(204).end()
        }
    } catch (err) {
        return res.status(401).end()
    }
}