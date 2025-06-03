import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  activeTab = 'dados';
  usuario: any = null;
  loading = false;
  carregando = true;
  mensagemErro = '';
  mostrarModal = false;
  usuarioEditando: any = null;
  
  editForm = {
    firstName: '',
    username: '',
    email: '',
    birthDate: '',
  };

  constructor(
    private loginService: LoginService,
    private cadastroService:CadastroService,
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

  abrirModalEdicao(usuario: any): void {
    this.usuarioEditando = usuario;
    this.editForm = { ...usuario };
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.usuarioEditando = null;
  }

  salvarEdicao(): void {
    try {
      const resultado = this.cadastroService.atualizarUsuario(
        this.usuarioEditando.username,
        this.editForm
      );
      
      if (resultado.success) {
        this.fecharModal();
      } else {
        this.mensagemErro = resultado.message;
      }
    } catch (error) {
      this.mensagemErro = 'Erro ao atualizar usuário.';
      console.error(error);
    }
  }

}