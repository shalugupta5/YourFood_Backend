import { Injectable } from '@angular/core';
import { UserDish } from './user/user.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BagService {
  private bagItems: UserDish[] = [];
  private bagItemsSubject: BehaviorSubject<UserDish[]> = new BehaviorSubject<UserDish[]>([]);

  constructor() {}

  addToBag(dish: UserDish) {
    const existingDish = this.bagItems.find((item) => item.id === dish.id);
    if (existingDish) {
      existingDish.quantity++;
    } else {
      this.bagItems.push({ ...dish, quantity: 1 });
    }
    this.bagItemsSubject.next(this.bagItems);
    console.log(this.bagItems)
  }

  removeFromBag(dish: UserDish) {
    const existingDish = this.bagItems.find((item) => item.id === dish.id);

    if (existingDish) {
      existingDish.quantity--;

      if (existingDish.quantity === 0) {
        const index = this.bagItems.indexOf(existingDish);
        this.bagItems.splice(index, 1);
      }
    }
    this.bagItemsSubject.next(this.bagItems);
  }

  getBagItems(): Observable<UserDish[]> {
    return this.bagItemsSubject.asObservable();
  }

  getTotalPrice(): number {
    return this.bagItems.reduce((total, dish) => total + (dish.price * dish.quantity), 0);
  }
}
