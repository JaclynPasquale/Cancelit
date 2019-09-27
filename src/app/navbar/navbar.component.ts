import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'cancelit-app';
  isLoggedin$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  photoUrl$: Observable<string>;
  user$: any;

  constructor(
    private afAuth: AngularFireAuth,
    public userAuth: UserAuthService,
    ) {}

  ngOnInit(){
    this.user$ = this.afAuth.authState.subscribe(user => console.log(user.uid));
    this.isLoggedin$ = this.afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedin$.pipe(map(loggedIn => !loggedIn));
    this.photoUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL: null ));
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}
