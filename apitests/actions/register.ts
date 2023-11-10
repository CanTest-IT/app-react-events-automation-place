import { User } from "../../domain/user";
import { apiServer } from "../utils/constants";

export const registerUser = async (user: User) => {
    const response = await apiServer
        .post('/api/auth/register')
        .send(user);

    // then
    expect(response.status).toEqual(201)
}