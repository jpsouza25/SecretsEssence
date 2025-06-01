import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuarioInfo'; // Assumindo que você tem essa interface

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private storageKey = 'usuarios';

  /**
   * Registra um novo usuário
   */
  registrar(usuario: Usuario): { success: boolean, message: string } {
    try {
      const usuarios = this.getUsuarios();

      // Verifica se usuário já existe (case insensitive e trim)
      const usuarioExistente = usuarios.find(u => 
        u.username.toLowerCase().trim() === usuario.username.toLowerCase().trim()
      );

      if (usuarioExistente) {
        return { success: false, message: 'Nome de usuário já está em uso' };
      }
      usuarios.push({
        ...usuario,
        username: usuario.username.trim(),
        password: usuario.password.trim() // ATENÇÃO: Em produção, nunca armazene senhas em texto puro
      });

      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return { success: false, message: 'Erro durante o cadastro' };
    }
  }

  /**
   * Obtém todos os usuários cadastrados
   */
  getAllUsers(): Usuario[] {
    try {
      const usuarios = localStorage.getItem(this.storageKey);
      return usuarios ? JSON.parse(usuarios) : [];
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      return [];
    }
  }

  /**
   * Remove um usuário pelo username
   */
  excluirUsuario(username: string): { success: boolean, message: string } {
    try {
      const usuariosAtuais = this.getAllUsers();
      const usuariosAtualizados = usuariosAtuais.filter(u => 
        u.username.toLowerCase().trim() !== username.toLowerCase().trim()
      );
      
      if (usuariosAtuais.length === usuariosAtualizados.length) {
        return { success: false, message: 'Usuário não encontrado' };
      }

      localStorage.setItem(this.storageKey, JSON.stringify(usuariosAtualizados));
      return { success: true, message: 'Usuário removido com sucesso' };
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      return { success: false, message: 'Erro ao excluir usuário' };
    }
  }

  /**
   * Método privado para obter usuários (base para outros métodos)
   */
  private getUsuarios(): Usuario[] {
    return this.getAllUsers();
  }
}