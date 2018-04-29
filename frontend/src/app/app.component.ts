import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'MEAN-Template';
  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLoginStatus()
  }

  getLoginStatus() {
    console.log(this.tokenService.isLoggedIn())
    if(this.tokenService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['']);
    this.isLoggedIn = false;
  }

}
