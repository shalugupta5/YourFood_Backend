import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishListComponent } from './dish-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DishListComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DishListComponent] // Export the component
})
export class DishListModule {}
