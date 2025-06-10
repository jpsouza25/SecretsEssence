// src/app/book-carousel/book-carousel.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-carousel',
  imports:[CommonModule],
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css'],
})
export class BookCarouselComponent {
  @Input() books: any[] = [];
}
