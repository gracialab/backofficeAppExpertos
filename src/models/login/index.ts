export class Login {
    /**
     *
     */
    constructor(email:string, password:string) {
        this.Email = email;
        this.Password = password;
    }
    public Email: string;
    public Password: string;
}