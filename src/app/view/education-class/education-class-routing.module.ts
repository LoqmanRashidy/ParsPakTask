import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassMainComponent } from './class-main/class-main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'main page'
    },
    children: [
      {
        path: '',
        component: ClassMainComponent,
        data: {
          title: 'list of class'
        }
      },
      {
        path: 'classlist',
        component: ClassMainComponent,
        data: {
          title: 'list of class'
        }
      },
      {
        path: 'classlist/:id',
        component: ClassMainComponent,
        data: {
          title: 'list of my class'
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationClassRoutingModule { }
