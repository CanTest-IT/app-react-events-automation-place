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

    const { id } = req.body
    const userService = new UserService()
    const deletedUser = await userService.deleteUser(id)

    if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' })
    } else {
        res.status(400).json({ error: 'Failed to delete user' });
    }
}