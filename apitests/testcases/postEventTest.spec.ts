import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';
import { getRandomEvent } from '../generator/event';
import { registerUser } from '../actions/register';
import { loginUserAndGetToken } from '../actions/login';
import { Event } from '../../domain/event';

const testedEndpoint = '/api/events'

describe('POST /api/events', () => {
    test('should return 200 OK for authenticated user and valid event',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)
            const event = getRandomEvent()

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .set('Authorization', `Bearer ${token}`)
                .send(event);

            // then
            expect(response.status).toEqual(200)
            expect(response.body.id).toBeDefined()
        });

    test('should return 401 for unauthenticated user',
        async () => {
            // given
            const event = getRandomEvent()

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .send(event);

            // then
            expect(response.status).toEqual(401)
        });

    test('should return 401 for user with invalid token',
        async () => {
            // given
            const invalidToken = 'invalidToken'
            const event = getRandomEvent()

            // when
            const response = await apiServer
                .post(testedEndpoint)
                .set('Authorization', `Bearer ${invalidToken}`)
                .send(event);

            // then
            expect(response.status).toEqual(401)
        });
});