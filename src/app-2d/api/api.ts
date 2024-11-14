import { CreateUserBodyDTO, LoginDTO } from './api.dto';

export class API {
  static apiUrl = 'https://portfolio-backend-ahyh.onrender.com/';
  static password = 'password';
  static amazonCustomerId = '67143e89f2d2934ae81d9c2e';
  static walmartCustomerId = '67143e9bf2d2934ae81d9c30';
  static amazonUserIdGet = '67143f2ef2d2934ae81d9c34';
  static walmartUserIdGet = '671490fee87b2f5922668902';
  static amazonUserIdPatch = '6726e4b1e0672fdc722aea23';
  static walmartUserIdPatch = '671490fee87b2f5922668902';

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

  public static async getAllUsers(token: string, customer?: string) {
    const resp = await fetch(
      this.apiUrl +
        'users' +
        `/${customer === 'amazon' ? `/customer/${this.amazonCustomerId}` : customer === 'walmart' ? `/customer/${this.walmartCustomerId}` : ''}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const data = await resp.json();
    return data;
  }

  public static async getUserById(token: string, customer: string) {
    const resp = await fetch(
      this.apiUrl +
        'users/' +
        `${customer === 'amazon' ? this.amazonUserIdGet : this.walmartUserIdGet}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const data = await resp.json();
    return data;
  }

  public static async createUser(
    token: string,
    customer: string,
    userRole: string,
    body: Partial<CreateUserBodyDTO>,
  ) {
    body.customerId =
      customer === 'amazon' ? this.amazonCustomerId : this.walmartCustomerId;
    body.roleId = userRole;
    const resp = await fetch(this.apiUrl + 'users/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return data;
  }
}
