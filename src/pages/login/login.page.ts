import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notifications, NavigatorService, BroadCastService } from '../../providers';
import { Login } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm : FormGroup;

  constructor(
    private broadcast:BroadCastService,
    private loginService:LoginService,
    private notifications:Notifications,
    private navCtrl: NavigatorService) {
    this.loginForm = new FormGroup({
      UserName: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      Password: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  ngOnInit() {
    this.loginService.Logout();
  }

  async login(){
    console.log("form: ", this.loginForm)
    if(this.loginForm.valid){
      var data = new Login("","");
      data.Email = this.loginForm.value.UserName;
      data.Password = this.loginForm.value.Password;

      var result = await this.loginService.Login(data).catch((error)=>{
        console.log("Error Login: ", error);
        // this.notifications.ShowAlert("Error",this.loginErrors(error.code))
      });

      if(result != undefined){
        this.broadcast.Login(true);
        this.navCtrl.Push("dashboard");
      }
    }else{
      var message = ""
      if(this.loginForm.controls["UserName"] != undefined && this.loginForm.controls["UserName"].errors != undefined && this.loginForm.controls["UserName"].errors["required"]){
        message += "El nombre de Usuario es obligatorio.\n";
      }

      if(this.loginForm.controls["UserName"] != undefined && this.loginForm.controls["UserName"].errors != undefined && this.loginForm.controls["UserName"].errors["email"]){
        message += "El nombre de Usuario debe ser un correo electónico.\n";
      }

      if(this.loginForm.controls["Password"] != undefined && this.loginForm.controls["Password"].errors != undefined && this.loginForm.controls["Password"].errors["required"]){
        message += "La contraseña es obligatoria.\n";
      }

      // this.notifications.ShowAlert("Error",message);

    }
  }

  private loginErrors(error:string){
    var message = "";
    switch(error){
      case "auth/invalid-email":
        message = "Correo electrónico incorrecto. Por favor ingrese un correo electrónico válido.";
        break;
      case "auth/user-disabled":
        message = "Usuario deshabilitado. Por favor contacte al adminstrador del sistema.";
        break;
      case "auth/user-not-found":
        message = "Usuario no registrado en el sistema. Lo invitamos a ser parte de nuestra comunidad.";
        break;
      case "auth/wrong-password":
        message = "Contraseña erronea.";
        break;
    }

    return message;
  }

}
