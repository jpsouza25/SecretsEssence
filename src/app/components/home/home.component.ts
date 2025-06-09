import { Component, OnInit } from '@angular/core';
import { Livro } from '../../interfaces/livros';
import { LivroService } from '../../services/livro.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CardLivroComponent } from "../card-livro/card-livro.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NavbarComponent, CommonModule, CardLivroComponent]
})
export class InicioComponent implements OnInit {
  livrosDestaque: Livro[] = [];
  livrosPromocao: Livro[] = [];
  carregando = true;

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.carregarLivrosDestaque();
    this.carregarLivrosPromocao();
  }

  carregarLivrosDestaque(): void {
    this.livroService.obterLivrosDestaque().subscribe({
      next: (livros) => {
        this.livrosDestaque = livros;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar destaques:', err);
        this.carregando = false;
      }
    });
  }

  carregarLivrosPromocao(): void {
    this.livroService.obterLivrosPromocao().subscribe({
      next: (livros) => {
        this.livrosPromocao = livros;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar promoções:', err);
        this.carregando = false;
      }
    });
  }
}