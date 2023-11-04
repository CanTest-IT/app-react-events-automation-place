import { User } from '../domain/user';
import { db } from '../db/accessor';

export const userAlreadyExists = 'User already exists'
export const wrongLoginOrPassword = 'Wrong login or password'

export default class UserService {

    getUserByLogin(login: string) {
        const index = db.getIndex('/users', login, 'login')
        if (index < 0) return null
        return db.getData(`/users[${index}]`);
    }

    createUser(user: User) {
        const index = db.getIndex('/users', user.login, 'login');
        if (index !== -1) {
            throw new Error(userAlreadyExists);
        }
        db.push('/users[]', user, true);
        return user;
    }
    
}