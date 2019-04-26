import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navburger = false;
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService) {
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

  navMenu() {
    this.navburger = !this.navburger;
  }

  signOut() {
    this.auth.signOut();
  }
}
