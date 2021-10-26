import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor { // Handles absolute URLs

  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private cookie: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
        const lcUrl = request.url.toLowerCase();
        if (request.method === "GET" || request.method === "HEAD" ||
          lcUrl.startsWith("http://") || lcUrl.startsWith("https://")) {
          console.log("Original HttpXsrfInterceptor skips both non-mutating requests and absolute URLs.");
          console.log("Skipped request", { lcUrl: lcUrl, method: request.method });
        }
    */
    if (request.method === "POST") {
      const headerName = "X-XSRF-TOKEN";
      const token = this.tokenExtractor.getToken();
      if (token && !request.headers.has(headerName)) {
        const authorizedRequest = request.clone({
          withCredentials: true,
          headers: request.headers.set(headerName, token)
        });
        return next.handle(authorizedRequest);
      }
    }
    return next.handle(request);
  }
}
