import { apiServer } from '../utils/constants';
import { getRandomUser } from '../generator/user';

describe('POST /auth/register', () => {
    it('should return 201 OK', async () => {
        // given
        const user = getRandomUser()

        // when
        const response = await apiServer
            .post('/api/auth/register')
            .send(user);

        // then
        expect(response.status).toEqual(201)
    });

});