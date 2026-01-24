
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
    return this.httpClient.post('http://localhost:3000/api/users/register', data).pipe(
      tap((res: any) => {
        const user = res.data?.user;
        if (user) {
          const token = user.token;
          if (token) {
            this.cookieService.set('token', token, { path: '/' });
          }
          const userData = {
            id: user.id,
            email: user.email,
            name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.userName || user.email?.split('@')[0] || user.email,
            type: user.role || 'user',
            avatar: user.avatar || null
          };
          this.cookieService.set('user_data', JSON.stringify(userData), { path: '/' });
          this.userData.set(userData);
        }
      })
    );
  }

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getLoginApi(data: Object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/users/login', data).pipe(
      tap((res: any) => {
        const token = res.data?.token || res.token;
        if (token) {
          this.cookieService.set('token', token, { path: '/' });
          
          if (!res.user && !res.data?.user) {
            const decoded = this.decodeJWT(token);
            if (decoded) {
              const user = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.email?.split('@')[0] || decoded.email,
                type: decoded.role || 'user',
                avatar: null
              };
              this.cookieService.set('user_data', JSON.stringify(user), { path: '/' });
              this.userData.set(user);
            }
          } else {
            const user = res.user || res.data?.user;
            if (user) {
              const userData = {
                id: user.id || user._id,
                email: user.email,
                name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.userName || user.email?.split('@')[0] || user.email,
                type: user.role || user.type || 'user',
                avatar: user.avatar || null
              };
              this.cookieService.set('user_data', JSON.stringify(userData), { path: '/' });
              this.userData.set(userData);
            }
       
        }  }
      }
    ));
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
                const userData = {
                    id: res.user.id || res.user._id,
                    email: res.user.email,
                    name: res.user.firstName && res.user.lastName ? `${res.user.firstName} ${res.user.lastName}` : res.user.userName || res.user.email?.split('@')[0] || res.user.email,
                    type: res.user.role || res.user.type || 'user',
                    avatar: res.user.avatar || null
                };
                this.cookieService.set('user_data', JSON.stringify(userData), { path: '/' });
                this.userData.set(userData);
            }
        })
    );
  }


}