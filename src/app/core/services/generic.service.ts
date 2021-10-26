import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, debounceTime, distinctUntilChanged, retry, retryWhen, delay, take, mergeMap } from 'rxjs/operators';
import { QueryOptions } from './query-options';
// import { State } from '@progress/kendo-data-query';
import { CookieService } from 'ngx-cookie-service';
import { BaseEntity } from '../models/entity/BaseEntity';
import { HandleError, HttpErrorHandler } from './auth/http-error-handler.service';
import { User } from '../models/entity/users/user';
import { Resources } from '../../shared/helper/resource';
import { State } from '../../shared/helper/state';
export class GenericService<T extends BaseEntity> {

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
    protected cookieService: CookieService,
    protected httpErrorHandler: HttpErrorHandler,
    protected httpClient: HttpClient,
    protected url: string,
    protected endpoint: string,
    protected typeName: string
  ) 
  {
    this.handleError = httpErrorHandler.createHandleError(`Api${typeName}Service`);
  }

  public Create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${this.endpoint}/${this.typeName}`, item, { headers: this.HttpOptions })
      .pipe(
        map(response => { return response; })
      );
  }

  public Update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${item.Id}`, item)
      .pipe(
        map(response => { return response; })
      );
  }

  public CreateUpdate(item: any): Observable<any> {
    return this.httpClient.request(new HttpRequest('POST', `${this.url}/${this.endpoint}/AddEdit${this.typeName}`  , item, { reportProgress: true }));
  }

  public CreateUpdateWithFileUpload(item: any): Observable<any> {
    const formData = new FormData();

    for (const prop in item) {
      if (!item.hasOwnProperty(prop)) {
        continue;
      }
      if (item[prop] instanceof File) {
        formData.append('files', item[prop], item[prop].name);
      }
    }

    formData.append("User", JSON.stringify(item));

    return this.httpClient.request(new HttpRequest('POST', `${this.url}/${this.endpoint}/AddEditForm${this.typeName}`, formData, { reportProgress: true }));
  }

  public Read(id: number): Observable<T| {}> {
    return this.httpClient.get<T>(`${this.url}/${this.endpoint}/Get${this.typeName}?id=${id}`)
      .pipe(
        map(response => { return response; }),
        catchError(this.handleError(`GenericRead {}(error)=${0}`, {}))
      );
  }

  public List(): Observable<T[]> {
    var d = (`${this.url}/${this.endpoint}/GetAll${this.typeName}`);
    return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}/GetAll${this.typeName}`)
      .pipe(
        switchMap((response, i) => {
          if (!response) {
            throw new Error(Resources.errorGetData);
          }
          return of(response);
        }),
        catchError(this.handleError(`GenericList [](error)=${0}`, []))
      );
  }
  public ListForAdmin(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}/GetAll${this.typeName}ForAdmin`)
      .pipe(
        switchMap((response, i) => {
          if (!response) {
            throw new Error(Resources.errorGetData);
          }
          return of(response);
        }),
        catchError(this.handleError(`GenericList [](error)=${0}`, []))
      );
  }

  public ListQuery(queryOptions: QueryOptions): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((response, i) => {
          if (!response) {
            throw new Error(Resources.errorGetData);
          }
          return of(response);
        }),
        catchError(this.handleError(`GenericRead [](error)=${0}`, []))
      );
  }

  public Delete(id: number): Observable<any | {}> {
    return this.httpClient.delete<any>(`${this.url}/${this.endpoint}/Delete${this.typeName}?id=${id}`)
      .pipe(
        map(response => { return response; })
      );
  }

  _Delete(id: number) {
    return this.httpClient.delete(`${this.url}/${this.endpoint}/Delete${this.typeName}/${id}`);
  }

  public GetPaging(state: State): Observable<T[]> {
    return this.httpClient.post<T[]>(`${this.url}/${this.endpoint}/GetPaging${this.typeName}`, state)
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((response, i) => {
          if (!response) {
            throw new Error(Resources.errorGetData);
          }
          return of(response);
        }),
      );
  }
}
