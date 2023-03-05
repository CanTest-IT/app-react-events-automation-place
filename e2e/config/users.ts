export enum Users {
  Admin = 'admin',
  Standard = 'standard'
}

export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const users: Record<Users, User> = {
  [Users.Admin]: {
    username: 'user',
    password: 'password',
    firstName: 'Event',
    lastName: 'Manager'
  },
  [Users.Standard]: {
    username: 'user',
    password: 'test',
    firstName: 'Alice',
    lastName: 'Smith'
  },
}

export const getUser = (user: Users): User => users[user];
