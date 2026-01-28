import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  if (cookieService.check('token')) {
    const token = cookieService.get('token');

    if (token && token.trim()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req);
};
