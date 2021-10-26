import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Helpers } from '../../../shared/helper/helpers';
import { Resources } from '../../../shared/helper/resource';
import { CourseViewModels } from '../../../core/models/viewmodels/viewModel';
import { ApiCourseService } from '../../../core/services/Course/api-Course.service';
import { StudentCourse } from '../../../core/models/entity/Courses/Course';
import { Globals } from '../../../shared/helper/globals';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  public courseBaseImagePath: string="";
  public personBaseImagePath: string="";
  public model: StudentCourse;
  public Courses: CourseViewModels[]=[];

  @Input() id:number=0;
  
  constructor(
    private ApiCourseService:ApiCourseService,
    private global: Globals,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.courseBaseImagePath=Helpers._apiurlCourseFiles;
    this.personBaseImagePath=Helpers._apiurlPersonFiles;
    this.getAllCourse()
  }

  getAllCourse(){
    this.Courses=[];
    if(this.id>0 && this.global.sessionPerson.Id)
    {
      this.ApiCourseService.GetAllStudentCourse(this.global.sessionPerson.Id).subscribe((data: any) => {
        this.Courses =data;
      });
    }
    else{
      this.ApiCourseService.GetAllFreeCourse(this.global.sessionPerson!= null? this.global.sessionPerson.Id:0).subscribe((data: any) => {
        this.Courses =data;
      });
    }
  

  }

  rateCounter(i: number) {
    return new Array(i);
  } 

  regClass(id: number){

    if(this.global.sessionPerson != undefined && this.global.sessionPerson != null && this.global.sessionPerson.Id>0)
    {
      this.model= new StudentCourse( {
        PersonId:this.global.sessionPerson.Id,
        CourseId: id
      } as StudentCourse);

      this.ApiCourseService.AddEditStudentCourse(this.model)
      .subscribe((_model: any) => {
        if(_model.status==200|| _model.Id>0)
        {
           this.toastr.success(Resources.success,Resources.successTitle);
           let index=this.Courses.findIndex(x=>x.Id==id);
           if(index>=0)
           {
              let item:any= this.Courses.find(x=>x.Id==id);
              item.IsReg=true;
              this.Courses[index]=item;
              // (document.getElementById("lblmsg") as HTMLTextAreaElement).value="Registered";
              // (document.getElementById("lblmsg") as HTMLTextAreaElement).style.borderColor="green";
           }
          
           
           this.model= new StudentCourse();
        }
        
  
      },
        (error: any) => {
          if (error.status === 401) {
            this.toastr.error(error.error, Resources.errorTitle);
  
          }
          else if (error.status === 400) {
            this.toastr.error(error.error, Resources.errorTitle);
  
          }
          else {
            this.toastr.error(Resources.error, Resources.errorTitle);
          }
        },
        () => {
        
        }
  
      );

     
    }
    else
    {
      this.router.navigateByUrl('/registers/registerclass');
    }
  }
}
