export enum Users {
  Admin = 'admin',
  Standard = 'standard'
}

type User = {
  username: string;
  password: string;
  fullName: string;
}

const users: Record<Users, User> = {
  [Users.Admin]: {
    username: 'user',
    password: 'password',
    fullName: 'Event Manager'
  },
  [Users.Standard]: {
    username: 'user',
    password: 'password',
    fullName: 'Event Manager'
  }
}

export const getUser = (user: Users): User => {
  return users[user]
}
