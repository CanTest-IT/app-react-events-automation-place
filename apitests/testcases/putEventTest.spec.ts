import { v4 as uuidv4 } from 'uuid';
import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';
import { getRandomEvent } from '../generator/event';
import { registerUser } from '../actions/register';
import { loginUserAndGetToken } from '../actions/login';
import { postEvent } from '../actions/event';

const testedEndpoint = '/api/events';

describe('PUT /api/events/[id]', () => {
    test('should return 404 OK for authenticated user and nonexisting event',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)
            const event = getRandomEvent()
            const id = uuidv4()

            // when
            const response = await apiServer
                .put(`${testedEndpoint}/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(event);

            // then
            expect(response.status).toEqual(404)
        });

    test('should return 200 OK for authenticated user and valid existing event',
        async () => {
            // given
            const user = getRandomUser()
            await registerUser(user)
            const token = await loginUserAndGetToken(user)
            const event = getRandomEvent()
            const eventId = await postEvent(event, token)

            // when
            const response = await apiServer
                .put(`${testedEndpoint}/${eventId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...event,
                    id: eventId,
                    description: event.description + "edit text"
                });

            // then
            expect(response.status).toEqual(200)
        });

    test('should return 401 for unauthenticated user',
        async () => {
            // given
            const event = getRandomEvent()
            const id = uuidv4()

            // when
            const response = await apiServer
                .put(`${testedEndpoint}/${id}`)
                .send(event);

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
                .put(`${testedEndpoint}/${id}`)
                .set('Authorization', `Bearer ${invalidToken}`)
                .send(event);

            // then
            expect(response.status).toEqual(401)
        });
});