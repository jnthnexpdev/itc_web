import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const token = cookie.get('session');

  const auth = req.clone({
    setHeaders : {
      Authorization : `Bearer ${token}`
    }
  });

  return next(auth);
};