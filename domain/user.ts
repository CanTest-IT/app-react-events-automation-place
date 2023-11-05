export interface User extends UserWithoutPassword {
    password: string,
}

export interface UserWithoutPassword {
    login: string,
    name: string,
    lastname: string,
    age: number
}