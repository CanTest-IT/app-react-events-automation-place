import fs from 'fs'
import path from 'path'

export default class ImagesService {
    static getImages() {
        const filePath = path.resolve('.', `public/assets/thumbs`)
        const list = fs.readdirSync(filePath, { withFileTypes: true })
        return list.map(elem => elem.name)
    }
}
