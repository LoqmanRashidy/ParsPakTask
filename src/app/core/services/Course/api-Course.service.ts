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
import { GenericService } from '../generic.service';
import { HttpErrorHandler } from '../auth/http-error-handler.service';
import { Resources } from '../../../shared/helper/resource';
import { Course, StudentCourse } from '../../models/entity/Courses/Course';
import { FileType } from '../../models/viewmodels/enum';
import { CourseViewModels } from '../../models/viewmodels/viewModel';



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
export class ApiCourseService extends GenericService<Course> {
   
  constructor(cookieService: CookieService, httpErrorHandler: HttpErrorHandler, httpClient: HttpClient) {
    super(
      cookieService,
      httpErrorHandler,
      httpClient,      
      Helpers._apiurl,
      'Course',
      'Course');
       this.handleError = httpErrorHandler.createHandleError(`ApiCourseService`);
  }


  //#region Course

  public AddEditWithUploadCourse(item: Course,fileType:FileType[], files: File[]): Observable<any> {
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
     data.append("Course",JSON.stringify(item));

    return this.httpClient.request(new HttpRequest('POST', `${this.url}/${this.endpoint}/AddEditWithUpload${this.typeName}`, data, { reportProgress: true }));


  }


public GetAllCourse(): Observable<Course[]> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetAllCourse'}`;
  return this.httpClient.get<Course[]>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`GetAllCourse id=${0}`, []))
    );
}

public GetCourse(id: number): Observable<Course | {}> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetCourse'}?id=${id}`;
  return this.httpClient.get<Course>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`Car id=${0}`, {}))
    );
}

public GetCourseByItem(item: string,id:number): Observable<CourseViewModels[]> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetCourseByItem'}?Item=${item}&id=${id}`;
  return this.httpClient.get<CourseViewModels[]>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`GetCourseByItem `, []))
    );
}

public AddEditCourse(PersonAddress: Course): Observable<Course> {
  return this.httpClient.post<Course>(Helpers._apiurl + '/Course/AddEditCourse', PersonAddress, httpOptions)
    .pipe(
      map(response => {
        return response })
    );
}

public DeleteCourse(id: number): Observable<boolean | {}> {
  const queryUrl = `${Helpers._apiurl + '/Course/DeleteCourse'}?id=${id}`;
  return this.httpClient.delete<boolean>(queryUrl)
    .pipe(
      map( response => { return response; })
    );
}

//#endregion Course

 //#region CourseStudent

 public GetAllStudentCourse(personId: number): Observable<StudentCourse[]> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetAllStudentCourse'}?personId=${personId}`;
  return this.httpClient.get<StudentCourse[]>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`GetAllCourseStudentCourse id=${0}`, []))
    );
}

public GetStudentCourse(id: number): Observable<StudentCourse | {}> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetStudentCourse'}?id=${id}`;
  return this.httpClient.get<Course>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`Car id=${0}`, {}))
    );
}

public GetStudentCourseByItem(item: string,id:number): Observable<CourseViewModels[]> {
  const queryUrl = `${Helpers._apiurl + '/Course/GetStudentCourseByItem'}?Item=${item}&id=${id}`;
  return this.httpClient.get<CourseViewModels[]>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`GetCourseByItem `, []))
    );
}

public AddEditStudentCourse(PersonAddress: StudentCourse): Observable<StudentCourse> {
  return this.httpClient.post<StudentCourse>(Helpers._apiurl + '/Course/AddEditStudentCourse', PersonAddress, httpOptions)
    .pipe(
      map(response => {
        return response })
    );
}

public DeleteStudentCourse(id: number): Observable<boolean | {}> {
  const queryUrl = `${Helpers._apiurl + '/Course/DeleteStudentCourse'}?id=${id}`;
  return this.httpClient.delete<boolean>(queryUrl)
    .pipe(
      map( response => { return response; })
    );
}

//#endregion StudentCourse

//#region  free login

public GetAllFreeCourse(personId: number): Observable<CourseViewModels[]> {
  const queryUrl = `${Helpers._apiurl + '/Free/GetAllCourse'}?personId=${personId}`;
  return this.httpClient.get<CourseViewModels[]>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`GetAllCourse id=${0}`, []))
    );
}

public GetFreeCourse(id: number): Observable<CourseViewModels | {}> {
  const queryUrl = `${Helpers._apiurl + '/Free/GetCourse'}?id=${id}`;
  return this.httpClient.get<CourseViewModels>(queryUrl)
    .pipe(
      switchMap((response, i) => { 
        if (!response) {
          throw new Error(Resources.errorGetData);
        }
        return of(response) }),
      catchError(this.handleError(`Car id=${0}`, {}))
    );
}

//#endregion free login
}