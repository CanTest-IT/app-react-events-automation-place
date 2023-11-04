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
    }
}

const authHeaders = () => {
    return {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
    };
}

export default secureApiAccess;