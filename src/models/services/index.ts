import { DocumentReference } from "@angular/fire/compat/firestore";
import { Category } from '../category/index';

export class Services {
  constructor() {
    this.active = false
    this.category = null
    this.createdAt = new Date()
    this.description = ""
    this.id = ""
    this.name = ""
    this.price = 0
    this.updatedAt = new Date()
  }
  public active: boolean;
  public category: Category | null;
  public createdAt: Date;
  public description: string;
  public id: string;
  public name: String;
  public price: Number;
  public updatedAt: Date;

}
