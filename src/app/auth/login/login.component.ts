import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;
  user$: any;
  newUser: Observable<User>;
  userCol: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: UserAuthService,
    private router: Router,
    private ngZone: NgZone,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.subscribe(user => {
      // this.user = user;
      // this.afs.doc(`users/${user.uid}`).valueChanges()
    })
    this.userCol = this.afs.collection<User>('users');
    // this.user$ = this.afAuth.authState.pipe
    //          (switchMap(user => {
    //            if(user){
    //              console.log(user);
    //              this.user = user;
    //              return this.afs.doc<any>(`users/${user.uid}`).valueChanges()
    //            }else{
    //              return of(null);
    //            }
  }


  ngOnInit() {
  const uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
    },
    signInFlow: 'popup',
  }


  this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
  this.ui.start('#firebaseui-auth-container', uiConfig);
}

  ngOnDestroy(){
    this.ui.delete();
  }

  onLoginSuccessful(result){
    console.log('successful', result.user);
    // let a = Object.assign({}, result.user.uid);
    // console.log(a);
    this.userCol.doc(result.user.uid).set({});
    //his.newUser = this.userDoc.valueChanges();

    // this.userDoc.update(a);
    this.ngZone.run(() => this.router.navigateByUrl('/subscriptions'));
  }


}

