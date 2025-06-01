import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private storageKey = 'users';


  registrar(usuario: { username: string; password: string; [key: string]: any }): boolean {
    const users = this.getUsers();

    if (users.find((u) => u.username === usuario.username)) {
      return false; 
    }
    users.push(usuario);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }
  private getUsers(): Array<{ username: string; password: string }> {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }
  getAllUsers(): any[] {
  const users = localStorage.getItem(this.storageKey);
  return users ? JSON.parse(users) : [];
}
excluirUsuario(username: string): boolean {
  try {
    const usuariosAtuais = this.getUsers();
    const usuariosAtualizados = usuariosAtuais.filter(u => u.username !== username);
    
    localStorage.setItem(this.storageKey, JSON.stringify(usuariosAtualizados));
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return false;
  }
}
}