import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../interfaces/livros';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'http://localhost:5000/api/livros';

  constructor(private http: HttpClient) { }

  obterLivrosDestaque(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/destaques`);
  }

  obterLivrosPromocao(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/promocoes`);
  }

  obterLivrosPorCategoria(categoria: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}?categoria=${categoria}`);
  }

  buscarLivros(termo: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}?busca=${termo}`);
  }
}