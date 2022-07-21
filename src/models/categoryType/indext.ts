import { DocumentReference } from "@angular/fire/compat/firestore";

export class CategoryType {
  constructor() {
    this.name = ""
    this.reference = null
  }
  public name: string;
  public reference: DocumentReference | null;
}
