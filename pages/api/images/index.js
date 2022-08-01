import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
    const filePath = path.resolve('.', `public/assets/thumbs`)
    const list = fs.readdirSync(filePath, { withFileTypes: true })
    res.status(200)
    res.json(list.map(elem => elem.name))
}