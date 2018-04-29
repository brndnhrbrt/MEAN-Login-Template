import { Injectable } from '@angular/core';

import { Token } from './token';

@Injectable()
export class TokenService {

  getToken(): Token {
    const tokenstring: string = localStorage.getItem('token');
    const date: Date = new Date;
    const token: Token = { token: tokenstring, obtained: date };
    return token;
  }

  setToken(token: Token): void {
    localStorage.setItem('token', token.token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    if(localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  constructor() { }

}
