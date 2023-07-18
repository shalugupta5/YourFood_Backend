import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  orderData: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('orderId'));
      this.getOrderDetails();
    });
  }

  getOrderDetails() {
    this.apiService.getOrder(this.orderId).subscribe(
      (response) => {
        this.orderData = response;
      },
      (error) => {
        console.log('Error fetching order details:', error);
      }
    );
  }
}
