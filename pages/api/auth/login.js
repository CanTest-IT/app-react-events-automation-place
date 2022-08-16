
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../jwt';
import UserService from '../../../service/UserService'

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { login, password } = req.body
            const user = new UserService().getUserById(login)
            if (!user || user.password !== password) {
                res.status(401)
            }
            const token = jwt.sign(user, JWT_SECRET)
            res.status(200).json(token)
            break;
    }
}