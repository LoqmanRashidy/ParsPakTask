import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPermissionsModule } from 'ngx-permissions';

import { HttpErrorHandler } from '../core/services/auth/http-error-handler.service';
import { RegisterBanerComponent } from '../view/registers/register-baner/register-baner.component';
const HP_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxPermissionsModule,

];

const PROVIDERS = [  HttpErrorHandler];

@NgModule({
  imports: [HP_MODULES

  ],
  entryComponents: [
  ],
  declarations: [ RegisterBanerComponent,
  ],
  exports: [
    HP_MODULES,RegisterBanerComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
