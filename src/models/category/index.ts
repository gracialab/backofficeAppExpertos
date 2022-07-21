import { DocumentReference } from "@angular/fire/compat/firestore";
import { CategoryType } from '../categoryType/indext';

export class Category {
    constructor() {
      this.reference = null
      this.active = false
      this.createAt = new Date()
      this.description = ""
      this.name= ""
      this.type = null
      this.updateAt= new Date()
      this.id = ""
    }
    public id: string
    public reference: DocumentReference | null
    public active: boolean;
    public createAt: Date;
    public description: string;
    public name: string;
    public type: CategoryType | null;
    public updateAt: Date;
  }
