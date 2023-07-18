// home.component.ts (or your Angular component file)
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex = 0;

  ngOnInit() {
    this.showSlides();
  }

  showSlides() {
    const slides = document.getElementsByClassName('slider-container')[0].children;
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }

    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }

    slides[this.slideIndex - 1].classList.add('active');
    setTimeout(() => this.showSlides(), 1000); // Change slide every 3 seconds
  }
}
