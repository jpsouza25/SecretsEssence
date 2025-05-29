import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PerfumesService } from '../../services/perfumes.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownOpen = false;
  searchControl = new FormControl();
  searchResults: any[] = [];

  constructor(private perfumeService: PerfumesService,private router: Router) {}

  ngOnInit() {
    // Configurar busca com debounce para não sobrecarregar a API
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query && query.length > 2) {
            return this.perfumeService.searchPerfumes(query);
          } else {
            this.searchResults = [];
            return [];
          }
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.searchResults = response.data.map((item: any) => ({
              id: item.id,
              name: item.name,
              brand: item.brand,
              price: item.price,
              discount: item.discount,
              image: item.image || 'assets/default-perfume.jpg'
            }));
          } else {
            this.searchResults = [];
          }
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          this.searchResults = [];
        }
      });
  }

  searchPerfumes(query: string) {
    if (query && query.length > 0) {
      this.perfumeService.searchPerfumes(query).subscribe({
        next: (response) => {
          if (response && response.data) {
            this.searchResults = response.data;
          }
        },
        error: (err) => console.error('Erro na busca:', err)
      });
    }
  }

  selectPerfume(perfume: any) {
    // Lógica para quando um perfume é selecionado
    console.log('Perfume selecionado:', perfume);
    this.searchResults = []; // Limpa resultados
    this.searchControl.setValue(''); // Limpa campo de busca
    // Aqui você pode navegar para a página do produto
  }

  Dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  agendamentos() {
    this.router.navigate(['/agendamentos']);
  }
  agendar() {
    this.router.navigate(['/agendar']);
  }
  usuario() {
    this.router.navigate(['/usuario']);
  }
  sair() {
    this.router.navigate(['/login']);
  }
  favoritos() {
    this.router.navigate(['/favoritos']);
  }
  carrinho() {
    this.router.navigate(['/carrinho']);
  }
}

