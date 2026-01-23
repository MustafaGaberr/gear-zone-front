import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  // تحقق من وجود التوكن في الكوكيز
  if (cookieService.check('token')) { // أفضل من get() لأنها ترجع boolean
    return true; // مسموح بالدخول
  } else {
    // إعادة توجيه للمسار /login
    return router.parseUrl('/login');
  }
};