import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DishListModule } from './dish-list/dish-list.module';
import { EditDishDialogComponent } from './edit-dish-dialog/edit-dish-dialog.component'; // Import the DishListModule
import { MatDialogModule } from '@angular/material/dialog';
import { CreateDishDialogComponent } from './create-dish-dialog/create-dish-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SliderComponent } from './slider/slider.component';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { BagComponent } from './bag/bag.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OtpComponent } from './otp/otp.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MapComponent } from './map/map.component';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatCardModule} from '@angular/material/card';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { HistoryComponent } from './history/history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MyorderComponent } from './myorder/myorder.component';


@NgModule({
  imports: [
    // Other imported modules
    MatFormFieldModule,
    CommonModule, // Add CommonModule
    MatFormFieldModule,
    FormsModule,
    GoogleMapsModule,
    MatCardModule,
    ReactiveFormsModule,
   
   
  ],
  declarations: [
  
  
    SliderComponent,
          ProfileComponent,
         BagComponent,
          OtpComponent,
          ChatbotComponent,
          MapComponent,
          FeedbackFormComponent,
          HistoryComponent,
          OrderDetailsComponent,
          MyorderComponent,
          
  ],
  // Other module configurations
})
export class YourModule { }

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    EditDishDialogComponent,
    CreateDishDialogComponent,
    UpdateUserDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AdminModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    SlickCarouselModule,
    DishListModule, // Add DishListModule to imports
  
    SocketIoModule.forRoot({ url: 'http://localhost:5000' })
    
  ],
  providers: [AuthGuard, ApiService, AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
