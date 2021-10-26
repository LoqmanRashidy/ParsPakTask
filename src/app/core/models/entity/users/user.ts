import { BaseEntity } from '../BaseEntity';
import { Person } from '../basesystem/Person';


export class User extends BaseEntity { 
  
  PersonId: number;
  Username: string;
  Password: string;
  RePassword: string;
  SerialNumber: string;
  Name: string;
  LastName: string;
  Mobile: string;
  Email: string;
  IsSystem: boolean;
  LastLoggedIn: string;
  PersianLastLoggedIn: string;
  
  Person: Person;
  UserRoles: UserRole[]=[];
  UserTokens: UserToken[]=[];

  ModelRoles: Role[] = [];

  constructor(values: Object = {}) {
    super({});
    Object.assign(this, values);
  }
}



export class Role {

  Id: number;
  EnTitle: string;
  FaTitle: string;

  UserRoles: UserRole[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

export class UserRole {

  RoleId: number;
  UserId: number;

  User: User;
  Role: Role;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

export class UserToken {

  Id: number;
  AccessTokenHash: string;
  AccessTokenExpiresDateTime: string;
  RefreshTokenIdHash: string;
  RefreshTokenIdHashSource: string;
  RefreshTokenExpiresDateTime: string;
  UserId: number;

  User: User;
}
