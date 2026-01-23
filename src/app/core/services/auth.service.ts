
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient)

  getRegisterApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/register', data)
  }
  getLoginApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/login', data)
  }

  
}
