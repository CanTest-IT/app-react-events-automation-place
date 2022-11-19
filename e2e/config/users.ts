import {Users} from '../constants'
import {User} from '../types'

const users: Record<Users, User> = {
  [Users.Admin]: {
    email: 'user',
    password: 'password'
  }
}

export const getUser = (user: Users) => {
  return users[user]
}
