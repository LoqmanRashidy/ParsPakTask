import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'مدیریت سطوح دسترسی'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'فرم ورود'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
