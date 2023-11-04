import nookies from 'nookies';

export default class TokenService {

    static forceLogout = () => {
        nookies.destroy(null, 'cantest_token'); 
        window.location.href = '/login';
    }

    static getAuthToken = () => {
        const cookies = nookies.get();
        return cookies.cantest_token;
    }

}