import { HttpHeaders } from "@angular/common/http";

export class Helpers {

  /* static url */
  public static _baseurl = 'https://localhost:44356/';
   public static _apiurl = Helpers._baseurl + 'api'; 
   public static _apiurlCourseFiles =  Helpers._baseurl +'Course/'; 
   public static _apiurlPersonFiles =  Helpers._baseurl +'Person/'; 


   public static get FileUploadSizeLimit(): number { return 200 * 1024; }

   static getHTTPHeaders(xsrf: boolean = false): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    return headers;

  }

}

