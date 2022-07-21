import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private globalParams:any = {};

  constructor() { }

  public Get(page:string, key:string){
    return (this.globalParams[page])? "" : this.globalParams[page][key];
  }

  public Set(page:string, params:any){

    if(this.globalParams[page]){
      this.globalParams[page] = {};
    }

    var keys = Object.keys(params);

    keys.forEach(key => {
      this.globalParams[page][key] = params[key];
    })
  }
}
