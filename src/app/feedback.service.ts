


import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  submitFeedback(name: string, email: string, feedback: string, rating: number) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('feedback', feedback);
    formData.append('rating', rating.toString());

    return axios.post('https://formsubmit.co/yourfood743@gmail.com', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
