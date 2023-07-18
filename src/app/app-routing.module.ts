import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { ProfileComponent } from './profile/profile.component';
import { BagComponent } from './bag/bag.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MapComponent } from './map/map.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
// Import the AdminComponent and UserComponent
import { HistoryComponent } from './history/history.component';

import { UserComponent } from './user/user.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MyorderComponent } from './myorder/myorder.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'order-details/:orderId', component: OrderDetailsComponent },
  { path: 'myorder', component: MyorderComponent },
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'bag', component: BagComponent },
  { path: 'contact', component: FeedbackFormComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'dishes', component: DishListComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }, // Modify the path as per your requirement
  { path: 'user', component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatbotComponent },
  { path: 'history', component: HistoryComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Add a wildcard route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
