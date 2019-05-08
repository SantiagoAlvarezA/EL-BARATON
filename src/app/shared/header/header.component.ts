import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navburger = false;
  isAuthenticated: boolean = false;
  totalCar = null;
  user = null;

  constructor(private auth: AuthService, private carService: CarService) {
    auth.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.totalCar = this.carService.getTotal();
        this.user = this.auth.getUser(result.uid);
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
    this.isAuthenticated = false;
    this.totalCar = 0;
  }
}
