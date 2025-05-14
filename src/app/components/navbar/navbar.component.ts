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
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sair() {
    this.router.navigate(['/login']);
  }
}

