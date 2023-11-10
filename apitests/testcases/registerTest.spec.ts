import { apiServer } from '../utils/constants';
import { getRandomUser, getRandomUserWithLogin } from '../generator/user';
import { registerUser } from '../actions/register';
import { userAlreadyExists } from '../../service/UserService';

const testedEndpoint = '/api/auth/register'

describe('POST /auth/register', () => {
    test('should return 201 OK for new registration',
        async () => {
            // given
            const user = getRandomUser()

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send(user);

            // then
            expect(response.status).toEqual(201)
        });

    test('should return 400 if user exists',
        async () => {
            // given
            const userAlreadyRegistered = getRandomUser()
            await registerUser(userAlreadyRegistered)
            const userToRegister = getRandomUserWithLogin(userAlreadyRegistered.login)

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send(userToRegister);

            // then
            expect(response.status).toEqual(400)
            expect(response.body.error).toEqual(userAlreadyExists)
        });

});