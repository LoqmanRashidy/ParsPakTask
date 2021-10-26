
import { BaseEntity } from '../BaseEntity';
import { Person } from '../basesystem/Person';
export class Course extends BaseEntity{


  Title:string
  PersonId: number
  Price: number
  Rate: number
  FileId: string
  Ext: string
  FileName: string

  Person: Person

  StudentCourses: StudentCourse[]
     
    constructor(values: Object = {}) {
      super({})
      Object.assign(this, values);
    }

}


  export class StudentCourse extends BaseEntity{

     PersonId: number
     CourseId: number
     
     Person: Person
    Course: Course

      constructor(values: Object = {}) {
        super({})
        Object.assign(this, values);
      }
    }

