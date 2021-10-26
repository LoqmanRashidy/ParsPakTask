import { User } from './users/user';

export class Result {

  result: ResultCrud = new ResultCrud();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class ResultCrud {

  message: string = '';
  error: boolean = false;
  code: number = 0;
  data?: any = null;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}


export class BaseEntity extends Result {

  Id = 0;
  IsActive: boolean= true;
  IsDelete: boolean = false;
  CreatedDate: Date;
  PersianCreatedDate: string;
  UserId: number;
  
  User: User;
  constructor(values: Object = {}) {
    super({})
    Object.assign(this, values);
  }
}
