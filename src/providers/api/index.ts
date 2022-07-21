import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: String = environment.Api;
  urlAuth: String = environment.ApiAuth;

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, IsLogin:boolean = false, params?: any, reqOpts?: any) {
    var headers:HttpHeaders  = new HttpHeaders();

    headers.append("Authorization",localStorage["Token"]);
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers:headers
      };
    } else{
      reqOpts.headers = headers;
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(((IsLogin)?this.urlAuth:this.url) + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, IsLogin:boolean = false, reqOpts?: any) {
    var headers:HttpHeaders = new HttpHeaders();
     headers.append("Authorization", localStorage["Token"]);

     if(!reqOpts){
      reqOpts = {
        params: new HttpParams(),
        headers: headers
      };
     }else{
      reqOpts.headers = headers;
     }

    return this.http.post(((IsLogin)?this.urlAuth:this.url) + '/' + endpoint, body, reqOpts);
  }




  put(endpoint: string, body: any, reqOpts?: any) {

    var headers:HttpHeaders = new HttpHeaders();
     headers.append("Authorization", localStorage["Token"]);

     if(!reqOpts){
      reqOpts = {
        params: new HttpParams(),
        headers: headers
      };
     }else{
      reqOpts.headers = headers;
     }


    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }





  delete(endpoint: string, reqOpts?: any) {

    var headers:HttpHeaders = new HttpHeaders();
     headers.append("Authorization", localStorage["Token"]);

     if(!reqOpts){
      reqOpts = {
        params: new HttpParams(),
        headers: headers
      };
     }else{
      reqOpts.headers = headers;
     }


    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }



  patch(endpoint: string, body: any, reqOpts?: any) {

    var headers:HttpHeaders = new HttpHeaders();
     headers.append("Authorization", localStorage["Token"]);

     if(!reqOpts){
      reqOpts = {
        params: new HttpParams(),
        headers: headers
      };
     }else{
      reqOpts.headers = headers;
     }



    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
