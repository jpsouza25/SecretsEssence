// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';

import { BookListComponent } from "../book-list/book-list.component";
import { BookCarouselComponent } from "../book-carousel/book-carousel.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { livroService } from '../../services/livro.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [BookListComponent, BookCarouselComponent, NavbarComponent],
})
export class HomeComponent implements OnInit {
  highlightedBooks: any[] = [];
  bestSellers: any[] = [];
  newArrivals: any[] = [];

  constructor(private livroService: livroService) {}

  ngOnInit(): void {

    this.livroService.getBooks('bestseller').subscribe((res: any) => {
      this.bestSellers = res.items.slice(0, 8);
    });

    this.livroService.getBooks('new').subscribe((res: any) => {
      this.newArrivals = res.items.slice(0, 8);
    });
  }
}
