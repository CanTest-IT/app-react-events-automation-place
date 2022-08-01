import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
    const filePath = path.resolve('.', `public/assets/thumbs/${req.query.id}`)
    const imageBuffer = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'image/jpg')
    res.send(imageBuffer)
}