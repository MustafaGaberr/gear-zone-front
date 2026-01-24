import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient);

  private readonly baseUrl = 'https://gear-zone-backend.fly.dev/api/products';

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);

  }
}