import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsService } from 'ngx-permissions';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../shared/shared.module';
import { HttpErrorHandler } from '../../core/services/auth/http-error-handler.service';
import { AuthGuard } from '../../core/services/auth/auth.guard';
import { Globals } from '../../shared/helper/globals';
import { MessageService } from '../../core/services/auth/message.service';
import { LoginComponent } from './login/login.component';
import { UsersRoutingModule } from './users-routing.module';
import { RegistersModule } from '../registers/registers.module';



const HP_MODULES = [
  SharedModule.forRoot(),
  UsersRoutingModule,
];

const COMPONENTS = [
  LoginComponent,
];


const PROVIDERS = [
  NgxPermissionsService,
  CookieService,
  HttpErrorHandler,
  RegistersModule,
  AuthGuard,
  Globals,
  MessageService,
];

const PIPES = [];

@NgModule({
  imports: [ CommonModule, FormsModule, ...HP_MODULES ],
  declarations: [ ...COMPONENTS ],
  // entryComponents: [ DialogComponent ],
  providers: [ ...PROVIDERS ],
})
export class UsersModule { }
