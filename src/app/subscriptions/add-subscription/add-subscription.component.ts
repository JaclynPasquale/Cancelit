import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgForm, FormBuilder, FormControl } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import {FormGroup, Validators} from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Subscription } from '../../models/subscription.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserAuthService } from '../../auth/user-auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  panelOpenState = false;
  updateForm = true;
  //userId = this.route.snapshot.paramMap.get('id');
  userId: string;
  docId: string;

  constructor(private subService: SubscriptionService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public authService: UserAuthService,
              private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth) {
              //this.authService.user$.subscribe(user => this.user = user);
              }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.createFormGroup();
    });

  }
  createFormGroup() {
    this.subscriptionForm =  this.formBuilder.group({
      name: '',
      websiteUrl: '',
      cancelUrl: '',
      startDate: Date.now(),
      endDate: '',
      trialPeriod: '',
      active: true,
      })
  }

  onSubmit() {
    const result: Subscription = Object.assign({}, this.subscriptionForm.value)
    console.log(result);

    this.subService.addSubscription(this.userId, result)
    .then((result) => {
      this.snackBar.open(`Subscription saved`, '', {
        duration: 5000
      });
      this.subscriptionForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
