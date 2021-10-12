import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserMapComponent } from './user-map/user-map.component';

const routes: Routes = [
            {
              path: '',
              component:UserListComponent,
              data: {
                title: 'لیست راننده '
              }
            },
            {
              path: 'userdetails/:id/:name',
              component:UserDetailsComponent,
              data: {
                title: 'ثبت راننده '
              }
            },
            {
              path: 'usermap',
              component:UserMapComponent,
              data: {
                title: 'ویرایش راننده '
              }
            }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
