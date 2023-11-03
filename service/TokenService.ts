import nookies from 'nookies';

export default class TokenService {

    static forceLogout = () => {
        nookies.destroy(null, 'cantest_token'); // Remove the token from the cookies
        window.location.href = '/login';
    }

}