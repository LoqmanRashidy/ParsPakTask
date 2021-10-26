import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError, delay, mergeMap, retryWhen, take } from "rxjs/operators";
import { TokenStoreService } from "./token-store.service";
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../../../shared/helper/globals';
import { AuthTokenType } from '../../models/interfaces/auth-types';
import { User } from "../../models/entity/users/user";

declare var App: any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private delayBetweenRetriesMs = 1000;
  private numberOfRetries = 3;
  private authorizationHeader = "Authorization";
  private xSRFHeader = "X-XSRF-TOKEN";
  private cookieHeader = "cookie";

  constructor(
    private tokenStoreService: TokenStoreService,
    private router: Router,
    @Inject(Globals) public global: Globals,
    private cookie: CookieService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
    if (accessToken) {
      
      // request = request.clone({
      //   headers: request.headers.set(this.cookieHeader, this.cookie.get('.AspNetCore.Antiforgery.nrMbzQATcPM'))
      // });
      // request = request.clone({
      //   headers: request.headers.set(this.xSRFHeader, this.cookie.get('XSRF-TOKEN'))
      // });

      
      request = request.clone({
        headers: request.headers.set(this.authorizationHeader, `Bearer ${accessToken}`)
      });
      if(this.global.sessionUser != null)
      {
        request = request.clone({
          headers: request.headers.set('uid', `${this.global.sessionUser.Id}`)
        });
      } 
      else {
        let user = JSON.parse(localStorage.getItem('UserData') as any);
        user.result = undefined;
        this.global.user = function(_user) {
          return user;
          
      };
      request = request.clone({
        headers: request.headers.set('uid', `${user.Id}`)
      });
      }      
      
      return next.handle(request).pipe(
        retryWhen(errors => errors.pipe(
          mergeMap((error: HttpErrorResponse, retryAttempt: number) => {
            if (retryAttempt === this.numberOfRetries - 1) {
              console.log(`HTTP call '${request.method} ${request.url}' failed after ${this.numberOfRetries} retries.`);
              return throwError(error); // no retry
            }

            switch (error.status) {
              case 400:
              case 404:
                return throwError(error); // no retry
            }

            return of(error); // retry
          }),
          delay(this.delayBetweenRetriesMs),
          take(this.numberOfRetries)
        )),
        catchError((error: any, caught: Observable<HttpEvent<any>>) => {
          console.error({ error, caught });
          if (error.status === 401 || error.status === 403) {
            const newRequest = this.getNewAuthRequest(request);
            if (newRequest) {
              console.log("Try new AuthRequest ...");
              return next.handle(newRequest);
            }
            App.unblockUI();
            this.router.navigate(["/login"]);
          }
          return throwError(error);
        })
      );
    } else {
      // login page
      return next.handle(request);
    }
  }

  getNewAuthRequest(request: HttpRequest<any>): HttpRequest<any> | null {
    
    const newStoredToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
    const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
    if (!newStoredToken || !requestAccessTokenHeader) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newStoredToken: newStoredToken });
      return null;
    }
    const newAccessTokenHeader = `Bearer ${newStoredToken}`;
    if (requestAccessTokenHeader === newAccessTokenHeader) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newAccessTokenHeader: newAccessTokenHeader });
      return null;
    }
    return request.clone({ headers: request.headers.set(this.authorizationHeader, newAccessTokenHeader) });
  }
}

// export class AuthInterceptor implements HttpInterceptor {
//   constructor(
//     private tokenStoreService: TokenStoreService
//   ){

//   }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const accessToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
//     req = req.clone({
//       setHeaders: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`
//       }
//     });

//     return next.handle(req);
//   }
// }
