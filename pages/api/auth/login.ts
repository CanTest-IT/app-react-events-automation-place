
import jwt from 'jsonwebtoken';
import UserService, { wrongLoginOrPassword } from '../../../service/UserService'
import { JWT_SECRET } from '../../../jwt';

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { login, password } = req.body
            const user = new UserService().getUserByLogin(login)
            if (!user || user.password !== password) {
                res.status(401).json({ error: wrongLoginOrPassword })
                res.send()
                break
            }
            const token = jwt.sign(user, JWT_SECRET)
            res.status(200).json(token)
            break
    }
}