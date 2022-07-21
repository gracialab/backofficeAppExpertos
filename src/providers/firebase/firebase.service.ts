import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { enums } from '../../models';
import firebase from 'firebase/compat/app';


@Injectable()
export class FirebaseService {

  constructor(private db: AngularFirestore) {
  }

  getList<T>(url: string, query?: (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query): AngularFirestoreCollection<T> {
    var result;
    if (query == null || query == undefined) {
      result = this.db.collection<T>(url);
    }
    else {
      result = this.db.collection<T>(url, query);
    }

    return result;
  }

  getObject(url: string, id: string): AngularFirestoreDocument<any> {
    return this.db.collection(url).doc(id);
  }

  getTypedObject<T>(url: string): AngularFirestoreDocument<any> {
    return this.db.doc<T>(url);
  }

  postObject(url: string, data: any) {
    var collection = this.db.doc(url);
    return collection.set(data);
  }

  putObject(url: string, id: string, data: any) {
    const itemObservable = this.db.collection(url).doc(id);
    return itemObservable.update(data);
  }

  deleteObject(url: string) {
    const itemObservable = this.db.doc(url);
    return itemObservable.delete();
  }

  postListItem(url: string, data: any) {
    const items = this.db.collection(url);
    return items.add(data);
  }

  postListItemCustomId(url: string, id: string, data: any) {
    const items = this.db.collection(url).doc(id);
    return items.set(data);
  }

  uploadImage(url: string, Type: enums.FileUploads, file: File, Base64: string, Base64Url: string, dataUrl: string): Promise<any> {

    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      var child = storageRef.child(url);
      switch (Type) {
        case enums.FileUploads.File:
          child.put(file).then((snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }).catch((error) => {
            reject(error);
          });
          break;
        case enums.FileUploads.Base64:
          var format = "base64";
          child.putString(Base64, format).then((snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }).catch((error) => {
            reject(error);
          });
          break;
        case enums.FileUploads.Base64Url:
          var format = "base64url";
          child.putString(Base64Url, format).then((snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }).catch((error) => {
            reject(error);
          });
          break;
        case enums.FileUploads.DataUrl:
          var format = "data_url";
          child.putString(dataUrl, format).then((snapshot) => {
            resolve(snapshot);
          }, (error) => {
            reject(error);
          }).catch((error) => {
            reject(error);
          });
          break;
      }
    });
  }
}
