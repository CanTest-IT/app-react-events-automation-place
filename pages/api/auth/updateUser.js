import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../jwt'
import UserService from '../../../service/UserService'

export default async function handler(req, res) {
    const { token } = req.headers
    try {
        jwt.verify(token, JWT_SECRET);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    const { id, username, password, email } = req.body
    const userService = new UserService()
    const updatedUser = await userService.updateUser({ id, username, password, email })

    if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully' })
    } else {
        res.status(400).json({ error: 'Failed to update user' });
    }
}