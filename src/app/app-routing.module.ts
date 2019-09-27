import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddSubscriptionComponent } from './subscriptions/add-subscription/add-subscription.component';
import { SubscriptionsListComponent } from './subscriptions/subscriptions-list/subscriptions-list.component';

const routes: Routes = [
  {
  path:'',
  component: LoginComponent
  },
  {
  path: 'login',
  component: LoginComponent
},
{
  path: 'add',
  component: AddSubscriptionComponent
},
{
  path: 'subscriptions',
  component: SubscriptionsListComponent

},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
