import { Component, OnInit } from '@angular/core';
import { ApiCourseService } from '../../../core/services/Course/api-Course.service';
import { ApiPersonService } from '../../../core/services/basesystem/api-person.service';
import { ApiSettingService } from '../../../core/services/basesystem/api-setting.service';
import { Person } from '../../../core/models/entity/basesystem/Person';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { Enum, FileType } from '../../../core/models/viewmodels/enum';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from '../../../shared/helper/helpers';
import { Resources } from '../../../shared/helper/resource';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {


  public imagePath: string;
  public imgURL1: any;
  public enumGenderType: Enum[];
  public enumGradeType : Enum[];
  public model: Person
  public filesSubmit: File[] = [];
  public fileType: FileType[]=[];
  public isNotsame:boolean= true;
  public dateTime: NgbDateStruct;
  date: {year: number, month: number};
  constructor(
    private ApiPersonService:ApiPersonService,
    private ApiSettingService:ApiSettingService,
    public router: Router,
    private toastr: ToastrService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.model= new Person();
    this.model.Gender=1;
    this.isNotsame=false;
    this.getEnumList();
  }


  getEnumList()
  {
    this.ApiSettingService.GetEnumGenderType().subscribe((data: any) => {
      this.enumGenderType =data;
    });


    this.ApiSettingService.GetEnumGrade().subscribe((data: any) => {
      this.enumGradeType =data;
    });

  }

  selectChange(item:number)
  {
    this.model.Gender=item;
  }

comparePassword():boolean
{
  if(this.model?.Password != undefined && this.model?.Password!= null && this.model?.Password!= "" &&
    this.model?.RePassword != undefined && this.model?.RePassword!= null && this.model?.RePassword!= "" &&
    this.model?.Password==this.model?.RePassword 
  && this.model?.Password?.length==this.model?.RePassword?.length)
  {
   return false;
  }
  else
  {
    return true
  }
}
onDateSelection(date: NgbDate) {
  this.model.BirthDate=new Date(date.year,date.month,date.day);
}
  onFileChange(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.item(0).size > Helpers.FileUploadSizeLimit) {
        this.toastr.warning('حجم فایل نباید بیش از 200 کیلوبایت باشد.', '', {
          enableHtml: true,
          positionClass: 'toast-bottom-left'
        });
        return;
      }
    }

    

    var filesAmount = event.target.files.length;

    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL1 = reader.result; 
    }
    var indexType=this.fileType.findIndex(x=>x.Type==1);
    if(indexType!=-1)
    {
      const itemType:any=this.fileType.find(x=>x.Type==1);
      var indexFile=this.filesSubmit.findIndex(x=>x.name==itemType.Name);
      this.fileType.splice(indexType,1);
      this.filesSubmit.splice(indexFile,1);
    }
    for (let i = 0; i < filesAmount; i++) {
      this.filesSubmit.push(event.target.files[i]);
      this.fileType.push({Name:event.target.files[i].name,Type:1});
   
    }
  
  }

  validate():boolean
  {
        if(this.model.Name==null || this.model.Name=="" 
        ||this.model.LastName==null ||this.model.LastName==""
        || this.model.Mobile==null || this.model.Mobile=="" 
        ||this.model.Password==null ||this.model.Password==""
        ||this.model.RePassword==null ||this.model.RePassword==""
        ||this.model.Address==null ||this.model.Address==""
        ||this.model.BirthDate==null
        )
        return true;
        else return false;
  }
  submit()
  {

    this.ApiPersonService.FreeAddEditWithUploadPerson(this.model,this.fileType, this.filesSubmit)
    .subscribe((_model: any) => {
      if(_model.status==200|| _model.Id>0)
      {
         this.toastr.success(Resources.success,Resources.successTitle);
         this.model= new Person();
         this.model.Gender=1;
         this.filesSubmit=[];
         this.fileType=[];
         this.imgURL1=null;
         this.router.navigateByUrl('/classlist');
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

  cancel()
  {
    this.model= new Person();
  }
}
