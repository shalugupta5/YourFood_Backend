import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDishDialogComponent } from '../edit-dish-dialog/edit-dish-dialog.component';
import { CreateDishDialogComponent } from '../create-dish-dialog/create-dish-dialog.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface Dish {
  id: number;
  name: string;
  price: number;
  quantity: number;
  availability: boolean;
  
}

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private http: HttpClient, private apiService: ApiService,
    private dialog: MatDialog,private router: Router) { }

  ngOnInit() {
    this.getDishes();
  }

  getDishes() {
    this.http.get<Dish[]>('http://localhost:5000/api/dishes').subscribe(
      response => {
        this.dishes = response;
        console.log(this.dishes);
      },
      error => {
        console.log(error);
      }
    );
  }

  editDish(dish: Dish) {
    // Open the dialog for editing the dish
    const dialogRef = this.dialog.open(EditDishDialogComponent, {
      width: '400px',
      data: dish  // Pass the dish data to the dialog
    });

    // Subscribe to the dialog's afterClosed event to handle the result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Dialog was closed with a result (e.g., the updated dish)
        console.log('Updated dish:', result);

        // Update the dish using the API
        this.apiService.updateDish(result.id, result).subscribe(
          response => {
            // Handle successful update
            console.log('Dish updated successfully:', response);
            // You can perform any necessary actions with the updated dish here

            // Refresh the dish list by calling getDishes again
            this.getDishes();
          },
          error => {
            // Handle error
            console.log('Error updating dish:', error);
          }
        );
      }
    });
  }

  deleteDish(dish: Dish) {
    // Implement the delete functionality here
    console.log('Deleting dish:', dish);
    // You can show a confirmation dialog and make an HTTP DELETE request to delete the dish
    // Call the deleteDish method from the ApiService
    this.apiService.deleteDish(dish.id).subscribe(
      response => {
        // Handle successful deletion
        console.log('Dish deleted successfully:', dish);
        // Update the dish list by calling getDishes again
        Swal.fire({
          title: 'Dish Deleted',
          text: 'The dish has been successfully deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getDishes();
      },
      error => {
        // Handle error
        console.log('Error deleting dish:', error);
      }
    );
  }

  addDish() {
    // Open the dialog for creating a new dish
    const dialogRef = this.dialog.open(CreateDishDialogComponent, {
      width: '400px',
    });

    // Subscribe to the dialog's afterClosed event to handle the result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Dialog was closed with a result (e.g., the new dish)
        console.log('Created dish:', result);

        // Create the new dish using the API
        this.apiService.createDish(result).subscribe(
          response => {
            // Handle successful creation
            console.log('Dish created successfully:', response);
            // You can perform any necessary actions with the created dish here

            // Refresh the dish list by calling getDishes again
            this.getDishes();
          },
          error => {
            // Handle error
            console.log('Error creating dish:', error);
          }
        );
      }
    });
  }


  redirectToHistory() {
    this.router.navigate(['/history']);
  }
  
}
