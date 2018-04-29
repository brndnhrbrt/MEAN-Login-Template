import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserService } from '../user.service';
import { TokenService } from '../token.service';

import { InformationUser } from '../user';
import { Message } from '../message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: InformationUser;
  message: Message;

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    if(this.tokenService.isLoggedIn()) {
      this.userService.getUser()
      .subscribe(resp => {
        if(resp.success) {
          this.user = { username: resp.user.username, dateCreated: resp.user.date_created };
        }
      });
    }
  }

}
