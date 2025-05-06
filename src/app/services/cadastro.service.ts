
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuarioInfo } from '../interfaces/usuarioInfo';

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
}