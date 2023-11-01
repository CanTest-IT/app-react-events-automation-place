import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

export default class UserService {
  constructor() {
    this.db = new JsonDB(new Config('data.json', true, false, '/'));
  }

  async getUserById(id) {
    try {
      if (!this.db.exists("/users")) {
        console.log('No users in database');
        return null;
      }
      const users = await this.db.getData("/users");
      const user = users.find(user => user.id === id);
      return user;
    } catch(error) {
      console.log('Error fetching user:', error);
      if (error.id !== '5') {
        throw error;
      }
      return null;
    }
  }

  async getUserByUsername(username) {
    if (!this.db.exists("/users")) {
      console.log('No users in database');
      return null;
    }
    const users = await this.db.getData("/users");
    const user = users.find(user => user.username === username);
    return user || null;
  }

  createUser(user) {
    try {
      this.db.push("/users[]", user);
    } catch(error) {
      throw error;
    }
  }

  async updateUser(user) {
    const users = this.db.getData("/users");
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.db.push("/users", users);
      return user;
    }
    return null;
  }

  async deleteUser(id) {
    const users = this.db.getData("/users");
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      this.db.push("/users", users);
      return true;
    }
    return false;
  }
}