import fs from 'fs'
import path from 'path'

class ImagesService {
    getImages() {
        const filePath = path.resolve('.', `public/assets/thumbs`)
        const list = fs.readdirSync(filePath, { withFileTypes: true })
        return list.map(elem => elem.name)
    }
}

export default new ImagesService()