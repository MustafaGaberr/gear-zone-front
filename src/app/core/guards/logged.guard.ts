import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
// import { AuthService } from '../services/';
import { CookieService } from 'ngx-cookie-service';

export const loggedGuard: CanActivateFn = (route, state) => {
    const cookieService = inject(CookieService);
  const router = inject(Router);

  // لو المستخدم مسجل دخول، أعد توجيهه للصفحة الرئيسية
  if (cookieService.check('token')) {
    return router.parseUrl('/home');
  } else {
    return true; // مسموح بالدخول لصفحات login/register
  }

};
