import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from '../models/subscription.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.db.collection('subscriptions').snapshotChanges()
      .subscribe( snaps=> {
        const subscriptions: Subscription[] = snaps.map(snap => {
          return <Subscription> {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data,

          }
        })
      })
  }

}
