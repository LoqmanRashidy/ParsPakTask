import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './Interceptor/http-error-interceptor';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { CoreModule } from './services/core.module';
import { UsersModule } from './view/users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    UsersModule,
  ],
  providers: [
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
