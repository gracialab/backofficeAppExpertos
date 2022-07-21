import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthData {
  fireAuth: any;
  user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
     this.user = afAuth.authState;
  }

  verifyLogin(){
      return this.user;
  }

  login(Email:string, Password:string){
      return this.afAuth.signInWithEmailAndPassword(Email, Password);
    //   this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider());
  }

  signUp(Email:string, Password:string){
    return this.afAuth.createUserWithEmailAndPassword(Email, Password);
  }

  facebookLogin(){
    return this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  getCurrentUser():Promise<firebase.User | null>{
    return new Promise((resolve, reject)=>{
      resolve(this.afAuth.currentUser);
    });
  }

  logout() {
    return this.afAuth.signOut();
  }

}
// TODO: Add scope for social login functions
// end file
