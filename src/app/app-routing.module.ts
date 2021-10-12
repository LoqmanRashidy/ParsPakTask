import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'لیست کابران'
    },
    children: [
      //-------------------------------new and main address------------------------
     //  {
     //   path: 'customers',
     //   loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule)
     // },
     {
       path:'',
       loadChildren: () => import('./view/users/users.module').then(m => m.UsersModule)
     },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
