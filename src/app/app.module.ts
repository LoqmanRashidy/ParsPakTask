import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { CoreModule } from './core/core.module';
import { HttpErrorInterceptor } from './core/Interceptor/http-error-interceptor';
import { Globals } from './shared/helper/globals';
import { CookieService } from 'ngx-cookie-service';
import { EducationClassModule } from './view/education-class/education-class.module';
import { RegistersModule } from './view/registers/registers.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './view/users/users.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MessageService } from './core/services/auth/message.service';
import { ApiUserService } from './core/services/users/api-user.service';
import { HttpErrorHandler } from './core/services/auth/http-error-handler.service';
import { AuthGuard } from './core/services/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    CoreModule,
    CoreModule,
    SharedModule.forRoot(),
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    EducationClassModule,
    RegistersModule,
    UsersModule
  ],
  providers: [
    CookieService,
    ApiUserService,
    HttpErrorHandler,

    AuthGuard,
    Globals,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
    

  }],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
