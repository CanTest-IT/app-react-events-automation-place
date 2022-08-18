import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { v4 as uuidv4 } from 'uuid';

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const db = new JsonDB(new Config('data.json', true, false, '/'));

export default class UserService {

    getUserById(login) {
        const index = db.getIndex('/users', login)
        if (index < 0) return null
        return db.getData(`/users[${index}]`);
    }
}