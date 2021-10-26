import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterMainComponent } from './register-main/register-main.component';

const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    data: {
      title: 'registers'
    },
    children: [
      {
        path: 'registerclass',
        component: RegisterMainComponent,
        data: {
          title: 'register class'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistersRoutingModule { }
