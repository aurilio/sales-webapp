// src/app/sales/services/sale.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sale } from '../models/sale.model';
import { PaginatedResponse } from '../../shared/models/paginated-response.model';
import { environment } from '../../../environments/environment';
import { buildQueryParams } from '../../core/utils/query-params.util';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly baseUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getAll(
    page: number = 1,
    size: number = 10,
    filters: { [key: string]: string } = {},
    orderBy?: string
  ): Observable<PaginatedResponse<Sale>> {
    const params = buildQueryParams(page, size, filters, orderBy);
    return this.http.get<PaginatedResponse<Sale>>(`${this.baseUrl}`, { params });
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
