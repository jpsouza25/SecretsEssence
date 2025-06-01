import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  activeTab = 'dados';
  usuario: any = null;
  loading = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    this.usuario = this.loginService.obterUsuarioAtual(); // Corrigido
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Não informada';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }
}