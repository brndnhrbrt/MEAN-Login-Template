import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TokenService } from './token.service';

import { Token } from './token';
import { RegisterUser, LoginUser, InformationUser } from './user';
import { Message } from './message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3000';
  private userUrl = '/users';
  private combinedUrl = this.baseUrl + this.userUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  registerUser(user: RegisterUser): Observable<any> {
    return this.http.post<any>(this.combinedUrl+'/register', user, httpOptions)
    .pipe(
      tap(resp => { const message: Message = { success: resp.success, message: resp.message }; return message; }),
      catchError(this.handleError<any>('registerUser'))
    );
  }

  loginUser(user: LoginUser): Observable<any> {
    return this.http.post<any>(this.combinedUrl+'/login', user, httpOptions)
    .pipe(
      tap(resp => {
        if(resp.success) {
          const tokenstring: string = resp.token;
          const date: Date = new Date;
          const token: Token = { token: tokenstring, obtained: date };
          this.tokenService.setToken(token);
          return true;
        } else {
          const message: Message = { success: resp.success, message: resp.message }; 
          this.tokenService.clearToken();
          return message;
        }
      }),
      catchError(this.handleError<any>('loginUser'))
    );
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.combinedUrl+'/me', httpOptions)
    .pipe(
      tap(resp => {
        if(resp.success) {
          const user: InformationUser = { username: resp.user.username, dateCreated: resp.user.date_created };
          return user;
        } else {
          const message: Message = { success: resp.success, message: resp.message };
          return message;
        }
      }),
      catchError(this.handleError<any>('getUser'))
    );
  }

}
