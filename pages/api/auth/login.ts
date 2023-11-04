
import jwt from 'jsonwebtoken';
import UserService, { wrongLoginOrPassword } from '../../../service/UserService'
import { JWT_SECRET } from '../../../jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { login, password } = req.body
            const user = new UserService().getUserByLogin(login)
            if (!user || user.password !== password) {
                return res.status(401).json({ error: wrongLoginOrPassword })
            }
            const token = jwt.sign(user, JWT_SECRET)
            return res.status(200).json(token)
    }
}