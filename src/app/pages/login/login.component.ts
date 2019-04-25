import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModal:boolean;
  constructor(private router:Router) {
    this.loginModal = true;
   }

  ngOnInit() {
  }

  showLoginModal(){
    this.loginModal = false;
    this.router.navigate(['']);
  }
}
