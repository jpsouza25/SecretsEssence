import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownOpen = false;
  constructor(private router: Router) {}
  Dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  agendamentos() {
    this.router.navigate(['/agendamentos']);
  }
  agendar() {
    this.router.navigate(['/agendar']);
  }
  usuario() {
    this.router.navigate(['/usuario']);
  }
  config() {
    this.router.navigate(['/config']);
  }
  sair() {
    this.router.navigate(['/login']);
  }
}

