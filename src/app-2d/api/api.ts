import { LoginDTO } from './api.dto';

export class API {
  static apiUrl = 'https://portfolio-backend-ahyh.onrender.com/';
  static password = 'password';

  public static async wakeUpApi() {
    const resp = await fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await resp;
    return data;
  }

  public static async login(username: string) {
    const body: LoginDTO = {
      username: username,
      password: this.password,
    };
    const resp = await fetch(this.apiUrl + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return data;
  }
}
