
export class CourseViewModels
{
   Id : number
   Title: string

   PersonId: number

   Price : number

   Rate: number

   FileId : string
   Ext: string
   FileName: string
   CreatedDate: Date

   TeacherName: string
   TeacherLastName : string
   Gender: number
   GenderTitle: string

  TeacherFileId: string
  TeacherExt: string
  TeacherFileName: string
  IsReg:boolean

}


export class PersonViewModels
{
    Id : number
    Name: string
    LastName: string
    Mobile: string
    Gender: number
    GenderTitle: string
    BirthDate: Date
    FileId: string
    Ext: string
    FileName : string

}

