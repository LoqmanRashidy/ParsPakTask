import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistersRoutingModule } from './registers-routing.module';
import { RegisterMainComponent } from './register-main/register-main.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RegisterMainComponent,
    RegisterFormComponent,
    
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    RegistersRoutingModule
  ]
})
export class RegistersModule { }
