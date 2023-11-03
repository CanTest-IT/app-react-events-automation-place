import { db } from '../db/accessor';
import { Category } from "../domain/category";

export default class CategoryService {

    getAllCategories(): Category[] {
        db.reload()
        const categories: Category[] = db.getData("/categories")
        return categories
    }
}