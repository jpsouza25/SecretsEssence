// navbar.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  isDropdownOpen = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }


  Dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  usuario() {
    this.router.navigate(['/usuario']);
  }
  listagem() {
    this.router.navigate(['/listagem']);
  }
  sair() {
    this.loginService.sair();
    this.router.navigate(['/login']);
  }
  favoritos() {
    this.router.navigate(['/favoritos']);
  }
  carrinho() {
    this.router.navigate(['/carrinho']);
  }
}

