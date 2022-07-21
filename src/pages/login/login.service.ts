import { Injectable } from '@angular/core';
import { AuthData } from '../../providers';
import { enums, Login } from '../../models';


@Injectable()
export class LoginService {

	constructor(private auth: AuthData) {
	}

	public Login(Data: Login):Promise<any> {
        return this.auth.login(Data.Email, Data.Password)
    }

    public Logout() {
        this.auth.logout();
    }
}

