
import { Helpers } from '../../../shared/helper/helpers';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError, debounceTime, distinctUntilChanged, switchMap, map, retryWhen, delay, take } from 'rxjs/operators';


import { CookieService } from 'ngx-cookie-service';
import { HttpErrorHandler } from '../auth/http-error-handler.service';
import { GenericService } from '../generic.service';
import { Setting } from '../../models/entity/basesystem/Settings';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    //'Accept': '*/*',

    // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0OGU4MTllNC03OWM4LTFmOWMtNDExMC04YWI5NmRjMGJiNzYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIiwiaWF0IjoxNTgwNjI0ODk2LCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSGFtaWQiLCJOYW1lIjoi2K3ZhduM2K_Ysdi22KciLCJGYW1pbHkiOiLZhtuM2qnZiNmB2qnYsSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvc2VyaWFsbnVtYmVyIjoiODk5ZTJjYzE4ZmI4NDA2OWI0ZTdmMDMyMjk1NDU0MGYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbiIsIlVzZXIiXSwibmJmIjoxNTgwNjI0ODk2LCJleHAiOjE1ODA2MjUwMTYsImF1ZCI6IkFueSJ9.XyowygLSo6JFFTdZnO2swh_EaVWawnvbl_RZ5l_nRfM",
    // "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NzY5ZTVjNS0yZTE5LTk4YjktMjVmZi0yN2Q3ZjBhOWE3ZjciLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIiwiaWF0IjoxNTgwNjI0ODk2LCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6ImMxYjNlNzVmYTU3NTAxYzhiMzliMDNjM2FiMWUxZDQ5IiwibmJmIjoxNTgwNjI0ODk2LCJleHAiOjE1ODA5ODQ4OTYsImF1ZCI6IkFueSJ9.o50Rs0QTQTmEqYoQ1HE3REzVAtIoD3whFmw7j5lJ108`,

    // 'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type'
  }),


};

@Injectable()
export class ApiSettingService extends GenericService<any> {

  constructor(cookieService: CookieService, httpErrorHandler: HttpErrorHandler, httpClient: HttpClient) {
    super(
      cookieService,
      httpErrorHandler,
      httpClient,
      Helpers._apiurl,
      'Base',
      'Setting');
    this.handleError = httpErrorHandler.createHandleError(`ApiSettingService`);
  }

  public GetSettingByKey(key: string): Observable<Setting| {}> {
    const url = `${this.url}/${this.endpoint}/GetSettingByKey?id=${key}`;
    return this.httpClient.get<Setting>(url)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`GetSettingByKey {}(error)=${0}`,  {}))
      );
  }

  public DeleteSettingBykey(key: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${this.endpoint}/DeleteSettingBykey?id=${key}`)
      .pipe(
        map( response => { return response; }),
        catchError(this.handleError(`DeleteSettingBykey (boolean | {}(error))=${0}`, []))
      );
  }

  //#region Enums


    //#region  Person

    public GetEnumGenderType(): Observable<object[]> {
      const queryUrl = `${Helpers._apiurl + '/Free/GetEnumGenderType'}`;
      return this.httpClient.get<object[]>(queryUrl)
        .pipe(
          catchError(this.handleError(`GetEnumGenderType`, []))
        );
    }
    public GetEnumGrade(): Observable<object[]> {
      const queryUrl = `${Helpers._apiurl + '/Free/GetEnumGrade'}`;
      return this.httpClient.get<object[]>(queryUrl)
        .pipe(
          catchError(this.handleError(`GetEnGetEnumGradeumGenderType`, []))
        );
    }
    
    //#endregion Person
 
  //#endregion Enums

}
