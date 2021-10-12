import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserMapComponent } from './user-map/user-map.component';

const routes: Routes = [
            {
              path: '',
              component:UserListComponent,
              data: {
                title: 'لیست کاربران '
              }
            },
            {
              path: 'usermap',
              component:UserMapComponent,
              data: {
                title: 'مختصات جغرافیایی کاربران'
              }
            }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
