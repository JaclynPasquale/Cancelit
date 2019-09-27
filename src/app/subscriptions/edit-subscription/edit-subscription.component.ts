import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'src/app/models/subscription.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {

  subscriptions: any[];
  subscription: any = {};
  panelOpenState = false;
  updateForm = true;
  userId = this.route.snapshot.paramMap.get('id');

  constructor(
    private subService: SubscriptionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   console.log(id);
    //   this.getSubscriptions(id);
    // }
  }


}
