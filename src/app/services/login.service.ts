import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuarioInfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private storageKey = 'usuarios';
  private usuarioLogado = new BehaviorSubject<Usuario | null>(null);
  usuarioLogado$ = this.usuarioLogado.asObservable();

  constructor() {
    this.verificarUsuario();
  }

  private verificarUsuario(): void {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      try {
        this.usuarioLogado.next(JSON.parse(usuario));
      } catch (e) {
        console.error('Erro ao analisar usuário:', e);
        this.sair();
      }
    }
  }

  login(username: string, password: string): boolean {
    const usuarios = this.obterUsuarios();
    console.log('Usuários disponíveis:', usuarios);
    
    const usuarioEncontrado = usuarios.find(u => 
      u.username.toLowerCase().trim() === username.toLowerCase().trim() && 
      u.password.trim() === password.trim()
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      this.usuarioLogado.next(usuarioEncontrado);
      return true;
    }
    return false;
  }

  sair(): void {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado.next(null);
  }

  obterUsuarioAtual(): Usuario | null {
    return this.usuarioLogado.value;
  }

  estaLogado(): boolean {
    return !!this.obterUsuarioAtual();
  }

  obterUsuarios(): Usuario[] {
    try {
      const usuarios = localStorage.getItem(this.storageKey);
      return usuarios ? JSON.parse(usuarios) : [];
    } catch (e) {
      console.error('Erro ao ler usuários:', e);
      return [];
    }
  }
}