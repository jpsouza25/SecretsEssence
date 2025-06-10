import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 isDropdownOpen = false;
   searchQuery: string = '';
  searchResults: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient,private router:Router,private loginService:LoginService) {
    this.setupSearchSubscription();
  }

  setupSearchSubscription() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.searchResults = [])),
        switchMap((query) => this.fetchBooks(query))
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  searchBooks() {
    const query = this.searchQuery.trim();
    if (query.length > 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }

  fetchBooks(query: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`;
    return this.http.get<any>(url).pipe(
      switchMap((response) => {
        return [response.items || []];
      })
    );
  }

  selectBook(book: any) {
    this.searchQuery = book.volumeInfo.title;
    this.searchResults = [];
    console.log('Livro selecionado:', book);
  }

  Dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  usuario() {
    this.router.navigate(['/usuario']);
  }
  listagem() {
    this.router.navigate(['/listagem']);
  }
  sair() {
    this.loginService.sair();
    this.router.navigate(['/login']);
  }
  favoritos() {
    this.router.navigate(['/favoritos']);
  }
  carrinho() {
    this.router.navigate(['/carrinho']);
  }
}




