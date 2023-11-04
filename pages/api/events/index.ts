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

        switch (req.method) {
            case 'GET':
                const events = EventService.getAllEvents()
                return res.status(200)
                    .setHeader('Content-Type', 'application/json')
                    .json(events)
            case 'POST':
                const newEvent = req.body;
                const id = EventService.addNewEvent(newEvent)
                return res.status(200)
                    .setHeader('Content-Type', 'application/json')
                    .json({ id })
        }
    } catch (err) {
        return res.status(401).end()
    }
}