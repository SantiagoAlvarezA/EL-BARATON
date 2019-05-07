import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModal: boolean;
  user: User = {};
  EmailPaswword: boolean;
  saveUser: boolean;

  constructor(private router: Router, private auth: AuthService) {
    this.registerModal = true;
    this.EmailPaswword = true;
    this.saveUser = false;
  }

  ngOnInit() {
  }
  
  showRegisterModal() {
    this.registerModal = false;
    this.router.navigate(['/']);

  }
  register(user: User) {
    
    this.auth.register(user.email, user.password, user);
    // this.router.navigate(['login']);

  }

  tabEmailPass() {
    this.EmailPaswword = true;
    this.saveUser = false;
  }

  nextStep(user: User) {
   
    this.EmailPaswword = false;
    this.saveUser = true;
  }

}
