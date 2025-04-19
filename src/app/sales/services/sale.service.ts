// src/app/sales/services/sale.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../models/sale.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly baseUrl = 'http://localhost:8080/sales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl);
  }

  getById(id: string): Observable<Sale> {
    return this.http.get<Sale>(`${this.baseUrl}/${id}`);
  }

  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, sale);
  }

  update(id: string, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/${id}`, sale);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
