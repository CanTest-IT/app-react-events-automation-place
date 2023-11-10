import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';
import { registerUser } from '../actions/register';
import { wrongLoginOrPassword } from '../../service/UserService';

const testedEndpoint = '/api/auth/login'

describe('POST /auth/login', () => {
    test('should return 200 OK for existing user',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send({
                    login: user.login,
                    password: user.password
                });

            // then
            expect(response.status).toEqual(200)
            expect(response.body).not.toEqual({})
        });

    test('should return 401 for unknown user',
        async () => {
            // given
            const unregisteredUser = getRandomUser()

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send({
                    login: unregisteredUser.login,
                    password: unregisteredUser.password
                });

            // then
            expect(response.status).toEqual(401)
            expect(response.body.error).toEqual(wrongLoginOrPassword)
        });

    test('should return 401 for wrong password',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send({
                    login: user.login,
                    password: 'wrongPassword'
                });

            // then
            expect(response.status).toEqual(401)
            expect(response.body.error).toEqual(wrongLoginOrPassword)
        });

});