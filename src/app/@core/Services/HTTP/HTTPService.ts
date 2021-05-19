import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";

import { map, catchError } from 'rxjs/operators';
import { headersModel } from './headersModel';
import { Observable } from 'rxjs/Rx';
// import { StorageService, StorageTypeEnum } from '../Storage';
// import { URLs } from '../../helpers';
// import {  Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable({ providedIn: 'root' })
export class HTTPService {
  // options: RequestOptions;

  constructor(private http: HttpClient,private router: Router) {
  }


  Get(url: string, params: any = null, headers: headersModel[] = null) {
    const requestUrl = this.GenerateUrl(url, params);
    const options = this.GenerateOptions(headers);

    return this.http
      .get(requestUrl, { headers: options },)
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) { }
        }), catchError((err: Response) => {
          return this.ErrorHandler(err);
          //
         })
      )
      // .catch((Error: Response) => {
      //   return this.ErrorHandler(Error);
      // });
  }

  Post(url: string, params: any = null, entity?: any, headers: headersModel[] = null) {
    const requestUrl = this.GenerateUrl(url, params);
    const options = this.GenerateOptions(headers);

    return this.http
      .post(requestUrl, entity, { headers: options })
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) { }
        }), catchError((err: Response) => {
          return this.ErrorHandler(err);
          //
         })
      )
      // )
      // .catch((Error: Response) => {
      //   return this.ErrorHandler(Error);
      // });
  }

  Put(url: string, params: any = null, entity?: any, headers: headersModel[] = null) {
    const requestUrl = this.GenerateUrl(url, params);
    const options = this.GenerateOptions(headers);

    return this.http
      .put(requestUrl, entity, { headers: options })
      .pipe(
        map(res => {
          try {
            return res;
          } catch (error) { }
        }), catchError((err: Response) => {
          return this.ErrorHandler(err);
          //
         })
      )
      // )
      // .catch((Error: Response) => {
      //   return this.ErrorHandler(Error);
      // });
  }



  // Generating the Request url aft er merging it with parameters ..
  private GenerateUrl(url: string, params: any) {
    if (params != null) {
      let requestUrl: string;
      requestUrl = `${url}?`;

      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          const value = params[param];
          requestUrl += `${param}=${value}&`;
        }
      }
      requestUrl = requestUrl.slice(0, -1);
      return requestUrl;
    } else {
      return url;
    }
  }
// Global Error Handler
private ErrorHandler(Error: Response) {
  if (Error.status === 404) {
    return Observable.throw(Error);
  }
  else if (Error.status === 403) {
    //   alert("status === 403 !!!")
    /**If there is an access token it means we got redirected from PING auth, but no user was found */
    // if (this.storageService.getLocalStorage('access_token') !== undefined) {
    //   window.location.href = URLs.FRONT_END_APP + 'Security/AccessDenied';
    // } else {
  //     var currentURL = window.location.href
  //     if (!currentURL.includes('Security')) {
  //       this.storageService.setLocalStorage('currentURL', currentURL);
  //     } else {
  //       this.storageService.setLocalStorage('currentURL', URLs.FRONT_END_APP);
  //     }
  //    // this.storageService.eraseAllCookies();
  //    window.location.href = URLs.FRONT_BASE_URL;
  //     return Observable.throw(Error);
  //   //}
  // } else if (Error.status === 400) {
  //   console.warn('access denied!');
  //   window.location.href = URLs.FRONT_END_APP + 'Security/AccessDenied';
  // } else if (Error.status === 401) {
  //   console.warn('unauthorized!');
  //   window.location.href = URLs.FRONT_END_APP;
  // } else {
    return Observable.throw(Error);
  }
}

  // Return request's options
  private GenerateOptions(headers: headersModel[]): HttpHeaders {
  //  console.log("here we go!!");

    let request_headers = new HttpHeaders();
    //  const accessToken = this.storageService.get(StorageTypeEnum.LocalStorage, 'access_token');
   // console.log(accessToken);
    if (headers != null) {
      headers.forEach(header => {
        request_headers = request_headers.set(header.headerName, header.headerContent);
      });
    }
    return request_headers;
  }
}
