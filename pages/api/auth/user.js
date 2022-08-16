
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import UserService from '../../../service/UserService'

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { token } = req.query
            const user = jwt.decode(token, JWT_SECRET)
            if (!user) {
                res.status(401)
                break;
            }
            const foundUser = new UserService().getUserById(user.login)
            if (!foundUser) {
                res.status(401)
                break;
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(foundUser)
            break;
    }
}