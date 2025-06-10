import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  imports: [CommonModule, NavbarComponent],
})
export class CarrinhoComponent {
   cartItems: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.cartItems = this.carrinhoService.getCartItems();
  }

  removeItem(index: number) {
    this.carrinhoService.removeFromCart(index);
    this.cartItems = this.carrinhoService.getCartItems();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price || 0), 0);
  }
}
