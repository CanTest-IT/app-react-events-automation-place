import { NextApiRequest, NextApiResponse } from "next"
import ImagesService from "../../../service/ImagesService"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const images = ImagesService.getImages()
    res.status(200)
    res.json(images)
}