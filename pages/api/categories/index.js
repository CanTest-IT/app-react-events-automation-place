import CategoryService from "../../../service/CategoryService";

export default function handler(req, res) {
    const categoryService = new CategoryService()
    switch (req.method) {
        case 'GET':
            const categories = categoryService.getAllCategories()
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(categories)
            break;
    }
}