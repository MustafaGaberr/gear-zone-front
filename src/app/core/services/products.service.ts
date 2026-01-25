import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductsQuery {
  page?: number;
  limit?: number;
  keyword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient);

  private readonly baseUrl = 'https://gear-zone-backend.fly.dev/api/products';

  getAllProducts(query?: ProductsQuery): Observable<any> {
    let params = new HttpParams();

    if (query) {
      if (query.page) params = params.set('page', query.page.toString());
      if (query.limit) params = params.set('limit', query.limit.toString());
      if (query.keyword) params = params.set('keyword', query.keyword);
    }

    return this._HttpClient.get(this.baseUrl, { params });
  }

  getProductById(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/${productId}`);
  }

  createProduct(formData: FormData): Observable<any> {
    return this._HttpClient.post(this.baseUrl, formData);
  }

  updateProduct(productId: string, formData: FormData): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${productId}`, formData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`);
  }
}