import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const db = new JsonDB(new Config("./data.json", true, false, '/'));

export default async function login(req, res) {
    console.log(req.body); // Log the request body
  
    const { login, password } = req.body // Change username to login
  
    try {
      const users = await db.getData("/users");
      console.log(users); // Log the users data
  
      const user = users.find(user => user.username === login); // Change username to login
      console.log(user); // Log the user data
  
   

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const passwordIsValid = password === user.password;
    if (!passwordIsValid) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.NEXT_PUBLIC_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
}