import { Injectable } from '@angular/core';
import { Livro } from '../interfaces/livros';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinho: Livro[] = [];

  constructor() { }

  adicionarAoCarrinho(livro: Livro): void {
    this.itensCarrinho.push(livro);
  }

  removerDoCarrinho(livroId: string): void {
    this.itensCarrinho = this.itensCarrinho.filter(item => item._id !== livroId);
  }

  obterItensCarrinho(): Livro[] {
    return this.itensCarrinho;
  }

  obterQuantidadeItens(): number {
    return this.itensCarrinho.length;
  }

  limparCarrinho(): void {
    this.itensCarrinho = [];
  }

  obterTotal(): number {
    return this.itensCarrinho.reduce((total, item) => {
      return total + (item.precoPromocional || item.preco);
    }, 0);
  }
}