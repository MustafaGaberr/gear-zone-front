
import { inject, Injectable , signal, WritableSignal } from '@angular/core';
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
userData: WritableSignal<any> = signal(null);
constructor() {
    if (this.cookieService.check('user_data')) {
      try {
        const storedUser = JSON.parse(this.cookieService.get('user_data'));
        this.userData.set(storedUser); 
      } catch (err) {
        this.logout(); 
      }
    }
  }
  getRegisterApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/register', data);
  }

  getLoginApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/login', data).pipe(
      tap((res: any) => {
        if (res.data.token) {
          this.cookieService.set('token', res.data.token, { path: '/' });

          if (res.user) {
            this.cookieService.set('user_data', JSON.stringify(res.data.user), { path: '/' });
            this.userData.set(res.user); 
          }
        }
      })
    );
  }
  logout():void{
     this.cookieService.delete('token', '/');
      this.cookieService.delete('token'); 
      this.cookieService.delete('user_data', '/');
      this.cookieService.delete('user_data');
      this.userData.set(null); 
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 50);

  }

  profileApi():Observable<any>{
    return this.httpClient.get('http://localhost:3000/api/users/')

  }

  personalInformation(data:object):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/api/users/updataprofile`,data).pipe(
        tap((res: any) => {
            if(res.user) {
                this.cookieService.set('user_data', JSON.stringify(res.user), { path: '/' });
                this.userData.set(res.user);
            }
        })
    );
  }


}