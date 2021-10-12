import { getLocaleDateFormat } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ColumnItem, Geo, User } from 'src/app/models/User';
import { ApiUserService } from 'src/app/services/api-user.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { UserMapComponent } from '../user-map/user-map.component';
import { UsersModule } from '../users.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  
  public listOfUser:User[]=[];
  public Users:User[]=[];
  public user:any;
  public listOfFilter:any;
  public listOfColumns: ColumnItem[] = [];
  public checked = false;
  public indeterminate = false;
  public listOfCurrentPageData: readonly User[] = [];
  public citySearchValue = '';
  public idSearchValue = '';
  public nameSearchValue = '';
  public usernameSearchValue = '';
  public emailSearchValue = '';
  public visible = false;
  public isVisible = false;
  public isConfirmLoading = false;

  constructor(
    public apiUserService:ApiUserService,
    private modalService: NzModalService
  ) { }

    ngOnInit(): void {
      this.getData();
      this.listOfColumns= [
        {
          name: 'id',
          sortOrder: null,
          sortFn: (a: User, b: User) =>  a.id - b.id,
          listOfFilter: [],
          filterFn: (list: string[], item: User) => list.some(name => item.name.indexOf(name) !== -1)
        },
        {
          name: 'name',
          sortOrder: null,
          sortFn: (a: User, b: User) => a.name.localeCompare(b.name),
          listOfFilter: [],
          filterFn: (list: string[], item: User) => list.some(name => item.name.indexOf(name) !== -1)
        },
        {
          name: 'username',
          sortOrder: null,
          sortFn: (a: User, b: User) => a.username.localeCompare(b.username),
          listOfFilter: [],
          filterFn: (list: string[], item: User) => list.some(username => item.username.indexOf(username) !== -1)
        },
        {
          name: 'email',
          sortOrder: null,
          sortFn: (a: User, b: User) => a.email.localeCompare(b.email),
          listOfFilter: [],
          filterFn: (list: string[], item: User) => list.some(email => item.email.indexOf(email) !== -1)
        },
        {
          name: 'city',
          sortOrder: null,
          sortFn: (a: User, b: User) => a.address.city.localeCompare(b.address.city),
          listOfFilter: [],
          filterFn: (list: string[], item: User) => list.some(city => item.address.city.indexOf(city) !== -1)
        }
      ];
  
    }


    getData(){
      this.listOfUser=[];
      this.apiUserService.GetAllUsers().subscribe((data: any) => {
       this.listOfUser = data
       this.Users=data;
       // this.blockUI.stop();
     });
    }

  
    trackByName(_: number, item: User): string {
      return item.name;
    }
  

    onCurrentPageDataChange($event: readonly User[]): void {
      this.listOfCurrentPageData = $event;
    }

 
    reset(): void {
      this.search();
    }
  
    search(): void {
      this.visible = false;
      this.listOfUser=this.Users;
      if(this.idSearchValue?.length>0)
        this.listOfUser = this.listOfUser.filter((item: User) => item.id.toLocaleString().indexOf(this.idSearchValue) !== -1);
      if(this.nameSearchValue?.length>0)
          this.listOfUser = this.listOfUser.filter((item: User) => item.name.indexOf(this.nameSearchValue) !== -1);
      if(this.usernameSearchValue?.length>0)
          this.listOfUser = this.listOfUser.filter((item: User) => item.username.indexOf(this.usernameSearchValue) !== -1);
      if(this.emailSearchValue?.length>0)
          this.listOfUser = this.listOfUser.filter((item: User) => item.email.indexOf(this.emailSearchValue) !== -1);
      if(this.citySearchValue?.length>0)
          this.listOfUser = this.listOfUser.filter((item: User) => item.address.city.indexOf(this.citySearchValue) !== -1);
      
    }

    showMap(lat:number,lng:number,title: string): void {
      this.modalService.create({
        nzTitle: 'Location Of Company For User',
        nzContent: UserMapComponent,
        nzComponentParams: {
          lat: lat,
          lng: lng,
          title:title
        },
      });
    }
    // showDetails(data: User): void {
    //   this.modalService.create({
    //     nzTitle: 'Modal Title',
    //     nzContent: UserDetailsComponent,
    //     nzComponentParams: {
    //       user: data
    //     },
    //   });
    // }
    
  
    showDetails(data: User): void {
      this.isVisible = true;
      this.user=data;
    }

  
    handleOk(): void {
      this.isVisible = false;
    }
  
    handleCancel(): void {
      this.isVisible = false;
    }

}
