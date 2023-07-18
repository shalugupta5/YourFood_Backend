import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DishListModule } from '../dish-list/dish-list.module'; // Import the DishListModule

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, DishListModule], // Add DishListModule to imports
  exports: [AdminComponent]
})
export class AdminModule {}
