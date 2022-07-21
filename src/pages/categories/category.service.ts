import { Injectable } from '@angular/core';
import { FirebaseService } from '../../providers/firebase/firebase.service';
import { DocumentReference, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Category } from '../../models/category/index';
import { CategoryType } from '../../models/categoryType/indext';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private collection: string = "categories"

  constructor(
    private firebase: FirebaseService
  ) { }

  getCategories(): AngularFirestoreCollection<Category> {
    return this.firebase.getList<Category>(this.collection, ref => ref.orderBy('createAt'))
  }

  createCategory(data: Object): Promise<DocumentReference<any>> {
    return this.firebase.postListItem(this.collection, data)
  }

  updateCategory(path: string, data: Object) {
    return this.firebase.putObject(this.collection, path, data)
  }

  getCategoryType(): AngularFirestoreCollection<CategoryType> {
    return this.firebase.getList<CategoryType>("categoryType")
  }

  getDetailCategory(id: string): AngularFirestoreDocument<Category> {
    return this.firebase.getObject(this.collection, id)
  }

  deleteCategory(path: string) {
    return this.firebase.deleteObject(path)
  }


}
