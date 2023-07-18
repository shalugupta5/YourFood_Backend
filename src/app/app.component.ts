// import { Component } from '@angular/core';
// import { AuthService } from './auth.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   isNavbarOpen: boolean = false;
//   isLoggedIn: boolean = false;
//   username: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   handleLoginSuccess(username: string) {
//     this.isLoggedIn = true;
//     this.username = username;
//   }

//   handleLogout() {
//     this.isLoggedIn = false;
//     this.username = '';
//   }

//   toggleNavbar() {
//     this.isNavbarOpen = !this.isNavbarOpen;
//   }

//   closeNavbar() {
//     this.isNavbarOpen = false;
//   }

//   logout() {
//     this.authService.setAuthenticated(false);
//     this.authService.setUserRole('');
//     this.router.navigate(['/login']);
//   }  
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { BehaviorSubject } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   isNavbarOpen: boolean = false;
//   isLoggedIn: boolean = false;
//   username$: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Initialize with null value
//   isAdmin: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.authService.isAuthenticatedUser().subscribe((status: boolean) => {
//       this.isLoggedIn = status;
//       if (status) {
//         this.authService.getLoggedInUser().subscribe((username: string) => {
//           this.username$.next(username);
//         });
//         const role: string | any = this.authService.getUserRole();
//         this.isAdmin = role === 'admin';
//         console.log(role+"====================================")
//       } else {
//         this.username$.next('');
//         this.isAdmin = false;
//       }
//     });


    
//   }

//   toggleNavbar() {
//     this.isNavbarOpen = !this.isNavbarOpen;
//   }

//   closeNavbar() {
//     this.isNavbarOpen = false;
//   }

//   logout() {
//     this.authService.setAuthenticated(false);
//     this.authService.setUserRole('');
//     this.authService.setLoggedInUser('');
//     this.router.navigate(['/login']);
//   }


// }




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isNavbarOpen: boolean = false;
  isLoggedIn: boolean = false;
  username$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticatedUser().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (status) {
        this.authService.getLoggedInUser().subscribe((username: string) => {
          this.username$.next(username);
        });
        this.authService.getUserRole().subscribe((role: string) => {
          this.isAdmin = role === 'admin';
        });
      } else {
        this.username$.next('');
        this.isAdmin = false;
      }
    });
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }

  logout() {
   
      this.authService.setAuthenticated(false);
      this.authService.setUserRole('');
      this.authService.setLoggedInUser('');
      localStorage.clear(); // Clear all items stored in localStorage
      console.log("refreshing.....................")
      window.location.href = '/login'; // Redirect to the login page
    }
    
  
}
