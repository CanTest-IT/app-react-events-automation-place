import { User } from "../../domain/user";
import { apiServer } from "../utils/constants";

export const loginUserAndGetToken = async (user: User) => {
    const response = await apiServer
        .post('/api/auth/login')
        .send({
            login: user.login,
            password: user.password
        });

    // then
    expect(response.status).toEqual(200)
    return response.body
}