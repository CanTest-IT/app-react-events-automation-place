import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { User } from '../domain/user';

const db = new JsonDB(new Config('data.json', true, false, '/'));

export default class UserService {

    getUserById(login: string) {
        const index = db.getIndex('/users', login)
        if (index < 0) return null
        return db.getData(`/users[${index}]`);
    }

    createUser(user: User) {
        const index = db.getIndex('/users', user.id, 'id');
        if (index !== -1) {
            throw new Error('User already exists');
        }
        db.push('/users[]', user, true);
        return user;
    }
    
}