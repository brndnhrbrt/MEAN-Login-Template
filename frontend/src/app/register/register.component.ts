import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

import { AppComponent } from '../app.component';

import { RegisterUser, LoginUser } from '../user';
import { Message } from '../message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user: RegisterUser = { username: '', password: '', repeatPassword: '' };
  message: Message;

  constructor(
    private userService: UserService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
  }

  register(): void {
    this.userService.registerUser(this.user)
    .subscribe(resp => {
      if(resp.success) {
        const user: LoginUser = { username: this.user.username, password: this.user.password };
        this.userService.loginUser(this.user)
        .subscribe(resp => {
          const message: Message = { success: resp.success, message: resp.message };
          this.message = message;
          if(resp.success) {
            this.router.navigate(['dash']);
            this.appComponent.isLoggedIn = true;
          }
        });
      } else {
        const message: Message = { success: resp.success, message: resp.message };
        this.message = message;
      }
    });
  }

}
