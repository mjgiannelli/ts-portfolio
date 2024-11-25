import { UserId } from '../../utilties/enum/enum';
import { CreateUserBodyDTO, LoginDTO, UpdateUserBodyDTO } from './dtos/api.dto';

export class API {
  static apiUrl = 'https://portfolio-backend-ahyh.onrender.com/';
  static password = 'password';
  static amazonCustomerId = '67143e89f2d2934ae81d9c2e';
  static walmartCustomerId = '67143e9bf2d2934ae81d9c30';

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
        `/${customer === 'amazon' ? `customer/${this.amazonCustomerId}` : customer === 'walmart' ? `customer/${this.walmartCustomerId}` : ''}`,
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
        `${customer === 'amazon' ? UserId.Amazon_User : UserId.Walmart_User}`,
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
    if (body.roleId) delete body['roleId'];
    body.customerId =
      customer === 'amazon' ? this.amazonCustomerId : this.walmartCustomerId;
    body.roleId = userRole;
    const resp = await fetch(this.apiUrl + 'users', {
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

  public static async deleteUser(token: string, userId: string) {
    const resp = await fetch(this.apiUrl + `users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await resp.json();
    return data;
  }

  public static async updateUser(
    token: string,
    customer: string,
    userRole: string | null,
    body: Partial<UpdateUserBodyDTO>,
  ) {
    if (body.roleId) delete body['roleId'];
    if (userRole !== '') body.roleId = userRole as string;
    const resp = await fetch(
      this.apiUrl +
        'users/' +
        (customer === 'amazon' ? UserId.Amazon_User : UserId.Walmart_User),
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const data = await resp.json();
    return data;
  }
}
