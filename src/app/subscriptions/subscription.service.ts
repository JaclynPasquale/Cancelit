import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from '../models/subscription.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
//import undefined = require('firebase/empty-import');


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userCollection: AngularFirestoreCollection = this.afs.collection('users');
  subscriptionCollection: AngularFirestoreCollection;
  user: User;


  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth) {
}

  getUserSubscriptions(userId: string): Observable<any[]> {
    this.subscriptionCollection = this.afs.collection(`users/${userId}/subscription`);
    return this.subscriptionCollection.snapshotChanges().pipe(
      map(data => data.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return {...data };
      }))
    );
  }

  addSubscription(userId: string, subscriptionData: object) {
    const subscription = {
      subscriptionData
    };
    return this.userCollection
                .doc(userId)
                .collection('subscriptions')
                .add(subscription);
  }

  getSubscription(userId: string, subscriptionId: Subscription) {
    return this.afs.doc(`users/${userId}/subscriptions/${subscriptionId}`);
  }

  deleteSubscription(subscriptionId, userId) {
    this.userCollection.doc(userId).collection('subscriptions').doc(subscriptionId).delete();
  }

  updateSubscription(userId: string, subscription: Subscription, SubscriptionData) {
    return this.getSubscription(userId, subscription).set(SubscriptionData);
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server error');
  }

  //

 getCollectionRef(path: string, sortBy?: string):
 AngularFirestoreCollection {
   if (sortBy === undefined) {
     return this.afs.collection(path);
   } else {
     return this.afs.collection(path, ref => ref.orderBy(sortBy));
   }
 }

 getDocumentRef(path: string): AngularFirestoreDocument {
   return this.afs.doc(path);
 }

 getCollectionSnapshot(
   path: string,
   sortBy?: string
 ): Observable<any[]> {
   return this.getCollectionRef(path, sortBy).snapshotChanges();
 }

  getDocumentSnapshot(
   path: string,
 ): Observable<any> {
   return this.getDocumentRef(path).snapshotChanges();
 }

 getCollectionValue(
   path: string,
   sortBy?: string
 ): Observable<any[]> {
   return this.getCollectionRef(path, sortBy).valueChanges();
 }

 getDocumentValue(
   path: string,
 ): Observable<any> {
   return this.getDocumentRef(path).valueChanges();
 }

 getDocument(path: string): Observable<any> {
   return this.getDocumentSnapshot(path).pipe(
     map(changes => {
       const data = changes.payload.data();
       const id = changes.payload.id;
       return { id, ...data };
     })
   );
 }

 getCollection(path: string, sortBy?: string): Observable<any[]> {
   return this.getCollectionSnapshot(path, sortBy).pipe(
     map(changes => {
       return changes.map(change => {
         const data = change.payload.doc.data();
         const id = change.payload.doc.id;
         return { id, ...data };
       });
     }
     ));

 }

}
