import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);
  
  private readonly baseUrl: string = 'http://localhost:3000/api/cart'; 

  cartNumber: WritableSignal<number> = signal(0);

  constructor() {
    // this.getLoggedUserCart().subscribe();
  }

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl, { productId }).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.set(res.numOfCartItems);
        }
      })
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.set(res.numOfCartItems);
        }
      })
    );
  }

  removeSpecificCartItem(itemId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${itemId}`).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
           this.cartNumber.set(res.numOfCartItems);
        }
      })
    );
  }

  updateCartProductQuantity(itemId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${itemId}`, { quantity: count }).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
           this.cartNumber.set(res.numOfCartItems);
        }
      })
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl).pipe(
       tap(() => {
          this.cartNumber.set(0); 
       })
    );
  }
}