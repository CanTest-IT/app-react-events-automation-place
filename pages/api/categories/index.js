import CategoryService from "../../../service/CategoryService";

export default async function handler(req, res) { // Add async keyword
    const categoryService = new CategoryService()
    switch (req.method) {
        case 'GET':
            const categories = await categoryService.getAllCategories() // Add await keyword
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(categories)
            break;
    }
}