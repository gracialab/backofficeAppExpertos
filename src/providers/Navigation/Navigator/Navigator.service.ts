import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ParamsService } from '../Params'

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private paramsService:ParamsService, private navCtrl:Router, private location:Location) { }

  public Push(page:string, params:object | null = null){
    if(params != null && params != undefined){
      this.paramsService.Set(page,params);
    }

    this.navCtrl.navigateByUrl(`/${page}`);
  }

  public Pop(){
    return this.location.back();
  }
}
