// image-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private baseUrl = 'https://www.themealdb.com/images';

  constructor(private http: HttpClient) { }

  getFoodImageByDishName(dishName: string): Observable<string> {
    const url = `${this.baseUrl}/${dishName}.png`;
    return this.http.get(url, { responseType: 'text' });
  }
}
