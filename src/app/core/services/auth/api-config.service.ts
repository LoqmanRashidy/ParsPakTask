import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";

import { APP_CONFIG, IAppConfig } from "./app.config";
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private config: IApiConfig | null = null;

  constructor(
    private injector: Injector,    
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


    loadApiConfig(): Promise<any> {
      const http = this.injector.get<HttpClient>(HttpClient);
      const url = `${this.appConfig.apiEndpoint}/${this.appConfig.apiSettingsPath}`;
      return http.get<IApiConfig>(url)
        .toPromise()
        .then(config => {
          this.config = config;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  
    get configuration(): IApiConfig {    
      if (!this.config) {
        throw new Error("Attempted to access configuration property before configuration data was loaded.");
      }
      return this.config;
    }
  
  }
  export interface IApiConfig {
    FirstLoginPath: string;
    SecondLoginPath: string;
    LoginPath: string;
    LogoutPath: string;
    RefreshTokenPath: string;
    AccessTokenObjectKey: string;
    RefreshTokenObjectKey: string;
    UserObjectKey: string;
    PersonObjectKey:string;
    Consts: string;
  }
  