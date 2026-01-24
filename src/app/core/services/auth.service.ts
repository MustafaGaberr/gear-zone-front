
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  

  private readonly cookieService=inject(CookieService)
  private readonly router=inject(Router)

  getRegisterApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/register', data);
  }

  getLoginApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/login', data);
  }
  logout():void{
     this.cookieService.delete('token', '/');
      this.cookieService.delete('token'); 
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 50);

  }

  profileApi():Observable<any>{
    return this.httpClient.get('http://localhost:3000/api/users/')

  }

  personalInformation(data:object):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/api/users/updataprofile`,data)
  }


}
this