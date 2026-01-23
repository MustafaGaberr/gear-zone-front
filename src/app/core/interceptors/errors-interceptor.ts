import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
 const injector = inject(Injector);

  return next(req).pipe(
    catchError((error) => {
      const toastr = injector.get(ToastrService);

      toastr.error(error.error?.message || 'Something went wrong');

      return throwError(() => error);
    })
  );
};
