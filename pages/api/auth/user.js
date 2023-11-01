import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import UserService from '../../../service/UserService'

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { token } = req.query
            const user = jwt.verify(token, JWT_SECRET)
            if (!user) {
                res.status(401).json({ error: 'Invalid token' });
                break;
            }
            const foundUser = new UserService().getUserById(user.id)
            if (!foundUser) {
                res.status(401).json({ error: 'User not found' });
                break;
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(foundUser)
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}