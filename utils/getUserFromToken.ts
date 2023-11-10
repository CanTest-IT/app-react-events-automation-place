// utils/getUserFromToken.ts
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../jwt';
import UserService from '../service/UserService';
import { GetServerSidePropsContext } from 'next';

export async function getUserFromToken(context: GetServerSidePropsContext) {
    const { cantest_token } = context.req.cookies;
    let user = null;
    if (cantest_token) {
        const userFromToken = jwt.verify(cantest_token, JWT_SECRET);
        if (userFromToken && typeof userFromToken !== 'string') {
            user = new UserService().getUserByLogin(userFromToken.login);
        }
    }
    return user;
}