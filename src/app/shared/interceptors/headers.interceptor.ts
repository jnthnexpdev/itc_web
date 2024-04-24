import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = ( req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const cookieService = inject(CookieService);
    const token = cookieService.get('session');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      return next(cloned);
    } else {
      return next(req);
    }
};