import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuarioInfo';
import { Listagem } from '../interfaces/listagem';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private storageKey = 'usuarios';

  registrar(usuario: Usuario): { success: boolean, message: string } {
    try {
      const usuarios = this.getUsuarios();
      const usuarioExistente = usuarios.find(u => 
        u.username.toLowerCase().trim() === usuario.username.toLowerCase().trim()
      );

      if (usuarioExistente) {
        return { success: false, message: 'Nome de usuário já está em uso' };
      }
      usuarios.push({
        ...usuario,
        username: usuario.username.trim(),
        password: usuario.password.trim()
      });

      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return { success: false, message: 'Erro durante o cadastro' };
    }
  }

  getAllUsers(): Usuario[] {
    try {
      const usuarios = localStorage.getItem(this.storageKey);
      return usuarios ? JSON.parse(usuarios) : [];
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      return [];
    }
  }

  private getUsuarios(): Usuario[] {
    return this.getAllUsers();
  }

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

  atualizarUsuario(usernameOriginal: string, usuarioAtualizado:Listagem): { success: boolean, message: string } {
  try {
    const usuarios = this.getAllUsers();
    const index = usuarios.findIndex(u => 
      u.username.toLowerCase().trim() === usernameOriginal.toLowerCase().trim()
    );

    if (index === -1) {
      return { success: false, message: 'Usuário não encontrado' };
    }
    const usernameExistente = usuarios.some((u, i) => 
      i !== index && 
      u.username.toLowerCase().trim() === usuarioAtualizado.username.toLowerCase().trim()
    );

    if (usernameExistente) {
      return { success: false, message: 'Novo nome de usuário já está em uso' };
    }

    usuarios[index] = {
      ...usuarios[index],
      ...usuarioAtualizado,
      username: usuarioAtualizado.username.trim(),
    };

    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
    return { success: true, message: 'Usuário atualizado com sucesso!' };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, message: 'Erro ao atualizar usuário' };
  }
}

getUserByUsername(username: string): Usuario | undefined {
  return this.getAllUsers().find(u => 
    u.username.toLowerCase().trim() === username.toLowerCase().trim()
  );
}
}