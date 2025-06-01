import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  activeTab = 'dados';
  isDropdownOpen = false;
  
  favoriteItems = [
    { id: 1, name: 'Perfume Florais do Campo', brand: 'Essence Paris', price: 129.90 },
    { id: 2, name: 'Fragrância Noturna', brand: 'Secrets', price: 159.90 },
    { id: 3, name: 'Água de Colônia Fresh', brand: 'Nature', price: 89.90 }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  Dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  favoritos() {
    this.setActiveTab('favoritos');
    // Navegar para favoritos
  }

  carrinho() {
    // Navegar para carrinho
  }

  usuario() {
    // Já está na página de perfil
  }

  sair() {
    // Lógica para logout
  }

  removeFavorite(id: number) {
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== id);
  }

  openAddressModal() {
    // Lógica para abrir modal de endereço
  }

  changeAvatar() {
    // Lógica para alterar avatar
  }
}
