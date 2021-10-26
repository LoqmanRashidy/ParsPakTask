import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from "@angular/core";
import { APP_CONFIG, AppConfig } from "./services/auth/app.config";
import { AuthInterceptor } from "./services/auth/auth.interceptor";
import { XsrfInterceptor } from "./services/auth/xsrf.interceptor";

import { ApiConfigService } from './services/auth/api-config.service';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { ApiSettingService } from './services/basesystem/api-setting.service';
import { ApiPersonService } from './services/basesystem/api-person.service';
import { ApiUserService } from './services/users/api-user.service';
import { Globals } from '../shared/helper/globals';
import { ApiCourseService } from "./services/Course/api-Course.service";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "./services/auth/message.service";


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgxPermissionsModule,
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers: [

      NgxPermissionsService,
    CookieService,
    ApiUserService,
    MessageService,
    ApiSettingService,
    ApiUserService,
    ApiPersonService,
    ApiCourseService,
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ApiConfigService) => () => config.loadApiConfig(),
      deps: [ApiConfigService],
      multi: true
    },   
    {
      provide: APP_INITIALIZER,
      useFactory: (config: Globals) => () => { },
      deps: [Globals],
      multi: true
    },
  ],
  
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,      
    };
  }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
