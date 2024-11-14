export interface LoginDTO {
  username: string;
  password: string;
}

export interface CreateUserBodyDTO {
  name: string;
  username: string;
  password: string;
  customerId?: string;
  userRoleId?: string;
}

export interface UpdateUserBodyDTO {
  name?: string;
  username?: string;
  password?: string;
  customerId?: string;
  userRoleId?: string;
}
