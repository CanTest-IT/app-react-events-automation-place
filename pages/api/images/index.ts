import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import { NextApiRequest, NextApiResponse } from "next"
import ImagesService from "../../../service/ImagesService"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).end();
    }

    try {
        jwt.verify(token, JWT_SECRET);

        const images = ImagesService.getImages()
        return res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(images)
    } catch (err) {
        return res.status(401).end()
    }
}