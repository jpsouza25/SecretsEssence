import { Component, Input } from '@angular/core';
import { Livro } from '../../interfaces/livros';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-card-livro',
  templateUrl: './card-livro.component.html',
  styleUrls: ['./card-livro.component.scss']
})
export class CardLivroComponent {
  @Input() livro: Livro = {
    _id: '',
    titulo: '',
    autor: '',
    preco: 0,
    categoria: 'Literatura'
  };

  constructor(private carrinhoService: CarrinhoService) { }

  adicionarAoCarrinho(): void {
    this.carrinhoService.adicionarAoCarrinho(this.livro);
  }

  get estrelasAvaliacao(): string {
    const avaliacao = this.livro.avaliacao || 0;
    return '★'.repeat(avaliacao) + '☆'.repeat(5 - avaliacao);
  }
}