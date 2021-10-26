import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationClassRoutingModule } from './education-class-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassBanerComponent } from './class-baner/class-baner.component';
import { ClassMainComponent } from './class-main/class-main.component';


@NgModule({
  declarations: [
    ClassListComponent,
    ClassBanerComponent,
    ClassMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    EducationClassRoutingModule
  ]
})
export class EducationClassModule { }
