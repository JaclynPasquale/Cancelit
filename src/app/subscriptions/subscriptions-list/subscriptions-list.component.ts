import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from '../subscription.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/auth/user-auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})
export class SubscriptionsListComponent implements OnInit {
  subscriptions: any[];
  subscription: any = {};
  panelOpenState = false;
  updateForm = true;
  user: any;
  public userId: string;
  user$: any;
  subscriptionId: any;
  item: any;

  constructor(
    private subService: SubscriptionService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private authService: UserAuthService,
  ) {
  //   this.route.data.subscribe(routeData => {
  //   let data = routeData['data'];
  //   if (data) {
  //     this.item = data.payload.data();
  //     this.item.id = data.payload.id;
  //     console.log(this.item, data);
  //   }
  // })
}


  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.getSubscriptionsByUser(this.userId);
    })
  }


  getSubscriptionsByUser(userId: string) {
      this.subService.getUserSubscriptions(userId)
        .subscribe( subscriptions => {
          this.subscriptions = subscriptions;
          })
          console.log(this.subscriptions);
        }


  updateSubscriptionSave(newSub: Subscription) {
    console.log(newSub);
    this.subService
        .updateSubscription(this.user.uid, this.subscription.id, newSub);
        this.subscription = {};
  }

  deleteSubscription() {
    this.subService.deleteSubscription(this.item.id, this.userId);
  }

  updateSubscription(subscription: any) {
    this.subscription.name = subscription.name;
    this.subscription.websiteUrl = subscription.websiteUrl;
    this.subscription.cancelUrl = subscription.cancelUrl;
    this.subscription.startDate = subscription.startDate;
    this.subscription.endDate = subscription.endDate;
    this.subscription.trialPeriod = subscription.trialPeriod;
    this.subscription.id = subscription.id;
    this.subscription.active = subscription.active;
  }

}
