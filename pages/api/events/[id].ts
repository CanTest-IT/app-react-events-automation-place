import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import EventService from '../../../service/EventService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
                EventService.updateEvent(id, req.body)
                if (!EventService.getEventById(id)) {
                    return res.status(404).end()
                }
                return res.status(200).end()
            case 'DELETE':
                console.log(`attempting to delete eventId ${id}`)
                if (!EventService.getEventById(id)) {
                    return res.status(404).end()
                }
                EventService.deleteEvent(id)
                return res.status(200).end()
        }
    } catch (err) {
        return res.status(401).end()
    }
}