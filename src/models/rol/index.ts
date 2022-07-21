import { DocumentReference } from "@angular/fire/compat/firestore";

export class Rols {
    constructor() {
        this.createAt = new Date();
        this.name = "";
        this.updateAt = new Date();
        this.reference= null
    }
    public createAt= new Date();
    public name: string;
    public updateAt: Date;
    public reference: DocumentReference | null
}
