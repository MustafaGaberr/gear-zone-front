import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);


  private readonly _HttpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService)

  private readonly baseUrl: string = 'https://gear-zone-backend.fly.dev/api/cart';

  // myheaders:object={

  //   headers:{
  //     token:this.cookieService.get('token')
  //   }
  // }

  // cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.getLoggedUserCart().subscribe();
  }
  addToCart(productId: string): Observable<any> {

    return this._HttpClient.post(this.baseUrl, { productId }).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.next(res.numOfCartItems);
        }
      })
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.next(res.numOfCartItems);
        }
      })
    );
  }

  removeSpecificCartItem(itemId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${itemId}`).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.next(res.numOfCartItems);
        }
      })
    );
  }

  updateCartProductQuantity(itemId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${itemId}`, { quantity: count }).pipe(
      tap((res: any) => {
        if (res.numOfCartItems !== undefined) {
          this.cartNumber.next(res.numOfCartItems);
        }
      })
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl).pipe(
      tap(() => {
        this.cartNumber.next(0);
      })
    );
  }
}