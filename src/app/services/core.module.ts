import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from "@angular/core";
import { ApiUserService } from "./api-user.service";
import { HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";



const PROVIDERS = [
  ApiUserService,
  HttpErrorHandler,

  MessageService,
];

@NgModule({


  imports: [
    
  ],
  exports: [
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers:  [ ...PROVIDERS ]
  
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  // static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: CoreModule,      
  //   };
  // }
  
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
