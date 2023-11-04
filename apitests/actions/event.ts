import { Event } from "../../domain/event";
import { apiServer } from "../utils/constants";

export const postEvent = async (event: Event, token: string) => {
    const response = await apiServer
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(event);

    expect(response.status).toEqual(200)
    return response.body.id
}