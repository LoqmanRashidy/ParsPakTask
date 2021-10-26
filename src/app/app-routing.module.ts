import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LoginComponent } from './view/users/login/login.component';

const routes: Routes = [

 
  {
    
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'main layot'
    },
    children: [
      //-------------------------------new and main address------------------------
     //  {
     //   path: 'customers',
     //   loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule)
     // },
     {
       path:'',
       loadChildren: () => import('./view/education-class/education-class.module').then(m => m.EducationClassModule)
     },
          {
       path:'registers',
       loadChildren: () => import('./view/registers/registers.module').then(m => m.RegistersModule)
     },
   ]
  },
  {

    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'main layot'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'main layot'
        },
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
