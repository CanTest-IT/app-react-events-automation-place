import { db } from '../db/accessor';

export default class CategoryService {

    getAllCategories() {
        db.reload()
        const categories = db.getData("/categories")
        return categories
    }
}