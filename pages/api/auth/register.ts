// register.ts
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import { JWT_SECRET } from '../../../jwt'
import UserService from '../../../service/UserService'

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, email } = req.body

  const userService = new UserService()
  const existingUser = await userService.getUserByUsername(username)

  if (existingUser) {
    res.status(400).send({ error: 'Username already exists' })
    return
  }

  const id = uuidv4().toString() // Ensure this is a string

  userService.createUser({
    id,
    username,
    password,
    email
  })

  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  })

  res.status(200).send({ auth: true, token })
}