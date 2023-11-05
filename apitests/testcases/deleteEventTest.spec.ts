import { v4 as uuidv4 } from 'uuid';
import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';
import { getRandomEvent } from '../generator/event';
import { registerUser } from '../actions/register';
import { loginUserAndGetToken } from '../actions/login';
import { postEvent } from '../actions/event';

const testedEndpoint = '/api/events';

describe('DELETE /api/events/[id]', () => {
    test('should return 204 NO CONTENT for authenticated user and existing event',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)
            const event = getRandomEvent()
            const eventId = await postEvent(event, token)

            // when
            const response = await apiServer
                .delete(`${testedEndpoint}/${eventId}`)
                .set('Authorization', `Bearer ${token}`);

            // then
            expect(response.status).toEqual(204)
        });

    test('should return 404 NOT FOUND for authenticated user and nonexisting event',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)
            const id = uuidv4()

            // when
            const response = await apiServer
                .delete(`${testedEndpoint}/${id}`)
                .set('Authorization', `Bearer ${token}`);

            // then
            expect(response.status).toEqual(404)
        });

    test('should return 401 for unauthenticated user',
        async () => {
            // given
            const id = uuidv4()

            // when
            const response = await apiServer
                .delete(`${testedEndpoint}/${id}`);

            // then
            expect(response.status).toEqual(401)
        });

    test('should return 401 for user with invalid token',
        async () => {
            // given
            const invalidToken = 'invalidToken'
            const event = getRandomEvent()
            const id = uuidv4()

            // when
            const response = await apiServer
                .delete(`${testedEndpoint}/${id}`)
                .set('Authorization', `Bearer ${invalidToken}`);

            // then
            expect(response.status).toEqual(401)
        });
});