import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

interface User {
  id: number;
  username: string;
  role: string;
  wallet: number;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent implements OnInit {
  user: any;
  username!: string;

  constructor(private apiService: ApiService, private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(
      (username: string) => {
        this.username = username;
        console.log(username)
        this.loadUserDetails();
      }
    );
  }

  loadUserDetails() {
    this.apiService.getUserByUsername(this.username).subscribe(
     
      (response) => {
        this.user = response;
        console.log(this.user)
        
      },
      (error) => {
        console.log('Error fetching user data:', error);
      }
    );
  }

  updateUser() {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '400px',
      data: this.user
    });
  
    dialogRef.afterClosed().subscribe((updatedUserData) => {
      if (updatedUserData) {
        if (updatedUserData.wallet && this.user.wallet) {
          updatedUserData.wallet += this.user.wallet; // Add the existing wallet amount to the updated value
        }
        
        this.apiService.updateUser(this.user.id, updatedUserData).subscribe(
          () => {
            console.log('User updated successfully');
  
            // Update the user object with the updated data
            if (updatedUserData.role) {
              this.user.role = updatedUserData.role;
            }
            if (updatedUserData.wallet) {
              this.user.wallet = updatedUserData.wallet;
            }
          },
          (error) => {
            console.log('Error updating user:', error);
          }
        );
      }
    });
  }
  

}
