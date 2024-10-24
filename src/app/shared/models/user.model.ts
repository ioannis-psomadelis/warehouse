export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface User {
  username: string;
  role: UserRole;
}

export interface UserLogin {
  username: string;
  password: string;
}
