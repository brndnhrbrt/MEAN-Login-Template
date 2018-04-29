import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';

import { UserService } from '../user.service';
import { TokenService } from '../token.service';

import { LoginUser } from '../user';
import { Message } from '../message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() user: LoginUser = { username: '', password: '' };
  message: Message;

  constructor(
    private userService: UserService,
    private router: Router,
    private appComponent: AppComponent,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.userService.loginUser(this.user)
    .subscribe(resp => {
      const message: Message = { success: resp.success, message: resp.message };
      this.message = message;
      if(resp.success) {
        this.appComponent.isLoggedIn = true;
        this.router.navigate(['dash']);
      } else {
        this.tokenService.clearToken();
      }
    });
  }

}
