import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dish } from '../dish-list/dish-list.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-dish-dialog',
  templateUrl: './create-dish-dialog.component.html',
  styleUrls: ['./create-dish-dialog.component.css']
})
export class CreateDishDialogComponent implements OnInit {
  newDish: Dish = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    availability: false
  };

  constructor(public dialogRef: MatDialogRef<CreateDishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  createDish() {
    // Pass the new dish back to the calling component
    this.dialogRef.close(this.newDish);
   
    Swal.fire({
      title: 'Dish Created',
      text: 'The dish has been successfully created!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
    
  }

  cancel() {
    // Close the dialog without returning any result
    this.dialogRef.close();
   
  }

  

}
