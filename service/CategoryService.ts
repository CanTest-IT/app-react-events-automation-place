import { db } from '../db/accessor';
import { Category } from "../domain/category";

export default class CategoryService {

    static getAllCategories(): Category[] {
        db.reload()
        const categories: Category[] = db.getData("/categories")
        return categories
    }

    static getCategoryCodes(): string[] {
        return CategoryService.getAllCategories()
            .map((category) => category.code)
    }
}