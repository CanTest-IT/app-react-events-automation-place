import TokenService from '../service/TokenService';

/**
 * This file is a middle ground between frontend and API.
 * It contain calls to APIs which require JWT token
 * For API logic go to pages/api
 */

const secureApiAccess = {
    getEvents: async () => {
        const res = await fetch('/api/events', {
            headers: authHeaders()
        });
        if (res.status === 401) TokenService.forceLogout();
        return await res.json();
    },

    getCategories: async () => {
        const res = await fetch('/api/categories', {
            headers: authHeaders()
        });
        if (res.status === 401) TokenService.forceLogout();
        return await res.json();
    },

    getImages: async () => {
        const res = await fetch('/api/images', {
            headers: authHeaders()
        });
        if (res.status === 401) TokenService.forceLogout();
        return await res.json();
    },

    deleteEvent: async (id: string) => {
        const res = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (res.status === 401) TokenService.forceLogout();
        return res.status === 204 ? {} : await res.json();
    },

    createEvent: async (body: any) => {
        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (res.status === 401) TokenService.forceLogout();
        return await res.json();
    },

    updateEvent: async (id: string, body: any) => {
        const res = await fetch(`/api/events/${id}`, {
            method: 'PUT',
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (res.status === 401) TokenService.forceLogout();
        return await res.json();
    }
}

const authHeaders = () => {
    return {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
    };
}

export default secureApiAccess;