import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../feedback.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  feedbackForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private feedbackService: FeedbackService) {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      feedback: ['', Validators.required],
      // rating: ['', Validators.required]
      rating: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

 

  submitFeedback() {
    const { name, email, feedback, rating } = this.feedbackForm.value;
    this.feedbackService
      .submitFeedback(name, email, feedback, rating)
      .then((response) => {
        console.log('Feedback submitted successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Feedback Submitted',
          text: 'Thank you for your feedback!',
        });
        this.feedbackForm.reset(); // Reset the form
        // Add any necessary actions upon successful submission
      })
      .catch((error) => {
        console.log('Error submitting feedback:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit feedback. Please try again.',
        });
        // Handle the error
      });
  }
  
}
