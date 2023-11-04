import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../../../service/UserService'

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { token } = req.query
            const user: string | JwtPayload | null = jwt.decode(token)
            if (!user || typeof user === 'string' || !('login' in user)) {
                res.status(401).end()
                break;
            }
            const foundUser = new UserService().getUserByLogin(user.login)
            if (!foundUser) {
                res.status(401).end()
                break;
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(foundUser)
            break;
    }
}