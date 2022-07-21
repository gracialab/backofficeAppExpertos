import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class BroadCastService {
    constructor() {
    }

    private _login: Subject<boolean> = new Subject();
    Login$ = this._login.asObservable();
    public Login(success:boolean){
        this._login.next(success);
    }
}