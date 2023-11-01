import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { v4 as uuidv4 } from 'uuid';

const db = new JsonDB(new Config('data.json', true, false, '/'));

class CategoryService {
    constructor() {
      this.db = new JsonDB(new Config('data.json', true, false, '/'));
    }
  
    async getAllCategories() { // Add the async keyword
      try {
        if (!this.db.exists("/categories")) {
          console.log('No categories in database');
          return [];
        }
        const categories = await this.db.getData("/categories"); // Add the await keyword
        console.log('Raw categories data:', categories);
        return categories;
      } catch(error) {
        console.log('Error fetching categories:', error);
        return [];
      }
    }
}

export default CategoryService; // Add this line