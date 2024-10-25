import { jwtDecode } from 'jwt-decode';
import { DecodedTokenDTO } from './dtos/auth.dtos';

class AuthService {
  getProfile(token: string) {
    const profile = this.getToken(token);

    if (profile) {
      const decodedT = jwtDecode<DecodedTokenDTO>(profile);
      return decodedT;
    } else {
      return false;
    }
  }

  loggedIn() {
    const token = this.getToken('id_token');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<DecodedTokenDTO>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken(token: string) {
    const returnToken = localStorage.getItem(token);

    if (returnToken) {
      return returnToken;
    } else {
      return false;
    }
  }

  login(idToken: string, refreshToken: string) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('refresh_token', refreshToken);

    window.location.assign('/');
  }

  autoLogin(idToken: string, refreshToken: string, studentId: string) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('studentId', studentId);

    window.location.assign('/');
  }

  updateToken(idToken: string) {
    localStorage.setItem('id_token', idToken);
  }

  async logout() {
    const loggedInUser = this.getProfile('id_token');

    if (loggedInUser) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('studentId');

      window.location.assign('/');
    }
  }
}
export default new AuthService();
