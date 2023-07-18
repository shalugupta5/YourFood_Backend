import { Component } from '@angular/core';
import { UserDish } from '../user/user.component';
import { BagService } from '../bag.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent {
  bag: UserDish[] = [];
  totalPrice: number = 0;
  walletBalance: number = 0;
  email: string = '';
  otpSent: boolean = false;
  enteredOTP: string = '';
  otp: string = '';
  socket: Socket;
  username$!: Observable<string>;
  showEmailForm: boolean = false;
  showOTPForm: boolean = false;
  isOrderPlaced: boolean = false;

  constructor(
    private bagService: BagService,
    private apiService: ApiService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:5000');
  }





  ngOnInit() {
    this.bagService.getBagItems().subscribe((bagItems) => {
      this.bag = bagItems;
    });
  
    this.username$ = this.authService.getLoggedInUser();
    console.log(this.username$);
    this.authService.getLoggedInUser().subscribe(
      (username: string) => {
        this.getWalletBalance(username);
      },
      (error) => {
        console.log('Error fetching logged-in user:', error);
      }
    );
  
    this.otpSent = false; // Reset the otpSent flag
    this.isOrderPlaced = false; // Reset the isOrderPlaced flag
    this.clearOrderData(); // Clear any previous order data
  
    // Listen for order updates from the server
    this.socket.on('order_update', (data: any) => {
      console.log('Received order update:', data);
      const orderId = data.orderId;
      const newStatus = data.status;
      // Update the order status in your component's data (e.g., this.bag)
      const orderToUpdate = this.bag.find((order) => order.id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = newStatus;
      }
    });
  }
  
  clearOrderData() {
    this.email = '';
    this.otpSent = false;
    this.enteredOTP = '';
    this.otp = '';
  }
  
  

  getWalletBalance(username: string) {
    this.apiService.getWalletBalance(username).subscribe(
      (response) => {
        this.walletBalance = response.balance;
      },
      (error) => {
        console.log('Error fetching wallet balance:', error);
      }
    );
  }

  decreaseQuantity(dish: UserDish) {
    this.bagService.removeFromBag(dish);
  }

  increaseQuantity(dish: UserDish) {
    this.bagService.addToBag(dish);
  }

  getTotalPrice(): number {
    return this.bagService.getTotalPrice();
  }

  promptForEmail() {
    this.showEmailForm = true;
  }

  sendOTP() {

    if (this.walletBalance < this.bagService.getTotalPrice()) {
      alert('Insufficient balance in wallet. Please add funds.');
      return;
    }

    if (!this.email || !this.validateEmail(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email Address',
        text: 'Please enter a valid email address',
      });
      return;
    }

    Swal.fire({
      title: 'Sending OTP',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.apiService.sendOtp(this.email).subscribe(
      (response: any) => {
        console.log('OTP sent successfully');
        this.otpSent = true;
  
        localStorage.setItem('generatedOTP', response.otp);
        Swal.fire({
          title: 'OTP sent successfully, Please check your email.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.showOTPForm = true;
      
      },
      (error) => {
        console.log('Error sending OTP:', error);
        // Handle the error appropriately (display error message, retry, etc.)
      }
    );
  }



  validateEmail(email: string): boolean {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }


  verifyOTP() {


    if (!this.enteredOTP) {
      Swal.fire({
        icon: 'error',
        title: 'Empty OTP',
        text: 'Please enter the OTP',
      });
      return;
    }

    Swal.fire({
      title: 'Verifying OTP',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });



    if (this.enteredOTP) {
      console.log(this.enteredOTP)
      const generatedOTP = localStorage.getItem('generatedOTP');
      if (this.enteredOTP === generatedOTP) {
        console.log(this.enteredOTP+""+generatedOTP)
        console.log('OTP verified successfully');
        // Proceed with the order or any other action
        this.sendOrderRequest();
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: 'Please enter a valid OTP',
        });
      }
    // } else {
    //   console.log('Please enter the OTP');
    //   // Display error message or take appropriate action for empty OTP
    }
  }
  


  sendOrderRequest() {
    this.username$.subscribe((username: string | undefined) => {
      if (!username) {
        console.log('Username is undefined');
        return;
      }
  
      const customerName = username; // Use the username from the Observable
      console.log("===========================****************")
      const dishNames = this.bag.map((dish) => dish.name); // Extract dish names from the bag items
      console.log(dishNames+"===========================")
      const orderData = {
        customer_name: customerName,
        dish_name: dishNames.join(', '), // Join dish names using a separator (e.g., ', ')
        total_price: this.bagService.getTotalPrice(),
        status: 'pending',
        tracking_status: 'disable' // Set the initial tracking status to 'disable'
      };
      console.log(orderData)
      this.apiService.createOrder(orderData).subscribe(
        (response) => {
          console.log('Order placed successfully:', response);
          console.log(orderData.dish_name)
          const orderId = response.id; // Access the order ID from the response
          this.updateOrderTracking(orderId); // Update the tracking status immediately after placing the order
  
          const updatedWalletBalance = this.walletBalance - this.bagService.getTotalPrice();
          this.apiService.updateWalletBalanceByUsername(username, updatedWalletBalance).subscribe(
            () => {
              this.walletBalance = updatedWalletBalance;
              this.bagService.clearBag();
              Swal.fire({
                icon: 'success',
                title: 'Order Placed',
                text: 'Your order has been placed successfully!',
              }).then((result) => {
                if (result.isConfirmed) {
                  const orderDetailsLink = `/order-details/${orderId}`;
                  this.router.navigate([orderDetailsLink]);
                }
                localStorage.clear();
              });
            },
            (error) => {
              console.log('Error updating wallet balance:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error placing the order. Please try again.',
              });
            }
          );
        },
        (error) => {
          console.log('Error placing order:', error);
        }
      );
    });
  }
  


  updateOrderTracking(orderId: number) {
    // Update the order tracking status to "enable" using the orderId
    const trackingData = {
      tracking_status: 'enable'
      // Add other relevant fields if required
    };

    this.apiService.updateOrderTracking(orderId, trackingData).subscribe(
      (response) => {
        console.log('Order tracking status updated to enable:', response);
        // Perform any necessary actions after updating the order tracking status
      },
      (error) => {
        console.log('Error updating order tracking status:', error);
      }
    );
  }

  placeOrder() {
    if (this.isOrderPlaced) {
      // Order has already been placed, do not proceed
      return;
    }

    if (this.walletBalance < this.bagService.getTotalPrice()) {
      alert('Insufficient balance in wallet. Please add funds.');
      return;
    }

    if (this.otpSent) {
      if (!this.enteredOTP) {
        alert('Please enter the OTP to proceed.');
        return;
      }

      this.verifyOTP();
    } else {
      this.promptForEmail();
    }
  }



}
