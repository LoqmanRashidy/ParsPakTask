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
import { Resources } from '../shared/helpers';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
            swal({
              //title: Resources.errorDeletedata,
              title: 'خطا',
              content: { element: span },
              icon: Resources.icon_error,
              buttons: {
                'تایید': { text: Resources.ok, value: 1, className: 'btn btn-primary' },
              }
            });
          }
          else if (error.status >= 500 && error.status <= 599) {
            this.toastr.error('خطا در اجرای عملیات در سرور', '', {
              enableHtml: true,
              positionClass: 'toast-bottom-left'
            });
          }
          //console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        return EMPTY;
      })
    );
  }
}
function swal(arg0: {
  //title: Resources.errorDeletedata,
  title: string; content: { element: HTMLSpanElement; }; icon: any; buttons: { تایید: { text: any; value: number; className: string; }; };
}) {
  throw new Error('Function not implemented.');
}

