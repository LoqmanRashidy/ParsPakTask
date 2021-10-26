import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Resources } from '../../shared/helper/resource';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: any = localStorage.getItem('token');

    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.toastr.error('خطای برنامه نویسی سمت کلاینت');
        } else {
          if (error && error.error && error.error.ErrorCode && error.error.ErrorCode === '406' && error.error.Message) {
            this.toastr.error(error.error.Message, '', {
              enableHtml: true,
              positionClass: 'toast-bottom-left'
            });
          }
          else if (error && error.error && error.error.message && error.error.message.message) {
            this.toastr.error(error.error.message.message, '', {
              enableHtml: true,
              positionClass: 'toast-bottom-left'
            });
          }
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          else if (error.status === 403 || error.status === 401) {
            // TODO: Logout
            this.toastr.error('خطای دسترسی', '', {
              enableHtml: true,
              positionClass: 'toast-bottom-left'
            });
          }
          else if (error.error.Code === 600) {
            let MSG: string = 'خطا در حذف اطلاعات';
            if (error && error.error && error.error.msg) {
              MSG = error.error.msg;
            }
            else if (error && error.error) {
              MSG = error.error;
            }
            var span = document.createElement("span");
            span.innerHTML = MSG;
            // swal({
            //   //title: Resources.errorDeletedata,
            //   title: 'خطا در حذف اطلاعات',
            //   content: { element: span },
            //   icon: Resources.icon_error,
            //   buttons: {
            //     'تایید': { text: Resources.ok, value: 1, className: 'btn btn-primary' },
            //   }
            // });
          }
          else if (error.status >= 400 && error.status <= 499) {
            let MSG: string = 'خطا در ارتباط با سرور';
            if (error && error.error && error.error.msg) {
              MSG = error.error.msg;
            }
            else if (error && error.error) {
              MSG = error.error;
            }

            var span = document.createElement("span");
            span.innerHTML = MSG;
            // swal({
            //   //title: Resources.errorDeletedata,
            //   title: 'خطا',
            //   content: { element: span },
            //   icon: Resources.icon_error,
            //   buttons: {
            //     'تایید': { text: Resources.ok, value: 1, className: 'btn btn-primary' },
            //   }
            // });
          }
          else if (error.status >= 500 && error.status <= 599) {
            this.toastr.error('خطا در اجرای عملیات در سرور', '', {
              enableHtml: true,
              positionClass: 'toast-bottom-left'
            });
          }
          //console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        return EMPTY;
      })
    );
  }
}
