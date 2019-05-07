import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean = false;
  loginModal: boolean;
  user: User = {};
  constructor(private router: Router, private auth: AuthService) {
    this.loginModal = true;
    auth.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  ngOnInit() {
  }

  showLoginModal() {
    this.loginModal = false;
    this.router.navigate(['']);
  }

  createAnAcount() {
    this.loginModal = false;
    this.router.navigate(['register']);
  }

  login(form: NgForm) {

    if (form.valid) {
      this.auth.signIn(this.user.email, this.user.password);
   }
  }

  signOut() {
    this.auth.signOut();
  }

  

}
