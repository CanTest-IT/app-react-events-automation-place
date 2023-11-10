import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';
import { registerUser } from '../actions/register';
import { loginUserAndGetToken } from '../actions/login';
import { Category } from '../../domain/category';

const testedEndpoint = '/api/categories'

describe('GET /api/categories', () => {
    test('should return 200 OK for authenticated user',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)

            // when
            const response = await apiServer
                .get(testedEndpoint)
                .set('Authorization', `Bearer ${token}`);

            // then
            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expect.arrayContaining<Category>([]))
        });

    test('should return 401 for unauthenticated user',
        async () => {
            // when
            const response = await apiServer
                .get(testedEndpoint);

            // then
            expect(response.status).toEqual(401)
        });

    test('should return 401 for user with invalid token',
        async () => {
            // given
            const invalidToken = 'invalidToken'

            // when
            const response = await apiServer
                .get(testedEndpoint)
                .set('Authorization', `Bearer ${invalidToken}`);

            // then
            expect(response.status).toEqual(401)
        });
});