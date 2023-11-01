import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import UserService from '../../../service/UserService';

const db = new JsonDB(new Config('data.json', true, true, '/'));

export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { id, password, name, lastname, age } = req.body;
            try {
                const newUser = new UserService().createUser({ id, password, name, lastname, age });
                return res.status(201).json(newUser);
            } catch (error) {
                if (error.message === 'User already exists') {
                    return res.status(400).json({ error: error.message });
                }
                return res.status(500).json({ error: error.message });
            }
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}