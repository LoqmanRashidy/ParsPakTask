import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map, switchMap, retry } from "rxjs/operators";
import { ApiConfigService } from "./api-config.service";
import { APP_CONFIG, IAppConfig } from "./app.config";
import { RefreshTokenService } from "./refresh-token.service";
import { TokenStoreService } from "./token-store.service";
import { BrowserStorageService } from './browser-storage.service';
import { Globals } from '../../../shared/helper/globals';
import { AuthTokenType, Credentials } from '../../models/interfaces/auth-types';
import { User } from "../../models/entity/users/user";
import { Setting } from "../../models/entity/basesystem/Settings";
import { Person } from "../../models/entity/basesystem/Person";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    @Inject(Globals) public global: Globals,
    private apiConfigService: ApiConfigService,
    private tokenStoreService: TokenStoreService,
    private refreshTokenService: RefreshTokenService,
    private browserStorageService: BrowserStorageService,
  ) {
    this.updateStatusOnPageRefresh();
    this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn(), false);
  }

  login(credentials: Credentials): Observable<boolean> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(`${this.appConfig.apiEndpoint}/${this.apiConfigService.configuration.LoginPath}`,
        credentials, { headers: headers })
      .pipe(
        map((response: any) => {
          this.tokenStoreService.setRememberMe(credentials.rememberMe);
          if (!response) {
            this.authStatusSource.next(false);
            return false;
          }
          this.tokenStoreService.storeLoginSession(response);
          if (this.global.user == null) {
              this.global.user = function (_user) {
                return JSON.parse(localStorage.getItem('UserData') as any);
              };
              this.global.person = function (_person) {
                return JSON.parse(localStorage.getItem('Person') as any);
              };
              this.global.sessionUser =JSON.parse(sessionStorage.getItem("UserData") as any);
              this.global.sessionPerson = JSON.parse(sessionStorage.getItem("Person") as any) ;
          }
          this.global.user(this.getAuthUser());
          this.global.setting = this.getSetting();
          this.refreshTokenService.scheduleRefreshToken(true, true);
          this.authStatusSource.next(true);
          return true;
        }),
      );
  }
  antiforgry(): void {
    this.http.get(`${this.appConfig.apiEndpoint}/account/antiforgery`)
      .pipe(
        map((response: any) => response || {}),
        catchError((error: HttpErrorResponse) => throwError(error)),
      ).subscribe();
  }

  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }

  logout(navigateToHome: boolean): void {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));
    this.http
      .get(`${this.appConfig.apiEndpoint}/${this.apiConfigService.configuration.LogoutPath}?refreshToken=${refreshToken}`,
        { headers: headers })
      .pipe(
        map((response: any) => response || {}),
        catchError((error: HttpErrorResponse) => throwError(error)),
        finalize(() => {
          this.tokenStoreService.deleteAuthTokens();
          this.global.sessionUser = null;
          this.global.sessionPerson = null;
          this.browserStorageService.removeAllSessions();
          this.browserStorageService.removeAllLocals();
          this.refreshTokenService.unscheduleRefreshToken(true);
          this.authStatusSource.next(false);
          if (navigateToHome) {
            this.router.navigate(["/login"]);
          }
        })).subscribe();
  }
  isAuthUserLoggedIn(): boolean {
    return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
      !this.tokenStoreService.isAccessTokenTokenExpired();
  }

  getAuthUser(): User | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.tokenStoreService.getDecodedAccessToken();
    const roles = this.tokenStoreService.getDecodedTokenRoles();
    // return Object.freeze({
    //   Id: +decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
    //   Username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    //   Name: decodedToken["DisplayName"],
    //   UserRoles: roles as UserRole[]
    // });
    const user = this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.UserData]);
    //const user = JSON.parse(userdecoded);
    return Object.assign({}, user);
  }

  getSetting(): Setting | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }
    const setting = this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.Consts]);
    //const user = JSON.parse(userdecoded);
    return Object.assign({}, setting);
  }
  getPerson(): Person | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }
    const person = this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.Person]);
    //const user = JSON.parse(userdecoded);
    return Object.assign({}, person);
  }
  isAuthUserInRoles(requiredRoles: string[]): boolean {
    const user = this.getAuthUser();
    if (!user || !user.UserRoles) {
      return false;
    }

    // if (user.UserRoles.some(ur => ur.Role.EnTitle === this.apiConfigService.configuration.AdminRoleName.toLowerCase())) {
    //   return true; // The `Admin` role has full access to every pages.
    // }

    return requiredRoles.some(requiredRole => {
      if (user.UserRoles) {
        return user.UserRoles.some(ur => ur.Role.EnTitle === requiredRole.toLowerCase());
      } else {
        return false;
      }
    });
  }

  isAuthUserInRole(requiredRole: string): boolean {
    return this.isAuthUserInRoles([requiredRole]);
  }

  private updateStatusOnPageRefresh(): void {
    this.authStatusSource.next(this.isAuthUserLoggedIn());
  }

}
