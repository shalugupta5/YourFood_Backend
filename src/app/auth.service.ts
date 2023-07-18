

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public userRoleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userRole$: Observable<string> = this.userRoleSubject.asObservable();
  public loggedInUser: BehaviorSubject<string> = new BehaviorSubject<string>('');


  private baseUrl = 'http://localhost:5000';

  constructor(private apiService: ApiService,private http: HttpClient,
    private router: Router) {}

  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  getUserRole(): Observable<string> {
    return this.userRole$;
  }

  setLoggedInUser(username: string) {
    this.loggedInUser.next(username);
  }

  getLoggedInUser(): Observable<string> {
    return this.loggedInUser.asObservable();
  }

  login(username: string, password: string, remember: boolean): Observable<any> {
    return this.apiService.login(username, password, remember);
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      // Perform any additional logic or redirection after logout
      console.log("refreshing.....................")
      window.location.reload(); // Refresh the page
    });
  }
  
  
}
