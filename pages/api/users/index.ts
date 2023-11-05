import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import UserService from "../../../service/UserService";
import { UserWithoutPassword } from "../../../domain/user";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];

    // if (token == null) {
    //     return res.status(401).end();
    // }

    // try {
    //     jwt.verify(token, JWT_SECRET);

    switch (req.method) {
        case 'GET':
            const users: UserWithoutPassword[] = new UserService().getAllUsers()
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(users)
            break;
    }
    // } catch (err) {
    //     return res.status(401).end();
    // }
}