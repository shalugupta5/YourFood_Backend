

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { BagService } from '../bag.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export interface UserDish {
  id: number;
  name: string;
  price: number;
  quantity: number;
  availability: boolean;
  tracking_status: string;
  status: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dishes: UserDish[] = [];
  username$!: Observable<string>; // Add the username Observable
  bag: UserDish[] = []; // Array to hold the selected dishes

  imageDictionary: { [key: string]: string } = {
    Pasta: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=sph',
    Cake: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIlnuXZvCbBwcWF7cQoy9Qc1PqHKp9gcYErw&usqp=CAU',
    Burger: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg',
    Coffee: 'https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_640.jpg',
    Fries: 'https://www.allrecipes.com/thmb/f_JduNwWqYbRh8bzQ1KmVsJuSOs=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():focal(1399x2346:1401x2348):format(webp)/7509535-Air-Fryer-Green-Bean-Fries-CD-R311157-10130-1-2x3-4366e093a2bd462c95edd9b64fcc8759.jpg',
    Samosa: 'https://img.freepik.com/free-photo/delicious-pakistani-food-with-tomato-sauce_23-2148825164.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=ais',
    Salad:'https://assets.epicurious.com/photos/6499ca50a5fd6f443b199a2e/6:4/w_332,h_221,c_limit/MaggiSpicedRoastedVegetables_HERO_062223_55828.jpg',
    Tea:'https://img.freepik.com/premium-photo/two-glasses-coffee-with-milk-turmeric-wooden-background_166116-5123.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=sph',
    Naan:'https://img.freepik.com/premium-photo/mix-food_57665-15203.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=sph',
    Rajma:'https://img.freepik.com/premium-photo/kidney-bean-curry-rajma-rice-rajmah-chawal-roti-typical-north-indian-main-course-selective-focus_466689-16947.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=sph',
    Bhature:'https://img.freepik.com/premium-photo/chole-bhature-spicy-chick-peas-curry-also-known-as-chole-channa-masala-is-traditional-north-indian-main-course-recipe-usually-served-with-fried-puri-bhature-selective-focus_726363-296.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=ais',
    Golgappe:'https://media.istockphoto.com/id/1314329942/photo/goal-gappa-or-pani-puri.jpg?s=612x612&w=0&k=20&c=l6akiKMfTLE9nR4VonhiOZpZGDY4aEjimAN-BSskF-A=',
    Sandbich:'https://img.freepik.com/free-photo/club-sandwich-with-side-french-fries_140725-1744.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=sph',
    Rice:'https://img.freepik.com/free-photo/indian-butter-chicken-black-bowl-black-background_123827-20757.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=sph',
    Noodle:'https://img.freepik.com/free-photo/top-view-delicious-noodles-concept_23-2148773774.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=sph',
    Thaali:'https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=ais',
    Pav_Bhaji:'https://img.freepik.com/premium-photo/mumbai-style-pav-bhaji-is-fast-food-dish-from-india-consists-thick-vegetable-curry-served-with-soft-bread-roll-served-plate_466689-2238.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=ais',
    Paneer:'https://img.freepik.com/free-photo/flat-lay-pakistani-food-arrangement_23-2148825110.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=ais',
    Pulao:'https://img.freepik.com/premium-photo/indian-vegetable-pulav-biryani-made-using-basmati-rice-served-terracotta-bowl-selective-focus_466689-55615.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=ais',
    Dhokla:'https://img.freepik.com/premium-photo/gujarati-khaman-dhokla-made-using-chana-dal-served-with-green-chutney-selective-focus_466689-55653.jpg?size=626&ext=jpg&ga=GA1.2.99660013.1684486888&semt=sph',
    Daal:'https://img.freepik.com/free-photo/traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18717.jpg?size=626&ext=jpg&ga=GA1.1.99660013.1684486888&semt=ais'
    // Add more dish names and corresponding image links as needed
  };

  constructor(private http: HttpClient, private apiService: ApiService, 
    private authService: AuthService, private bagService: BagService,private router: Router) {}

  ngOnInit() {
    this.getDishes();
    this.username$ = this.authService.getLoggedInUser(); // Fetch the username Observable
    this.bagService.getBagItems().subscribe((items: UserDish[]) => {
      this.bag = items;
    });
  }

  getDishes() {
    this.http.get<UserDish[]>('http://localhost:5000/api/dishes').subscribe(
      (response: UserDish[]) => {
        this.dishes = response.map((dish: UserDish) => ({
          ...dish,
          image: this.imageDictionary[dish.name] || 'default-image.jpg',
        }));
        console.log(this.dishes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  placeOrder(dish: UserDish) {
    this.username$.subscribe((username: string) => {
      const customerName = username; // Use the username from the Observable
  
      if (!customerName) {
        console.log('Customer name is required');
        return;
      }
  
      const orderData = {
        customer_name: customerName,
        dish_name:dish.name,
        total_price: dish.price,
        status: 'pending',
        tracking_status: 'disable' // Set the initial tracking status to 'pending'
      };
  
      this.apiService.createOrder(orderData).subscribe(
        (response) => {
          console.log('Order placed successfully:', response);
          const orderId = response.id; // Access the order ID from the response
          this.updateOrderTracking(orderId); // Update the tracking status immediately after placing the order
        },
        (error) => {
          console.log('Error placing order:', error);
        }
      );
    });
  }
  
  updateOrderTracking(orderId: number) {
    // Update the order tracking status to "delivered" using the orderId
    const trackingData = {
      tracking_status: 'enable'
      // Add other relevant fields if required
    };
  
    this.apiService.updateOrderTracking(orderId, trackingData).subscribe(
      (response) => {
        console.log('Order tracking status updated to delivered:', response);
        // Perform any necessary actions after updating the order tracking status
      },
      (error) => {
        console.log('Error updating order tracking status:', error);
      }
    );
  }

 
  addToBag(dish: UserDish) {
   

    if (this.authService.isAuthenticatedSubject.value) {
      // User is logged in, redirect to bag page
      // this.router.navigate(['/bag']);
      this.bagService.addToBag(dish);


       // Display sweet alert
    Swal.fire({
      icon: 'success',
      title: 'Dish added to bag',
      showConfirmButton: false,
      timer: 1700
    });


    } else {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
    }
  }
  

  removeFromBag(dish: UserDish) {
    this.bagService.removeFromBag(dish);
  }

  
  


  getTotalPrice(): number {
    return this.bag.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
  }



  increaseQuantity(dish: UserDish) {
    dish.quantity++;
  }

  decreaseQuantity(dish: UserDish) {
    if (dish.quantity > 1) {
      dish.quantity--;
    }
}




currentPage = 1;
itemsPerPage = 8;

get totalPages(): number {
  return Math.ceil(this.dishes.length / this.itemsPerPage);
}

get pagedDishes(): UserDish[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.dishes.slice(startIndex, startIndex + this.itemsPerPage);
}

get pagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index + 1);
}

goToPage(page: number) {
  this.currentPage = page;
}

previousPage() {
  this.currentPage--;
}

nextPage() {
  this.currentPage++;
}



}
