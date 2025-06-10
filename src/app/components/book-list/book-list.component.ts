import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports:[CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  @Input() title!: string;
  @Input() books: any[] = [];

    constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
    ) {}

  addToCart(book: any) {
    this.carrinhoService.addToCart(book);
  }

  irCarrinho(){
    this.router.navigate(['/carrinho'])
  }
}
