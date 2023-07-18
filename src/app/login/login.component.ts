// import { Component } from '@angular/core';
// import { AppComponent } from '../app.component';
// import { ApiService } from '../api.service';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// interface LoginResponse {
//   role: string;
  
// }

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   remember: boolean = false;


//   constructor(
   
//     private apiService: ApiService,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   login() {
//     this.apiService.login(this.username, this.password, this.remember).subscribe(
//       (response: Object) => {
//         console.log(response);
//         const loginResponse: LoginResponse = response as LoginResponse;
//         console.log('Login successful');
//         alert('Login successful');
//         const role = loginResponse.role;
//         this.authService.setAuthenticated(true);
//         this.authService.setUserRole(role);
//         console.log(role);
//         if (role === 'admin') {
//           this.router.navigate(['/admin']);
//         } else {
//           this.router.navigate(['/user']);
//         }
//       },
//       error => {
//         console.log('Login failed', error);
//         this.errorMessage = error.error.error || 'Login failed';
//       }
//     );
//   }
  
  
// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

interface LoginResponse {
role: string;
}

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: string = '';
password: string = '';
errorMessage: string = '';
remember: boolean = false;

constructor(private authService: AuthService, private router: Router) {}

login() {
this.authService.login(this.username, this.password, this.remember).subscribe(
(response: any) => {
if (response && response.error) {
console.log('Login failed', response.error);
this.errorMessage = response.error || 'Login failed';
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer:'Invalid username or password.'
})
} else {
console.log(response);
const loginResponse: LoginResponse = response as LoginResponse;
console.log('Login successful');
Swal.fire(
 'Login successful',
 'You are now logged in',
 'success'
);
const role = loginResponse.role;
this.authService.setAuthenticated(true);
this.authService.setUserRole(role);
this.authService.setLoggedInUser(this.username);
console.log(role);
if (role === 'admin') {
this.router.navigate(['/admin']);
} else {
this.router.navigate(['/user']);
}
}
},
error => {
console.log('Login failed', error);
this.errorMessage = error.error.error || 'Login failed';
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: error.error.error || 'Something went wrong',
  footer:'Login failed'
}
);
}
);
}
}
