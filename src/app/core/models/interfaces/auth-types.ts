export interface AuthUser {
  userId: string;
  userName: string;
  displayName: string;
  roles: string[] | null;
}

export interface Credentials {
  username: string;
  password: string;
  rememberMe: boolean;
  RecaptchaToken: string;
}

export interface ChangePasswordByAdmin {
  Password: string;
  Id: number;
}

export interface AuthGuardPermission {
  permittedRoles?: string[];
  deniedRoles?: string[];
}

export enum AuthTokenType {
  AccessToken,
  RefreshToken,
  UserData,
  Person,
  Consts
}
