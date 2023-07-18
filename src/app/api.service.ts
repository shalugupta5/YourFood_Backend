import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  // login(username: string, password: string) {
  //   const url = `${this.baseUrl}/auth/login`;
  //   return this.http.post(url, { username, password });
  // }


  login(username: string, password: string, remember: boolean) {
    const url = `${this.baseUrl}/auth/login`;
    const data = {
      username: username,
      password: password,
      remember: remember
    };
    console.log(data);
    return this.http.post(url, data);
  }
  

  logout(): Observable<any> {
    const url = `${this.baseUrl}/auth/logout`;
    console.log(url)
    return this.http.get(url);
  }
  

  getUsers() {
    const url = `${this.baseUrl}/api/users`;
    return this.http.get(url);
  }


  getUserByUsername(username: string): Observable<any> {
    const url = `${this.baseUrl}/api/users/${username}`;
    return this.http.get(url);
  }

  createUser(userData: any) {
    const url = `${this.baseUrl}/api/users`;
    return this.http.post(url, userData);
  }

  // createUser(userData: any) {
  //   const url = `${this.baseUrl}/auth/signup`;
  //   return this.http.post(url, userData);
  // }
  

  updateUser(userId: number, userData: any) {
    const url = `${this.baseUrl}/api/users/${userId}`;
    return this.http.put(url, userData);
  }

  deleteUser(userId: number) {
    const url = `${this.baseUrl}/api/users/${userId}`;
    return this.http.delete(url);
  }

  getDishes() {
    const url = `${this.baseUrl}/api/dishes`;
    return this.http.get(url);
  }

  createDish(dishData: any) {
    const url = `${this.baseUrl}/api/dishes`;
    return this.http.post(url, dishData);
  }

  updateDish(dishId: number, dishData: any) {
    const url = `${this.baseUrl}/api/dishes/${dishId}`;
    return this.http.put(url, dishData);
  }

  deleteDish(dishId: number) {
    const url = `${this.baseUrl}/api/dishes/${dishId}`;
    return this.http.delete(url);
  }

  getOrders() {
    const url = `${this.baseUrl}/api/orders`;
    return this.http.get(url);
  }

  // createOrder(orderData: any) {
  //   const url = `${this.baseUrl}/api/orders`;
  //   return this.http.post(url, orderData);
  // }

  // ApiService

createOrder(orderData: any): Observable<any> {
  const url = `${this.baseUrl}/api/orders`;
  return this.http.post(url, orderData);
}


getOrder(orderId: number): Observable<any> {
  const url = `${this.baseUrl}/api/orders/${orderId}`;
  return this.http.get(url);
}


  updateOrder(orderId: number, orderData: any) {
    const url = `${this.baseUrl}/api/orders/${orderId}`;
    return this.http.put(url, orderData);
  }

  deleteOrder(orderId: number) {
    const url = `${this.baseUrl}/api/orders/${orderId}`;
    return this.http.delete(url);
  }

  updateOrderTracking(orderId: number, trackingData: any) {
    const url = `${this.baseUrl}/api/orders/${orderId}/tracking`;
    return this.http.put(url, trackingData);
  }


  getWalletBalance(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/wallet/balance/${username}`);
  }
  
  updateWalletBalanceByUsername(username: string, walletBalance: number): Observable<any> {
    const url = `${this.baseUrl}/api/users/${username}`;
    const data = {
      wallet: walletBalance
    };
    return this.http.put(url, data);
  }
  



  sendOtp(email: string): Observable<any> {
    const url = `${this.baseUrl}/sendotp`;
    const data = {
      email: email
    };
    return this.http.post(url, data);
  }



  getOrdersByUserName(username: string): Observable<any> {
    const url = `${this.baseUrl}/api/orders/${username}`;
    return this.http.get(url);
  }
  






  // updateOrderStatus(orderId: number, status: string): Observable<any> {
  //   const url = `${this.baseUrl}/orders/${orderId}`;
  //   const data = { status };

  //   return this.http.put(url, data);
  // }

}
