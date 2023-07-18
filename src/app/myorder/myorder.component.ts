import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  orders: any[] = [];
  username$: Observable<string>;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.username$ = this.authService.getLoggedInUser();
  }

  ngOnInit() {
    this.username$.subscribe((username: string) => {
      this.apiService.getOrdersByUserName(username).subscribe(
        (response: any) => {
          this.orders = response;
        },
        (error: any) => {
          console.log('Error fetching orders:', error);
        }
      );
    });
  }


  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'status-pending';
    } else if (status === 'delivered') {
      return 'status-delivered';
    } else if (status === 'processing') {
      return 'status-processing';
    } else {
      return '';
    }
  }
  
}
