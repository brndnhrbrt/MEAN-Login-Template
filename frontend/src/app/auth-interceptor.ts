import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if(token.token) {
            const changedReq = req.clone({ headers: req.headers.set('x-access-token', token.token) });
            return next.handle(changedReq);
        } else {
            return next.handle(req);
        }
    }

    constructor(
        private tokenService: TokenService
    ) {}
}