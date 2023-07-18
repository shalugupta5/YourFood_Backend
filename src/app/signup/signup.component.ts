import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Socket } from 'ngx-socket-io';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  role: string = 'user';
  token!: string;
  errorMessage: string = '';
  foodRain: boolean = false;

  constructor(private apiService: ApiService, private router: Router
   ) { }


  signup() {
    if (this.role === 'admin' && this.token !== 'token') {
      Swal.fire('Error', 'Invalid token', 'error');
      return;

    }
  
    const userData = {
      username: this.username,
      password: this.password,
      role: this.role,
      token: this.role === 'admin' ? this.token : ''
    };

   

    this.apiService.createUser(userData).subscribe(
      response => {
        console.log('Signup successful');
       
        //   this.socket.emit('food_rain', { username: this.username });
        // this.foodRain = true;

        Swal.fire('Success', 'Signup successful', 'success').then(() => {
          this.router.navigate(['/login']);
         
        });
      },
      error => {
        console.log('Signup failed', error);
        this.errorMessage = error.error.error || 'Signup failed';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer:'Username must be unique or check your password.'
        })
      }
    );
  }
  


}
