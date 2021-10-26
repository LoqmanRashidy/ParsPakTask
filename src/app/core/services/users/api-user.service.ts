import { Helpers } from '../../../shared/helper/helpers';
import { HandleError, HttpErrorHandler } from '../auth/http-error-handler.service';

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ChangePasswordByAdmin } from '../..';
import { GenericService } from '../generic.service';
import { Role, User } from '../../models/entity/users/user';

@Injectable()
export class ApiUserService extends GenericService<User> {

  constructor(cookieService: CookieService, httpErrorHandler: HttpErrorHandler, httpClient: HttpClient) {
    super(
      cookieService,
      httpErrorHandler,
      httpClient,
      Helpers._apiurl,
      'Users',
      'User');
       this.handleError = httpErrorHandler.createHandleError(`ApiUserService`);
  }  

  //#region User  

  public GetUserByRoles(roles: string[]): Observable<User[]> {    
    const url = `${this.url}/${this.endpoint}/ReadListUserByRoles?roles=${roles}`;
    return this.httpClient.get<User[]>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`GetUserByRoles [](error)=${0}`, []))
      );
  }

  public GetUserByPersonId(id: number): Observable<User[]> {    
    const url = `${this.url}/${this.endpoint}/GetUserByPersonId?id=${id}`;
    return this.httpClient.get<User[]>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`GetUserById [](error)=${0}`, []))
      );
  }

  public UploadUserImage(fd: FormData, userId: number): Observable<any> {
    const url = `${this.url}/${this.endpoint}/UserPictureFormData`;
    return this.httpClient.post(url, fd, {
      params: { userId: userId.toString() },
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`UploadUserImage {}(error)=${0}`, []))
      );
  }

  public DeleteUserPicture(id: number): Observable<boolean | {}> {
    const url = `${this.url}/${this.endpoint}/DeleteUserPicture?id=${id}`;
    return this.httpClient.get<boolean>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`UploadUserImage {}(error)=${0}`, []))
      );
  }

  public ChangePassword(item: ChangePasswordByAdmin): Observable<boolean> {
    return this.httpClient.post<boolean>(Helpers._apiurl + '/Users/ChangePasswordUser', item, { headers: Helpers.getHTTPHeaders() });
  }

  

  //#endregion User
  
  //#region User-Role


  public GetAllRole(): Observable<Role[]> {
    const url = `${this.url}/${this.endpoint}/GetAllRole`;
    return this.httpClient.get<Role[]>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`GetAllRole [](error)=${0}`, []))
      );
  }
  
  public GetRole(id: number): Observable<Role |{}> {
    const url = `${this.url}/${this.endpoint}/GetRole?id=${id}`;
    return this.httpClient.get<Role>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`GetRole {}(error)=${0}`, {}))
      );
  }

  public CreateUpdateRole(role: Role): Observable<Role | {}> {
    return this.httpClient.post<Role>(`${this.url}/${this.endpoint}/AddEditUserRole`, role)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`CreateUpdateRole {}(error)=${0}`, {}))
      );
  }

  public DeleteRole(id: number): Observable<boolean | {}> {
    return this.httpClient.post<boolean>(`${this.url}/${this.endpoint}/DeleteRole`, id)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`DeleteRole (boolean | {}(error))=${0}`, {}))
      );
  }

  //#endregion User-Role

}
