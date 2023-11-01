import UserService, { userAlreadyExists } from '../../../service/UserService';

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { login, password, name, lastname, age } = req.body;
            try {
                const newUser = new UserService().createUser({ login, password, name, lastname, age });
                return res.status(201).json(newUser);
            } catch (error) {
                if (error.message === userAlreadyExists) {
                    return res.status(400).json({ error: error.message });
                }
                return res.status(500).json({ error: error.message });
            }
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}