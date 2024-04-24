import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const token = cookie.get('session');

  console.log('Cookie: ', token);

  const reqWithHeader = req.clone({
    withCredentials: true,
    setHeaders: {
      Bearer: token ?? '',
    },
  });

  return next(reqWithHeader);
};