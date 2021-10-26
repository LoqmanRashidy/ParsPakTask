import { Helpers } from '../../../shared/helper/helpers';
import * as RX from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { catchError, debounceTime, distinctUntilChanged, switchMap, map, retryWhen, delay, take } from 'rxjs/operators';
// import { State } from '@progress/kendo-data-query';

import { CookieService } from 'ngx-cookie-service';
import { HttpErrorHandler } from '../auth/http-error-handler.service';
import { Resources } from '../../../shared/helper/resource';
import { Person } from '../../models/entity/basesystem/Person';
import { GenericService } from '../generic.service';
import { FileType } from '../../models/viewmodels/enum';


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
  })
  
};

@Injectable()
export class ApiPersonService extends GenericService<Person> {
  
  constructor(cookieService: CookieService, httpErrorHandler: HttpErrorHandler, httpClient: HttpClient) {
    super(
      cookieService,
      httpErrorHandler,
      httpClient,      
      Helpers._apiurl,
      'Person',
      'Person');
       this.handleError = httpErrorHandler.createHandleError(`ApiPersonService`);
  }

//#region Person


public AddEditWithUploadPerson(item: Person,fileType:FileType[], files: File[]): Observable<any> {
  const data = new FormData();

  if (files != null) {
    Array.from(files).forEach((f) => {
      data.append('Files', f);
    });
  }
  if (fileType != null) {
    Array.from(fileType).forEach((x) => {
      data.append('Type', JSON.stringify(x));
    });
  }
   data.append("Person",JSON.stringify(item));

  return this.httpClient.request(new HttpRequest('POST', `${this.url}/${this.endpoint}/AddEditWithUpload${this.typeName}`, data, { reportProgress: true }));


}

public FreeAddEditWithUploadPerson(item: Person,fileType:FileType[], files: File[]): Observable<any> {
  const data = new FormData();

  if (files != null) {
    Array.from(files).forEach((f) => {
      data.append('Files', f);
    });
  }
  if (fileType != null) {
    Array.from(fileType).forEach((x) => {
      data.append('Type', JSON.stringify(x));
    });
  }
   data.append("Person",JSON.stringify(item));

  return this.httpClient.request(new HttpRequest('POST', `${this.url}/Free/AddEditWithUpload${this.typeName}`, data, { reportProgress: true }));


}

//#endregion Person


}