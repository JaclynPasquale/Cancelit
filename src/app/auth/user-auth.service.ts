import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class UserAuthService {
  user$: Observable<any>;
  user: any;

  constructor(
             private router: Router,
             public afAuth: AngularFireAuth,
             private afs: AngularFirestore,
             private snackBar: MatSnackBar) {

             this.user$ = this.afAuth.authState.pipe
             (switchMap(user => {
               if(user){
                 console.log(user);
                 this.user = user;
                 return this.afs.doc<any>(`users/${user.uid}`).valueChanges()
               }else{
                 return of(null);
               }
             }))

             }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.snackBar.open(`Logged out`, '', {
        duration: 5000
      });
      this.router.navigate(['/login']);
    });
  }

 private handleError(res: HttpErrorResponse) {
  console.error(res);
  return throwError(res.error || 'Server error');
 }

}
