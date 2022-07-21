import { DocumentReference } from "@angular/fire/compat/firestore";
import { Rols } from '../rol/index';

export class Users {
  constructor() {
    this.reference= null;
    this.firtsName = "";
    this.identification = null
    this.typeIdentification = null
    this.createdAt = new Date()
    this.email = ""
    this.cellPhone = ""
    this.isActive = false
    this.lastName = ""
    this.specialties = []
    this.photo = ""
    this.updatedAt = new Date()
    this.rol = null
  }

  public reference: DocumentReference | null
  public cellPhone: string
  public createdAt: Date
  public email: string
  public firtsName: string
  public identification: number | null
  public isActive: boolean
  public lastName: String
  public photo: string
  public rol: Rols | null
  public specialties: string[]
  public typeIdentification: string | null
  public updatedAt: Date
}
