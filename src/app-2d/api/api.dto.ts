import { Role } from '../../utilties/enum/enum';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface CreateUserBodyDTO {
  name: string;
  username: string;
  password: string;
  customerId: string;
  roleId: string;
}

export interface UpdateUserBodyDTO {
  name?: string;
  username?: string;
  password?: string;
  customerId?: string;
  roleId?: string;
}
