// perfume.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfumesService {
  private apiUrl = 'https://perfumero1.p.rapidapi.com/products';
  private rapidApiKey = 'SUA_CHAVE_API'; // Obtenha em rapidapi.com
  private rapidApiHost = 'perfumero1.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  searchPerfumes(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.rapidApiKey,
      'X-RapidAPI-Host': this.rapidApiHost
    });

    const params = {
      query: query,
      limit: '10' // Limite de resultados
    };

    return this.http.get(this.apiUrl, { headers, params });
  }
}