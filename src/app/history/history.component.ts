


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.apiService.getOrders().subscribe(
      (response: Object) => {
        this.orders = response as any[];
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, selectedStatus: string) {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      // Update the status of the order
      order.status = selectedStatus;

      // Prepare the updated order data
      const updatedOrderData = {
        status: selectedStatus
      };

      // Make API request to update the order status
      this.apiService.updateOrder(orderId, updatedOrderData).subscribe(
        (response) => {
          console.log('Order status updated successfully:', response);
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    }
  }

  updateTrackingStatus(orderId: number, selectedTrackingStatus: string) {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      // Update the tracking status of the order
      order.tracking_status = selectedTrackingStatus;
  
      // Prepare the tracking data for update
      const trackingData = {
        tracking_status: selectedTrackingStatus
      };
  
      // Make API request to update the order tracking status
      this.apiService.updateOrderTracking(orderId, trackingData).subscribe(
        (response) => {
          console.log('Order tracking status updated successfully:', response);
        },
        (error) => {
          console.error('Error updating order tracking status:', error);
        }
      );
    }
  }
  

  deleteOrder(orderId: number) {
    // Confirm with the user before deleting the order
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiService.deleteOrder(orderId).subscribe(
        () => {
          // Remove the deleted order from the orders array
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}
