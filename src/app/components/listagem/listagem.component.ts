import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroService } from '../../services/cadastro.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-usuarios',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {
  usuarios: any[] = [];
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
    private cadastroService: CadastroService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    try {
      this.usuarios = this.cadastroService.getAllUsers();
      this.carregando = false;
    } catch (error) {
      this.mensagemErro = 'Erro ao carregar usuários.';
      this.carregando = false;
      console.error(error);
    }
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
        this.carregarUsuarios();
        this.fecharModal();
      } else {
        this.mensagemErro = resultado.message;
      }
    } catch (error) {
      this.mensagemErro = 'Erro ao atualizar usuário.';
      console.error(error);
    }
  }

  formatarData(data: string): string {
    if (!data) return 'Não informada';
    return new Date(data).toLocaleDateString('pt-BR');
  }

   editarUsuario(username: string): void {
    this.router.navigate(['/editar-usuario', username]);
  }

  excluirUsuario(username: string): void {
    this.carregando = true;
    try {
      const sucesso = this.cadastroService.excluirUsuario(username);
      
      if (sucesso) {
        this.usuarios = this.usuarios.filter(u => u.username !== username);
      } else {
        this.mensagemErro = 'Erro ao excluir usuário.';
      }
    } catch (error) {
      this.mensagemErro = 'Erro ao excluir usuário.';
      console.error(error);
    } finally {
      this.carregando = false;
    }
  }

  confirmarExclusao(usuario: any): void {
    const confirmacao = confirm(`Deseja realmente excluir o usuário ${usuario.username}?`);
    
    if (confirmacao) {
      this.excluirUsuario(usuario.username);
    }
  }
}