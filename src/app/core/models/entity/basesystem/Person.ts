import { BaseEntity } from '../BaseEntity';
import { Course, StudentCourse } from '../Courses/Course';
import { User, UserToken } from '../users/user';

export class Person extends BaseEntity{


  Name: string
  LastName: string
  Mobile: string
  Gender: number
  GenderTitle: string
  BirthDate: Date
  FileId : string
  Ext: string
  FileName: string
  IsVideo: boolean
  Address: string
  Grade: number
  GradeTitle: string
  Password:string
  RePassword:string
  User: User

  Courses: Course[]=[]
  UserTokens: UserToken[]=[]
  StudentCourses:StudentCourse[]=[]

  constructor(values: Object = {}) {
    super({})
    Object.assign(this, values);
  }
}


export class PersonDetails extends BaseEntity {

   PersonId: number
   KeyId: number
   KeyName: string
   Value: string 
   Description: string
   CallerId: number
   CustomerId: number
   CustomerFamily: string
   Person: Person

  constructor(values: Object = {}) {
    super({})
    Object.assign(this, values);
  }

}

