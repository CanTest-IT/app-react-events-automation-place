import { User } from '../domain/user';
import { db } from '../db/accessor';

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