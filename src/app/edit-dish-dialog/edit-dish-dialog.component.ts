



import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dish } from '../dish-list/dish-list.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-dish-dialog',
  templateUrl: './edit-dish-dialog.component.html',
  styleUrls: ['./edit-dish-dialog.component.css']
})
export class EditDishDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dish,
    private apiService: ApiService
  ) { }

  onSaveClick(): void {
    this.apiService.updateDish(this.data.id, this.data).subscribe(
      updatedDish => {
        // Handle the successful update response, if needed
        this.dialogRef.close(updatedDish);
      },
      error => {
        // Handle the error, if needed
        console.error(error);
        this.dialogRef.close();
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
