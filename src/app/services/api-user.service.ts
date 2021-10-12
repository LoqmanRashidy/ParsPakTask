
import * as RX from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError, debounceTime, distinctUntilChanged, switchMap, map, retryWhen, delay, take } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { Helpers, Resources } from "../shared/helpers";
import { User } from "../models/User";
import { Observable, of } from "rxjs";
// import { State } from '@progress/kendo-data-query';



@Injectable()
export class ApiUserService {
   
  public headers: any;
  public handleError: HandleError;
  public HttpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }),
    params: {},
    Id: 0,
    productId: null,
    amount: 0
  };
  
  constructor(
    protected httpErrorHandler: HttpErrorHandler,
    protected httpClient: HttpClient,
  ) {
    this.handleError = httpErrorHandler.createHandleError(`ApiUserService`);
   }


  //#region Users

  public GetAllUsers(): Observable<User[]> {
    const queryUrl = `${Helpers._apiurl + 'users'}`;
    return this.httpClient.get<User[]>(queryUrl)
      .pipe(
        switchMap((response, i) => { 
          if (!response) {
            throw new Error(Resources.errorGetData);
          }
          return of(response) }),
        //catchError(this.httpErrorHandler(`PersonDetails id=${0}`, {}))
      );
  }

  //#region Users


}